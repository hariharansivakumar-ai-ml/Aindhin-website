import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiGetSession, apiGetAdminBlogs, apiUpdateBlog, apiLogout } from '../utils/apiClient';
import {
    Search, Bell, Edit, PlusCircle,
    Filter, Eye, Image as ImageIcon, Calendar, Trash2
} from 'lucide-react';
import AdminSidebar from '../components/AdminSidebar';

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
            const session = await apiGetSession();
            if (!session) {
                navigate('/wp-admin');
            } else {
                setUserEmail(session.user.email);
            }
        };

        const fetchBlogs = async () => {
            try {
                const data = await apiGetAdminBlogs('all');
                setBlogs(data || []);
            } catch (error) {
                console.error('Error fetching blogs:', error);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
        fetchBlogs();
    }, [navigate]);

    const handleLogout = () => {
        apiLogout();
        navigate('/wp-admin');
    };

    const handleDelete = async (id, currentStatus) => {
        if (!window.confirm("Are you sure you want to delete this blog?")) return;

        try {
            setDeleting(id);
            await apiUpdateBlog(id, { status: 'Trash', previous_status: currentStatus || 'Draft' });
            setBlogs(blogs.filter(blog => blog.id !== id));
            alert('Blog moved to trash.');
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

        const matchesStatus = filterStatus === 'All'
            ? true
            : filterStatus === 'Drafts'
                ? blog.status === 'Draft'
                : blog.status === filterStatus;

        return matchesSearch && matchesStatus;
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
        <div className="min-h-screen bg-slate-50 font-inter flex">
            <AdminSidebar userEmail={userEmail} />

            {/* Main Content */}
            <main className="flex-1 min-w-0 overflow-auto">


                <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6">

                    {/* Page Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">All Blogs</h1>
                            <p className="text-gray-400 mt-0.5 text-sm">
                                {filteredBlogs.length} post{filteredBlogs.length !== 1 ? 's' : ''} found
                            </p>
                        </div>
                        <button
                            onClick={() => navigate('/wp-admin/add-new')}
                            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl hover:shadow-lg hover:shadow-violet-500/30 transition-all font-bold text-sm shrink-0"
                        >
                            <PlusCircle className="w-4 h-4" />
                            New Post
                        </button>
                    </div>

                    {/* Filter Bar */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex flex-col sm:flex-row gap-3 items-center">
                        {/* Status pills */}
                        <div className="flex bg-slate-100 p-1 rounded-xl gap-1 shrink-0">
                            {['All', 'Published', 'Drafts'].map((s) => (
                                <button
                                    key={s}
                                    onClick={() => setFilterStatus(s)}
                                    className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${filterStatus === s
                                        ? 'bg-white text-gray-900 shadow-sm'
                                        : 'text-gray-400 hover:text-gray-700'
                                        }`}
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                        {/* Search */}
                        <div className="relative flex-1 w-full group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-violet-500 transition-colors" />
                            <input
                                type="text"
                                placeholder="Search by title or author…"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-slate-50 border border-gray-200 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-violet-500/20 focus:border-violet-400 focus:bg-white transition-all outline-none"
                            />
                        </div>
                    </div>

                    {/* Card Grid */}
                    {filteredBlogs.length === 0 ? (
                        <div className="bg-white rounded-2xl border border-dashed border-gray-200 py-24 flex flex-col items-center justify-center text-center">
                            <div className="w-16 h-16 bg-violet-50 rounded-2xl flex items-center justify-center mb-4">
                                <Search className="w-7 h-7 text-violet-300" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-800 mb-1">No posts found</h3>
                            <p className="text-gray-400 text-sm mb-5 max-w-xs">
                                {searchTerm ? `No results for "${searchTerm}".` : 'No blog posts yet.'}
                            </p>
                            {searchTerm && (
                                <button onClick={() => setSearchTerm('')} className="text-violet-600 font-bold text-sm hover:underline">
                                    Clear search
                                </button>
                            )}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            {filteredBlogs.map((blog) => (
                                <div
                                    key={blog.id}
                                    className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-[0_8px_30px_rgba(109,40,217,0.12)] hover:-translate-y-0.5 transition-all duration-300 overflow-hidden flex flex-col"
                                >
                                    {/* Thumbnail */}
                                    <div className="relative h-44 bg-gradient-to-br from-violet-50 to-indigo-100 shrink-0 overflow-hidden">
                                        {blog.image_url ? (
                                            <img
                                                src={blog.image_url}
                                                alt={blog.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                onError={(e) => { e.target.style.display = 'none'; }}
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <ImageIcon className="w-10 h-10 text-indigo-200" />
                                            </div>
                                        )}
                                        {/* Status badge */}
                                        <span className={`absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm ${blog.status === 'Published'
                                            ? 'bg-emerald-500 text-white'
                                            : 'bg-amber-400 text-white'
                                            }`}>
                                            {blog.status || 'Draft'}
                                        </span>
                                        {/* Hover action overlay */}
                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2">
                                            <button
                                                onClick={() => window.open(`/${blog.slug}`, '_blank')}
                                                className="p-2.5 bg-white/90 text-gray-800 rounded-xl hover:bg-white transition-colors"
                                                title="View"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => navigate(`/wp-admin/edit/${blog.id}`)}
                                                className="p-2.5 bg-violet-600 text-white rounded-xl hover:bg-violet-700 transition-colors"
                                                title="Edit"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(blog.id, blog.status)}
                                                disabled={deleting === blog.id}
                                                className="p-2.5 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors"
                                                title="Move to Trash"
                                            >
                                                {deleting === blog.id ? (
                                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                ) : (
                                                    <Trash2 className="w-4 h-4" />
                                                )}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Card Body */}
                                    <div className="p-4 flex flex-col flex-grow">
                                        {/* Meta */}
                                        <div className="flex items-center gap-2 text-[11px] text-gray-400 mb-2">
                                            <div className="w-5 h-5 rounded-full bg-gradient-to-br from-violet-400 to-indigo-400 flex items-center justify-center text-white text-[9px] font-bold shrink-0">
                                                {(blog.author || 'A').charAt(0).toUpperCase()}
                                            </div>
                                            <span className="font-medium text-gray-500 truncate">{blog.author || 'Admin'}</span>
                                            <span className="w-1 h-1 rounded-full bg-gray-300 shrink-0" />
                                            <span className="flex items-center gap-1 shrink-0">
                                                <Calendar className="w-3 h-3" />
                                                {blog.date ? new Date(blog.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—'}
                                            </span>
                                        </div>

                                        {/* Title */}
                                        <h3
                                            className="text-sm font-bold text-gray-900 leading-snug line-clamp-2 mb-1 cursor-pointer hover:text-violet-600 transition-colors"
                                            onClick={() => navigate(`/wp-admin/edit/${blog.id}`)}
                                        >
                                            {blog.title || 'Untitled'}
                                        </h3>

                                        {/* Slug */}
                                        <p className="text-[11px] text-gray-400 font-mono truncate">/{blog.slug || 'no-slug'}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Results count */}
                    {filteredBlogs.length > 0 && (
                        <p className="text-center text-xs text-gray-400 pb-4">
                            Showing {filteredBlogs.length} of {blogs.length} posts
                        </p>
                    )}
                </div>
            </main>
        </div>
    );
};

export default AllBlogs;
