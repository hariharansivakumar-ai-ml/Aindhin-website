
import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { supabase } from '../utils/supabaseClient';
import {
    ArrowLeft, Save, Send, Menu, Bell, ChevronDown, X,
    FileText, PlusCircle, Trash2, LogOut, LayoutDashboard,
    Loader2, Upload, Image as ImageIcon, Clock
} from 'lucide-react';

import RichTextEditor from '../components/RichTextEditor';
import MediaLibrary from '../components/MediaLibrary';

const AdminEditPost = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [slug, setSlug] = useState('');
    const [status, setStatus] = useState('Draft');
    const [featuredImage, setFeaturedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [showMediaLibrary, setShowMediaLibrary] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);
    const [userEmail, setUserEmail] = useState('Administrative User');

    useEffect(() => {
        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                navigate('/wp-admin');
            } else {
                setUserEmail(session.user.email);
            }
        };

        const fetchPost = async () => {
            try {
                const { data, error } = await supabase
                    .from('blogs')
                    .select('*')
                    .eq('id', id)
                    .single();

                if (error) throw error;
                if (data) {
                    setTitle(data.title || '');
                    setContent(data.description || '');
                    setSlug(data.slug || '');
                    setFeaturedImage(data.image_url || null);
                    setImagePreview(data.image_url || null);
                    // Status isn't strictly in DB yet but we can default or handle
                    setStatus('Published');
                }
            } catch (error) {
                console.error("Error fetching post:", error);
                alert("Error fetching post");
                navigate('/wp-admin/all-blogs');
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
        fetchPost();
    }, [id, navigate]);

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

            const objectUrl = URL.createObjectURL(file);
            setImagePreview(objectUrl);

            const publicUrl = await uploadImageToSupabase(file);
            setFeaturedImage(publicUrl);

        } catch (error) {
            console.error("Error uploading image:", error);
            alert(`Error uploading image: ${error.message}`);
        } finally {
            setUploading(false);
        }
    };

    const handleUpdate = async (isPublished = false) => {
        try {
            setSaving(true);
            const { error } = await supabase
                .from('blogs')
                .update({
                    title,
                    description: content,
                    slug,
                    status: isPublished ? 'Published' : status,
                    author: 'Aindhin',
                    image_url: featuredImage,
                })
                .eq('id', id);

            if (error) throw error;

            alert("Blog updated successfully!");
            // Stay on same page as requested for better UX
            if (isPublished) {
                setStatus('Published');
            }

        } catch (error) {
            console.error("Error updating blog:", error.message);
            alert("Error updating blog: " + error.message);
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-12 h-12 text-primary animate-spin" />
                    <p className="text-gray-500 font-medium">Loading Post...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F4F6F8] font-inter flex">
            {/* Sidebar - Desktop */}
            <aside className="w-72 bg-[#111827] text-white flex-col hidden md:flex sticky top-0 h-screen overflow-y-auto shrink-0">
                <div className="p-8">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                            <span className="font-bold text-xl">A</span>
                        </div>
                        <h2 className="text-xl font-bold tracking-tight">Admin<span className="text-primary">Panel</span></h2>
                    </div>

                    <nav className="space-y-1">
                        <p className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Main Menu</p>
                        <button onClick={() => navigate('/wp-admin/dashboard')} className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all group text-left">
                            <LayoutDashboard className="w-5 h-5 group-hover:text-gray-300" />
                            <span className="font-medium">Dashboard</span>
                        </button>
                        <button onClick={() => navigate('/wp-admin/all-blogs')} className="w-full flex items-center gap-3 px-4 py-3 bg-primary/10 text-primary border-r-[3px] border-primary rounded-lg transition-all text-left">
                            <FileText className="w-5 h-5" />
                            <span className="font-medium">All Blogs</span>
                        </button>
                        <button onClick={() => navigate('/wp-admin/drafts')} className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all group text-left">
                            <Clock className="w-5 h-5 group-hover:text-gray-300" />
                            <span className="font-medium">Drafts</span>
                        </button>
                        <button onClick={() => navigate('/wp-admin/add-new')} className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all group text-left">
                            <PlusCircle className="w-5 h-5 group-hover:text-gray-300" />
                            <span className="font-medium">Add New Blog</span>
                        </button>
                        <button onClick={() => navigate('/wp-admin/trash')} className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all group text-left">
                            <Trash2 className="w-5 h-5 group-hover:text-gray-300" />
                            <span className="font-medium">Trash</span>
                        </button>
                    </nav>
                </div>

                <div className="mt-auto p-6 border-t border-gray-800">
                    <button onClick={() => supabase.auth.signOut().then(() => navigate('/wp-admin'))} className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-red-500/30 text-red-400 rounded-xl hover:bg-red-500/10 transition-all font-medium text-sm">
                        <LogOut className="w-4 h-4" />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
                <nav className="bg-white px-6 py-3 flex items-center justify-between shadow-sm sticky top-0 z-50">
                    <button onClick={() => setShowSidebar(true)} className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors md:hidden">
                        <Menu className="w-6 h-6" />
                    </button>
                    <div className="flex items-center gap-6">
                        <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full">
                            <Bell className="w-6 h-6" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                        </button>
                    </div>
                </nav>

                <main className="max-w-[1400px] mx-auto p-6 md:p-8 lg:p-10">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
                        <button onClick={() => navigate('/wp-admin/all-blogs')} className="flex items-center gap-2 text-gray-500 hover:text-primary transition-colors font-medium">
                            <ArrowLeft className="w-5 h-5" />
                            <span>Back to List</span>
                        </button>

                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => handleUpdate(false)}
                                disabled={saving}
                                className="flex items-center gap-2 px-6 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 font-bold text-sm shadow-sm transition-all"
                            >
                                <Save className="w-4 h-4" />
                                {saving ? 'Saving...' : 'Update'}
                            </button>
                            <button
                                onClick={() => handleUpdate(true)}
                                disabled={saving}
                                className="flex items-center gap-2 px-8 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-bold text-sm shadow-sm transition-all"
                            >
                                <Send className="w-4 h-4" />
                                Update & View
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-8">
                        <div className="flex-1">
                            <textarea
                                placeholder="Blog Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full text-4xl md:text-5xl font-extrabold placeholder-gray-300 border-none outline-none bg-transparent text-gray-900 mb-2 resize-none h-24"
                            />

                            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 h-[600px] overflow-hidden">
                                <RichTextEditor
                                    content={content}
                                    onChange={setContent}
                                    onImageUpload={uploadImageToSupabase}
                                />
                            </div>
                        </div>

                        <div className="w-full lg:w-[380px] space-y-6">
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                                <h3 className="text-base font-bold text-gray-900 mb-6">Settings</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2 tracking-wider">SLUG</label>
                                        <div className="flex items-center px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-500 text-sm">
                                            <input
                                                type="text"
                                                value={slug}
                                                onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-'))}
                                                className="bg-transparent border-none outline-none w-full text-gray-700"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                                <h3 className="text-base font-bold text-gray-900 mb-6 flex items-center gap-2">
                                    <span className="w-1.5 h-6 bg-blue-500 rounded-full"></span>
                                    Featured Image
                                </h3>

                                {imagePreview ? (
                                    <div className="relative rounded-xl overflow-hidden border border-gray-200">
                                        <img src={imagePreview} alt="Preview" className="w-full h-auto" />
                                        <button
                                            onClick={() => { setImagePreview(null); setFeaturedImage(null); }}
                                            className="absolute top-2 right-2 bg-white text-red-500 p-2 rounded-lg shadow-md"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-2 gap-4">
                                        <label className="flex flex-col items-center justify-center py-8 border-2 border-dashed border-blue-100 bg-blue-50/30 rounded-2xl cursor-pointer hover:bg-blue-50 transition-all">
                                            <Upload className="w-5 h-5 text-blue-600 mb-2" />
                                            <span className="text-[10px] font-bold text-blue-400">UPLOAD</span>
                                            <input type="file" className="hidden" accept="image/*" onChange={handleFeaturedImageUpload} />
                                        </label>
                                        <button
                                            onClick={() => setShowMediaLibrary(true)}
                                            className="flex flex-col items-center justify-center py-8 border-2 border-dashed border-purple-100 bg-purple-50/30 rounded-2xl hover:bg-purple-50 transition-all"
                                        >
                                            <ImageIcon className="w-5 h-5 text-purple-600 mb-2" />
                                            <span className="text-[10px] font-bold text-purple-400">MEDIA</span>
                                        </button>
                                    </div>
                                )}
                                {uploading && <div className="mt-4 text-center text-xs text-blue-500 animate-pulse">Uploading Image...</div>}
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            {/* Media Library */}
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

            {/* Mobile Sidebar */}
            {showSidebar && (
                <div className="fixed inset-0 bg-black/50 z-[100] md:hidden" onClick={() => setShowSidebar(false)} />
            )}
            <div className={`fixed inset-y-0 left-0 w-64 bg-[#111827] z-[101] transform transition-transform duration-300 md:hidden ${showSidebar ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="p-8 border-b border-gray-800 flex justify-between items-center text-white">
                    <span className="font-bold">Aindhin Admin</span>
                    <X className="w-5 h-5 cursor-pointer" onClick={() => setShowSidebar(false)} />
                </div>
                <div className="p-4 space-y-2 text-gray-400">
                    <button onClick={() => navigate('/wp-admin/dashboard')} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 rounded-lg active:text-white">
                        <LayoutDashboard className="w-5 h-5" />
                        <span>Dashboard</span>
                    </button>
                    <button onClick={() => navigate('/wp-admin/all-blogs')} className="w-full flex items-center gap-3 px-4 py-3 bg-primary/10 text-primary rounded-lg">
                        <FileText className="w-5 h-5" />
                        <span>All Blogs</span>
                    </button>
                    <button onClick={() => navigate('/wp-admin/drafts')} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 rounded-lg active:text-white">
                        <Clock className="w-5 h-5" />
                        <span>Drafts</span>
                    </button>
                    <button onClick={() => navigate('/wp-admin/add-new')} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 rounded-lg active:text-white">
                        <PlusCircle className="w-5 h-5" />
                        <span>Add New Blog</span>
                    </button>
                    <button onClick={() => navigate('/wp-admin/trash')} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 rounded-lg active:text-white">
                        <Trash2 className="w-5 h-5" />
                        <span>Trash</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminEditPost;
