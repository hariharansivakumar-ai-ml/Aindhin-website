import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../utils/supabaseClient';
import {
    LayoutDashboard, FileText, PlusCircle, Trash2, LogOut,
    Search, Bell, MoreVertical, Edit, ChevronLeft, ChevronRight,
    Filter, Eye, Image as ImageIcon, Calendar, Clock
} from 'lucide-react';

const AllBlogs = () => {
    const navigate = useNavigate();
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userEmail, setUserEmail] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [deleting, setDeleting] = useState(null);
    const [filterStatus, setFilterStatus] = useState('All');

    useEffect(() => {
        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                navigate('/wp-admin');
            } else {
                setUserEmail(session.user.email);
            }
        };

        const fetchBlogs = async () => {
            try {
                const { data, error } = await supabase
                    .from('blogs')
                    .select('*')
                    .neq('status', 'Trash') // Filter out trashed blogs
                    .order('date', { ascending: false });

                if (error) throw error;
                setBlogs(data || []);
            } catch (error) {
                console.error("Error fetching blogs:", error);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
        fetchBlogs();
    }, [navigate]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/wp-admin');
    };

    const handleDelete = async (id, currentStatus) => {
        if (!window.confirm("Are you sure you want to delete this blog?")) return;

        try {
            setDeleting(id);
            const { error } = await supabase
                .from('blogs')
                .update({ status: 'Trash', previous_status: currentStatus || 'Draft' })
                .eq('id', id);

            if (error) throw error;
            setBlogs(blogs.filter(blog => blog.id !== id));
            alert("Blog moved to trash.");
        } catch (error) {
            console.error("Error deleting blog:", error);
            alert("Failed to delete blog: " + error.message);
        } finally {
            setDeleting(null);
        }
    };

    // Filter logic
    const filteredBlogs = blogs.filter(blog => {
        const matchesSearch =
            blog.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            blog.author?.toLowerCase().includes(searchTerm.toLowerCase());

        // Assuming no strict status column yet, so 'All' matches everything.
        // If you add a status column later, implement logic here:
        // const matchesStatus = filterStatus === 'All' || blog.status === filterStatus;

        return matchesSearch;
    });

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-gray-500 font-medium animate-pulse">Loading Blogs...</p>
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
                            <button onClick={() => navigate('/wp-admin/dashboard')} className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all group">
                                <LayoutDashboard className="w-5 h-5 group-hover:text-gray-300" />
                                <span className="font-medium">Dashboard</span>
                            </button>
                            <button className="w-full flex items-center gap-3 px-4 py-3 bg-primary/10 text-primary border-r-[3px] border-primary rounded-lg transition-all">
                                <FileText className="w-5 h-5" />
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
                        {/* Mobile menu placeholder */}
                        <div className="w-8 h-8 bg-gray-900 rounded-lg"></div>
                    </div>

                    <div className="flex-1 max-w-xl hidden md:block">
                        {/* Empty spacer or global search */}
                    </div>

                    <div className="flex items-center gap-6">
                        <button className="relative p-2 text-gray-400 hover:bg-gray-100 rounded-lg transition-colors">
                            <Bell className="w-6 h-6" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                        </button>
                        <div className="h-8 w-[1px] bg-gray-200"></div>
                        <button
                            onClick={() => navigate('/wp-admin/add-new')}
                            className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transition-all font-bold text-sm"
                        >
                            <PlusCircle className="w-4 h-4" />
                            Create New Blog
                        </button>
                    </div>
                </header>

                <div className="p-8 max-w-7xl mx-auto space-y-6">
                    {/* Page Header & Stats */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">All Blogs</h1>
                            <p className="text-gray-500 mt-1 text-sm font-medium">Manage and track your content performance.</p>
                        </div>
                    </div>

                    {/* Filters & Controls */}
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 justify-between items-center transition-all hover:shadow-md">
                        {/* Status Tabs */}
                        <div className="flex bg-gray-100/80 p-1 rounded-lg w-full md:w-auto overflow-x-auto">
                            {['All', 'Published', 'Drafts'].map((status) => (
                                <button
                                    key={status}
                                    onClick={() => setFilterStatus(status)}
                                    className={`px-4 py-2 rounded-md text-sm font-semibold transition-all ${filterStatus === status
                                        ? 'bg-white text-gray-900 shadow-sm'
                                        : 'text-gray-500 hover:text-gray-700'
                                        }`}
                                >
                                    {status}
                                </button>
                            ))}
                        </div>

                        {/* Search & Filter Actions */}
                        <div className="flex gap-3 w-full md:w-auto">
                            <div className="relative flex-1 md:w-72 group">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                                <input
                                    type="text"
                                    placeholder="Search by title or author..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full bg-gray-50/50 border border-gray-200 rounded-lg py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all outline-none"
                                />
                            </div>
                            <button className="px-3 py-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center gap-2 text-sm font-medium">
                                <Filter className="w-4 h-4" />
                                <span className="hidden sm:inline">Filter</span>
                            </button>
                        </div>
                    </div>

                    {/* Blog Table */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50/50 border-b border-gray-100">
                                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider w-20">Image</th>
                                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Title & Slug</th>
                                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Author</th>
                                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {filteredBlogs.length > 0 ? filteredBlogs.map((blog) => (
                                        <tr key={blog.id} className="hover:bg-blue-50/30 transition-colors group">
                                            <td className="px-6 py-4">
                                                <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden border border-gray-200 relative group-hover:scale-110 transition-transform">
                                                    {blog.image_url ? (
                                                        <img src={blog.image_url} alt="" className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-gray-300">
                                                            <ImageIcon className="w-5 h-5" />
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 max-w-[300px] cursor-pointer" onClick={() => navigate(`/wp-admin/edit/${blog.id}`)}>
                                                <div className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors break-words text-sm mb-1">{blog.title || 'Untitled Blog'}</div>
                                                <div className="text-xs text-gray-400 font-mono truncate bg-gray-50 px-1.5 py-0.5 rounded-md inline-block border border-gray-100">
                                                    /{blog.slug || 'no-slug'}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-blue-100 to-purple-100 flex items-center justify-center text-xs font-bold text-blue-600 border border-blue-200">
                                                        {(blog.author || 'A').charAt(0)}
                                                    </div>
                                                    <span className="text-sm text-gray-600 font-medium">{blog.author || 'Admin'}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-1.5 text-gray-500 text-sm">
                                                    <Calendar className="w-3.5 h-3.5" />
                                                    <span>{new Date(blog.date).toLocaleDateString()}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-600 border border-emerald-100">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5"></span>
                                                    Published
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button
                                                        onClick={() => window.open(`/blog/${blog.slug}`, '_blank')}
                                                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                                                        title="View"
                                                    >
                                                        <Eye className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => navigate(`/wp-admin/edit/${blog.id}`)}
                                                        className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"
                                                        title="Edit"
                                                    >
                                                        <Edit className="w-4 h-4" />
                                                    </button>
                                                    <div className="w-[1px] h-4 bg-gray-200 mx-1"></div>
                                                    <button
                                                        onClick={() => handleDelete(blog.id, blog.status)}
                                                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                                        title="Delete"
                                                        disabled={deleting === blog.id}
                                                    >
                                                        {deleting === blog.id ? (
                                                            <div className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                                                        ) : (
                                                            <Trash2 className="w-4 h-4" />
                                                        )}
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan="6" className="px-6 py-24 text-center">
                                                <div className="flex flex-col items-center justify-center max-w-sm mx-auto">
                                                    <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-4">
                                                        <Search className="w-8 h-8" />
                                                    </div>
                                                    <h3 className="text-lg font-bold text-gray-900 mb-2">No blogs found</h3>
                                                    <p className="text-gray-500 text-sm mb-6">
                                                        We couldn't find any blogs matching your search "{searchTerm}". Try adjusting your filters.
                                                    </p>
                                                    <button
                                                        onClick={() => setSearchTerm('')}
                                                        className="text-blue-600 font-bold text-sm hover:underline hover:text-blue-700"
                                                    >
                                                        Clear all filters
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/50">
                            <span className="text-xs font-medium text-gray-500">
                                Showing <span className="font-bold text-gray-900">{filteredBlogs.length}</span> of <span className="font-bold text-gray-900">{blogs.length}</span> results
                            </span>
                            <div className="flex gap-2">
                                <button className="px-3 py-1.5 border border-gray-200 bg-white text-gray-500 rounded-md text-xs font-medium hover:bg-gray-50 hover:text-gray-900 disabled:opacity-50 transition-colors" disabled>
                                    Previous
                                </button>
                                <button className="px-3 py-1.5 border border-gray-200 bg-white text-gray-500 rounded-md text-xs font-medium hover:bg-gray-50 hover:text-gray-900 disabled:opacity-50 transition-colors" disabled>
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AllBlogs;
