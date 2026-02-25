import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    MessageSquare, Search, Trash2, CheckCircle,
    XCircle, Clock, Filter, User, Calendar, ExternalLink,
    MoreVertical
} from 'lucide-react';
import { apiGetSession, apiGetAllCommentsAdmin, apiUpdateCommentStatus, apiDeleteComment } from '../utils/apiClient';
import AdminSidebar from '../components/AdminSidebar';

const AdminComments = () => {
    const navigate = useNavigate();
    const [userEmail, setUserEmail] = useState('');
    const [loading, setLoading] = useState(true);
    const [comments, setComments] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');

    const fadeUp = (delay = 0) => ({
        hidden: { opacity: 0, y: 20 },
        show: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, delay, ease: [0.25, 0.1, 0.25, 1] }
        }
    });

    const stagger = {
        show: { transition: { staggerChildren: 0.05 } }
    };

    const fetchComments = async () => {
        try {
            setLoading(true);
            const data = await apiGetAllCommentsAdmin();
            setComments(data || []);
        } catch (error) {
            console.error('Error fetching comments:', error);
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
                fetchComments();
            }
        };
        checkAuth();
    }, [navigate]);

    const handleAction = async (id, action) => {
        try {
            const statusMap = {
                approve: 'Approved',
                unapprove: 'Pending',
                spam: 'Spam'
            };
            const newStatus = statusMap[action];
            await apiUpdateCommentStatus(id, newStatus);
            setComments(comments.map(c =>
                c.id === id ? { ...c, status: newStatus } : c
            ));
        } catch (error) {
            alert('Failed to update comment status: ' + error.message);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this comment?')) return;
        try {
            await apiDeleteComment(id);
            setComments(comments.filter(c => c.id !== id));
        } catch (error) {
            alert('Failed to delete comment: ' + error.message);
        }
    };

    const filteredComments = comments.filter(c => {
        const matchesSearch = (c.author_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.content?.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesFilter = filterStatus === 'All' || c.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-violet-600 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-slate-400 font-medium animate-pulse">Loading conversation...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 font-inter flex">
            <AdminSidebar userEmail={userEmail} />

            <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
                <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full">

                    {/* Header */}
                    <motion.div
                        initial="hidden"
                        animate="show"
                        variants={fadeUp(0)}
                        className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10"
                    >
                        <div className="space-y-1">
                            <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Comments</h1>
                            <p className="text-slate-400 text-sm font-medium flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-violet-500 animate-pulse"></span>
                                {comments.length} discussions across your blogs
                            </p>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="relative group flex-1 md:w-80">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-violet-600 transition-colors" />
                                <input
                                    type="text"
                                    placeholder="Search comments..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-violet-600/10 focus:border-violet-600/50 transition-all shadow-sm"
                                />
                            </div>
                            <div className="flex bg-white p-1 rounded-2xl border border-slate-200 shadow-sm shrink-0">
                                {['All', 'Approved', 'Pending'].map((s) => (
                                    <button
                                        key={s}
                                        onClick={() => setFilterStatus(s)}
                                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${filterStatus === s
                                            ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md'
                                            : 'text-slate-500 hover:text-slate-900'}`}
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Comments List */}
                    {filteredComments.length > 0 ? (
                        <motion.div
                            variants={stagger}
                            initial="hidden"
                            animate="show"
                            className="space-y-4"
                        >
                            {filteredComments.map((comment) => (
                                <motion.div
                                    key={comment.id}
                                    variants={fadeUp()}
                                    className="group relative bg-white rounded-3xl border border-slate-100 p-6 shadow-sm hover:shadow-xl hover:shadow-violet-600/5 transition-all duration-300"
                                >
                                    <div className="flex flex-col md:flex-row gap-6">
                                        {/* Avatar & Info */}
                                        <div className="flex md:flex-col items-center md:items-start gap-4 md:w-48 shrink-0">
                                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-slate-400">
                                                <User size={24} />
                                            </div>
                                            <div>
                                                <h3 className="text-sm font-black text-slate-900 tracking-tight truncate">{comment.author_name}</h3>
                                                <p className="text-xs text-slate-400 font-medium truncate">{comment.author_email}</p>
                                                <div className="flex items-center gap-1.5 mt-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                                    <Calendar size={10} />
                                                    {comment.created_at ? new Date(comment.created_at).toLocaleDateString() : 'N/A'}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 space-y-3">
                                            <div className="flex items-center gap-3">
                                                <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${comment.status === 'Approved' ? 'bg-emerald-50 text-emerald-600' :
                                                    comment.status === 'Pending' ? 'bg-amber-50 text-amber-600' :
                                                        'bg-red-50 text-red-600'
                                                    }`}>
                                                    {comment.status}
                                                </span>
                                                <span className="text-slate-300 text-[10px]">•</span>
                                                <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
                                                    on <span className="text-slate-900 underline decoration-violet-500/30 underline-offset-4">{comment.post_title}</span>
                                                </span>
                                            </div>
                                            <p className="text-slate-600 text-sm leading-relaxed bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
                                                "{comment.content}"
                                            </p>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex md:flex-col items-center justify-end gap-2 md:w-32 shrink-0">
                                            {comment.status !== 'Approved' ? (
                                                <button
                                                    onClick={() => handleAction(comment.id, 'approve')}
                                                    className="flex-1 md:w-full flex items-center justify-center gap-2 py-2 bg-violet-600 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-violet-700 transition-all shadow-lg shadow-violet-600/10"
                                                >
                                                    <CheckCircle size={14} />
                                                    Approve
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => handleAction(comment.id, 'unapprove')}
                                                    className="flex-1 md:w-full flex items-center justify-center gap-2 py-2 bg-slate-50 text-slate-600 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-slate-100 transition-all border border-slate-100"
                                                >
                                                    <Clock size={14} />
                                                    Hold
                                                </button>
                                            )}
                                            <div className="flex gap-2 w-full">
                                                <button
                                                    onClick={() => handleAction(comment.id, 'spam')}
                                                    className="flex-1 flex items-center justify-center p-2.5 bg-slate-50 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all border border-slate-100"
                                                    title="Spam"
                                                >
                                                    <XCircle size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(comment.id)}
                                                    className="flex-1 flex items-center justify-center p-2.5 bg-slate-50 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all border border-slate-100"
                                                    title="Delete"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action overlay - desktop only */}
                                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <div className="p-1.5 bg-white shadow-lg rounded-lg text-slate-400 cursor-pointer">
                                            <MoreVertical size={14} />
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
                                <div className="absolute inset-0 bg-violet-100 blur-3xl opacity-30 rounded-full animate-pulse"></div>
                                <div className="relative w-24 h-24 bg-white rounded-3xl shadow-xl border border-slate-50 flex items-center justify-center text-slate-200">
                                    <MessageSquare size={40} />
                                </div>
                            </div>

                            <h3 className="text-2xl font-black text-slate-900 mb-2 tracking-tight">Silent Corridors</h3>
                            <p className="text-slate-400 text-sm mb-10 max-w-sm mx-auto leading-relaxed">
                                No comments found matching your criteria. Why not start a conversation yourself?
                            </p>
                        </motion.div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default AdminComments;
