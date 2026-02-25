import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { User, Tag, Calendar, ArrowLeft, Search, MessageSquare } from 'lucide-react';
import {
    apiGetBlogBySlug, apiGetPublicBlogs, apiSubmitComment, apiGetApprovedComments
} from '../utils/apiClient';

const BlogDetail = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [blog, setBlog] = useState(null);
    const [recentBlogs, setRecentBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [comment, setComment] = useState({ name: '', email: '', subject: '', message: '', save: false });

    const [commentsList, setCommentsList] = useState([]);
    const [submitting, setSubmitting] = useState(false);

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
                window.scrollTo(0, 0); // Scroll to top on navigation
                const data = await apiGetBlogBySlug(slug);
                setBlog(data);
                document.title = `${data.title} | Aindhin`;

                // Fetch real comments for this blog
                fetchComments(data.id);

                const all = await apiGetPublicBlogs();
                setRecentBlogs((all || []).filter(b => b.slug !== slug).slice(0, 5));
            } catch (error) {
                console.error('Error fetching blog:', error.message);
                navigate('/404');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [slug, navigate]);

    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
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

    /* ── Sidebar Widget wrapper ───────────────────────────── */
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

                {/* Back link */}
                <Link
                    to="/blog"
                    className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-primary mb-6 font-medium no-underline"
                >
                    <ArrowLeft className="w-4 h-4" />
                    All Blogs
                </Link>

                <div className="flex flex-col lg:flex-row gap-7">

                    {/* ══════════════════════════════════════════════════════════
                        MAIN CONTENT
                    ══════════════════════════════════════════════════════════ */}
                    <main className="flex-1 min-w-0 space-y-6">

                        {/* Article card */}
                        <div className="bg-white rounded-2xl shadow-[0_2px_16px_rgba(0,0,0,0.06)] overflow-hidden">

                            {/* Top accent stripe */}
                            <div className="h-1 w-full bg-gradient-to-r from-primary via-blue-400 to-indigo-500" />

                            {/* Featured Image */}
                            {blog.image_url && (
                                <div className="overflow-hidden">
                                    <img
                                        src={blog.image_url}
                                        alt={blog.title}
                                        className="w-full object-cover max-h-[440px]"
                                    />
                                </div>
                            )}

                            <div className="px-5 md:px-8 lg:px-10 pt-8 pb-10">

                                {/* Meta strip */}
                                <div className="flex flex-wrap items-center gap-3 mb-4">
                                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary bg-primary/8 border border-primary/20 rounded-full px-3 py-1">
                                        <User className="w-3 h-3" />
                                        {blog.author || 'Aindhin'}
                                    </span>

                                    {blog.date && (
                                        <>
                                            <span className="inline-flex items-center gap-1.5 text-xs text-gray-400">
                                                <Calendar className="w-3 h-3" />
                                                {formatDate(blog.date || blog.created_at)}
                                            </span>
                                            {commentsList.length > 0 && (
                                                <>
                                                    <span className="text-gray-200">|</span>
                                                    <span className="inline-flex items-center gap-1.5 text-xs text-gray-400">
                                                        <MessageSquare className="w-3 h-3" />
                                                        {commentsList.length} Comments
                                                    </span>
                                                </>
                                            )}
                                        </>
                                    )}
                                </div>

                                {/* Title */}
                                <h1 className="text-2xl md:text-[1.85rem] font-extrabold text-gray-900 leading-tight mb-6 tracking-tight">
                                    {blog.title}
                                </h1>

                                {/* Divider */}
                                <hr className="border-gray-100 mb-6" />

                                {/* Article body */}
                                <div
                                    className="blog-content text-gray-700 leading-relaxed"
                                    dangerouslySetInnerHTML={{ __html: blog.description?.replace(/&nbsp;|\u00A0/g, ' ') }}
                                />
                            </div>
                        </div>

                        {/* Recent Comments Display Section */}
                        {commentsList.length > 0 && (
                            <div className="bg-white rounded-2xl shadow-[0_2px_16px_rgba(0,0,0,0.06)] overflow-hidden p-7">
                                <h3 className="text-lg font-bold text-gray-900 mb-6 pb-2 border-b border-gray-50 flex items-center gap-2">
                                    <MessageSquare className="w-5 h-5 text-primary" />
                                    Community Conversations ({commentsList.length})
                                </h3>
                                <div className="space-y-6">
                                    {commentsList.map((c) => (
                                        <div key={c.id} className="flex gap-4 group">
                                            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 shrink-0">
                                                <User size={20} />
                                            </div>
                                            <div className="flex-1 space-y-1">
                                                <div className="flex items-center justify-between">
                                                    <h4 className="text-sm font-bold text-gray-800">{c.author_name}</h4>
                                                    <span className="text-[11px] text-gray-400">{formatDate(c.created_at)}</span>
                                                </div>
                                                <p className="text-sm text-gray-600 leading-relaxed bg-slate-50/50 p-3 rounded-xl border border-slate-50">
                                                    {c.content}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* ── Comment Form card ───────────────────────────────── */}
                        <div className="bg-white rounded-2xl shadow-[0_2px_16px_rgba(0,0,0,0.06)] overflow-hidden">
                            <div className="h-1 w-full bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-500" />
                            <div className="px-5 md:px-8 lg:px-10 pt-8 pb-10">

                                <div className="flex items-center gap-2 mb-1">
                                    <MessageSquare className="w-5 h-5 text-primary" />
                                    <h2 className="text-lg font-bold text-gray-900">Leave A Comment</h2>
                                </div>
                                <p className="text-xs text-gray-400 mb-6 ml-7">Your email address will not be published. Required fields are marked *</p>

                                <form onSubmit={(e) => e.preventDefault()} className="space-y-4">

                                    {/* Name + Email */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Name *</label>
                                            <input
                                                type="text"
                                                placeholder="John Doe"
                                                value={comment.name}
                                                onChange={e => setComment({ ...comment, name: e.target.value })}
                                                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 bg-[#f8fafd] focus:bg-white placeholder:text-gray-300"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Email *</label>
                                            <input
                                                type="email"
                                                placeholder="john@example.com"
                                                value={comment.email}
                                                onChange={e => setComment({ ...comment, email: e.target.value })}
                                                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 bg-[#f8fafd] focus:bg-white placeholder:text-gray-300"
                                            />
                                        </div>
                                    </div>

                                    {/* Subject */}
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Subject</label>
                                        <input
                                            type="text"
                                            placeholder="What's this about?"
                                            value={comment.subject}
                                            onChange={e => setComment({ ...comment, subject: e.target.value })}
                                            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 bg-[#f8fafd] focus:bg-white placeholder:text-gray-300"
                                        />
                                    </div>

                                    {/* Comment */}
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Comment *</label>
                                        <textarea
                                            placeholder="Share your thoughts or questions…"
                                            rows={5}
                                            value={comment.message}
                                            onChange={e => setComment({ ...comment, message: e.target.value })}
                                            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 outline-none resize-none focus:border-primary focus:ring-2 focus:ring-primary/10 bg-[#f8fafd] focus:bg-white placeholder:text-gray-300"
                                        />
                                    </div>

                                    {/* Footer row */}
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                                        <label className="flex items-start gap-2 text-xs text-gray-400 cursor-pointer select-none">
                                            <input
                                                type="checkbox"
                                                checked={comment.save}
                                                onChange={e => setComment({ ...comment, save: e.target.checked })}
                                                className="mt-0.5 accent-primary"
                                            />
                                            Save my name and email in this browser for next time.
                                        </label>
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
                                            className="shrink-0 px-8 py-2.5 rounded-xl bg-gradient-to-r from-primary to-blue-600 text-white text-sm font-bold hover:from-blue-700 hover:to-indigo-700 shadow-md shadow-primary/20 disabled:opacity-50"
                                        >
                                            {submitting ? 'Submitting...' : 'Post Comment'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>

                    </main>

                    {/* ══════════════════════════════════════════════════════════
                        RIGHT SIDEBAR
                    ══════════════════════════════════════════════════════════ */}
                    <aside className="w-full lg:w-[300px] xl:w-[310px] shrink-0 space-y-5">

                        {/* Search */}
                        <SidebarCard title="Search" icon={Search}>
                            <div className="flex gap-2 min-w-0">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={e => setSearchQuery(e.target.value)}
                                    onKeyDown={e => e.key === 'Enter' && searchQuery && navigate(`/blog?q=${encodeURIComponent(searchQuery)}`)}
                                    placeholder="Search articles…"
                                    className="min-w-0 flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 bg-[#f8fafd] placeholder:text-gray-300"
                                />
                                <button
                                    onClick={() => searchQuery && navigate(`/blog?q=${encodeURIComponent(searchQuery)}`)}
                                    className="shrink-0 px-4 py-2 bg-primary text-white text-sm font-bold rounded-lg hover:bg-blue-700"
                                >
                                    Go
                                </button>
                            </div>
                        </SidebarCard>

                        {/* Recent Comments */}
                        <SidebarCard title="Recent Comments" icon={MessageSquare}>
                            {commentsList.length === 0 ? (
                                <p className="text-sm text-gray-400 italic">No comments yet.</p>
                            ) : (
                                <div className="space-y-3">
                                    {commentsList.slice(0, 3).map((c) => (
                                        <div key={c.id} className="group">
                                            <p className="text-xs font-bold text-gray-800 group-hover:text-primary transition-colors line-clamp-2">
                                                {c.author_name}: <span className="font-normal text-gray-500">"{c.content}"</span>
                                            </p>
                                            <p className="text-[10px] text-gray-300 mt-1 uppercase font-bold tracking-tight">
                                                {formatDate(c.created_at)}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </SidebarCard>

                        {/* Recent Blogs */}
                        <SidebarCard title="Recent Blogs" icon={Calendar}>
                            {recentBlogs.length === 0 ? (
                                <p className="text-sm text-gray-400 italic">No recent posts.</p>
                            ) : (
                                <div className="space-y-4">
                                    {recentBlogs.map((b) => (
                                        <Link
                                            key={b.id}
                                            to={`/blog/${b.slug}`}
                                            className="flex gap-3 group no-underline"
                                        >
                                            {/* Thumbnail */}
                                            <div className="w-[60px] h-[52px] rounded-xl overflow-hidden shrink-0 bg-gray-100 border border-gray-100">
                                                {b.image_url ? (
                                                    <img
                                                        src={b.image_url}
                                                        alt={b.title}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-blue-100 flex items-center justify-center">
                                                        <span className="text-[10px] font-bold text-primary">Blog</span>
                                                    </div>
                                                )}
                                            </div>
                                            {/* Text */}
                                            <div className="flex-1 min-w-0">
                                                <p className="text-[13px] font-semibold text-gray-800 group-hover:text-primary leading-snug line-clamp-2 mb-1">
                                                    {b.title}
                                                </p>
                                                <div className="flex items-center gap-1 text-[11px] text-primary font-medium">
                                                    <Calendar className="w-3 h-3" />
                                                    {formatDate(b.date || b.created_at)}
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </SidebarCard>



                    </aside>
                </div>
            </div>

            {/* ── Blog content typography ─────────────────────────────────── */}
            <style>{`
                .blog-content {
                    font-size: 1.0625rem; /* 17px */
                    line-height: 1.8;
                    color: #1f2937;
                    word-break: normal; 
                    overflow-wrap: break-word;
                    white-space: normal;
                }

                .blog-content * {
                    word-break: normal;
                    overflow-wrap: break-word;
                    white-space: normal;
                }

                .blog-content p {
                    margin-bottom: 1.5rem;
                }

                .blog-content h1, .blog-content h2, .blog-content h3 {
                    color: #111827;
                    font-weight: 800;
                    line-height: 1.3;
                    margin-top: 2.5rem;
                    margin-bottom: 1.25rem;
                }
                
                .blog-content h1 { font-size: 2.25rem; }
                .blog-content h2 { font-size: 1.75rem; }
                .blog-content h3 { font-size: 1.25rem; }

                .blog-content ul, .blog-content ol {
                    margin-bottom: 1.5rem;
                    padding-left: 1.5rem;
                }

                .blog-content li {
                    margin-bottom: 0.5rem;
                }

                .blog-content img {
                    max-width: 100%;
                    height: auto;
                    border-radius: 1rem;
                    margin: 2.5rem 0;
                    display: block;
                }

                .blog-content a { 
                    color: #2563eb; 
                    font-weight: 600; 
                    text-decoration: underline; 
                    text-underline-offset: 4px;
                }
                
                .blog-content blockquote { 
                    border-left: 4px solid #3b82f6; 
                    padding: 1.5rem 2rem; 
                    background: #f8fafc; 
                    color: #334155; 
                    font-style: italic; 
                    margin: 2rem 0; 
                    border-radius: 0 1rem 1rem 0; 
                }

                .blog-content pre { 
                    background: #0f172a; 
                    color: #f8fafc; 
                    padding: 1.5rem; 
                    border-radius: 0.75rem; 
                    overflow-x: auto; 
                    margin: 2rem 0; 
                    font-size: 0.875rem; 
                }

                .blog-content table { 
                    width: 100%; 
                    border-collapse: collapse; 
                    margin: 2rem 0; 
                    font-size: 0.9375rem; 
                }

                .blog-content th { 
                    background: #f1f5f9; 
                    padding: 0.75rem 1rem; 
                    text-align: left; 
                    font-weight: 700; 
                    border: 1px solid #e2e8f0; 
                }

                .blog-content td { 
                    padding: 0.75rem 1rem; 
                    border: 1px solid #e2e8f0; 
                }
            `}</style>
        </div>
    );
};

export default BlogDetail;
