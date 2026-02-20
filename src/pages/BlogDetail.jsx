import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Calendar, ArrowLeft, Share2, Facebook, Twitter, Linkedin, Copy, Check } from 'lucide-react';
import { fadeIn } from '../utils/motion';
import { supabase } from '../utils/supabaseClient';

const BlogDetail = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const { data, error } = await supabase
                    .from('blogs')
                    .select('*')
                    .eq('slug', slug)
                    .or('status.eq.Published,status.is.null') // Allow Published or legacy blogs (null)
                    .single();

                if (error) throw error;
                if (data) {
                    setBlog(data);
                    document.title = `${data.title} | Aindhin`;
                }
            } catch (error) {
                console.error('Error fetching blog:', error.message);
                navigate('/404');
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [slug, navigate]);

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-white pt-32 pb-16 flex justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!blog) return null;

    return (
        <div className="min-h-screen bg-white pt-24 pb-20">
            <div className="max-w-4xl mx-auto px-6">
                {/* Back Button */}
                <Link
                    to="/blog"
                    className="inline-flex items-center gap-2 text-gray-500 hover:text-primary transition-colors mb-8 font-medium font-inter"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to all blogs
                </Link>

                {/* Article Header */}
                <motion.header
                    variants={fadeIn("up", 0.1)}
                    initial="hidden"
                    animate="show"
                    className="mb-10"
                >
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 font-inter leading-tight mb-6">
                        {blog.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-6 py-6 border-y border-gray-100">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                                {(blog.author || 'A').charAt(0)}
                            </div>
                            <div>
                                <p className="text-sm font-bold text-gray-900 font-inter leading-none mb-1">
                                    By {blog.author || 'Admin'}
                                </p>
                                <p className="text-xs text-gray-500 font-inter tracking-wide">
                                    Content Writer
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 text-gray-500">
                            <Calendar className="w-4 h-4" />
                            <span className="text-sm font-inter">
                                {new Date(blog.date || blog.created_at).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </span>
                        </div>
                    </div>
                </motion.header>

                {/* Featured Image */}
                {blog.image_url && (
                    <motion.div
                        variants={fadeIn("up", 0.2)}
                        initial="hidden"
                        animate="show"
                        className="mb-12 rounded-2xl overflow-hidden shadow-2xl shadow-gray-200"
                    >
                        <img
                            src={blog.image_url}
                            alt={blog.title}
                            className="w-full object-cover max-h-[500px]"
                        />
                    </motion.div>
                )}

                {/* Article Content */}
                <motion.div
                    variants={fadeIn("up", 0.3)}
                    initial="hidden"
                    animate="show"
                    className="prose prose-lg max-w-none font-inter text-gray-700 leading-relaxed ql-editor-display"
                >
                    <div dangerouslySetInnerHTML={{ __html: blog.description }} />
                </motion.div>

                {/* Share Actions */}
                <div className="mt-16 pt-10 border-t border-gray-100">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                        <div className="flex items-center gap-4">
                            <span className="text-sm font-bold text-gray-400 uppercase tracking-widest font-inter">Share</span>
                            <div className="flex gap-2">
                                <button className="p-2.5 rounded-full bg-gray-50 text-gray-500 hover:bg-blue-50 hover:text-blue-600 transition-all">
                                    <Facebook className="w-5 h-5" />
                                </button>
                                <button className="p-2.5 rounded-full bg-gray-50 text-gray-500 hover:bg-blue-400 hover:text-white transition-all">
                                    <Twitter className="w-5 h-5" />
                                </button>
                                <button className="p-2.5 rounded-full bg-gray-50 text-gray-500 hover:bg-blue-600 hover:text-white transition-all">
                                    <Linkedin className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={handleCopyLink}
                                    className={`p-2.5 rounded-full transition-all flex items-center gap-2 ${copied ? 'bg-green-100 text-green-600' : 'bg-gray-50 text-gray-500 hover:bg-gray-200'
                                        }`}
                                >
                                    {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .ql-editor-display h1 { font-size: 2.25rem; font-weight: 800; margin: 1.5rem 0 1rem; color: #111827; }
                .ql-editor-display h2 { font-size: 1.875rem; font-weight: 700; margin: 1.5rem 0 1rem; color: #1f2937; }
                .ql-editor-display h3 { font-size: 1.5rem; font-weight: 600; margin: 1.5rem 0 1rem; color: #374151; }
                .ql-editor-display p { margin-bottom: 1.5rem; }
                .ql-editor-display img { border-radius: 1rem; margin: 2rem 0; width: 100%; }
                .ql-editor-display blockquote { border-left: 4px solid #6366f1; padding-left: 1.5rem; font-style: italic; color: #4b5563; margin: 2rem 0; }
                .ql-editor-display ul, .ql-editor-display ol { margin-bottom: 1.5rem; padding-left: 1.5rem; }
                .ql-editor-display li { margin-bottom: 0.5rem; }
            `}</style>
        </div>
    );
};

export default BlogDetail;
