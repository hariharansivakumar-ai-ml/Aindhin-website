
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../utils/supabaseClient';
import {
    LayoutDashboard, FileText, PlusCircle, Trash2, LogOut,
    Search, Bell, MoreVertical, Edit, Trash, Eye, Clock, Menu, X
} from 'lucide-react';

const AdminDrafts = () => {
    const navigate = useNavigate();
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userEmail, setUserEmail] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [showSidebar, setShowSidebar] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                navigate('/wp-admin');
            } else {
                setUserEmail(session.user.email);
            }
        };

        const fetchDrafts = async () => {
            try {
                const { data, error } = await supabase
                    .from('blogs')
                    .select('*')
                    .or('status.eq.Draft,status.is.null') // Include Drafts and legacy blogs without status
                    .order('date', { ascending: false });

                if (error) throw error;
                // Double check filtering in JS to be safe
                setBlogs(data?.filter(b => b.status === 'Draft' || !b.status) || []);
            } catch (error) {
                console.error("Error fetching drafts:", error);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
        fetchDrafts();
    }, [navigate]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/wp-admin');
    };

    const handleMoveToTrash = async (id) => {
        if (!window.confirm("Move this draft to trash?")) return;
        try {
            const { error } = await supabase
                .from('blogs')
                .update({ status: 'Trash' })
                .eq('id', id);

            if (error) throw error;
            setBlogs(blogs.filter(blog => blog.id !== id));
            alert("Moved to trash.");
        } catch (error) {
            console.error("Error moving to trash:", error);
        }
    };

    const filteredBlogs = blogs.filter(blog =>
        blog.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.author?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-gray-500 font-medium animate-pulse">Loading Drafts...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F4F6F8] font-inter flex">
            {/* Sidebar - Desktop */}
            <aside className="w-72 bg-[#111827] text-white flex-col hidden md:flex sticky top-0 h-screen overflow-y-auto shrink-0">
                <div className="p-8">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                            <span className="font-bold text-xl">A</span>
                        </div>
                        <h2 className="text-xl font-bold tracking-tight">Admin<span className="text-primary">Panel</span></h2>
                    </div>

                    <nav className="space-y-1">
                        <p className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Main Menu</p>
                        <button onClick={() => navigate('/wp-admin/dashboard')} className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all group text-left">
                            <LayoutDashboard className="w-5 h-5 group-hover:text-gray-300" />
                            <span className="font-medium">Dashboard</span>
                        </button>
                        <button onClick={() => navigate('/wp-admin/all-blogs')} className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all group text-left">
                            <FileText className="w-5 h-5 group-hover:text-gray-300" />
                            <span className="font-medium">All Blogs</span>
                        </button>
                        <button onClick={() => navigate('/wp-admin/drafts')} className="w-full flex items-center gap-3 px-4 py-3 bg-primary/10 text-primary border-r-[3px] border-primary rounded-lg transition-all text-left">
                            <Clock className="w-5 h-5" />
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

                <div className="mt-auto p-6 border-t border-gray-800">
                    <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-red-500/30 text-red-400 rounded-xl hover:bg-red-500/10 transition-all font-medium text-sm">
                        <LogOut className="w-4 h-4" />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
                <nav className="bg-white px-6 py-3 flex items-center justify-between shadow-sm sticky top-0 z-50">
                    <button onClick={() => setShowSidebar(true)} className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors md:hidden">
                        <Menu className="w-6 h-6" />
                    </button>
                    <div className="flex items-center gap-6">
                        <div className="relative group hidden sm:block">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-primary" />
                            <input
                                type="text"
                                placeholder="Search drafts..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all w-64"
                            />
                        </div>
                        <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full">
                            <Bell className="w-6 h-6" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                        </button>
                    </div>
                </nav>

                <main className="flex-1 p-6 md:p-8 lg:p-10">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Drafts</h1>
                            <p className="text-gray-500 text-sm mt-1 font-medium">Manage your unpublished content</p>
                        </div>
                        <button
                            onClick={() => navigate('/wp-admin/add-new')}
                            className="flex items-center gap-2 px-6 py-2.5 bg-black text-white rounded-xl hover:bg-gray-800 transition-all font-bold text-sm shadow-lg shadow-black/10"
                        >
                            <PlusCircle className="w-4 h-4" />
                            Create New Post
                        </button>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                        {filteredBlogs.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-gray-50 border-b border-gray-100">
                                            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Post Details</th>
                                            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Author</th>
                                            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Last Saved</th>
                                            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {filteredBlogs.map((blog) => (
                                            <tr key={blog.id} className="hover:bg-gray-50/30 transition-all group">
                                                <td className="px-6 py-5">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 overflow-hidden border border-gray-200 flex-shrink-0">
                                                            {blog.image_url ? (
                                                                <img src={blog.image_url} alt="" className="w-full h-full object-cover" />
                                                            ) : (
                                                                <FileText size={18} />
                                                            )}
                                                        </div>
                                                        <div className="overflow-hidden">
                                                            <p className="font-bold text-gray-900 text-sm truncate max-w-[300px] cursor-pointer hover:text-primary transition-colors" onClick={() => navigate(`/wp-admin/edit/${blog.id}`)}>
                                                                {blog.title || 'Untitled Draft'}
                                                            </p>
                                                            <p className="text-xs text-gray-400 mt-0.5 truncate max-w-[300px]">{blog.slug || 'no-slug'}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5">
                                                    <span className="text-sm font-medium text-gray-600">{blog.author || 'Admin'}</span>
                                                </td>
                                                <td className="px-6 py-5">
                                                    <div className="flex items-center gap-2 text-gray-500 text-xs font-medium">
                                                        <Clock size={14} className="text-gray-400" />
                                                        {new Date(blog.date).toLocaleDateString()}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5 text-right">
                                                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <button onClick={() => navigate(`/wp-admin/edit/${blog.id}`)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all" title="Edit">
                                                            <Edit size={18} />
                                                        </button>
                                                        <button onClick={() => handleMoveToTrash(blog.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all" title="Move to Trash">
                                                            <Trash size={18} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="p-20 text-center">
                                <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center mx-auto mb-6 text-gray-200">
                                    <Clock size={40} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">No drafts found</h3>
                                <p className="text-gray-500 max-w-sm mx-auto mb-8">You haven't saved any drafts yet. Start writing your next masterpiece.</p>
                                <button
                                    onClick={() => navigate('/wp-admin/add-new')}
                                    className="px-8 py-3 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                                >
                                    Start Writing
                                </button>
                            </div>
                        )}
                    </div>
                </main>
            </div>

            {/* Mobile Sidebar Overlay */}
            {showSidebar && (
                <div className="fixed inset-0 bg-black/50 z-[100] md:hidden" onClick={() => setShowSidebar(false)} />
            )}

            {/* Mobile Sidebar */}
            <div className={`fixed inset-y-0 left-0 w-64 bg-[#111827] z-[101] transform transition-transform duration-300 md:hidden ${showSidebar ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="p-8 border-b border-gray-800 flex justify-between items-center text-white">
                    <span className="font-bold font-inter tracking-wider">Aindhin Admin</span>
                    <X className="w-5 h-5 cursor-pointer" onClick={() => setShowSidebar(false)} />
                </div>
                <div className="p-4 space-y-2 text-gray-400">
                    <button onClick={() => navigate('/wp-admin/dashboard')} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 rounded-lg active:text-white text-left font-inter">
                        <LayoutDashboard className="w-5 h-5" />
                        <span>Dashboard</span>
                    </button>
                    <button onClick={() => navigate('/wp-admin/all-blogs')} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 rounded-lg active:text-white text-left font-inter">
                        <FileText className="w-5 h-5" />
                        <span>All Blogs</span>
                    </button>
                    <button onClick={() => navigate('/wp-admin/drafts')} className="w-full flex items-center gap-3 px-4 py-3 bg-primary/10 text-primary rounded-lg text-left font-inter">
                        <Clock className="w-5 h-5" />
                        <span>Drafts</span>
                    </button>
                    <button onClick={() => navigate('/wp-admin/add-new')} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 rounded-lg active:text-white text-left font-inter">
                        <PlusCircle className="w-5 h-5" />
                        <span>Add New Blog</span>
                    </button>
                    <button onClick={() => navigate('/wp-admin/trash')} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 rounded-lg active:text-white text-left font-inter">
                        <Trash2 className="w-5 h-5" />
                        <span>Trash</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminDrafts;
