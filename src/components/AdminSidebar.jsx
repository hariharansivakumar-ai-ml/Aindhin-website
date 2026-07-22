import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileText, PlusCircle, Trash2, LogOut, Clock, BarChart2, Image, Menu, X, MessageSquare, Users, Activity, HelpCircle } from 'lucide-react';
import { apiLogout } from '../utils/apiClient';

const navItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/wp-admin/dashboard' },
    { label: 'All Blogs', icon: FileText, path: '/wp-admin/all-blogs' },
    { label: 'Analytics', icon: Activity, path: '/wp-admin/analytics' },
    { label: 'Media', icon: Image, path: '/wp-admin/media' },
    { label: 'Comments', icon: MessageSquare, path: '/wp-admin/comments' },
    { label: 'Subscribers', icon: Users, path: '/wp-admin/subscribers' },
    { label: 'Enquiries', icon: HelpCircle, path: '/wp-admin/enquiries' },
    { label: 'Drafts', icon: Clock, path: '/wp-admin/drafts' },
    { label: 'Add New Blog', icon: PlusCircle, path: '/wp-admin/add-new' },
    { label: 'Trash', icon: Trash2, path: '/wp-admin/trash' },
];

/* ── Inner sidebar content ─────────────────────────────────── */
const SidebarContent = ({ userEmail, onNavigate }) => {
    const location = useLocation();
    const initials = (userEmail || 'A').charAt(0).toUpperCase();
    const username = userEmail ? userEmail.split('@')[0] : 'Admin';
    const navigate = useNavigate();

    const handleLogout = () => {
        apiLogout();
        navigate('/wp-admin');
    };

    return (
        <div className="flex flex-col h-full">
            {/* Logo */}
            <div className="px-6 pt-8 pb-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/30 shrink-0">
                        <BarChart2 className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h1 className="text-white font-extrabold text-lg tracking-tight leading-none">Aindhin</h1>
                        <p className="text-violet-400 text-xs font-medium">Admin Panel</p>
                    </div>
                </div>
            </div>

            {/* Nav */}
            <nav className="flex-1 px-3 space-y-1">
                <p className="px-3 text-[10px] font-bold text-white/30 uppercase tracking-widest mb-3">Main Menu</p>
                {navItems.map(({ label, icon: Icon, path }) => {
                    const isActive = location.pathname === path;
                    return (
                        <button
                            key={label}
                            onClick={() => onNavigate(path)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-left
                                ${isActive
                                    ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/25'
                                    : 'text-white/50 hover:text-white hover:bg-white/8'
                                }`}
                        >
                            <Icon className="shrink-0" size={18} />
                            {label}
                        </button>
                    );
                })}
            </nav>

            {/* User card + Sign Out */}
            <div className="p-4 m-3 rounded-2xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-sm font-bold text-white shadow-md shrink-0">
                        {initials}
                    </div>
                    <div className="overflow-hidden min-w-0">
                        <p className="text-sm font-semibold text-white truncate">{username}</p>
                        <p className="text-xs text-white/40 truncate">Administrator</p>
                    </div>
                </div>
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-red-400 border border-red-500/20 hover:bg-red-500/10 hover:text-red-300 transition-all text-xs font-semibold"
                >
                    <LogOut className="w-3.5 h-3.5" />
                    Sign Out
                </button>
            </div>
        </div>
    );
};

/* ── Main exported component ───────────────────────────────── */
const AdminSidebar = ({ userEmail }) => {
    const [showMobile, setShowMobile] = useState(false);
    const navigate = useNavigate();

    const handleNavigate = (path) => {
        navigate(path);
        setShowMobile(false);
    };

    return (
        <>
            {/* Desktop sidebar */}
            <aside className="hidden md:flex w-64 xl:w-72 bg-[#0f1117] flex-col shrink-0 h-screen sticky top-0 overflow-y-auto z-20">
                <SidebarContent userEmail={userEmail} onNavigate={handleNavigate} />
            </aside>

            {/* Mobile hamburger button — rendered outside sidebar so pages must include it */}
            <button
                onClick={() => setShowMobile(true)}
                className="md:hidden fixed top-4 left-4 z-30 p-2.5 rounded-xl bg-[#0f1117] text-white shadow-lg"
                aria-label="Open menu"
            >
                <Menu className="w-5 h-5" />
            </button>

            {/* Mobile drawer */}
            {showMobile && (
                <div className="fixed inset-0 z-50 md:hidden">
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={() => setShowMobile(false)}
                    />
                    <aside className="absolute left-0 top-0 bottom-0 w-72 bg-[#0f1117] shadow-2xl overflow-y-auto">
                        <button
                            onClick={() => setShowMobile(false)}
                            className="absolute top-4 right-4 p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                        <SidebarContent userEmail={userEmail} onNavigate={handleNavigate} />
                    </aside>
                </div>
            )}
        </>
    );
};

export default AdminSidebar;
