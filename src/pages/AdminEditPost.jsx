
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { apiGetSession, apiUpdateBlog, apiUploadImage, apiLogout, apiFetch } from '../utils/apiClient';
import {
    ArrowLeft, Save, Send, Bell, X,
    Loader2, Upload, Image as ImageIcon
} from 'lucide-react';
import AdminSidebar from '../components/AdminSidebar';
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
            const session = await apiGetSession();
            if (!session) {
                navigate('/wp-admin');
            } else {
                setUserEmail(session.user.email);
            }
        };

        const fetchPost = async () => {
            try {
                const res = await apiFetch(`/blogs/by-id/${id}`);
                if (!res.ok) throw new Error('Blog not found');
                const data = await res.json();
                setTitle(data.title || '');
                setContent(data.description || '');
                setSlug(data.slug || '');
                setFeaturedImage(data.image_url || null);
                setImagePreview(data.image_url || null);
                setStatus(data.status || 'Draft');
            } catch (error) {
                console.error('Error fetching post:', error);
                alert('Error fetching post');
                navigate('/wp-admin/all-blogs');
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
        fetchPost();
    }, [id, navigate]);

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
            alert(`Error uploading image: ${error.message}`);
        } finally {
            setUploading(false);
        }
    };

    const handleUpdate = async (isPublished = false) => {
        try {
            setSaving(true);
            await apiUpdateBlog(id, {
                title,
                description: content,
                slug,
                status: isPublished ? 'Published' : status,
                author: 'Aindhin',
                image_url: featuredImage,
            });
            alert('Blog updated successfully!');
            if (isPublished) setStatus('Published');
        } catch (error) {
            console.error('Error updating blog:', error.message);
            alert('Error updating blog: ' + error.message);
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
        <div className="flex h-screen bg-slate-50 font-inter overflow-hidden">
            <AdminSidebar userEmail={userEmail} />

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">

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
                        <div className="flex-1 min-w-0">
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
                                    onImageUpload={apiUploadImage}
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
        </div>
    );
};

export default AdminEditPost;
