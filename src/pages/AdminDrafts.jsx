import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { apiGetSession, apiGetAdminBlogs, apiUpdateBlog } from '../utils/apiClient';
import {
    FileText, PlusCircle, Trash2, Edit, Eye, Search,
    Image as ImageIcon
} from 'lucide-react';
import AdminSidebar from '../components/AdminSidebar';

const AdminDrafts = () => {
    const navigate = useNavigate();
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userEmail, setUserEmail] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [actionLoading, setActionLoading] = useState(null);

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

    useEffect(() => {
        const checkAuth = async () => {
            const session = await apiGetSession();
            if (!session) {
                navigate('/wp-admin');
            } else {
                setUserEmail(session.user.email);
            }
        };

        const fetchDrafts = async () => {
            try {
                const data = await apiGetAdminBlogs('Draft');
                setBlogs(data || []);
            } catch (error) {
                console.error('Error fetching drafts:', error);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
        fetchDrafts();
    }, [navigate]);

    const handleMoveToTrash = async (id) => {
        if (!window.confirm("Move this draft to trash?")) return;
        try {
            setActionLoading(id);
            await apiUpdateBlog(id, { status: 'Trash', previous_status: 'Draft' });
            setBlogs(blogs.filter(blog => blog.id !== id));
        } catch (error) {
            console.error('Error moving to trash:', error);
            alert("Failed to move to trash: " + error.message);
        } finally {
            setActionLoading(null);
        }
    };

    const filteredBlogs = blogs.filter(blog =>
        blog.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.author?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-slate-400 font-medium animate-pulse">Loading Drafts...</p>
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
                            <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Drafts</h1>
                            <p className="text-slate-400 text-sm font-medium flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                                Currently editing {filteredBlogs.length} unfinished articles
                            </p>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="relative group flex-1 md:w-80">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                                <input
                                    type="text"
                                    placeholder="Search drafts..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-blue-600/10 focus:border-blue-600/50 transition-all shadow-sm"
                                />
                            </div>
                            <button
                                onClick={() => navigate('/wp-admin/add-new')}
                                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl hover:shadow-xl hover:shadow-blue-600/20 transition-all font-bold text-sm shrink-0 active:scale-95"
                            >
                                <PlusCircle className="w-4 h-4" />
                                New Post
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
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-slate-200 bg-gradient-to-br from-slate-50 to-slate-100">
                                                <ImageIcon className="w-12 h-12 opacity-50" />
                                            </div>
                                        )}

                                        {/* Status badge */}
                                        <div className="absolute top-4 left-4">
                                            <span className="backdrop-blur-md bg-amber-400/90 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg">
                                                Draft
                                            </span>
                                        </div>

                                        {/* Actions Overlay */}
                                        <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-[2px] flex items-center justify-center gap-3">
                                            <button
                                                onClick={() => window.open(`/blog/${blog.slug}`, '_blank')}
                                                className="p-3 bg-white text-slate-900 rounded-2xl hover:bg-blue-600 hover:text-white transition-all transform scale-90 group-hover:scale-100"
                                                title="Preview"
                                            >
                                                <Eye className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={() => navigate(`/wp-admin/edit/${blog.id}`)}
                                                className="p-3 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition-all transform scale-90 group-hover:scale-100 delay-75"
                                                title="Edit"
                                            >
                                                <Edit className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={() => handleMoveToTrash(blog.id)}
                                                disabled={actionLoading === blog.id}
                                                className="p-3 bg-red-500 text-white rounded-2xl hover:bg-red-600 transition-all transform scale-90 group-hover:scale-100 delay-150"
                                                title="Trash"
                                            >
                                                {actionLoading === blog.id ? (
                                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                ) : (
                                                    <Trash2 className="w-5 h-5" />
                                                )}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 flex flex-col flex-grow">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center text-[10px] font-bold text-blue-600">
                                                {(blog.author || 'A').charAt(0).toUpperCase()}
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[11px] font-bold text-slate-900 tracking-wide uppercase">{blog.author || 'Admin'}</span>
                                                <span className="text-[10px] text-slate-400 font-medium">{new Date(blog.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                            </div>
                                        </div>

                                        <h3
                                            className="text-base font-bold text-slate-800 leading-snug line-clamp-2 mb-3 group-hover:text-blue-600 transition-colors cursor-pointer"
                                            onClick={() => navigate(`/wp-admin/edit/${blog.id}`)}
                                        >
                                            {blog.title || 'Untitled Masterpiece'}
                                        </h3>

                                        <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
                                            <code className="text-[10px] text-slate-400 bg-slate-50 px-2 py-1 rounded truncate max-w-[150px]">/{blog.slug || 'no-slug'}</code>
                                            <button
                                                onClick={() => navigate(`/wp-admin/edit/${blog.id}`)}
                                                className="text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors"
                                            >
                                                Continue Writing →
                                            </button>
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
                                <div className="absolute inset-0 bg-blue-100 blur-3xl opacity-30 rounded-full animate-pulse"></div>
                                <div className="relative w-24 h-24 bg-white rounded-3xl shadow-xl border border-slate-50 flex items-center justify-center">
                                    <FileText className="w-10 h-10 text-slate-200" />
                                </div>
                                <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-amber-400 rounded-2xl flex items-center justify-center shadow-lg border-4 border-white">
                                    <Edit className="w-4 h-4 text-white" />
                                </div>
                            </div>

                            <h3 className="text-2xl font-black text-slate-900 mb-2 tracking-tight">Your Draft Folder is Quiet</h3>
                            <p className="text-slate-400 text-sm mb-10 max-w-sm mx-auto leading-relaxed">
                                This is where your unfinished ideas take shape. Ready to start your next trending article?
                            </p>

                            <button
                                onClick={() => navigate('/wp-admin/add-new')}
                                className="px-10 py-4 bg-slate-900 text-white font-bold rounded-2xl shadow-xl shadow-slate-950/10 hover:bg-blue-600 transition-all active:scale-95 flex items-center gap-3"
                            >
                                <PlusCircle className="w-5 h-5" />
                                Start Writing Now
                            </button>
                        </motion.div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default AdminDrafts;
