import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { User, Calendar, ArrowRight, BookOpen, Rss, ChevronLeft, ChevronRight } from 'lucide-react';
import { apiGetPublicBlogs } from '../utils/apiClient';

/* ── helpers ──────────────────────────────────────────────── */
const stripHtml = (html, post = {}) => {
    if (!html) return '';
    let str = String(html);
    
    // JSON Recovery: If content is JSON metadata
    if (str.trim().startsWith('{') && str.trim().endsWith('}')) {
        try {
            const parsed = JSON.parse(str);
            // Prioritize metaDescription, then fallback to other possible content fields
            str = parsed.metaDescription || parsed.content || post.content || post.article_body || post.desc || '';
            
            // If we still have the original JSON string as a result of a failed fallback, clear it
            if (str.trim().startsWith('{')) str = '';
        } catch (e) { /* not JSON */ }
    }

    return str.replace(/<[^>]*>/g, ' ').replace(/&nbsp;|\u00A0/g, ' ').replace(/\s+/g, ' ').trim();
};

const fmtDate = (raw) => {
    if (!raw) return '';
    const d = new Date(raw);
    if (isNaN(d)) return raw;
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

/* ── Framer Motion variants ───────────────────────────────── */
const fadeUp = (delay = 0) => ({
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay } },
});

const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
};

const cardVariant = {
    hidden: { opacity: 0, y: 36, scale: 0.97 },
    show: {
        opacity: 1, y: 0, scale: 1,
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    },
};

const BlogCard = ({ post }) => {
    const navigate = useNavigate();
    return (
        <motion.article
            variants={cardVariant}
            onClick={() => navigate(`/blog/${post.slug}`)}
            className="group bg-white rounded-2xl overflow-hidden border border-gray-100 
                       shadow-[0_2px_16px_rgba(0,0,0,0.06)] 
                       hover:shadow-[0_12px_44px_rgba(37,99,235,0.15)] 
                       hover:-translate-y-1.5
                       transition-all duration-300 flex flex-col h-full cursor-pointer"
        >
            {/* Image section */}
            <div className="relative h-auto sm:h-56 overflow-hidden bg-gray-50 shrink-0">
                {(post.image_url || post.image) ? (
                    <img
                        src={post.image_url || post.image}
                        alt={(() => {
                            let alt = post.image_alt || '';
                            if (!alt && post.description) {
                                try {
                                    const trimmed = post.description.trim();
                                    if (trimmed.startsWith('{') && trimmed.endsWith('}')) {
                                        const parsed = JSON.parse(trimmed);
                                        alt = parsed.featuredImageAlt || '';
                                    }
                                } catch (e) { }
                            }
                            return alt || post.title;
                        })()}
                        className="w-full h-auto sm:h-full object-contain sm:object-cover group-hover:scale-105 transition-transform duration-700"
                        onError={e => { e.target.style.display = 'none'; }}
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
                        <BookOpen className="w-12 h-12 text-blue-200" />
                    </div>
                )}
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Category badge */}
                <div className="absolute top-4 left-4">
                    <span className="bg-white/95 backdrop-blur-sm text-blue-600 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-sm">
                        Blog
                    </span>
                </div>
            </div>

            {/* Content section */}
            <div className="p-6 flex flex-col flex-grow">
                {/* Meta info */}
                <div className="flex items-center gap-3 text-[11px] font-semibold text-gray-400 mb-3 uppercase tracking-wider">
                    <span className="flex items-center gap-1.5 text-blue-500/80">
                        <User className="w-3.5 h-3.5" />
                        {post.author || 'Aindhin Team'}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-gray-300" />
                    <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {fmtDate(post.date || post.created_at)}
                    </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900 leading-snug mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-sm text-gray-500 leading-relaxed line-clamp-3 mb-6">
                    {stripHtml(post.description || post.content || post.desc, post)}
                </p>

                {/* Footer link style */}
                <div className="mt-auto flex items-center gap-2 text-sm font-bold text-blue-600 group-hover:gap-3 transition-all duration-300">
                    Read Full Article
                    <ArrowRight className="w-4 h-4" />
                </div>
            </div>
        </motion.article>
    );
};

/* ── Page ─────────────────────────────────────────────────── */
const Blogs = () => {
    const [blogPosts, setBlogPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [blogsPerPage, setBlogsPerPage] = useState(window.innerWidth < 768 ? 4 : 6);

    useEffect(() => {
        const handleResize = () => {
            const newLimit = window.innerWidth < 768 ? 4 : 6;
            setBlogsPerPage(prev => {
                if (prev !== newLimit) setCurrentPage(1);
                return newLimit;
            });
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        document.title = 'Blog | Aindhin - Latest Insights & Updates';
        apiGetPublicBlogs()
            .then(data => setBlogPosts(data || []))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    // Pagination Logic
    const indexOfLastBlog = currentPage * blogsPerPage;
    const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
    const currentBlogs = blogPosts.slice(indexOfFirstBlog, indexOfLastBlog);
    const totalPages = Math.ceil(blogPosts.length / blogsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 400, behavior: 'smooth' }); // Scroll to top of list
    };

    /* ── Loading skeleton ─────────────── */
    if (loading) {
        return (
            <div className="min-h-screen bg-[#f8fafc] pt-32 pb-16">
                <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3, 4, 5, 6].map(i => (
                            <div key={i} className="bg-white rounded-2xl h-[450px] shadow-sm animate-pulse flex flex-col">
                                <div className="h-56 bg-gray-100 rounded-t-2xl" />
                                <div className="p-6 space-y-4">
                                    <div className="h-4 w-1/3 bg-gray-100 rounded" />
                                    <div className="h-6 w-3/4 bg-gray-100 rounded" />
                                    <div className="h-20 w-full bg-gray-100 rounded" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    /* ── Error ───────────────────────── */
    if (error) {
        return (
            <div className="min-h-screen bg-[#f8fafc] pt-32 pb-16 flex justify-center items-center px-4">
                <div className="text-center max-w-md">
                    <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Rss className="w-10 h-10" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">Something went wrong</h2>
                    <p className="text-gray-500 mb-8">{error || 'We couldn\'t load our latest insights. Please try again later.'}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-500/25 transition-all"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f8fafc]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

            {/* ── Hero Banner ──────────────────────────────────────── */}
            <div className="relative bg-[#0f172a] pt-32 pb-24 px-6 lg:px-12 overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-600/10 to-transparent" />
                <div className="absolute bottom-0 left-0 w-1/2 h-64 bg-gradient-to-t from-indigo-600/5 to-transparent" />

                <div className="relative z-10 max-w-[1400px] mx-auto">
                    <motion.div variants={fadeUp(0)} initial="hidden" animate="show" className="max-w-3xl">
                        <span className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">
                            <span className="w-8 h-px bg-blue-400" /> Aindhin Blog
                        </span>
                        <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-[1.15] mb-6">
                            Master Your Future with{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Expert Blog</span>
                        </h1>
                        <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-2xl">
                            Stay ahead of the curve with our latest articles on technology,
                            career growth, and practical learning strategies.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* ── Content ──────────────────────────────────────────── */}
            <div className="px-6 lg:px-12 py-20">
                <div className="max-w-[1400px] mx-auto">

                    {blogPosts.length === 0 ? (
                        <motion.div variants={fadeUp(0)} initial="hidden" animate="show"
                            className="text-center py-32 border-2 border-dashed border-gray-100 rounded-3xl">
                            <BookOpen className="w-16 h-16 text-gray-200 mx-auto mb-6" />
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">No articles found</h2>
                            <p className="text-gray-500">We're currently crafting some amazing content. Check back soon!</p>
                        </motion.div>
                    ) : (
                        <>
                            <motion.div
                                variants={stagger}
                                initial="hidden"
                                animate="show"
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-y-12"
                            >
                                {currentBlogs.map(post => (
                                    <BlogCard key={post.id} post={post} />
                                ))}
                            </motion.div>

                            {/* Pagination UI */}
                            {totalPages > 1 && (
                                <div className="mt-20 flex justify-center items-center gap-2">
                                    <button
                                        onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                                        disabled={currentPage === 1}
                                        className="p-2 rounded-xl border border-gray-200 text-gray-400 hover:bg-white hover:text-blue-600 hover:border-blue-200 transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-sm"
                                    >
                                        <ChevronLeft className="w-5 h-5" />
                                    </button>

                                    <div className="flex items-center gap-2 mx-4">
                                        {[...Array(totalPages)].map((_, idx) => {
                                            const pageNum = idx + 1;
                                            return (
                                                <button
                                                    key={pageNum}
                                                    onClick={() => handlePageChange(pageNum)}
                                                    className={`w-10 h-10 rounded-xl text-sm font-bold transition-all ${
                                                        currentPage === pageNum
                                                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 scale-110'
                                                            : 'bg-white border border-gray-200 text-gray-500 hover:border-blue-400 hover:text-blue-600'
                                                    }`}
                                                >
                                                    {pageNum}
                                                </button>
                                            );
                                        })}
                                    </div>

                                    <button
                                        onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                                        disabled={currentPage === totalPages}
                                        className="p-2 rounded-xl border border-gray-200 text-gray-400 hover:bg-white hover:text-blue-600 hover:border-blue-200 transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-sm"
                                    >
                                        <ChevronRight className="w-5 h-5" />
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Blogs;
