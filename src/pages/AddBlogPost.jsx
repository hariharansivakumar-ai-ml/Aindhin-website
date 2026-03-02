
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiGetSession, apiSaveBlog, apiUploadImage, apiLogout } from '../utils/apiClient';
import { ArrowLeft, Upload, Image as ImageIcon, Save, Send, Bell, Loader2, X, ChevronDown } from 'lucide-react';
import AdminSidebar from '../components/AdminSidebar';
import RichTextEditor from '../components/RichTextEditor';
import MediaLibrary from '../components/MediaLibrary';

const AddBlogPost = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [slug, setSlug] = useState('');
    const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);
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
                const session = await apiGetSession();
                if (session?.user) setUserEmail(session.user.email);
            } catch (err) {
                console.error('Error fetching user:', err);
            }
        };
        getUser();
    }, []);

    // Robust slug generator
    const generateSlug = (text) => {
        return text
            .normalize('NFD')                    // decompose accented chars
            .replace(/[\u0300-\u036f]/g, '')     // strip diacritics
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')        // remove special chars except space & hyphen
            .trim()
            .replace(/[\s_]+/g, '-')             // spaces/underscores → hyphen
            .replace(/-+/g, '-')                 // collapse multiple hyphens
            .replace(/^-+|-+$/g, '');            // trim leading/trailing hyphens
    };

    // Auto-generate slug from title ONLY if user hasn't manually edited it
    useEffect(() => {
        if (!slugManuallyEdited && title) {
            setSlug(generateSlug(title));
        }
    }, [title, slugManuallyEdited]);

    const handleFeaturedImageUpload = async (e) => {
        try {
            setUploading(true);
            const file = e.target.files[0];
            if (!file) return;
            const objectUrl = URL.createObjectURL(file);
            setImagePreview(objectUrl);
            const publicUrl = await apiUploadImage(file);
            setFeaturedImage(publicUrl);
        } catch (error) {
            console.error('Error uploading image:', error);
            alert(`Error uploading image: ${error.message || 'Unknown error'}`);
        } finally {
            setUploading(false);
        }
    };

    const handleSave = async (isPublished = false) => {
        try {
            setLoading(true);
            const postData = {
                title,
                description: content,
                slug,
                status: isPublished ? 'Published' : 'Draft',
                image_url: featuredImage,
                author: 'Aindhin',
            };
            const saved = await apiSaveBlog(postData);
            if (saved?.id) setCurrentPostId(saved.id);
            alert(isPublished ? 'Blog published successfully!' : 'Draft saved successfully!');
            if (isPublished) setStatus('Published');
        } catch (error) {
            console.error('Error saving blog:', error.message);
            alert('Error saving blog: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex h-screen bg-slate-50 font-inter overflow-hidden">
            <AdminSidebar userEmail={userEmail} />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">

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
                        <div className="flex-1 min-w-0">
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
                                    onImageUpload={apiUploadImage}
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
                                        <div className="flex items-center justify-between mb-2">
                                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">SLUG (URL)</label>
                                            {slugManuallyEdited && (
                                                <button
                                                    type="button"
                                                    onClick={() => { setSlugManuallyEdited(false); if (title) setSlug(generateSlug(title)); }}
                                                    className="text-xs text-primary hover:underline font-semibold"
                                                >
                                                    ↺ Reset
                                                </button>
                                            )}
                                        </div>
                                        <div className="flex items-center px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-500 text-sm focus-within:border-primary/50 focus-within:bg-white transition-all">
                                            <span className="mr-2 text-gray-400 shrink-0">🔗</span>
                                            <input
                                                type="text"
                                                value={slug}
                                                onChange={(e) => {
                                                    const clean = e.target.value
                                                        .toLowerCase()
                                                        .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // strip diacritics
                                                        .replace(/[^a-z0-9-]/g, '-') // replace invalid chars with hyphens
                                                        .replace(/-+/g, '-') // collapse multiple hyphens
                                                        .replace(/^-+|-+$/g, ''); // trim leading/trailing hyphens
                                                    setSlug(clean);
                                                    setSlugManuallyEdited(true);
                                                }}
                                                className="bg-transparent border-none outline-none w-full text-gray-700 placeholder-gray-400 font-mono text-xs"
                                                placeholder="auto-generated-from-title"
                                            />
                                        </div>
                                        {slug && (
                                            <p className="text-xs text-gray-400 mt-1.5 truncate">
                                                <span className="text-gray-300">/blog/</span>
                                                <span className="text-primary font-medium">{slug}</span>
                                            </p>
                                        )}
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
        </div>
    );
};

export default AddBlogPost;
