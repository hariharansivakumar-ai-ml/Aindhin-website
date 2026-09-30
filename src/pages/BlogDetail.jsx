import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
    User, Tag, Calendar, ArrowLeft, Search, MessageSquare, BookOpen, 
    Clock, ListOrdered, Share2, ChevronRight, ChevronLeft, Check, 
    Copy, ExternalLink, HelpCircle, Megaphone, ArrowUpRight, History
} from 'lucide-react';
import {
    apiGetBlogBySlug, apiGetPublicBlogs, apiSubmitComment, apiGetApprovedComments
} from '../utils/apiClient';

const processBlogContent = (html) => {
    if (!html) return { processedHtml: '', headings: [] };
    
    // Replace non-breaking spaces
    let cleanHtml = html.replace(/&nbsp;|\u00A0/g, ' ');
    const headings = [];

    try {
        const parser = new DOMParser();
        const doc = parser.parseFromString(cleanHtml, 'text/html');

        // Extract Headings (H2, H3) and add anchor IDs
        const headingElements = doc.querySelectorAll('h2, h3');
        headingElements.forEach((h, index) => {
            const rawText = h.textContent.trim();
            if (rawText) {
                const anchorId = `section-${index + 1}-${rawText
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, '-')
                    .replace(/(^-|-$)/g, '')}`;
                h.setAttribute('id', anchorId);
                headings.push({
                    id: anchorId,
                    text: rawText,
                    level: h.tagName.toLowerCase()
                });
            }
        });

        // Ensure tables are wrapped in responsive containers
        const tables = doc.querySelectorAll('table');
        tables.forEach(table => {
            if (!table.parentElement.classList.contains('table-responsive-wrapper')) {
                const wrapper = doc.createElement('div');
                wrapper.className = 'table-responsive-wrapper';
                table.parentNode.insertBefore(wrapper, table);
                wrapper.appendChild(table);
            }
        });

        // Handle image captions
        const imagesWithCaption = doc.querySelectorAll('img[data-caption]');
        imagesWithCaption.forEach(img => {
            const caption = img.getAttribute('data-caption');
            if (caption && !img.nextElementSibling?.classList.contains('img-caption')) {
                const figcaption = doc.createElement('figcaption');
                figcaption.className = 'img-caption';
                figcaption.textContent = caption;
                img.insertAdjacentElement('afterend', figcaption);
            }
        });

        // Clean list bullets & whitespace
        const listItems = doc.querySelectorAll('li');
        listItems.forEach(li => {
            const textNodes = [];
            for (let node of li.childNodes) {
                if (node.nodeType === Node.TEXT_NODE) textNodes.push(node);
            }
            if (textNodes.length > 0) {
                const fullText = textNodes.map(n => n.nodeValue).join('');
                const bulletRegex = /^([\s\t]*)([•\-\*\u2022\u2023\u2043\u2219\u25CB\u25CF\u25E6\u25A0\u25A1\u00B7\u2027])([\s\t]*)/;
                const match = fullText.match(bulletRegex);
                if (match) {
                    let charsToRemove = match[0].length;
                    for (let node of textNodes) {
                        if (charsToRemove <= 0) break;
                        const val = node.nodeValue || '';
                        if (val.length <= charsToRemove) {
                            charsToRemove -= val.length;
                            node.nodeValue = '';
                        } else {
                            node.nodeValue = val.substring(charsToRemove);
                            charsToRemove = 0;
                        }
                    }
                }
            }
        });

        // Normalize paragraphs with background highlight spans into solid block backgrounds
        const blocks = doc.querySelectorAll('p, h1, h2, h3, h4, blockquote');
        blocks.forEach(block => {
            if (!block.style.backgroundColor) {
                const bgSpans = Array.from(block.querySelectorAll('span[style*="background-color"]'));
                if (bgSpans.length > 0) {
                    const blockText = block.textContent.trim();
                    const bgText = bgSpans.map(s => s.textContent).join('').trim();
                    if (blockText && bgText && (blockText === bgText || (bgSpans.length === 1 && block.children.length === 1))) {
                        const bgColor = bgSpans[0].style.backgroundColor;
                        if (bgColor && bgColor !== 'transparent') {
                            block.style.backgroundColor = bgColor;
                            bgSpans.forEach(s => s.style.removeProperty('background-color'));
                        }
                    }
                }
            }
        });

        return {
            processedHtml: doc.body.innerHTML,
            headings
        };
    } catch (e) {
        console.error('Error processing blog content:', e);
        return { processedHtml: cleanHtml, headings: [] };
    }
};

const BlogDetail = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [blog, setBlog] = useState(null);
    const [allBlogs, setAllBlogs] = useState([]);
    const [recentBlogs, setRecentBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [comment, setComment] = useState({ name: '', email: '', subject: '', message: '', save: false });
    const [commentsList, setCommentsList] = useState([]);
    const [submitting, setSubmitting] = useState(false);
    const [imgFailed, setImgFailed] = useState(false);
    const [copiedShare, setCopiedShare] = useState(false);
    const [tocOpen, setTocOpen] = useState(true);

    const fetchComments = async (postId) => {
        try {
            const data = await apiGetApprovedComments(postId);
            setCommentsList(data || []);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                window.scrollTo(0, 0);
                const data = await apiGetBlogBySlug(slug);

                // Handle 301 Redirect automatically
                if (data?.redirect && data?.new_slug) {
                    navigate(`/blog/${data.new_slug}`, { replace: true });
                    return;
                }

                setBlog(data);

                // SEO: Meta title
                document.title = `${data.meta_title || data.title} | Aindhin`;

                // Fetch real comments
                if (data?.id) fetchComments(data.id);

                // Fetch public blogs for previous/next and related posts
                const all = await apiGetPublicBlogs();
                const validList = all || [];
                setAllBlogs(validList);
                setRecentBlogs(validList.filter(b => b.slug !== slug).slice(0, 5));
            } catch (error) {
                console.error('Error fetching blog:', error.message);
                navigate('/404');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [slug, navigate]);

    // Parse Content and Headings
    const { processedHtml, headings } = useMemo(() => {
        if (!blog) return { processedHtml: '', headings: [] };
        let desc = blog.description || '';
        let body = '';

        if (desc) {
            const trimmed = desc.trim();
            if (trimmed.startsWith('{') && trimmed.endsWith('}')) {
                try {
                    const parsed = JSON.parse(trimmed);
                    body = blog.content || blog.article_body || blog.body || parsed.metaDescription || '';
                } catch (e) {
                    body = desc;
                }
            } else {
                body = desc;
            }
        }
        if (!body) body = blog.content || blog.article_body || blog.body || '';

        return processBlogContent(body);
    }, [blog]);

    // Handle FAQs & JSON-LD Schema & Noindex Tag
    useEffect(() => {
        if (!blog) return;

        let faqsList = [];
        if (blog.faqs) {
            try {
                faqsList = typeof blog.faqs === 'string' ? JSON.parse(blog.faqs) : blog.faqs;
            } catch (e) {
                console.error('FAQ parse error:', e);
            }
        }

        // 1. FAQ Schema JSON-LD Injection
        let scriptTag = null;
        if (Array.isArray(faqsList) && faqsList.length > 0) {
            const schema = {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": faqsList.map(f => ({
                    "@type": "Question",
                    "name": f.question,
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": f.answer
                    }
                }))
            };
            scriptTag = document.createElement('script');
            scriptTag.type = 'application/ld+json';
            scriptTag.text = JSON.stringify(schema);
            document.head.appendChild(scriptTag);
        }

        // 2. Robots Meta for Index / Noindex
        let robotsMeta = document.querySelector('meta[name="robots"]');
        if (blog.is_noindex) {
            if (!robotsMeta) {
                robotsMeta = document.createElement('meta');
                robotsMeta.name = 'robots';
                document.head.appendChild(robotsMeta);
            }
            robotsMeta.content = 'noindex, nofollow';
        } else if (robotsMeta) {
            robotsMeta.content = 'index, follow';
        }

        // 3. Meta Description
        let descMeta = document.querySelector('meta[name="description"]');
        if (blog.meta_description) {
            if (!descMeta) {
                descMeta = document.createElement('meta');
                descMeta.name = 'description';
                document.head.appendChild(descMeta);
            }
            descMeta.content = blog.meta_description;
        }

        return () => {
            if (scriptTag && scriptTag.parentNode) {
                scriptTag.parentNode.removeChild(scriptTag);
            }
        };
    }, [blog]);

    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    // Calculate Previous and Next Posts
    const { prevPost, nextPost } = useMemo(() => {
        if (!allBlogs || allBlogs.length === 0 || !blog) return { prevPost: null, nextPost: null };
        const idx = allBlogs.findIndex(b => b.slug === blog.slug || b.id === blog.id);
        if (idx === -1) return { prevPost: null, nextPost: null };
        return {
            prevPost: idx > 0 ? allBlogs[idx - 1] : null,
            nextPost: idx < allBlogs.length - 1 ? allBlogs[idx + 1] : null
        };
    }, [allBlogs, blog]);

    // Related Posts (Match category or tags)
    const relatedPosts = useMemo(() => {
        if (!allBlogs || !blog) return [];
        const matches = allBlogs.filter(b => b.slug !== blog.slug && b.category === blog.category);
        if (matches.length >= 3) return matches.slice(0, 3);
        const others = allBlogs.filter(b => b.slug !== blog.slug && !matches.includes(b));
        return [...matches, ...others].slice(0, 3);
    }, [allBlogs, blog]);

    // Parsed FAQs
    const parsedFaqs = useMemo(() => {
        if (!blog?.faqs) return [];
        try {
            const parsed = typeof blog.faqs === 'string' ? JSON.parse(blog.faqs) : blog.faqs;
            return Array.isArray(parsed) ? parsed.filter(f => f.question && f.answer) : [];
        } catch {
            return [];
        }
    }, [blog]);

    // Share Url
    const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

    const handleCopyLink = () => {
        navigator.clipboard.writeText(currentUrl);
        setCopiedShare(true);
        setTimeout(() => setCopiedShare(false), 2000);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#f4f6fb] pt-32 pb-16 flex justify-center items-center">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-10 h-10 border-3 border-primary border-t-transparent rounded-full animate-spin" />
                    <p className="text-sm text-gray-400 font-medium">Loading article…</p>
                </div>
            </div>
        );
    }

    if (!blog) return null;

    /* Sidebar Widget wrapper */
    const SidebarCard = ({ title, icon: Icon, children }) => (
        <div className="bg-white rounded-2xl shadow-[0_2px_16px_rgba(0,0,0,0.06)] overflow-hidden">
            <div className="flex items-center gap-2 px-5 pt-5 pb-3 border-b border-gray-100">
                {Icon && <Icon className="w-4 h-4 text-primary" />}
                <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider">{title}</h3>
            </div>
            <div className="p-5">{children}</div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#f4f6fb] pt-24 pb-16 px-4 md:px-6 lg:px-8" style={{ fontFamily: "'Inter', sans-serif" }}>
            <div className="max-w-7xl mx-auto">

                {/* Back Link */}
                <Link
                    to="/blog"
                    className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-primary mb-6 font-medium no-underline transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to All Blogs
                </Link>

                <div className="flex flex-col lg:flex-row gap-7">

                    {/* MAIN CONTENT AREA */}
                    <main className="flex-1 min-w-0 space-y-6">

                        {/* Article Card */}
                        <article className="bg-white rounded-2xl shadow-[0_2px_16px_rgba(0,0,0,0.06)] overflow-hidden">
                            {/* Gradient accent stripe */}
                            <div className="h-1 w-full bg-gradient-to-r from-primary via-blue-400 to-indigo-500" />

                            {/* Featured Image */}
                            {(blog.image_url || blog.image) && !imgFailed ? (
                                <div className="overflow-hidden max-h-[460px] flex items-center justify-center bg-gray-50">
                                    <img
                                        src={blog.image_url || blog.image}
                                        alt={blog.image_alt || blog.title}
                                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                                        onError={() => setImgFailed(true)}
                                    />
                                </div>
                            ) : (
                                <div className="h-64 md:h-[280px] w-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 border-b border-gray-100">
                                    <BookOpen className="w-16 h-16 text-blue-200" />
                                </div>
                            )}

                            <div className="px-5 md:px-8 lg:px-10 pt-8 pb-10">

                                {/* Metadata Pill Strip */}
                                <div className="flex flex-wrap items-center gap-3 mb-4">
                                    {/* Author */}
                                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary bg-primary/8 border border-primary/20 rounded-full px-3 py-1">
                                        <User className="w-3 h-3" />
                                        {blog.author || 'Aindhin'}
                                    </span>

                                    {/* Category */}
                                    {blog.category && (
                                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 bg-indigo-50 border border-indigo-100 rounded-full px-3 py-1">
                                            <Tag className="w-3 h-3" />
                                            {blog.category}
                                        </span>
                                    )}

                                    {/* Reading Time */}
                                    <span className="inline-flex items-center gap-1 text-xs text-gray-400 font-medium">
                                        <Clock className="w-3 h-3" />
                                        {blog.reading_time || '4 min read'}
                                    </span>

                                    {/* Publish Date */}
                                    <span className="inline-flex items-center gap-1 text-xs text-gray-400 font-medium">
                                        <Calendar className="w-3 h-3" />
                                        {formatDate(blog.date || blog.created_at)}
                                    </span>

                                    {/* Last Updated Timestamp */}
                                    {blog.updated_at && blog.updated_at !== blog.created_at && (
                                        <span className="inline-flex items-center gap-1 text-xs text-amber-600 font-medium bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-100">
                                            <History className="w-3 h-3" />
                                            Updated {formatDate(blog.updated_at)}
                                        </span>
                                    )}
                                </div>

                                {/* Title */}
                                <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-gray-900 leading-tight mb-6 tracking-tight">
                                    {blog.title}
                                </h1>

                                {/* Social Sharing Bar (Top) */}
                                <div className="flex flex-wrap items-center justify-between gap-3 py-3 border-y border-gray-100 mb-8 text-xs text-gray-500">
                                    <span className="font-semibold text-gray-600 flex items-center gap-1.5">
                                        <Share2 className="w-3.5 h-3.5 text-primary" />
                                        Share article:
                                    </span>
                                    <div className="flex items-center gap-2">
                                        <a
                                            href={`https://api.whatsapp.com/send?text=${encodeURIComponent(blog.title + ' ' + currentUrl)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-medium rounded-lg transition-colors"
                                        >
                                            WhatsApp
                                        </a>
                                        <a
                                            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-2.5 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium rounded-lg transition-colors"
                                        >
                                            LinkedIn
                                        </a>
                                        <a
                                            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(blog.title)}&url=${encodeURIComponent(currentUrl)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium rounded-lg transition-colors"
                                        >
                                            X (Twitter)
                                        </a>
                                        <button
                                            type="button"
                                            onClick={handleCopyLink}
                                            className="px-2.5 py-1 bg-gray-50 hover:bg-gray-100 text-gray-700 font-medium rounded-lg transition-colors flex items-center gap-1 border border-gray-200"
                                        >
                                            {copiedShare ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                                            {copiedShare ? 'Copied' : 'Copy Link'}
                                        </button>
                                    </div>
                                </div>

                                {/* Table of Contents (Auto from H2/H3) */}
                                {blog.enable_toc !== false && headings.length > 0 && (
                                    <div className="mb-10 p-5 bg-[#f8fafd] rounded-2xl border border-blue-100/70">
                                        <div 
                                            className="flex items-center justify-between cursor-pointer select-none"
                                            onClick={() => setTocOpen(!tocOpen)}
                                        >
                                            <div className="flex items-center gap-2">
                                                <ListOrdered className="w-4 h-4 text-primary" />
                                                <h3 className="text-sm font-bold text-gray-900 tracking-wide uppercase">Table of Contents</h3>
                                            </div>
                                            <span className="text-xs text-primary font-bold hover:underline">
                                                {tocOpen ? 'Hide' : 'Show'}
                                            </span>
                                        </div>

                                        {tocOpen && (
                                            <ul className="mt-3.5 space-y-2 border-t border-blue-100/60 pt-3">
                                                {headings.map((h, i) => (
                                                    <li key={i} className={h.level === 'h3' ? 'pl-4 text-xs' : 'text-sm font-semibold'}>
                                                        <a
                                                            href={`#${h.id}`}
                                                            className="text-gray-700 hover:text-primary transition-colors flex items-center gap-1.5"
                                                        >
                                                            <span className="text-primary font-bold">›</span>
                                                            <span>{h.text}</span>
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                )}

                                {/* Article Body */}
                                <div
                                    className="blog-content text-gray-700 leading-relaxed mb-10"
                                    dangerouslySetInnerHTML={{ __html: processedHtml }}
                                />

                                {/* FAQ Section Accordion */}
                                {parsedFaqs.length > 0 && (
                                    <div className="mt-12 pt-8 border-t border-gray-100">
                                        <div className="flex items-center gap-2 mb-4">
                                            <HelpCircle className="w-5 h-5 text-indigo-600" />
                                            <h3 className="text-xl font-bold text-gray-900">Frequently Asked Questions</h3>
                                        </div>
                                        <div className="space-y-3">
                                            {parsedFaqs.map((faq, idx) => (
                                                <details
                                                    key={idx}
                                                    className="group bg-slate-50 rounded-xl border border-gray-200/80 p-4 transition-all open:bg-white open:shadow-sm"
                                                >
                                                    <summary className="font-bold text-sm text-gray-800 cursor-pointer list-none flex items-center justify-between">
                                                        <span>{faq.question}</span>
                                                        <span className="text-primary font-bold transition-transform group-open:rotate-90">›</span>
                                                    </summary>
                                                    <p className="mt-2.5 text-xs md:text-sm text-gray-600 leading-relaxed pt-2 border-t border-gray-100">
                                                        {faq.answer}
                                                    </p>
                                                </details>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Call to Action (CTA) Block */}
                                {blog.cta_title && (
                                    <div className="mt-12 p-8 rounded-2xl bg-gradient-to-r from-primary via-blue-600 to-indigo-700 text-white shadow-lg shadow-blue-500/10">
                                        <div className="max-w-xl">
                                            <div className="flex items-center gap-2 text-blue-200 text-xs font-bold uppercase tracking-wider mb-2">
                                                <Megaphone className="w-4 h-4" />
                                                <span>Special Announcement</span>
                                            </div>
                                            <h3 className="text-2xl font-extrabold text-white mb-2 leading-tight">
                                                {blog.cta_title}
                                            </h3>
                                            {blog.cta_desc && (
                                                <p className="text-blue-100 text-sm leading-relaxed mb-6">
                                                    {blog.cta_desc}
                                                </p>
                                            )}
                                            {blog.cta_button_url && (
                                                <Link
                                                    to={blog.cta_button_url}
                                                    className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary font-bold rounded-xl text-sm hover:bg-blue-50 transition-all shadow-md group"
                                                >
                                                    <span>{blog.cta_button_text || 'Learn More'}</span>
                                                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* Author Bio Card */}
                                <div className="mt-12 p-6 bg-slate-50 rounded-2xl border border-gray-200/70 flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
                                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-blue-600 text-white flex items-center justify-center font-bold text-2xl shrink-0 shadow-md">
                                        {(blog.author || 'A').charAt(0)}
                                    </div>
                                    <div className="flex-1">
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-primary">Article Written By</span>
                                        <h4 className="text-base font-bold text-gray-900">{blog.author || 'Aindhin'}</h4>
                                        <p className="text-xs md:text-sm text-gray-600 mt-1 leading-relaxed">
                                            {blog.author_bio || 'Aindhin mentors students and engineers with industry-driven programs, bridging academic excellence and real-world skills.'}
                                        </p>
                                    </div>
                                </div>

                                {/* Tags Display Section */}
                                {blog.tags && (
                                    <div className="mt-8 pt-6 border-t border-gray-100">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <Tag className="w-4 h-4 text-gray-400" />
                                            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mr-2">Tags:</span>
                                            {(Array.isArray(blog.tags) ? blog.tags : blog.tags.split(',')).map((tag, idx) => (
                                                <Link 
                                                    key={idx}
                                                    to={`/blog?tag=${encodeURIComponent(tag.trim())}`}
                                                    className="px-3 py-1 bg-gray-50 text-gray-600 rounded-lg text-xs font-medium hover:bg-primary/10 hover:text-primary transition-colors border border-gray-100"
                                                >
                                                    {tag.trim()}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Previous / Next Article Navigation Cards */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10 pt-8 border-t border-gray-100">
                                    {prevPost ? (
                                        <Link
                                            to={`/blog/${prevPost.slug}`}
                                            className="p-4 bg-slate-50 hover:bg-blue-50/50 border border-gray-200/80 rounded-xl transition-all group"
                                        >
                                            <div className="flex items-center gap-1.5 text-xs text-primary font-bold mb-1">
                                                <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                                                <span>Previous Article</span>
                                            </div>
                                            <p className="text-xs font-semibold text-gray-800 group-hover:text-primary line-clamp-2">
                                                {prevPost.title}
                                            </p>
                                        </Link>
                                    ) : <div />}

                                    {nextPost && (
                                        <Link
                                            to={`/blog/${nextPost.slug}`}
                                            className="p-4 bg-slate-50 hover:bg-blue-50/50 border border-gray-200/80 rounded-xl transition-all group text-right"
                                        >
                                            <div className="flex items-center justify-end gap-1.5 text-xs text-primary font-bold mb-1">
                                                <span>Next Article</span>
                                                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                            </div>
                                            <p className="text-xs font-semibold text-gray-800 group-hover:text-primary line-clamp-2">
                                                {nextPost.title}
                                            </p>
                                        </Link>
                                    )}
                                </div>

                            </div>
                        </article>

                        {/* Related Posts Section */}
                        {relatedPosts.length > 0 && (
                            <div className="bg-white rounded-2xl shadow-[0_2px_16px_rgba(0,0,0,0.06)] p-7">
                                <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                                    <BookOpen className="w-5 h-5 text-primary" />
                                    Related Articles
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                    {relatedPosts.map((post) => (
                                        <Link
                                            key={post.id}
                                            to={`/blog/${post.slug}`}
                                            className="group block border border-gray-100 rounded-xl overflow-hidden hover:shadow-md transition-all"
                                        >
                                            <div className="aspect-video bg-gray-100 overflow-hidden">
                                                {post.image_url ? (
                                                    <img src={post.image_url} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center bg-blue-50 text-primary font-bold text-xs">
                                                        Aindhin Blog
                                                    </div>
                                                )}
                                            </div>
                                            <div className="p-3.5">
                                                <span className="text-[10px] font-bold text-primary uppercase">{post.category || 'Technology'}</span>
                                                <h4 className="text-xs font-bold text-gray-900 group-hover:text-primary line-clamp-2 mt-1 leading-snug">
                                                    {post.title}
                                                </h4>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Community Comments Section */}
                        {commentsList.length > 0 && (
                            <div className="bg-white rounded-2xl shadow-[0_2px_16px_rgba(0,0,0,0.06)] p-7">
                                <h3 className="text-lg font-bold text-gray-900 mb-6 pb-2 border-b border-gray-50 flex items-center gap-2">
                                    <MessageSquare className="w-5 h-5 text-primary" />
                                    Community Conversations ({commentsList.length})
                                </h3>
                                <div className="space-y-4">
                                    {commentsList.map((c) => (
                                        <div key={c.id} className="flex gap-3">
                                            <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 shrink-0">
                                                <User size={18} />
                                            </div>
                                            <div className="flex-1 space-y-1">
                                                <div className="flex items-center justify-between">
                                                    <h4 className="text-xs font-bold text-gray-800">{c.author_name}</h4>
                                                    <span className="text-[10px] text-gray-400">{formatDate(c.created_at)}</span>
                                                </div>
                                                <p className="text-xs text-gray-600 leading-relaxed bg-slate-50/60 p-3 rounded-xl border border-slate-50">
                                                    {c.content}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Comment Submission Form */}
                        <div className="bg-white rounded-2xl shadow-[0_2px_16px_rgba(0,0,0,0.06)] overflow-hidden">
                            <div className="h-1 w-full bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-500" />
                            <div className="px-5 md:px-8 lg:px-10 pt-8 pb-10">

                                <div className="flex items-center gap-2 mb-1">
                                    <MessageSquare className="w-5 h-5 text-primary" />
                                    <h2 className="text-lg font-bold text-gray-900">Leave A Comment</h2>
                                </div>
                                <p className="text-xs text-gray-400 mb-6 ml-7">Your email address will not be published. Required fields are marked *</p>

                                <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Name *</label>
                                            <input
                                                type="text"
                                                placeholder="John Doe"
                                                value={comment.name}
                                                onChange={e => setComment({ ...comment, name: e.target.value })}
                                                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-800 outline-none focus:border-primary bg-[#f8fafd] focus:bg-white"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Email *</label>
                                            <input
                                                type="email"
                                                placeholder="john@example.com"
                                                value={comment.email}
                                                onChange={e => setComment({ ...comment, email: e.target.value })}
                                                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-800 outline-none focus:border-primary bg-[#f8fafd] focus:bg-white"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Comment *</label>
                                        <textarea
                                            placeholder="Share your thoughts or questions…"
                                            rows={4}
                                            value={comment.message}
                                            onChange={e => setComment({ ...comment, message: e.target.value })}
                                            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-800 outline-none resize-none focus:border-primary bg-[#f8fafd] focus:bg-white"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        onClick={async (e) => {
                                            e.preventDefault();
                                            if (!comment.name || !comment.email || !comment.message) {
                                                alert('Please fill in all required fields.');
                                                return;
                                            }
                                            try {
                                                setSubmitting(true);
                                                await apiSubmitComment({
                                                    post_id: blog.id,
                                                    author_name: comment.name,
                                                    author_email: comment.email,
                                                    subject: comment.subject,
                                                    content: comment.message
                                                });
                                                alert('Comment submitted for approval!');
                                                setComment({ name: '', email: '', subject: '', message: '', save: comment.save });
                                            } catch (error) {
                                                alert('Error: ' + error.message);
                                            } finally {
                                                setSubmitting(false);
                                            }
                                        }}
                                        className="px-6 py-2 rounded-xl bg-primary hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-primary/20 disabled:opacity-50"
                                    >
                                        {submitting ? 'Submitting...' : 'Post Comment'}
                                    </button>
                                </form>
                            </div>
                        </div>

                    </main>

                    {/* RIGHT SIDEBAR */}
                    <aside className="w-full lg:w-[300px] xl:w-[320px] shrink-0 space-y-5">

                        {/* Search */}
                        <SidebarCard title="Search" icon={Search}>
                            <div className="flex gap-2 min-w-0">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={e => setSearchQuery(e.target.value)}
                                    onKeyDown={e => e.key === 'Enter' && searchQuery && navigate(`/blog?q=${encodeURIComponent(searchQuery)}`)}
                                    placeholder="Search articles…"
                                    className="min-w-0 flex-1 border border-gray-200 rounded-lg px-3 py-2 text-xs outline-none focus:border-primary bg-[#f8fafd]"
                                />
                                <button
                                    onClick={() => searchQuery && navigate(`/blog?q=${encodeURIComponent(searchQuery)}`)}
                                    className="shrink-0 px-3.5 py-2 bg-primary text-white text-xs font-bold rounded-lg hover:bg-blue-700"
                                >
                                    Go
                                </button>
                            </div>
                        </SidebarCard>

                        {/* Author Card Sidebar */}
                        <SidebarCard title="About Author" icon={User}>
                            <div className="text-center py-2">
                                <div className="w-14 h-14 mx-auto rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-lg mb-2">
                                    {(blog.author || 'A').charAt(0)}
                                </div>
                                <h4 className="text-xs font-bold text-gray-900">{blog.author || 'Aindhin'}</h4>
                                <p className="text-[11px] text-gray-500 mt-1 line-clamp-3">
                                    {blog.author_bio || 'Mentor and educator at Aindhin, sharing technical deep dives and career guidance.'}
                                </p>
                            </div>
                        </SidebarCard>

                        {/* Recent Blogs */}
                        <SidebarCard title="Recent Articles" icon={Calendar}>
                            {recentBlogs.length === 0 ? (
                                <p className="text-xs text-gray-400 italic">No recent posts.</p>
                            ) : (
                                <div className="space-y-3.5">
                                    {recentBlogs.map((b) => (
                                        <Link
                                            key={b.id}
                                            to={`/blog/${b.slug}`}
                                            className="flex gap-2.5 group no-underline"
                                        >
                                            <div className="w-[54px] h-[46px] rounded-lg overflow-hidden shrink-0 bg-gray-100 border border-gray-100">
                                                {b.image_url ? (
                                                    <img src={b.image_url} alt={b.title} className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full bg-primary/10 flex items-center justify-center text-primary font-bold text-[10px]">
                                                        Blog
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs font-semibold text-gray-800 group-hover:text-primary line-clamp-2 leading-snug">
                                                    {b.title}
                                                </p>
                                                <span className="text-[10px] text-gray-400">
                                                    {formatDate(b.date || b.created_at)}
                                                </span>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </SidebarCard>

                    </aside>
                </div>
            </div>

            {/* Typography and Module CSS */}
            <style>{`
                .blog-content {
                    font-size: 1.0625rem;
                    line-height: 1.8;
                    color: #1f2937;
                    word-break: normal; 
                    overflow-wrap: break-word;
                }

                .blog-content p {
                    margin-bottom: 1.5rem;
                }

                .blog-content h1, .blog-content h2, .blog-content h3, .blog-content h4 {
                    font-weight: 800;
                    line-height: 1.3;
                    margin-top: 2.25rem;
                    margin-bottom: 1rem;
                    scroll-margin-top: 100px;
                }
                
                .blog-content h1 { font-size: 2.25rem; color: #111827; }
                .blog-content h2 { font-size: 1.65rem; color: #111827; }
                .blog-content h3 { font-size: 1.25rem; color: #1f2937; }
                .blog-content h4 { font-size: 1.1rem; color: #374151; }

                /* Indentation support */
                .blog-content .ql-indent-1 { padding-left: 2rem !important; }
                .blog-content .ql-indent-2 { padding-left: 4rem !important; }
                .blog-content .ql-indent-3 { padding-left: 6rem !important; }
                .blog-content .ql-indent-4 { padding-left: 8rem !important; }
                .blog-content .ql-indent-5 { padding-left: 10rem !important; }
                .blog-content .ql-indent-6 { padding-left: 12rem !important; }
                .blog-content .ql-indent-7 { padding-left: 14rem !important; }
                .blog-content .ql-indent-8 { padding-left: 16rem !important; }

                /* Lists */
                .blog-content ul {
                    list-style: none !important;
                    margin-bottom: 1.5rem;
                    padding-left: 0 !important;
                }
                .blog-content ol {
                    list-style-type: decimal !important;
                    margin-bottom: 1.5rem;
                    padding-left: 1.5rem !important;
                }
                .blog-content ul li {
                    list-style-type: none !important;
                    display: block !important;
                    margin-bottom: 0.6rem;
                    position: relative;
                    padding-left: 1.5rem;
                }
                .blog-content ol li {
                    display: list-item !important;
                    list-style-type: decimal !important;
                    margin-bottom: 0.6rem;
                    padding-left: 0.5rem;
                }
                .blog-content ul li::before {
                    content: "";
                    position: absolute;
                    left: 0;
                    top: 0.65em;
                    width: 6px;
                    height: 6px;
                    background-color: #155BAC;
                    border-radius: 50%;
                }

                /* Callout highlight boxes */
                .blog-content .blog-callout {
                    display: flex;
                    align-items: flex-start;
                    gap: 1rem;
                    padding: 1.25rem 1.5rem;
                    border-radius: 0.875rem;
                    margin: 1.75rem 0;
                    border-left-width: 4px;
                    border-style: solid;
                }
                .blog-content .callout-info {
                    background-color: #eff6ff;
                    border-color: #3b82f6;
                    color: #1e3a8a;
                }
                .blog-content .callout-tip {
                    background-color: #ecfdf5;
                    border-color: #10b981;
                    color: #064e3b;
                }
                .blog-content .callout-warning {
                    background-color: #fffbeb;
                    border-color: #f59e0b;
                    color: #78350f;
                }
                .blog-content .callout-note {
                    background-color: #f5f3ff;
                    border-color: #8b5cf6;
                    color: #4c1d95;
                }

                /* Responsive Video Embeds */
                .blog-content .video-container {
                    position: relative;
                    width: 100%;
                    padding-bottom: 56.25%;
                    height: 0;
                    overflow: hidden;
                    border-radius: 1rem;
                    margin: 2rem 0;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.08);
                }
                .blog-content .video-container iframe {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    border: 0;
                }

                /* Images & Alignment & Captions */
                .blog-content img {
                    max-width: 100%;
                    height: auto;
                    border-radius: 0.875rem;
                    display: block;
                    margin: 1.5rem auto;
                }
                .blog-content img[data-align="center"] {
                    display: block !important;
                    margin-left: auto !important;
                    margin-right: auto !important;
                    float: none !important;
                }
                .blog-content img[data-align="left"] {
                    display: inline-block !important;
                    float: left !important;
                    margin: 0.5rem 1.5rem 1rem 0 !important;
                }
                .blog-content img[data-align="right"] {
                    display: inline-block !important;
                    float: right !important;
                    margin: 0.5rem 0 1rem 1.5rem !important;
                }
                .blog-content .img-caption {
                    font-size: 0.75rem;
                    text-align: center;
                    color: #6b7280;
                    font-style: italic;
                    margin-top: -1rem;
                    margin-bottom: 1.5rem;
                }

                /* Responsive Tables */
                .blog-content .table-responsive-wrapper {
                    width: 100%;
                    overflow-x: auto;
                    -webkit-overflow-scrolling: touch;
                    margin: 2rem 0;
                    border-radius: 0.75rem;
                    border: 1px solid #e2e8f0;
                }
                .blog-content table { 
                    width: 100%; 
                    border-collapse: collapse; 
                    font-size: 0.9375rem; 
                }
                .blog-content th { 
                    background: #f8fafc; 
                    padding: 0.75rem 1rem; 
                    text-align: left; 
                    font-weight: 700; 
                    border: 1px solid #e2e8f0; 
                }
                .blog-content td { 
                    padding: 0.75rem 1rem; 
                    border: 1px solid #e2e8f0; 
                }

                /* Blockquote */
                .blog-content blockquote { 
                    border: none;
                    border-left: 4px solid #3b82f6 !important;
                    padding: 1.25rem 1.5rem; 
                    background-color: #eff6ff; 
                    color: #1e293b; 
                    margin: 1.5rem 0; 
                    border-radius: 0.75rem; 
                    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
                }

                /* WordPress-Style Text Background Box Containers */
                .blog-content p[style*="background-color"],
                .blog-content h1[style*="background-color"],
                .blog-content h2[style*="background-color"],
                .blog-content h3[style*="background-color"],
                .blog-content h4[style*="background-color"],
                .blog-content blockquote[style*="background-color"] {
                    display: block !important;
                    padding: 1.25rem 1.75rem !important;
                    border-radius: 0.75rem !important;
                    margin: 1.5rem 0 !important;
                    line-height: 1.8 !important;
                    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04) !important;
                    box-sizing: border-box !important;
                }

                /* Fallback: If paragraph text is wrapped in a background span */
                .blog-content p > span[style*="background-color"]:only-child {
                    display: block !important;
                    padding: 1.25rem 1.75rem !important;
                    border-radius: 0.75rem !important;
                    margin: 0.5rem 0 !important;
                    line-height: 1.8 !important;
                    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04) !important;
                    box-sizing: border-box !important;
                }

                /* Partial text / inline highlight (smooth pill with no broken line gaps) */
                .blog-content span[style*="background-color"]:not(:only-child) {
                    display: inline !important;
                    padding: 0.18em 0.45em !important;
                    border-radius: 0.35rem !important;
                    -webkit-box-decoration-break: clone !important;
                    box-decoration-break: clone !important;
                    line-height: 1.8 !important;
                }

                /* Links */
                .blog-content a { 
                    font-weight: 600; 
                    text-decoration: underline; 
                    text-underline-offset: 4px;
                }
                .blog-content a:not([style*="color"]) { 
                    color: #2563eb; 
                }
                .blog-content a[style*="color"] strong, .blog-content a[style*="color"] b {
                    color: inherit !important;
                }
                .blog-content strong a:not([style*="color"]), .blog-content b a:not([style*="color"]) {
                    color: inherit;
                }
                .blog-content strong, .blog-content b {
                    font-weight: 700;
                }
                .blog-content strong:not([style*="color"]), .blog-content b:not([style*="color"]) {
                    color: inherit;
                }
                .blog-content h1, .blog-content h2, .blog-content h3, .blog-content h4 {
                    color: inherit;
                }
            `}</style>
        </div>
    );
};

export default BlogDetail;
