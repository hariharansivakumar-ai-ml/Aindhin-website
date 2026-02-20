import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { User, Calendar, ArrowRight } from 'lucide-react';
import { fadeIn, staggerContainer } from '../utils/motion';
import { supabase } from '../utils/supabaseClient';

import logo from '../assets/logo_aindhin.png';

// Strip HTML tags and return plain text for preview
const stripHtml = (html) => {
    if (!html) return '';
    return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
};

const Blogs = () => {
    const [blogPosts, setBlogPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        document.title = "Blogs | Aindhin - Latest Insights & Updates";

        const fetchBlogs = async () => {
            try {
                const { data, error } = await supabase
                    .from('blogs')
                    .select('*')
                    .order('date', { ascending: false });

                if (error) {
                    throw error;
                }

                if (data) {
                    // Only show Published blogs (or legacy ones without a status)
                    const visibleBlogs = data.filter(post =>
                        post.status === 'Published' || !post.status
                    );
                    setBlogPosts(visibleBlogs);
                }
            } catch (error) {
                console.error('Error fetching blogs:', error.message);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-white pt-32 pb-16 flex justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-white pt-32 pb-16 flex justify-center items-center">
                <div className="text-center text-red-500">
                    <p>Error loading blogs: {error}</p>
                    <button
                        className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
                        onClick={() => window.location.reload()}
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white pt-12 pb-16">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                {/* Page Header */}
                <motion.div
                    variants={fadeIn("down", 0.1)}
                    initial="hidden"
                    animate="show"
                    className="text-center mb-12"
                >
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-inter text-black">
                        Blogs
                    </h1>
                </motion.div>

                {/* Blog Grid */}
                {blogPosts.length > 0 ? (
                    <motion.div
                        variants={staggerContainer(0.1, 0.1)}
                        initial="hidden"
                        animate="show"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {blogPosts.map((post) => (
                            <motion.article
                                key={post.id}
                                variants={fadeIn("up", 0.2)}
                                className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full"
                            >
                                {/* Blog Image */}
                                <div className="relative h-60 overflow-hidden group">
                                    <img
                                        src={post.image || post.image_url} // Fallback for various column names
                                        alt={post.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        onError={(e) => { e.target.src = "https://via.placeholder.com/400x250?text=No+Image"; }}
                                    />
                                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur rounded-full px-3 py-1 flex items-center gap-1.5 shadow-sm">
                                        <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                                            <img src={logo} alt="" className="w-4 h-4 object-contain" />
                                        </div>
                                        <span className="text-xs font-bold font-inter text-secondary">AINDHIN</span>
                                    </div>
                                </div>

                                {/* Blog Content */}
                                <div className="p-6 flex flex-col flex-grow">
                                    <h2 className="text-xl font-bold text-gray-900 font-inter mb-4 line-clamp-3 leading-snug">
                                        {post.title}
                                    </h2>

                                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4 font-inter">
                                        <div className="flex items-center gap-1.5">
                                            <User className="w-4 h-4 text-gray-400" />
                                            <span>By {post.author || 'Admin'}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <Calendar className="w-4 h-4 text-gray-400" />
                                            <span>{post.date || new Date(post.created_at).toLocaleDateString()}</span>
                                        </div>
                                    </div>

                                    <p className="text-gray-600 text-sm leading-relaxed mb-6 font-inter line-clamp-4 flex-grow">
                                        {stripHtml(post.desc || post.description)}
                                    </p>

                                    <Link
                                        to={`/blog/${post.slug}`}
                                        className="inline-flex items-center text-gray-900 font-semibold text-sm hover:text-primary transition-colors mt-auto"
                                    >
                                        Read More
                                        <ArrowRight className="w-4 h-4 ml-1" />
                                    </Link>
                                </div>
                            </motion.article>
                        ))}
                    </motion.div>
                ) : (
                    <motion.div
                        variants={fadeIn("up", 0.2)}
                        initial="hidden"
                        animate="show"
                        className="text-center py-20"
                    >
                        <p className="text-gray-500 text-lg font-inter">No blogs available at the moment.</p>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default Blogs;
