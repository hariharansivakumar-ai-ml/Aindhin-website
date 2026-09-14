
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { apiGetSession, apiUpdateBlog, apiUploadImage, apiLogout, apiFetch } from '../utils/apiClient';
import {
    ArrowLeft, Save, Send, Bell, X,
    Loader2, Upload, Image as ImageIcon,
    Tag, Globe, Sparkles
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
    const [imageAlt, setImageAlt] = useState('');
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [showMediaLibrary, setShowMediaLibrary] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);
    const [userEmail, setUserEmail] = useState('Administrative User');
    
    // SEO & Metadata States
    const [metaTitle, setMetaTitle] = useState('');
    const [metaDescription, setMetaDescription] = useState('');
    const [focusKeyword, setFocusKeyword] = useState('');
    const [tags, setTags] = useState([]);
    const [tagInput, setTagInput] = useState('');

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
                
                // Handle Image and Alt Text
                setFeaturedImage(data.image_url || data.image || '');
                let recoveredAlt = data.image_alt || '';
                
                // Content Recovery Logic
                let desc = data.description || '';
                let mainBody = '';

                if (desc) {
                    const trimmed = desc.trim();
                    if (trimmed.startsWith('{') && trimmed.endsWith('}')) {
                        try {
                            const parsed = JSON.parse(trimmed);
                            mainBody = data.content || data.article_body || data.body || parsed.metaDescription || '';
                            if (!recoveredAlt) recoveredAlt = parsed.featuredImageAlt || '';
                            
                            setMetaTitle(parsed.metaTitle || '');
                            setMetaDescription(parsed.metaDescription || '');
                            setFocusKeyword(parsed.focusedKeyword || '');
                            if (parsed.tags) setTags(Array.isArray(parsed.tags) ? parsed.tags : parsed.tags.split(','));
                        } catch (e) {
                            mainBody = desc;
                        }
                    } else {
                        mainBody = desc;
                    }
                }

                if (!mainBody) {
                    mainBody = data.content || data.article_body || data.body || '';
                }

                setImageAlt(recoveredAlt);
                setContent(mainBody);
                setSlug(data.slug || '');
                setImagePreview(data.image_url || data.image || null);
                setStatus(data.status || 'Draft');

                // Final priorities for direct API fields (overwriting legacy recovery if present)
                if (data.meta_title !== undefined) setMetaTitle(data.meta_title || '');
                if (data.meta_description !== undefined) setMetaDescription(data.meta_description || '');
                if (data.focus_keyword !== undefined) setFocusKeyword(data.focus_keyword || '');
                
                // Handle Tags (stored as string in DB, need array in UI)
                if (data.tags !== undefined) {
                    if (Array.isArray(data.tags)) {
                        setTags(data.tags);
                    } else if (typeof data.tags === 'string') {
                        setTags(data.tags.trim() ? data.tags.split(',').map(t => t.trim()).filter(Boolean) : []);
                    } else {
                        setTags([]);
                    }
                }
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
                image_alt: imageAlt,
                meta_title: metaTitle,
                meta_description: metaDescription,
                tags: Array.isArray(tags) ? tags.join(',') : tags,
                focus_keyword: focusKeyword,
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

    const calculateSEOScore = () => {
        if (!focusKeyword) return 0;
        let score = 0;
        const kw = focusKeyword.toLowerCase();
        const t = title.toLowerCase();
        const mt = metaTitle.toLowerCase();
        const md = metaDescription.toLowerCase();
        const s = slug.toLowerCase();
        const c = content.toLowerCase();

        // Title length (50-70 chars is ideal)
        if (title.length >= 50 && title.length <= 70) score += 15;
        else if (title.length > 30) score += 5;

        // Meta Title length
        if (metaTitle.length >= 50 && metaTitle.length <= 60) score += 10;

        // Meta Description length (150-160 chars)
        if (metaDescription.length >= 140 && metaDescription.length <= 165) score += 15;
        else if (metaDescription.length > 100) score += 5;

        // Keyword in Title
        if (t.includes(kw)) score += 15;

        // Keyword in Meta Title
        if (mt.includes(kw)) score += 10;

        // Keyword in Meta Description
        if (md.includes(kw)) score += 10;

        // Keyword in Slug
        if (s.includes(kw.replace(/\s+/g, '-'))) score += 10;

        // Keyword in Content
        if (c.includes(kw)) score += 10;

        // Image Alt Text
        if (imageAlt.trim().length > 0) score += 5;

        return Math.min(score, 100);
    };

    const getSEORecommendations = () => {
        if (!focusKeyword) return ["Enter a focus keyword to see recommendations."];
        const recs = [];
        const kw = focusKeyword.toLowerCase();

        if (title.length < 50) recs.push("Title is too short (aim for 50-70 chars).");
        if (!title.toLowerCase().includes(kw)) recs.push(`Include "${focusKeyword}" in the title.`);
        if (metaDescription.length < 140) recs.push("Meta description is too short (aim for 150-160 chars).");
        if (!metaDescription.toLowerCase().includes(kw)) recs.push(`Include "${focusKeyword}" in the meta description.`);
        if (!slug.includes(kw.replace(/\s+/g, '-'))) recs.push("Include the focus keyword in the slug.");
        if (imageAlt.trim().length === 0) recs.push("Add alt text to your featured image.");
        if (!content.toLowerCase().includes(kw)) recs.push("Include the focus keyword in your blog content.");

        return recs;
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

                            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 h-[800px] lg:h-[850px] min-h-[750px] overflow-visible relative z-10">
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
                                
                                <div className="mt-4">
                                    <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1.5 tracking-widest">Image Alt Text (SEO)</label>
                                    <input
                                        type="text"
                                        placeholder="Describe this image..."
                                        value={imageAlt}
                                        onChange={(e) => setImageAlt(e.target.value)}
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm outline-none focus:border-blue-400 focus:bg-white transition-all"
                                    />
                                </div>
                            </div>

                            {/* Tags Card */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                                <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <Tag className="w-4 h-4 text-indigo-500" />
                                    Tags
                                </h3>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {tags.map((tag, idx) => (
                                        <span key={idx} className="flex items-center gap-1 px-2.5 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-xs font-bold border border-indigo-100">
                                            {tag}
                                            <button onClick={() => setTags(tags.filter((_, i) => i !== idx))}>
                                                <X className="w-3 h-3 hover:text-indigo-800" />
                                            </button>
                                        </span>
                                    ))}
                                </div>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        placeholder="Add tag..."
                                        value={tagInput}
                                        onChange={(e) => setTagInput(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' && tagInput.trim()) {
                                                e.preventDefault();
                                                if (!tags.includes(tagInput.trim())) setTags([...tags, tagInput.trim()]);
                                                setTagInput('');
                                            }
                                        }}
                                        className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm outline-none focus:border-indigo-400 focus:bg-white transition-all"
                                    />
                                    <button
                                        onClick={() => {
                                            if (tagInput.trim() && !tags.includes(tagInput.trim())) {
                                                setTags([...tags, tagInput.trim()]);
                                                setTagInput('');
                                            }
                                        }}
                                        className="p-2 bg-indigo-600 text-white rounded-xl"
                                    >
                                        <Sparkles className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            {/* SEO Card */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                                        <Globe className="w-4 h-4 text-emerald-500" />
                                        SEO Settings
                                    </h3>
                                    {focusKeyword && (
                                        <div className={`px-3 py-1 rounded-full text-xs font-bold border ${
                                            (() => {
                                                const score = calculateSEOScore();
                                                if (score >= 80) return 'bg-emerald-50 text-emerald-600 border-emerald-100';
                                                if (score >= 50) return 'bg-amber-50 text-amber-600 border-amber-100';
                                                return 'bg-rose-50 text-rose-600 border-rose-100';
                                            })()
                                        }`}>
                                            Score: {calculateSEOScore()}%
                                        </div>
                                    )}
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1.5 tracking-widest">Focus Keyword</label>
                                        <input
                                            type="text"
                                            placeholder="e.g. professional mentorship"
                                            value={focusKeyword}
                                            onChange={(e) => setFocusKeyword(e.target.value)}
                                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-emerald-400 focus:bg-white transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1.5 tracking-widest">Meta Title</label>
                                        <input
                                            type="text"
                                            value={metaTitle}
                                            onChange={(e) => setMetaTitle(e.target.value)}
                                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-emerald-400 focus:bg-white transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1.5 tracking-widest">Meta Description</label>
                                        <textarea
                                            rows={4}
                                            value={metaDescription.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ')}
                                            onChange={(e) => setMetaDescription(e.target.value)}
                                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-emerald-400 focus:bg-white transition-all resize-none text-gray-600 leading-relaxed"
                                        />
                                        <p className="mt-2 text-[10px] text-gray-400">Character count: {metaDescription.length} (Recommended: 150-160)</p>
                                    </div>
                                </div>
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
