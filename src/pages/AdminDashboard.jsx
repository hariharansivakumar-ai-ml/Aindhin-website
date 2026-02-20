import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../utils/supabaseClient';
import {
    LayoutDashboard, FileText, PlusCircle, Trash2, LogOut,
    TrendingUp, Clock, CheckCircle, Search, Bell, MoreVertical,
    ChevronRight, ArrowUpRight
} from 'lucide-react';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState({
        total: 0,
        published: 0,
        drafts: 0
    });
    const [loading, setLoading] = useState(true);
    const [recentPosts, setRecentPosts] = useState([]);
    const [userEmail, setUserEmail] = useState('');

    useEffect(() => {
        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                navigate('/wp-admin');
            } else {
                setUserEmail(session.user.email);
            }
        };

        const fetchStats = async () => {
            try {
                // Fetch All active blogs (not in trash)
                const { data: allActive } = await supabase
                    .from('blogs')
                    .select('status')
                    .neq('status', 'Trash');

                const total = allActive?.length || 0;
                const published = allActive?.filter(b => b.status === 'Published').length || 0;
                const drafts = allActive?.filter(b => b.status === 'Draft' || !b.status).length || 0;

                setStats({ total, published, drafts });

                // Fetch recent posts (excluding trash)
                const { data: posts } = await supabase
                    .from('blogs')
                    .select('id, title, date, author, slug')
                    .neq('status', 'Trash')
                    .order('date', { ascending: false })
                    .limit(5);

                if (posts) setRecentPosts(posts);

            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
        fetchStats();
    }, [navigate]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/wp-admin');
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-gray-500 font-medium animate-pulse">Loading Dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F4F6F8] font-inter flex">
            {/* Sidebar */}
            <aside className="w-72 bg-[#111827] text-white flex-col hidden md:flex sticky top-0 h-screen overflow-y-auto">
                <div className="p-8">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                            <span className="font-bold text-xl">A</span>
                        </div>
                        <h2 className="text-xl font-bold tracking-tight">Admin<span className="text-primary">Panel</span></h2>
                    </div>

                    <div className="space-y-1">
                        <p className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Main Menu</p>
                        <nav className="space-y-1">
                            <a href="#" className="flex items-center gap-3 px-4 py-3 bg-primary/10 text-primary border-r-[3px] border-primary rounded-lg transition-all">
                                <LayoutDashboard className="w-5 h-5" />
                                <span className="font-medium">Dashboard</span>
                            </a>
                            <button onClick={() => navigate('/wp-admin/all-blogs')} className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all group text-left">
                                <FileText className="w-5 h-5 group-hover:text-gray-300" />
                                <span className="font-medium">All Blogs</span>
                            </button>
                            <button onClick={() => navigate('/wp-admin/drafts')} className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all group text-left">
                                <Clock className="w-5 h-5 group-hover:text-gray-300" />
                                <span className="font-medium">Drafts</span>
                            </button>
                            <button onClick={() => navigate('/wp-admin/add-new')} className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all group text-left">
                                <PlusCircle className="w-5 h-5 group-hover:text-gray-300" />
                                <span className="font-medium">Add New Blog</span>
                            </button>
                            <button onClick={() => navigate('/wp-admin/trash')} className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all group text-left">
                                <Trash2 className="w-5 h-5 group-hover:text-gray-300" />
                                <span className="font-medium">Trash</span>
                            </button>
                        </nav>
                    </div>
                </div>

                <div className="mt-auto p-6 border-t border-gray-800">
                    <div className="flex items-center gap-3 mb-6 px-2">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center text-sm font-bold shadow-md">
                            {userEmail.charAt(0).toUpperCase()}
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-sm font-semibold truncate text-white">{userEmail.split('@')[0]}</p>
                            <p className="text-xs text-gray-500 truncate">Administrator</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-red-500/30 text-red-400 rounded-xl hover:bg-red-500/10 hover:text-red-300 transition-all font-medium text-sm"
                    >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 min-w-0 overflow-auto">
                {/* Top Header */}
                <header className="bg-white border-b border-gray-200 sticky top-0 z-30 px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4 md:hidden">
                        <div className="w-8 h-8 bg-black rounded-lg"></div> {/* Mobile logo placeholder */}
                    </div>

                    <div className="flex-1 max-w-xl hidden md:block">
                        <div className="relative group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-primary transition-colors" />
                            <input
                                type="text"
                                placeholder="Search blogs, analytics, etc..."
                                className="w-full bg-gray-50 border-none rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all outline-none"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <button className="relative p-2 text-gray-400 hover:bg-gray-100 rounded-lg transition-colors">
                            <Bell className="w-6 h-6" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                        </button>
                        <div className="h-8 w-[1px] bg-gray-200"></div>
                        <button
                            onClick={() => navigate('/wp-admin/add-new')}
                            className="hidden md:flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium text-sm shadow-lg shadow-black/20"
                        >
                            <PlusCircle className="w-4 h-4" />
                            Create New
                        </button>
                    </div>
                </header>

                <div className="p-8 max-w-7xl mx-auto space-y-8">
                    {/* Welcome Section */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Dashboard Overview</h1>
                            <p className="text-gray-500 mt-1">Welcome back! Here's what's happening today.</p>
                        </div>
                        <div className="flex gap-2">
                            <select className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 outline-none focus:border-primary">
                                <option>Last 7 Days</option>
                                <option>Last 30 Days</option>
                            </select>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Total Posts Card */}
                        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow group relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <FileText size={100} className="transform rotate-12" />
                            </div>
                            <div className="flex items-start justify-between mb-4">
                                <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
                                    <FileText className="w-6 h-6" />
                                </div>
                                <span className="flex items-center text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-lg">
                                    <TrendingUp className="w-3 h-3 mr-1" /> +12.5%
                                </span>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Total Blogs</h3>
                                <div className="flex items-baseline gap-2 mt-2">
                                    <span className="text-4xl font-extrabold text-gray-900">{stats.total}</span>
                                    <span className="text-sm text-gray-500">articles</span>
                                </div>
                            </div>
                            <div className="w-full h-1 bg-gray-100 mt-4 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-500 w-[70%] rounded-full"></div>
                            </div>
                        </div>

                        {/* Published Card */}
                        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow group relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <CheckCircle size={100} className="transform rotate-12 text-green-600" />
                            </div>
                            <div className="flex items-start justify-between mb-4">
                                <div className="p-3 bg-green-50 rounded-xl text-green-600">
                                    <CheckCircle className="w-6 h-6" />
                                </div>
                                <span className="flex items-center text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-lg">
                                    <TrendingUp className="w-3 h-3 mr-1" /> +5.2%
                                </span>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Published</h3>
                                <div className="flex items-baseline gap-2 mt-2">
                                    <span className="text-4xl font-extrabold text-gray-900">{stats.published}</span>
                                    <span className="text-sm text-gray-500">live</span>
                                </div>
                            </div>
                            <div className="w-full h-1 bg-gray-100 mt-4 rounded-full overflow-hidden">
                                <div className="h-full bg-green-500 w-[85%] rounded-full"></div>
                            </div>
                        </div>

                        {/* Drafts Card */}
                        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow group relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Clock size={100} className="transform rotate-12 text-orange-600" />
                            </div>
                            <div className="flex items-start justify-between mb-4">
                                <div className="p-3 bg-orange-50 rounded-xl text-orange-600">
                                    <Clock className="w-6 h-6" />
                                </div>
                                <span className="flex items-center text-xs font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded-lg">
                                    Stable
                                </span>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Drafts</h3>
                                <div className="flex items-baseline gap-2 mt-2">
                                    <span className="text-4xl font-extrabold text-gray-900">{stats.drafts}</span>
                                    <span className="text-sm text-gray-500">pending</span>
                                </div>
                            </div>
                            <div className="w-full h-1 bg-gray-100 mt-4 rounded-full overflow-hidden">
                                <div className="h-full bg-orange-500 w-[30%] rounded-full"></div>
                            </div>
                        </div>
                    </div>

                    {/* Recent Activity Table */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                            <h3 className="text-lg font-bold text-gray-900">Recent Blogs</h3>
                            <button className="text-sm font-medium text-primary hover:text-primary/80 flex items-center gap-1">
                                View All <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50/50">
                                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Title</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Author</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {recentPosts.length > 0 ? recentPosts.map((post) => (
                                        <tr key={post.id} className="hover:bg-gray-50 transition-colors group">
                                            <td className="px-6 py-4 cursor-pointer" onClick={() => navigate(`/wp-admin/edit/${post.id}`)}>
                                                <div className="font-semibold text-gray-900 group-hover:text-primary transition-colors">{post.title || 'Untitled Blog'}</div>
                                                <div className="text-xs text-gray-400 mt-0.5">{post.slug || 'no-slug'}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">
                                                        {(post.author || 'A').charAt(0)}
                                                    </div>
                                                    <span className="text-sm text-gray-600 font-medium">{post.author || 'Admin'}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-sm text-gray-500 font-medium">
                                                    {post.date ? new Date(post.date).toLocaleDateString() : 'N/A'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button className="p-2 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-all">
                                                    <MoreVertical className="w-4 h-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan="4" className="px-6 py-12 text-center text-gray-400">
                                                <div className="flex flex-col items-center gap-2">
                                                    <FileText className="w-8 h-8 opacity-20" />
                                                    <p>No recent blogs found</p>
                                                    <button
                                                        onClick={() => navigate('/wp-admin/add-new')}
                                                        className="mt-2 text-primary font-medium text-sm hover:underline"
                                                    >
                                                        Create your first blog
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
