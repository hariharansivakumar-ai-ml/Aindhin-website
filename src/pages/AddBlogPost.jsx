
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../utils/supabaseClient';
import { ArrowLeft, Upload, Image as ImageIcon, Save, Send, Menu, Bell, ChevronDown, X, Home, FileText, PlusCircle, Trash2, LogOut, LayoutDashboard, Loader2, Clock } from 'lucide-react';

import RichTextEditor from '../components/RichTextEditor';
import MediaLibrary from '../components/MediaLibrary';

const AddBlogPost = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [slug, setSlug] = useState('');
    const [status, setStatus] = useState('Draft');
    const [featuredImage, setFeaturedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [showMediaLibrary, setShowMediaLibrary] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);
    const [userEmail, setUserEmail] = useState('Administrative User');
    const [currentPostId, setCurrentPostId] = useState(null);

    useEffect(() => {
        const getUser = async () => {
            try {
                const { data, error } = await supabase.auth.getUser();
                if (data?.user) setUserEmail(data.user.email);
            } catch (err) {
                console.error("Error fetching user:", err);
            }
        };
        getUser();
    }, []);

    // Auto-generate slug from title
    useEffect(() => {
        const generateSlug = (text) => {
            return text
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)+/g, '');
        };
        if (title) {
            setSlug(generateSlug(title));
        }
    }, [title]);

    // Reusable upload function
    const uploadImageToSupabase = async (file) => {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
            .from('blog_images')
            .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data } = supabase.storage
            .from('blog_images')
            .getPublicUrl(filePath);

        return data.publicUrl;
    };

    const handleFeaturedImageUpload = async (e) => {
        try {
            setUploading(true);
            const file = e.target.files[0];
            if (!file) return;

            // Create preview
            const objectUrl = URL.createObjectURL(file);
            setImagePreview(objectUrl);

            const publicUrl = await uploadImageToSupabase(file);
            setFeaturedImage(publicUrl);

        } catch (error) {
            console.error("Error uploading image:", error);
            alert(`Error uploading image: ${error.message || "Unknown error"}`);
        } finally {
            setUploading(false);
        }
    };

    const handleSave = async (isPublished = false) => {
        try {
            setLoading(true);
            const user = (await supabase.auth.getUser()).data.user;

            const postData = {
                title,
                description: content,
                slug,
                status: isPublished ? 'Published' : 'Draft', // Set correct status
                image_url: featuredImage,
                author: 'Aindhin',
                user_id: user?.id, // Added user_id for security policies
                date: new Date().toISOString()
            };

            const { data, error } = await supabase
                .from('blogs')
                .upsert([{
                    ...(currentPostId ? { id: currentPostId } : {}),
                    ...postData
                }], { onConflict: 'slug' })
                .select();

            if (error) throw error;

            if (data && data[0]) {
                setCurrentPostId(data[0].id);
            }

            alert(isPublished ? "Blog published successfully!" : "Draft saved successfully!");
            if (isPublished) {
                setStatus('Published');
            }

        } catch (error) {
            console.error("Error saving blog:", error.message);
            alert("Error saving blog: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F4F6F8] font-inter flex">
            {/* Desktop Sidebar */}
            <aside className="w-72 bg-[#111827] text-white flex-col hidden md:flex sticky top-0 h-screen overflow-y-auto shrink-0">
                <div className="p-8">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                            <span className="font-bold text-xl">A</span>
                        </div>
                        <h2 className="text-xl font-bold tracking-tight">Admin<span className="text-primary">Panel</span></h2>
                    </div>

                    <div className="space-y-1">
                        <p className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Main Menu</p>
                        <nav className="space-y-1">
                            <button onClick={() => navigate('/wp-admin/dashboard')} className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all group">
                                <LayoutDashboard className="w-5 h-5 group-hover:text-gray-300" />
                                <span className="font-medium">Dashboard</span>
                            </button>
                            <button onClick={() => navigate('/wp-admin/drafts')} className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all group text-left">
                                <Clock className="w-5 h-5 group-hover:text-gray-300" />
                                <span className="font-medium">Drafts</span>
                            </button>
                            <button className="w-full flex items-center gap-3 px-4 py-3 bg-primary/10 text-primary border-r-[3px] border-primary rounded-lg transition-all text-left">
                                <PlusCircle className="w-5 h-5" />
                                <span className="font-medium">Add New Blog</span>
                            </button>
                            <button onClick={() => navigate('/wp-admin/trash')} className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all group text-left">
                                <Trash2 className="w-5 h-5 group-hover:text-gray-300" />
                                <span className="font-medium">Trash</span>
                            </button>
                        </nav>
                    </div>
                </div>

                <div className="mt-auto p-6 border-t border-gray-800">
                    <div className="flex items-center gap-3 mb-6 px-2">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center text-sm font-bold shadow-md">
                            {userEmail.charAt(0).toUpperCase()}
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-sm font-semibold truncate text-white">{userEmail.split('@')[0]}</p>
                            <p className="text-xs text-gray-500 truncate">Administrator</p>
                        </div>
                    </div>
                    <button
                        onClick={async () => {
                            await supabase.auth.signOut();
                            navigate('/wp-admin');
                        }}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-red-500/30 text-red-400 rounded-xl hover:bg-red-500/10 hover:text-red-300 transition-all font-medium text-sm"
                    >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
                {/* Top Navigation Bar */}
                <nav className="bg-white px-6 py-3 flex items-center justify-between shadow-sm sticky top-0 z-50">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setShowSidebar(true)}
                            className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors md:hidden"
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                        {/* Optional: Add Logo here if needed, keeping it clean as per screenshot */}
                    </div>

                    <div className="flex items-center gap-6">
                        <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full">
                            <Bell className="w-6 h-6" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                        </button>
                        <div className="flex items-center gap-3 pl-6 border-l border-gray-200">
                            <div className="w-10 h-10 rounded-lg bg-black text-white flex items-center justify-center font-bold text-sm">
                                AD
                            </div>
                            <div className="hidden md:block">
                                <p className="text-sm font-bold text-gray-900 leading-none">Admin</p>
                                <p className="text-xs text-gray-500 mt-1">Administrator</p>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Main Content */}
                <main className="max-w-[1400px] mx-auto p-6 md:p-8 lg:p-10">

                    {/* Header Actions Row */}
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
                        <button
                            onClick={() => navigate('/wp-admin/dashboard')}
                            className="flex items-center gap-2 text-gray-500 hover:text-primary transition-colors font-medium"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            <span>Back to Blogs</span>
                        </button>

                        <div className="flex items-center gap-3 self-end md:self-auto">
                            <span className="px-4 py-2 bg-[#FEF3C7] text-[#D97706] rounded-lg text-sm font-bold">
                                {status}
                            </span>
                            <button
                                onClick={() => handleSave(false)}
                                disabled={loading}
                                className="flex items-center gap-2 px-6 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 font-bold text-sm shadow-sm transition-all"
                            >
                                <Save className="w-4 h-4" />
                                Save Draft
                            </button>
                            <button
                                onClick={() => handleSave(true)}
                                disabled={loading}
                                className="flex items-center gap-2 px-8 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-bold text-sm shadow-sm transition-all shadow-orange-200"
                            >
                                <Send className="w-4 h-4" />
                                Publish
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Left Column: Editor */}
                        <div className="flex-1">
                            <textarea
                                placeholder="Enter blog title..."
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full text-4xl md:text-5xl font-extrabold placeholder-gray-300 border-none outline-none bg-transparent text-gray-900 mb-2 resize-none h-24 overflow-y-auto"
                            />

                            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 h-[600px] overflow-hidden relative">
                                <RichTextEditor
                                    content={content}
                                    onChange={setContent}
                                    onImageUpload={uploadImageToSupabase}
                                />
                            </div>
                        </div>

                        {/* Right Column: Sidebar */}
                        <div className="w-full lg:w-[380px] flex-shrink-0 space-y-6">

                            {/* Publish Settings Card */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                                <h3 className="text-base font-bold text-gray-900 mb-6">Publish Settings</h3>

                                <div className="space-y-5">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">SLUG (URL)</label>
                                        <div className="flex items-center px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-500 text-sm">
                                            <span className="mr-2 opacity-40 transform rotate-45">🔗</span>
                                            <input
                                                type="text"
                                                value={slug}
                                                onChange={(e) => setSlug(e.target.value)}
                                                className="bg-transparent border-none outline-none w-full text-gray-700 placeholder-gray-400"
                                                placeholder="auto-generated"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Status</label>
                                        <div className="relative">
                                            <select
                                                value={status}
                                                onChange={(e) => setStatus(e.target.value)}
                                                className="w-full appearance-none bg-white border border-gray-200 hover:border-primary/50 px-4 py-3 rounded-xl text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all cursor-pointer shadow-sm"
                                            >
                                                <option value="Draft">Draft</option>
                                                <option value="Published">Published</option>
                                                <option value="Archived">Archived</option>
                                            </select>
                                            <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-500">
                                                <ChevronDown className="w-4 h-4" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Featured Image Card */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-300">
                                <h3 className="text-base font-bold text-gray-900 mb-6 flex items-center gap-2">
                                    <span className="w-1.5 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></span>
                                    Featured Image
                                </h3>

                                {imagePreview ? (
                                    <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-gray-200 group shadow-sm">
                                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                                        <button
                                            onClick={() => { setImagePreview(null); setFeaturedImage(null); }}
                                            className="absolute top-2 right-2 bg-white text-red-500 p-2 rounded-lg shadow-md hover:bg-red-50 hover:text-red-600 transition-all opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0"
                                        >
                                            <span className="sr-only">Remove</span>
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-2 gap-4">
                                        <label className="flex flex-col items-center justify-center py-8 border-2 border-dashed border-blue-100 bg-blue-50/30 rounded-2xl cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all group duration-300">
                                            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300 group-hover:bg-blue-200">
                                                <Upload className="w-5 h-5 text-blue-600" />
                                            </div>
                                            <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider group-hover:text-blue-600 transition-colors">Device</span>
                                            <input type="file" className="hidden" accept="image/*" onChange={handleFeaturedImageUpload} />
                                        </label>
                                        <button
                                            onClick={() => setShowMediaLibrary(true)}
                                            className="flex flex-col items-center justify-center py-8 border-2 border-dashed border-purple-100 bg-purple-50/30 rounded-2xl cursor-pointer hover:border-purple-400 hover:bg-purple-50 transition-all group duration-300"
                                        >
                                            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300 group-hover:bg-purple-200">
                                                <ImageIcon className="w-5 h-5 text-purple-600" />
                                            </div>
                                            <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider group-hover:text-purple-600 transition-colors">Media</span>
                                        </button>
                                    </div>
                                )}
                                {uploading && (
                                    <div className="mt-4 flex items-center justify-center gap-2 text-blue-600 bg-blue-50 py-2 rounded-lg animate-pulse">
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        <span className="text-xs font-bold">Uploading...</span>
                                    </div>
                                )}
                            </div>

                            {/* Publish Date Card */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-300">
                                <h3 className="text-base font-bold text-gray-900 mb-6 flex items-center gap-2">
                                    <span className="w-1.5 h-6 bg-gradient-to-b from-orange-400 to-red-500 rounded-full"></span>
                                    Publish Date
                                </h3>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Schedule Publication</label>
                                    <input
                                        type="date"
                                        className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl text-sm font-semibold text-gray-700 outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all font-inter hover:bg-white"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                {/* Closing for Main Content Area */}
            </div>

            {/* Media Library Modal */}
            {showMediaLibrary && (
                <MediaLibrary
                    onSelect={(url) => {
                        setFeaturedImage(url);
                        setImagePreview(url);
                        setShowMediaLibrary(false);
                    }}
                    onClose={() => setShowMediaLibrary(false)}
                />
            )}

            {/* Navigation Sidebar Drawer (Mobile) */}
            {/* Overlay */}
            {showSidebar && (
                <div
                    className="fixed inset-0 bg-black/50 z-[100] backdrop-blur-sm transition-opacity md:hidden"
                    onClick={() => setShowSidebar(false)}
                />
            )}

            {/* Sidebar Mobile */}
            <div className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white z-[101] transform transition-transform duration-300 shadow-2xl md:hidden ${showSidebar ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="p-6 flex items-center justify-between border-b border-gray-800">
                    <h2 className="text-xl font-bold tracking-wider">Aindhin Admin</h2>
                    <button
                        onClick={() => setShowSidebar(false)}
                        className="p-1 hover:bg-gray-800 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <nav className="flex-1 py-6 space-y-2">
                    <button onClick={() => navigate('/wp-admin/dashboard')} className="w-full flex items-center gap-3 px-6 py-3 hover:bg-gray-800 transition-colors text-gray-400 hover:text-white">
                        <LayoutDashboard className="w-5 h-5" />
                        <span className="font-medium">Dashboard</span>
                    </button>
                    <button onClick={() => navigate('/wp-admin/all-blogs')} className="w-full flex items-center gap-3 px-6 py-3 hover:bg-gray-800 transition-colors text-gray-400 hover:text-white">
                        <FileText className="w-5 h-5" />
                        <span className="font-medium">All Blogs</span>
                    </button>
                    <button onClick={() => navigate('/wp-admin/drafts')} className="w-full flex items-center gap-3 px-6 py-3 hover:bg-gray-800 transition-colors text-gray-400 hover:text-white">
                        <Clock className="w-5 h-5" />
                        <span className="font-medium">Drafts</span>
                    </button>
                    <button onClick={() => { navigate('/wp-admin/add-new'); setShowSidebar(false); }} className="w-full flex items-center gap-3 px-6 py-3 bg-primary/10 text-primary border-r-4 border-primary">
                        <PlusCircle className="w-5 h-5" />
                        <span className="font-medium">Add New</span>
                    </button>
                    <button onClick={() => navigate('/wp-admin/trash')} className="w-full flex items-center gap-3 px-6 py-3 hover:bg-gray-800 transition-colors text-gray-400 hover:text-white">
                        <Trash2 className="w-5 h-5" />
                        <span className="font-medium">Trash</span>
                    </button>
                </nav>

                <div className="p-6 border-t border-gray-800">
                    <button
                        onClick={async () => {
                            await supabase.auth.signOut();
                            navigate('/wp-admin');
                        }}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm font-bold transition-colors shadow-sm"
                    >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddBlogPost;
