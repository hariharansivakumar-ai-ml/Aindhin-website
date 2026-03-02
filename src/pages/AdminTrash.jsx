import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { apiGetSession, apiGetAdminBlogs, apiUpdateBlog, apiDeleteBlog } from '../utils/apiClient';
import {
    FileText, Search, Trash2, Clock, RotateCcw,
    Trash as TrashIcon, Image as ImageIcon, ArrowLeft
} from 'lucide-react';
import AdminSidebar from '../components/AdminSidebar';

const AdminTrash = () => {
    const navigate = useNavigate();
    const [userEmail, setUserEmail] = useState('Administrative User');
    const [loading, setLoading] = useState(true);
    const [trashedBlogs, setTrashedBlogs] = useState([]);
    const [actionLoading, setActionLoading] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const fadeUp = (delay = 0) => ({
        hidden: { opacity: 0, y: 20 },
        show: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, delay, ease: [0.25, 0.1, 0.25, 1] }
        }
    });

    const stagger = {
        show: { transition: { staggerChildren: 0.1 } }
    };

    const fetchTrashedBlogs = async () => {
        try {
            const data = await apiGetAdminBlogs('Trash');
            setTrashedBlogs(data || []);
        } catch (error) {
            console.error('Error fetching trashed blogs:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const checkAuth = async () => {
            const session = await apiGetSession();
            if (!session) {
                navigate('/wp-admin');
            } else {
                setUserEmail(session.user.email);
            }
        };
        checkAuth();
        fetchTrashedBlogs();
    }, [navigate]);

    const handleRestore = async (id, previousStatus) => {
        const restoreStatus = previousStatus && previousStatus !== 'Trash' ? previousStatus : 'Draft';
        try {
            setActionLoading(id);
            await apiUpdateBlog(id, { status: restoreStatus, previous_status: null });
            setTrashedBlogs(trashedBlogs.filter(blog => blog.id !== id));
        } catch (error) {
            alert("Error restoring blog: " + error.message);
        } finally {
            setActionLoading(null);
        }
    };

    const handlePermanentDelete = async (id) => {
        if (!window.confirm("Are you sure you want to permanently delete this blog? This action cannot be undone.")) return;

        try {
            setActionLoading(id);
            await apiDeleteBlog(id);
            setTrashedBlogs(trashedBlogs.filter(blog => blog.id !== id));
        } catch (error) {
            alert("Error deleting blog: " + error.message);
        } finally {
            setActionLoading(null);
        }
    };

    const filteredBlogs = trashedBlogs.filter(blog =>
        blog.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.author?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-slate-400 font-medium animate-pulse">Scanning Trash...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-slate-50 font-inter overflow-hidden">
            <AdminSidebar userEmail={userEmail} />

            <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
                <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full">
                    {/* Header Section */}
                    <motion.div
                        initial="hidden"
                        animate="show"
                        variants={fadeUp(0)}
                        className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10"
                    >
                        <div className="space-y-1">
                            <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Trash</h1>
                            <p className="text-slate-400 text-sm font-medium flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse"></span>
                                {filteredBlogs.length} items slated for removal
                            </p>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="relative group flex-1 md:w-80">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-red-500 transition-colors" />
                                <input
                                    type="text"
                                    placeholder="Search trash..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-red-500/10 focus:border-red-500/50 transition-all shadow-sm"
                                />
                            </div>
                            <button
                                onClick={() => navigate('/wp-admin/all-blogs')}
                                className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl hover:bg-slate-800 transition-all font-bold text-sm shrink-0 active:scale-95 shadow-lg shadow-slate-950/10"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Back to All
                            </button>
                        </div>
                    </motion.div>

                    {filteredBlogs.length > 0 ? (
                        <motion.div
                            variants={stagger}
                            initial="hidden"
                            animate="show"
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                        >
                            {filteredBlogs.map((blog) => (
                                <motion.div
                                    key={blog.id}
                                    variants={fadeUp()}
                                    className="group bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col"
                                >
                                    {/* Thumbnail */}
                                    <div className="relative h-48 bg-slate-50 shrink-0 overflow-hidden">
                                        {blog.image_url ? (
                                            <img
                                                src={blog.image_url}
                                                alt=""
                                                className="w-full h-full object-cover grayscale-[0.6] opacity-60 group-hover:scale-105 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-slate-200 bg-gradient-to-br from-red-50 to-slate-50">
                                                <ImageIcon className="w-12 h-12 opacity-30" />
                                            </div>
                                        )}

                                        {/* Status badge */}
                                        <div className="absolute top-4 left-4">
                                            <span className="backdrop-blur-md bg-red-500/90 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg">
                                                Deleted
                                            </span>
                                        </div>

                                        {/* Actions Overlay */}
                                        <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-[2px] flex items-center justify-center gap-3">
                                            <button
                                                onClick={() => handleRestore(blog.id, blog.previous_status)}
                                                disabled={actionLoading === blog.id}
                                                className="p-3 bg-white text-emerald-600 rounded-2xl hover:bg-emerald-600 hover:text-white transition-all transform scale-90 group-hover:scale-100"
                                                title="Restore"
                                            >
                                                {actionLoading === blog.id ? (
                                                    <div className="w-5 h-5 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                                                ) : (
                                                    <RotateCcw className="w-5 h-5" />
                                                )}
                                            </button>
                                            <button
                                                onClick={() => handlePermanentDelete(blog.id)}
                                                disabled={actionLoading === blog.id}
                                                className="p-3 bg-red-500 text-white rounded-2xl hover:bg-red-600 transition-all transform scale-90 group-hover:scale-100 delay-75"
                                                title="Delete Permanently"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 flex flex-col flex-grow bg-slate-50/50 group-hover:bg-white transition-colors">
                                        <div className="flex items-center gap-3 mb-4 opacity-60 group-hover:opacity-100 transition-opacity">
                                            <div className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-500">
                                                {(blog.author || 'A').charAt(0).toUpperCase()}
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[11px] font-bold text-slate-900 tracking-wide uppercase">{blog.author || 'Admin'}</span>
                                                <span className="text-[10px] text-slate-400 font-medium">{new Date(blog.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                            </div>
                                        </div>

                                        <h3 className="text-base font-bold text-slate-400 group-hover:text-slate-800 leading-snug line-clamp-2 mb-3 transition-colors line-through decoration-slate-300">
                                            {blog.title || 'Untitled Masterpiece'}
                                        </h3>

                                        <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                                            <code className="text-[10px] text-slate-400 bg-slate-50 px-2 py-1 rounded truncate max-w-[150px]">/{blog.slug || 'no-slug'}</code>
                                            <span className="text-[10px] font-bold text-red-400 uppercase tracking-widest">Slated for deletion</span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            initial="hidden"
                            animate="show"
                            variants={fadeUp(0.2)}
                            className="bg-white rounded-[2rem] border-2 border-dashed border-slate-100 py-32 flex flex-col items-center justify-center text-center shadow-sm"
                        >
                            <div className="relative mb-8">
                                <div className="absolute inset-0 bg-red-100 blur-3xl opacity-20 rounded-full animate-pulse"></div>
                                <div className="relative w-24 h-24 bg-white rounded-3xl shadow-xl border border-slate-50 flex items-center justify-center">
                                    <TrashIcon className="w-10 h-10 text-slate-200" />
                                </div>
                                <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-lg border-4 border-white">
                                    <RotateCcw className="w-4 h-4 text-white" />
                                </div>
                            </div>

                            <h3 className="text-2xl font-black text-slate-900 mb-2 tracking-tight">Trash is Empty</h3>
                            <p className="text-slate-400 text-sm mb-10 max-w-sm mx-auto leading-relaxed">
                                No deleted posts to show. Your database is clean and your content is safe!
                            </p>

                            <button
                                onClick={() => navigate('/wp-admin/all-blogs')}
                                className="px-10 py-4 bg-slate-900 text-white font-bold rounded-2xl shadow-xl shadow-slate-950/10 hover:bg-slate-800 transition-all active:scale-95 flex items-center gap-3"
                            >
                                <ArrowLeft className="w-5 h-5" />
                                Back to All Blogs
                            </button>
                        </motion.div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default AdminTrash;
