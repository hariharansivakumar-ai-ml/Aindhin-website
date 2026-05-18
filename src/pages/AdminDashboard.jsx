import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiGetSession, apiGetAdminBlogs, apiLogout } from '../utils/apiClient';
import {
    LayoutDashboard, FileText, PlusCircle, Trash2, LogOut,
    Clock, CheckCircle, Search, Bell, ChevronRight, Menu, X, Edit2, BarChart2, MessageSquare, Image
} from 'lucide-react';
import AdminSidebar from '../components/AdminSidebar';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState({ total: 0, published: 0, drafts: 0 });
    const [loading, setLoading] = useState(true);
    const [recentPosts, setRecentPosts] = useState([]);
    const [userEmail, setUserEmail] = useState('');
    const [showSidebar, setShowSidebar] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            const session = await apiGetSession();
            if (!session) navigate('/wp-admin');
            else setUserEmail(session.user.email);
        };
        const fetchStats = async () => {
            try {
                const allActive = await apiGetAdminBlogs('all');
                const total = allActive?.length || 0;
                const published = allActive?.filter(b => b.status === 'Published').length || 0;
                const drafts = allActive?.filter(b => b.status === 'Draft' || !b.status).length || 0;
                const others = total - published - drafts;
                
                setStats({ total, published, drafts, others });
                setRecentPosts(allActive?.slice(0, 6) || []);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        checkAuth();
        fetchStats();
    }, [navigate]);


    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-950">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-violet-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-white/50 font-medium text-sm animate-pulse">Loading Dashboard...</p>
                </div>
            </div>
        );
    }

    const publishedPct = stats.total > 0 ? Math.round((stats.published / stats.total) * 100) : 0;
    const draftsPct = stats.total > 0 ? Math.round((stats.drafts / stats.total) * 100) : 0;

    const statCards = [
        {
            label: 'Total Blogs',
            value: stats.total,
            sub: 'articles',
            icon: FileText,
            gradient: 'from-violet-500 to-indigo-600',
            glow: 'shadow-violet-500/20',
            bar: 100,
            barColor: 'bg-violet-400',
        },
        {
            label: 'Published',
            value: stats.published,
            sub: 'live',
            icon: CheckCircle,
            gradient: 'from-emerald-500 to-teal-600',
            glow: 'shadow-emerald-500/20',
            bar: publishedPct,
            barColor: 'bg-emerald-400',
        },
        {
            label: 'Drafts',
            value: stats.drafts,
            sub: 'pending',
            icon: Clock,
            gradient: 'from-amber-500 to-orange-600',
            glow: 'shadow-amber-500/20',
            bar: draftsPct,
            barColor: 'bg-amber-400',
        },
    ];

    const getStatusBadge = (status) => {
        const map = {
            Published: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
            Draft: 'bg-amber-50 text-amber-700 border border-amber-200',
            Archived: 'bg-slate-100 text-slate-600 border border-slate-200',
        };
        return map[status] || 'bg-gray-100 text-gray-600 border border-gray-200';
    };

    return (
        <div className="flex h-screen bg-slate-50 font-inter overflow-hidden">
            <AdminSidebar userEmail={userEmail} />

            {/* ── Main ───────────────────────────────────────────── */}
            <main className="flex-1 min-w-0 flex flex-col overflow-hidden">



                {/* Scrollable body */}
                <div className="flex-1 overflow-y-auto">
                    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8">

                        {/* Page heading */}
                        <div>
                            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">Dashboard Overview</h2>
                            <p className="text-slate-500 mt-1 text-sm">Welcome back, {userEmail.split('@')[0] || 'Admin'}! Here's what's happening.</p>
                        </div>

                        {/* Stat Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                            {statCards.map(({ label, value, sub, icon: Icon, gradient, glow, bar, barColor }) => (
                                <div key={label} className={`relative rounded-2xl p-6 bg-gradient-to-br ${gradient} shadow-xl ${glow} overflow-hidden group`}>
                                    <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                        <Icon size={90} />
                                    </div>
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="p-2.5 bg-white/20 rounded-xl backdrop-blur-sm">
                                            <Icon className="w-5 h-5 text-white" />
                                        </div>
                                        <span className="text-white/70 text-xs font-semibold uppercase tracking-wider">{label}</span>
                                    </div>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-4xl font-black text-white">{value}</span>
                                        <span className="text-white/60 text-[10px] font-medium uppercase tracking-tight">{sub}</span>
                                    </div>
                                    <div className="mt-5 h-1.5 bg-white/20 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full ${barColor} rounded-full transition-all duration-1000`}
                                            style={{ width: `${Math.max(bar, value > 0 ? 10 : 0)}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                            
                            {/* Special Visibility Info Card */}
                            <div className="rounded-2xl p-6 bg-white border border-slate-100 shadow-sm flex flex-col justify-between group overflow-hidden relative">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50 group-hover:bg-blue-100 transition-colors"></div>
                                <div>
                                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                                        <Bell className="w-3.5 h-3.5 text-blue-500" />
                                        Visibility Note
                                    </h4>
                                    <p className="text-[11px] text-slate-500 leading-relaxed relative z-10">
                                        Only <span className="font-bold text-slate-900">Published</span> blogs are visible to site visitors. 
                                        Drafts and Unset posts remain hidden.
                                    </p>
                                </div>
                                <button 
                                    onClick={() => navigate('/wp-admin/all-blogs')}
                                    className="mt-4 text-[11px] font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 group/btn"
                                >
                                    Check all statuses <ChevronRight className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" />
                                </button>
                            </div>
                        </div>

                        {/* Recent Blogs Grid */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900">Recent Blogs</h3>
                                    <p className="text-sm text-slate-400">Latest updates from your blog</p>
                                </div>
                                <button
                                    onClick={() => navigate('/wp-admin/all-blogs')}
                                    className="px-4 py-2 text-sm font-semibold text-violet-600 bg-violet-50 rounded-xl hover:bg-violet-100 transition-all flex items-center gap-1.5"
                                >
                                    View All <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>

                            {recentPosts.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                                    {recentPosts.map((post) => (
                                        <div
                                            key={post.id}
                                            onClick={() => navigate(`/wp-admin/edit/${post.id}`)}
                                            className="group bg-white rounded-2xl border border-slate-100 p-4 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer flex flex-col gap-4"
                                        >
                                            <div className="flex items-start gap-4">
                                                {/* Thumbnail */}
                                                <div className="w-20 h-20 rounded-xl bg-slate-100 overflow-hidden shrink-0 border border-slate-50">
                                                    {post.image_url ? (
                                                        <img src={post.image_url} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-slate-300">
                                                            <FileText size={24} />
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2 mb-1.5">
                                                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${post.status === 'Published'
                                                            ? 'bg-emerald-50 text-emerald-600'
                                                            : 'bg-amber-50 text-amber-600'
                                                            }`}>
                                                            {post.status || 'Draft'}
                                                        </span>
                                                        <span className="text-[10px] text-slate-400 font-medium italic">
                                                            {post.date ? new Date(post.date).toLocaleDateString() : '—'}
                                                        </span>
                                                    </div>
                                                    <h4 className="text-sm font-bold text-slate-800 line-clamp-2 leading-snug group-hover:text-violet-600 transition-colors">
                                                        {post.title || 'Untitled Blog'}
                                                    </h4>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between pt-3 border-t border-slate-50 mt-auto">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500">
                                                        {(post.author || 'A').charAt(0).toUpperCase()}
                                                    </div>
                                                    <span className="text-xs text-slate-500 font-medium">{post.author || 'Admin'}</span>
                                                </div>
                                                <button className="p-1.5 text-slate-400 group-hover:text-violet-500 transition-colors">
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="bg-white rounded-3xl border border-dashed border-slate-200 py-20 flex flex-col items-center text-center">
                                    <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-4">
                                        <FileText className="w-8 h-8 text-slate-200" />
                                    </div>
                                    <p className="text-slate-500 font-medium">No recent blogs to show</p>
                                    <button
                                        onClick={() => navigate('/wp-admin/add-new')}
                                        className="mt-4 px-6 py-2 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-slate-800 transition-all"
                                    >
                                        Create Blog
                                    </button>
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
