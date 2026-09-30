import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiGetSession, apiSaveBlog, apiUploadImage } from '../utils/apiClient';
import { 
    ArrowLeft, Upload, Image as ImageIcon, Save, Send, Loader2, X, ChevronDown, 
    Tag, Globe, Sparkles, Eye, Clock, ListOrdered, HelpCircle, 
    Megaphone, UserCheck, Copy, Check, Calendar, AlertCircle,
    ArrowRightLeft, History, Share2, Compass
} from 'lucide-react';
import AdminSidebar from '../components/AdminSidebar';
import RichTextEditor from '../components/RichTextEditor';
import MediaLibrary from '../components/MediaLibrary';

const DEFAULT_CATEGORIES = [
    'Technology',
    'Career & Mentorship',
    'Engineering & Coding',
    'Tutorials & Guides',
    'Industry Insights',
    'Student Stories'
];

const AddBlogPost = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [slug, setSlug] = useState('');
    const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);
    const [oldSlugRedirect, setOldSlugRedirect] = useState('');
    const [showRedirectField, setShowRedirectField] = useState(false);
    const [lastSavedTime, setLastSavedTime] = useState(null);
    const [status, setStatus] = useState('Draft');
    const [scheduledPublishDate, setScheduledPublishDate] = useState('');
    const [customPublishDate, setCustomPublishDate] = useState('');
    const [featuredImage, setFeaturedImage] = useState('');
    const [imagePreview, setImagePreview] = useState('');
    const [imageAlt, setImageAlt] = useState('');
    const [currentPostId, setCurrentPostId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [showMediaLibrary, setShowMediaLibrary] = useState(false);
    const [userEmail, setUserEmail] = useState('Administrative User');

    // Categorization & Author
    const [category, setCategory] = useState('Technology');
    const [customCategory, setCustomCategory] = useState('');
    const [author, setAuthor] = useState('Aindhin');
    const [authorBio, setAuthorBio] = useState('Mentor and educator passionate about practical engineering and career development.');

    // SEO & Metadata States
    const [metaTitle, setMetaTitle] = useState('');
    const [metaDescription, setMetaDescription] = useState('');
    const [focusKeyword, setFocusKeyword] = useState('');
    const [primaryKeyword, setPrimaryKeyword] = useState('');
    const [tags, setTags] = useState([]);
    const [tagInput, setTagInput] = useState('');
    const [isNoindex, setIsNoindex] = useState(false);

    // Blog Structure / UX Options
    const [enableToc, setEnableToc] = useState(true);
    const [readingTime, setReadingTime] = useState('1 min read');
    
    // FAQ Section
    const [faqs, setFaqs] = useState([]);
    const [copiedSchema, setCopiedSchema] = useState(false);
    const [showFaqSchema, setShowFaqSchema] = useState(false);

    // Call-To-Action (CTA) Block
    const [showCta, setShowCta] = useState(false);
    const [ctaTitle, setCtaTitle] = useState('Ready to Accelerate Your Career?');
    const [ctaDesc, setCtaDesc] = useState('Join our industry-driven mentorship and training programs today.');
    const [ctaButtonText, setCtaButtonText] = useState('Explore Programs');
    const [ctaButtonUrl, setCtaButtonUrl] = useState('/courses');

    // Preview Modal
    const [showPreviewModal, setShowPreviewModal] = useState(false);

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

    // Calculate reading time automatically based on word count
    useEffect(() => {
        const text = content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
        const wordCount = text ? text.split(/\s+/).length : 0;
        const minutes = Math.max(1, Math.ceil(wordCount / 200));
        setReadingTime(`${minutes} min read`);
    }, [content]);

    // Robust slug generator
    const generateSlug = (text) => {
        return text
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .trim()
            .replace(/[\s_]+/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-+|-+$/g, '');
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

    // FAQ Handlers
    const addFaq = () => {
        setFaqs([...faqs, { question: '', answer: '' }]);
    };

    const updateFaq = (index, field, value) => {
        const updated = [...faqs];
        updated[index][field] = value;
        setFaqs(updated);
    };

    const removeFaq = (index) => {
        setFaqs(faqs.filter((_, i) => i !== index));
    };

    const generateFaqSchemaJson = () => {
        const validFaqs = faqs.filter(f => f.question.trim() && f.answer.trim());
        if (validFaqs.length === 0) return null;
        return {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": validFaqs.map(f => ({
                "@type": "Question",
                "name": f.question.trim(),
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": f.answer.trim()
                }
            }))
        };
    };

    const handleSave = async (isPublished = false) => {
        try {
            setLoading(true);
            const finalCategory = category === 'Other' ? customCategory : category;
            const postStatus = isPublished ? 'Published' : status;

            const postData = {
                title,
                description: content,
                slug,
                status: postStatus,
                image_url: featuredImage,
                image_alt: imageAlt,
                author: author || 'Aindhin',
                author_bio: authorBio,
                category: finalCategory,
                meta_title: metaTitle || title,
                meta_description: metaDescription,
                tags: tags.join(','),
                focus_keyword: focusKeyword,
                primary_keyword: primaryKeyword || focusKeyword,
                enable_toc: enableToc,
                is_noindex: isNoindex,
                reading_time: readingTime,
                scheduled_publish_date: postStatus === 'Scheduled' ? scheduledPublishDate : null,
                date: customPublishDate || new Date().toISOString(),
                faqs: faqs.filter(f => f.question.trim() && f.answer.trim()),
                cta_title: showCta ? ctaTitle : null,
                cta_desc: showCta ? ctaDesc : null,
                cta_button_text: showCta ? ctaButtonText : null,
                cta_button_url: showCta ? ctaButtonUrl : null,
            };

            if (oldSlugRedirect.trim()) {
                postData.old_slug = oldSlugRedirect.trim();
            }

            const saved = await apiSaveBlog(postData);
            if (saved?.id) {
                setCurrentPostId(saved.id);
                setLastSavedTime(new Date());
            }
            alert(postStatus === 'Published' ? 'Blog published successfully!' : (postStatus === 'Scheduled' ? 'Blog scheduled successfully!' : 'Draft saved successfully!'));
            if (isPublished) setStatus('Published');
        } catch (error) {
            console.error('Error saving blog:', error.message);
            alert('Error saving blog: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const calculateSEOScore = () => {
        const kw = (focusKeyword || primaryKeyword || '').toLowerCase();
        if (!kw) return 0;
        let score = 0;
        const t = title.toLowerCase();
        const mt = metaTitle.toLowerCase();
        const md = metaDescription.toLowerCase();
        const s = slug.toLowerCase();
        const c = content.toLowerCase();

        if (title.length >= 40 && title.length <= 70) score += 15;
        else if (title.length > 20) score += 5;

        if (metaTitle.length >= 40 && metaTitle.length <= 65) score += 10;
        if (metaDescription.length >= 130 && metaDescription.length <= 165) score += 15;
        else if (metaDescription.length > 80) score += 5;

        if (t.includes(kw)) score += 15;
        if (mt.includes(kw)) score += 10;
        if (md.includes(kw)) score += 10;
        if (s.includes(kw.replace(/\s+/g, '-'))) score += 15;
        if (c.includes(kw)) score += 10;
        if (imageAlt.trim().length > 0) score += 10;

        return Math.min(score, 100);
    };

    return (
        <div className="flex h-screen bg-slate-50 font-inter overflow-hidden">
            <AdminSidebar userEmail={userEmail} />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">

                <main className="max-w-[1440px] mx-auto p-4 md:p-6 lg:p-8 w-full">

                    {/* Header Actions Row */}
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => navigate('/wp-admin/dashboard')}
                                className="flex items-center gap-2 text-gray-500 hover:text-primary transition-colors font-medium text-sm"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                <span>Back to Blogs</span>
                            </button>
                            {lastSavedTime && (
                                <span className="text-[11px] text-gray-400 flex items-center gap-1.5 ml-2 bg-white border border-gray-200/80 px-2.5 py-1 rounded-md shadow-xs">
                                    <History className="w-3.5 h-3.5 text-emerald-600" />
                                    Last saved: {lastSavedTime.toLocaleTimeString()}
                                </span>
                            )}
                        </div>

                        <div className="flex flex-wrap items-center gap-3">
                            <span className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider ${
                                status === 'Published' ? 'bg-emerald-100 text-emerald-700' :
                                status === 'Scheduled' ? 'bg-indigo-100 text-indigo-700' :
                                'bg-amber-100 text-amber-700'
                            }`}>
                                {status}
                            </span>

                            <button
                                type="button"
                                onClick={() => setShowPreviewModal(true)}
                                className="flex items-center gap-1.5 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 font-bold text-xs shadow-sm transition-all"
                            >
                                <Eye className="w-3.5 h-3.5 text-blue-600" />
                                Preview
                            </button>

                            <button
                                onClick={() => handleSave(false)}
                                disabled={loading}
                                className="flex items-center gap-1.5 px-5 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 font-bold text-xs shadow-sm transition-all"
                            >
                                <Save className="w-3.5 h-3.5" />
                                Save Draft
                            </button>
                            <button
                                onClick={() => handleSave(true)}
                                disabled={loading}
                                className="flex items-center gap-1.5 px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-bold text-xs shadow-sm transition-all shadow-orange-200"
                            >
                                <Send className="w-3.5 h-3.5" />
                                Publish Now
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-6">
                        {/* Left Column: Editor & Body Modules */}
                        <div className="flex-1 min-w-0 space-y-6">
                            {/* Title input */}
                            <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Article Title</label>
                                <textarea
                                    placeholder="Enter captivating article title..."
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    rows={2}
                                    className="w-full text-2xl md:text-3xl font-extrabold placeholder-gray-300 border-none outline-none bg-transparent text-gray-900 resize-none"
                                />
                            </div>

                            {/* Rich Text Editor */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 min-h-[950px] lg:min-h-[1050px] overflow-visible relative z-10 flex flex-col">
                                <RichTextEditor
                                    content={content}
                                    onChange={setContent}
                                    onImageUpload={apiUploadImage}
                                />
                            </div>

                            {/* FAQ Section Builder (Compact & Clean) */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5">
                                <div className="flex items-center justify-between mb-3.5">
                                    <div className="flex items-center gap-2">
                                        <HelpCircle className="w-4 h-4 text-indigo-500" />
                                        <div>
                                            <h3 className="text-sm font-bold text-gray-900">FAQ Section</h3>
                                            <p className="text-[11px] text-gray-400">Add compact question & answer pairs with automatic FAQ schema.</p>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={addFaq}
                                        className="px-2.5 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded-lg text-xs font-bold transition-colors"
                                    >
                                        + Add FAQ
                                    </button>
                                </div>

                                {faqs.length === 0 ? (
                                    <div className="text-center py-5 border-2 border-dashed border-gray-100 rounded-xl">
                                        <p className="text-xs text-gray-400">No FAQs added. Click "+ Add FAQ" to include an interactive accordion block.</p>
                                    </div>
                                ) : (
                                    <div className="space-y-2.5">
                                        {faqs.map((faq, idx) => (
                                            <div key={idx} className="p-3 bg-slate-50/80 border border-gray-200/80 rounded-xl relative group transition-all hover:border-indigo-200">
                                                <button
                                                    type="button"
                                                    onClick={() => removeFaq(idx)}
                                                    className="absolute top-2.5 right-2.5 text-gray-400 hover:text-red-500 p-0.5 rounded transition-colors"
                                                    title="Remove FAQ"
                                                >
                                                    <X className="w-3.5 h-3.5" />
                                                </button>
                                                <div className="space-y-1.5 pr-6">
                                                    <input
                                                        type="text"
                                                        placeholder={`Q${idx + 1}: Question (e.g. What skills will I learn?)`}
                                                        value={faq.question}
                                                        onChange={(e) => updateFaq(idx, 'question', e.target.value)}
                                                        className="w-full text-xs font-semibold text-gray-800 bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-100"
                                                    />
                                                    <textarea
                                                        placeholder="Concise answer..."
                                                        rows={2}
                                                        value={faq.answer}
                                                        onChange={(e) => updateFaq(idx, 'answer', e.target.value)}
                                                        className="w-full text-xs text-gray-600 bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-100 resize-none"
                                                    />
                                                </div>
                                            </div>
                                        ))}

                                        {/* FAQ Schema Preview (Collapsible) */}
                                        <div className="mt-3 pt-3 border-t border-gray-100">
                                            <div className="flex items-center justify-between">
                                                <button
                                                    type="button"
                                                    onClick={() => setShowFaqSchema(!showFaqSchema)}
                                                    className="text-[11px] font-bold text-emerald-600 flex items-center gap-1.5 hover:underline"
                                                >
                                                    <Sparkles className="w-3.5 h-3.5" />
                                                    <span>{showFaqSchema ? 'Hide' : 'View'} FAQ Schema (JSON-LD)</span>
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const json = generateFaqSchemaJson();
                                                        if (json) {
                                                            navigator.clipboard.writeText(JSON.stringify(json, null, 2));
                                                            setCopiedSchema(true);
                                                            setTimeout(() => setCopiedSchema(false), 2000);
                                                        }
                                                    }}
                                                    className="text-xs text-gray-500 hover:text-gray-800 flex items-center gap-1 font-medium"
                                                >
                                                    {copiedSchema ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                                                    {copiedSchema ? 'Copied' : 'Copy Code'}
                                                </button>
                                            </div>
                                            {showFaqSchema && (
                                                <pre className="mt-2 text-[10px] bg-slate-900 text-slate-200 p-2.5 rounded-lg overflow-x-auto max-h-32">
                                                    {JSON.stringify(generateFaqSchemaJson(), null, 2)}
                                                </pre>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Call to Action (CTA) Block */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-2">
                                        <Megaphone className="w-5 h-5 text-amber-500" />
                                        <div>
                                            <h3 className="text-sm font-bold text-gray-900">Call-To-Action (CTA) Banner</h3>
                                            <p className="text-xs text-gray-400">Display an attractive banner at the end of the post to drive conversions.</p>
                                        </div>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={showCta}
                                            onChange={(e) => setShowCta(e.target.checked)}
                                            className="sr-only peer"
                                        />
                                        <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-500"></div>
                                    </label>
                                </div>

                                {showCta && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-100">
                                        <div>
                                            <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1">CTA Headline</label>
                                            <input
                                                type="text"
                                                value={ctaTitle}
                                                onChange={(e) => setCtaTitle(e.target.value)}
                                                className="w-full text-xs bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-amber-400 focus:bg-white"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1">Button Text</label>
                                            <input
                                                type="text"
                                                value={ctaButtonText}
                                                onChange={(e) => setCtaButtonText(e.target.value)}
                                                className="w-full text-xs bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-amber-400 focus:bg-white"
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1">CTA Description</label>
                                            <input
                                                type="text"
                                                value={ctaDesc}
                                                onChange={(e) => setCtaDesc(e.target.value)}
                                                className="w-full text-xs bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-amber-400 focus:bg-white"
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1">Button Destination URL</label>
                                            <input
                                                type="text"
                                                value={ctaButtonUrl}
                                                onChange={(e) => setCtaButtonUrl(e.target.value)}
                                                placeholder="/courses or https://..."
                                                className="w-full text-xs bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-amber-400 focus:bg-white font-mono"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right Column: Sidebar Metadata Cards */}
                        <div className="w-full lg:w-[380px] flex-shrink-0 space-y-6">

                            {/* Publishing & Scheduling Settings */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                                <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-orange-500" />
                                    Publishing & Scheduling
                                </h3>

                                <div className="space-y-4">
                                    {/* Slug */}
                                    <div>
                                        <div className="flex items-center justify-between mb-1.5">
                                            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">URL Slug</label>
                                            {slugManuallyEdited && (
                                                <button
                                                    type="button"
                                                    onClick={() => { setSlugManuallyEdited(false); if (title) setSlug(generateSlug(title)); }}
                                                    className="text-[11px] text-primary hover:underline font-semibold"
                                                >
                                                    ↺ Reset
                                                </button>
                                            )}
                                        </div>
                                        <div className="flex items-center px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-gray-600 text-xs focus-within:border-primary/50 focus-within:bg-white">
                                            <span className="mr-1.5 text-gray-400">🔗</span>
                                            <input
                                                type="text"
                                                value={slug}
                                                onChange={(e) => {
                                                    const clean = e.target.value
                                                        .toLowerCase()
                                                        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
                                                        .replace(/[^a-z0-9-]/g, '-')
                                                        .replace(/-+/g, '-')
                                                        .replace(/^-+|-+$/g, '');
                                                    setSlug(clean);
                                                    setSlugManuallyEdited(true);
                                                }}
                                                className="bg-transparent border-none outline-none w-full text-gray-700 font-mono text-xs"
                                                placeholder="my-post-url"
                                            />
                                        </div>
                                        {slug && (
                                            <p className="text-[11px] text-gray-400 mt-1 truncate">
                                                /blog/<span className="text-primary font-medium">{slug}</span>
                                            </p>
                                        )}
                                    </div>

                                    {/* 301 Permanent Redirect (Optional for Migration) */}
                                    <div className="pt-2 border-t border-gray-100">
                                        <div className="flex items-center justify-between mb-1.5">
                                            <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                                                <ArrowRightLeft className="w-3.5 h-3.5 text-amber-500" />
                                                301 Redirect (Optional)
                                            </label>
                                            <button
                                                type="button"
                                                onClick={() => setShowRedirectField(!showRedirectField)}
                                                className="text-[11px] text-amber-600 hover:text-amber-700 font-semibold"
                                            >
                                                {showRedirectField ? 'Hide' : '+ Add 301 Redirect'}
                                            </button>
                                        </div>
                                        {showRedirectField && (
                                            <div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-xl space-y-2">
                                                <p className="text-[10px] text-amber-800 leading-tight">
                                                    Enter an old URL slug to automatically forward visitors to this post with a permanent 301 redirect.
                                                </p>
                                                <div className="flex items-center px-3 py-1.5 bg-white border border-amber-300 rounded-lg text-xs">
                                                    <span className="text-gray-400 mr-1 font-mono text-[11px]">/blog/</span>
                                                    <input
                                                        type="text"
                                                        value={oldSlugRedirect}
                                                        onChange={(e) => {
                                                            const clean = e.target.value
                                                                .toLowerCase()
                                                                .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
                                                                .replace(/[^a-z0-9-]/g, '-')
                                                                .replace(/-+/g, '-')
                                                                .replace(/^-+|-+$/g, '');
                                                            setOldSlugRedirect(clean);
                                                        }}
                                                        placeholder="old-article-slug"
                                                        className="w-full bg-transparent border-none outline-none font-mono text-xs text-gray-800"
                                                    />
                                                </div>
                                                {oldSlugRedirect && (
                                                    <p className="text-[10px] text-amber-700 font-medium">
                                                        ↳ <span className="font-mono">/blog/{oldSlugRedirect}</span> ➔ <span className="font-mono">/blog/{slug || 'new-slug'}</span>
                                                    </p>
                                                )}
                                            </div>
                                        )}
                                    </div>

                                    {/* Status */}
                                    <div>
                                        <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Publication Status</label>
                                        <div className="relative">
                                            <select
                                                value={status}
                                                onChange={(e) => setStatus(e.target.value)}
                                                className="w-full appearance-none bg-white border border-gray-200 px-3 py-2.5 rounded-xl text-xs font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/10 cursor-pointer"
                                            >
                                                <option value="Draft">Draft</option>
                                                <option value="Published">Published</option>
                                                <option value="Scheduled">Scheduled</option>
                                                <option value="Archived">Archived</option>
                                            </select>
                                            <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-gray-500">
                                                <ChevronDown className="w-3.5 h-3.5" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Schedule Date-Time Picker */}
                                    {status === 'Scheduled' && (
                                        <div className="p-3 bg-indigo-50/60 rounded-xl border border-indigo-100">
                                            <label className="block text-[11px] font-bold text-indigo-700 uppercase mb-1">
                                                Auto-Publish Date & Time
                                            </label>
                                            <input
                                                type="datetime-local"
                                                value={scheduledPublishDate}
                                                onChange={(e) => setScheduledPublishDate(e.target.value)}
                                                className="w-full bg-white border border-indigo-200 rounded-lg px-3 py-2 text-xs text-gray-800 outline-none"
                                            />
                                            <p className="text-[10px] text-indigo-500 mt-1">Post will automatically switch to Published at this time.</p>
                                        </div>
                                    )}

                                    {/* Custom Publish Date Override */}
                                    <div>
                                        <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Display Publish Date</label>
                                        <input
                                            type="date"
                                            value={customPublishDate}
                                            onChange={(e) => setCustomPublishDate(e.target.value)}
                                            className="w-full bg-gray-50 border border-gray-200 px-3 py-2 rounded-xl text-xs font-medium text-gray-700 outline-none"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Featured Image */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                                <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <ImageIcon className="w-4 h-4 text-blue-500" />
                                    Featured Image
                                </h3>

                                {imagePreview ? (
                                    <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-gray-200 group">
                                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                        <button
                                            type="button"
                                            onClick={() => { setFeaturedImage(''); setImagePreview(''); }}
                                            className="absolute top-2 right-2 bg-white/90 text-red-500 p-1.5 rounded-lg shadow hover:bg-white"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-2 gap-3">
                                        <label className="flex flex-col items-center justify-center py-6 border-2 border-dashed border-blue-100 bg-blue-50/30 rounded-xl cursor-pointer hover:border-blue-400 transition-all">
                                            <Upload className="w-5 h-5 text-blue-500 mb-1" />
                                            <span className="text-[10px] font-bold text-blue-600 uppercase">Upload</span>
                                            <input type="file" className="hidden" accept="image/*" onChange={handleFeaturedImageUpload} />
                                        </label>
                                        <button
                                            type="button"
                                            onClick={() => setShowMediaLibrary(true)}
                                            className="flex flex-col items-center justify-center py-6 border-2 border-dashed border-purple-100 bg-purple-50/30 rounded-xl hover:border-purple-400 transition-all"
                                        >
                                            <ImageIcon className="w-5 h-5 text-purple-500 mb-1" />
                                            <span className="text-[10px] font-bold text-purple-600 uppercase">Library</span>
                                        </button>
                                    </div>
                                )}

                                <div className="mt-3">
                                    <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Image Alt Text (SEO)</label>
                                    <input
                                        type="text"
                                        placeholder="Describe the image..."
                                        value={imageAlt}
                                        onChange={(e) => setImageAlt(e.target.value)}
                                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 text-xs outline-none focus:bg-white"
                                    />
                                </div>
                                {uploading && (
                                    <div className="mt-2 flex items-center justify-center gap-1.5 text-blue-600 bg-blue-50 py-1.5 rounded-lg">
                                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                        <span className="text-xs font-bold">Uploading...</span>
                                    </div>
                                )}
                            </div>

                            {/* Blog Structure & UX Settings */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                                <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <ListOrdered className="w-4 h-4 text-emerald-500" />
                                    Blog Structure & UX
                                </h3>

                                <div className="space-y-4">
                                    {/* TOC Toggle */}
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <label className="text-xs font-bold text-gray-800">Table of Contents</label>
                                            <p className="text-[11px] text-gray-400">Generate from H2 & H3 headings</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={enableToc}
                                                onChange={(e) => setEnableToc(e.target.checked)}
                                                className="sr-only peer"
                                            />
                                            <div className="w-8 h-4 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-emerald-500"></div>
                                        </label>
                                    </div>

                                    {/* Reading time */}
                                    <div>
                                        <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1">Estimated Reading Time</label>
                                        <div className="flex items-center px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg">
                                            <Clock className="w-3.5 h-3.5 text-gray-400 mr-2" />
                                            <input
                                                type="text"
                                                value={readingTime}
                                                onChange={(e) => setReadingTime(e.target.value)}
                                                className="bg-transparent border-none outline-none text-xs text-gray-700 w-full font-medium"
                                                placeholder="e.g. 5 min read"
                                            />
                                        </div>
                                    </div>

                                    {/* Built-in Reader UX Features */}
                                    <div className="pt-3 border-t border-gray-100 space-y-2">
                                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">Active Publishing Modules</label>
                                        <div className="grid grid-cols-2 gap-2 text-[11px]">
                                            <div className="p-2 bg-blue-50/60 border border-blue-100 rounded-lg flex items-center gap-1.5 text-blue-700">
                                                <Compass className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                                                <span className="truncate">Related Posts</span>
                                            </div>
                                            <div className="p-2 bg-indigo-50/60 border border-indigo-100 rounded-lg flex items-center gap-1.5 text-indigo-700">
                                                <ArrowRightLeft className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                                                <span className="truncate">Prev/Next Nav</span>
                                            </div>
                                            <div className="p-2 bg-emerald-50/60 border border-emerald-100 rounded-lg flex items-center gap-1.5 text-emerald-700">
                                                <Share2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                                                <span className="truncate">Social Share</span>
                                            </div>
                                            <div className="p-2 bg-amber-50/60 border border-amber-100 rounded-lg flex items-center gap-1.5 text-amber-700">
                                                <Megaphone className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                                                <span className="truncate">{showCta ? 'CTA Active' : 'CTA Optional'}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Category & Tags Card */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                                <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <Tag className="w-4 h-4 text-indigo-500" />
                                    Category & Tags
                                </h3>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1.5">Category</label>
                                        <select
                                            value={category}
                                            onChange={(e) => setCategory(e.target.value)}
                                            className="w-full bg-gray-50 border border-gray-200 px-3 py-2 rounded-xl text-xs font-semibold text-gray-800 outline-none"
                                        >
                                            {DEFAULT_CATEGORIES.map(c => (
                                                <option key={c} value={c}>{c}</option>
                                            ))}
                                            <option value="Other">+ Custom Category</option>
                                        </select>
                                        {category === 'Other' && (
                                            <input
                                                type="text"
                                                placeholder="Enter category name..."
                                                value={customCategory}
                                                onChange={(e) => setCustomCategory(e.target.value)}
                                                className="mt-2 w-full bg-white border border-gray-200 px-3 py-2 rounded-lg text-xs outline-none focus:border-indigo-400"
                                            />
                                        )}
                                    </div>

                                    {/* Tags */}
                                    <div>
                                        <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1.5">Tags</label>
                                        <div className="flex flex-wrap gap-1.5 mb-2">
                                            {tags.map((tag, idx) => (
                                                <span key={idx} className="flex items-center gap-1 px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded-md text-[11px] font-medium border border-indigo-100">
                                                    {tag}
                                                    <button type="button" onClick={() => setTags(tags.filter((_, i) => i !== idx))}>
                                                        <X className="w-3 h-3 hover:text-indigo-800" />
                                                    </button>
                                                </span>
                                            ))}
                                        </div>
                                        <div className="flex gap-1.5">
                                            <input
                                                type="text"
                                                placeholder="Add tag and press Enter..."
                                                value={tagInput}
                                                onChange={(e) => setTagInput(e.target.value)}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter' && tagInput.trim()) {
                                                        e.preventDefault();
                                                        if (!tags.includes(tagInput.trim())) setTags([...tags, tagInput.trim()]);
                                                        setTagInput('');
                                                    }
                                                }}
                                                className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 text-xs outline-none focus:bg-white"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
                                                        setTags([...tags, tagInput.trim()]);
                                                        setTagInput('');
                                                    }
                                                }}
                                                className="px-2.5 py-1.5 bg-indigo-600 text-white rounded-lg text-xs font-bold"
                                            >
                                                Add
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Author & Bio Card */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                                <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <UserCheck className="w-4 h-4 text-cyan-600" />
                                    Author Information
                                </h3>
                                <div className="space-y-3">
                                    <div>
                                        <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1">Author Name</label>
                                        <input
                                            type="text"
                                            value={author}
                                            onChange={(e) => setAuthor(e.target.value)}
                                            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-800 outline-none focus:bg-white"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1">Author Bio</label>
                                        <textarea
                                            rows={2}
                                            value={authorBio}
                                            onChange={(e) => setAuthorBio(e.target.value)}
                                            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-700 outline-none focus:bg-white resize-none"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* SEO & Indexing Card */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                                        <Globe className="w-4 h-4 text-emerald-500" />
                                        SEO & Indexing
                                    </h3>
                                    {(focusKeyword || primaryKeyword) && (
                                        <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
                                            calculateSEOScore() >= 75 ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                                            calculateSEOScore() >= 50 ? 'bg-amber-50 text-amber-600 border-amber-100' :
                                            'bg-rose-50 text-rose-600 border-rose-100'
                                        }`}>
                                            Score: {calculateSEOScore()}%
                                        </span>
                                    )}
                                </div>

                                <div className="space-y-3.5">
                                    <div>
                                        <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Primary / Focus Keyword</label>
                                        <input
                                            type="text"
                                            placeholder="e.g. vlsi design course"
                                            value={focusKeyword}
                                            onChange={(e) => {
                                                setFocusKeyword(e.target.value);
                                                setPrimaryKeyword(e.target.value);
                                            }}
                                            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs outline-none focus:bg-white"
                                        />
                                    </div>

                                    <div>
                                        <div className="flex justify-between items-center mb-1">
                                            <label className="text-[10px] font-bold text-gray-400 uppercase">Meta Title</label>
                                            <span className="text-[10px] text-gray-400">{metaTitle.length}/60</span>
                                        </div>
                                        <input
                                            type="text"
                                            placeholder={title || 'Meta Title...'}
                                            value={metaTitle}
                                            onChange={(e) => setMetaTitle(e.target.value)}
                                            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs outline-none focus:bg-white"
                                        />
                                    </div>

                                    <div>
                                        <div className="flex justify-between items-center mb-1">
                                            <label className="text-[10px] font-bold text-gray-400 uppercase">Meta Description</label>
                                            <span className="text-[10px] text-gray-400">{metaDescription.length}/160</span>
                                        </div>
                                        <textarea
                                            rows={3}
                                            placeholder="Concise summary for search engines (140-160 chars recommended)..."
                                            value={metaDescription.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ')}
                                            onChange={(e) => setMetaDescription(e.target.value)}
                                            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs outline-none focus:bg-white resize-none"
                                        />
                                    </div>

                                    {/* Index / Noindex Setting */}
                                    <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                                        <div>
                                            <label className="text-xs font-bold text-gray-800">Search Engine Indexing</label>
                                            <p className="text-[10px] text-gray-400">
                                                {isNoindex ? 'Noindex (Hidden from Google & Sitemap)' : 'Index (Search engines can index this post)'}
                                            </p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => setIsNoindex(!isNoindex)}
                                            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                                                isNoindex ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'
                                            }`}
                                        >
                                            {isNoindex ? 'Noindex' : 'Index'}
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </main>
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

            {/* Live Preview Modal */}
            {showPreviewModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
                    <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl">
                        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between z-20">
                            <div>
                                <span className="text-[11px] font-bold text-orange-600 uppercase tracking-widest">Live Article Preview</span>
                                <h4 className="text-sm font-bold text-gray-800 truncate max-w-md">{title || 'Untitled Post'}</h4>
                            </div>
                            <button
                                type="button"
                                onClick={() => setShowPreviewModal(false)}
                                className="p-2 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-6 md:p-8 space-y-6">
                            {/* Featured Image */}
                            {featuredImage && (
                                <div className="rounded-xl overflow-hidden max-h-[350px]">
                                    <img src={featuredImage} alt={imageAlt || title} className="w-full h-full object-cover" />
                                </div>
                            )}

                            {/* Meta strip */}
                            <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400">
                                <span className="px-2.5 py-0.5 bg-blue-50 text-blue-600 rounded-full font-bold">{author || 'Aindhin'}</span>
                                <span>•</span>
                                <span>{category}</span>
                                <span>•</span>
                                <span>{readingTime}</span>
                            </div>

                            <h1 className="text-3xl font-extrabold text-gray-900 leading-tight">{title || 'Your Article Title'}</h1>

                            {/* Table of contents mockup */}
                            {enableToc && (
                                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                                    <p className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Table of Contents (Auto-Generated)</p>
                                    <ul className="text-xs text-primary space-y-1 list-disc list-inside">
                                        <li>Introduction</li>
                                        <li>Key Concepts & Strategy</li>
                                        <li>Summary & Next Steps</li>
                                    </ul>
                                </div>
                            )}

                            {/* Body content */}
                            <div className="prose max-w-none text-gray-800 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: content }} />

                            {/* FAQs */}
                            {faqs.filter(f => f.question && f.answer).length > 0 && (
                                <div className="pt-6 border-t border-gray-100">
                                    <h3 className="text-base font-bold text-gray-900 mb-3">Frequently Asked Questions</h3>
                                    <div className="space-y-2">
                                        {faqs.filter(f => f.question && f.answer).map((f, i) => (
                                            <details key={i} className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                                                <summary className="font-semibold text-xs text-gray-800 cursor-pointer">{f.question}</summary>
                                                <p className="mt-2 text-xs text-gray-600">{f.answer}</p>
                                            </details>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* CTA */}
                            {showCta && (
                                <div className="p-6 bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl text-white text-center">
                                    <h3 className="text-lg font-bold">{ctaTitle}</h3>
                                    <p className="text-xs text-white/90 mt-1 max-w-lg mx-auto">{ctaDesc}</p>
                                    <button className="mt-4 px-5 py-2 bg-white text-orange-600 text-xs font-bold rounded-lg shadow">
                                        {ctaButtonText}
                                    </button>
                                </div>
                            )}

                            {/* Author Card */}
                            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                                    {author.charAt(0)}
                                </div>
                                <div>
                                    <h4 className="text-xs font-bold text-gray-900">{author}</h4>
                                    <p className="text-[11px] text-gray-500">{authorBio}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddBlogPost;
