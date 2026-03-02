import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Users, Search, Trash2, Calendar, Mail, Phone, ExternalLink, Download
} from 'lucide-react';
import { apiGetSession, apiGetAllSubscribers, apiDeleteSubscriber } from '../utils/apiClient';
import AdminSidebar from '../components/AdminSidebar';

const AdminSubscribers = () => {
    const navigate = useNavigate();
    const [userEmail, setUserEmail] = useState('');
    const [loading, setLoading] = useState(true);
    const [subscribers, setSubscribers] = useState([]);
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
        show: { transition: { staggerChildren: 0.05 } }
    };

    const getAvatarColor = (name) => {
        const colors = [
            'bg-blue-100 text-blue-600',
            'bg-emerald-100 text-emerald-600',
            'bg-amber-100 text-amber-600',
            'bg-rose-100 text-rose-600',
            'bg-violet-100 text-violet-600',
            'bg-cyan-100 text-cyan-600',
        ];
        if (!name) return colors[4];
        const charCode = name.charCodeAt(0);
        return colors[charCode % colors.length];
    };

    const fetchSubscribers = async () => {
        try {
            setLoading(true);
            const data = await apiGetAllSubscribers();
            setSubscribers(data || []);
        } catch (error) {
            console.error('Error fetching subscribers:', error);
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
                fetchSubscribers();
            }
        };
        checkAuth();
    }, [navigate]);

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to remove this subscriber?')) return;
        try {
            await apiDeleteSubscriber(id);
            setSubscribers(subscribers.filter(s => s.id !== id));
        } catch (error) {
            alert('Failed to delete subscriber: ' + error.message);
        }
    };

    const handleExportCSV = () => {
        if (subscribers.length === 0) {
            alert("No subscribers to export.");
            return;
        }

        const headers = ["Name", "Email", "Phone", "Subscribed On"];
        const csvRows = [
            headers.join(","),
            ...subscribers.map((sub) => {
                const name = `"${sub.name || ""}"`;
                const email = `"${sub.email || ""}"`;
                const phone = `"${sub.phone || ""}"`;
                const date = sub.created_at ? `"${new Date(sub.created_at).toLocaleDateString()}"` : '""';
                return [name, email, phone, date].join(",");
            })
        ];

        const blob = new Blob([csvRows.join("\n")], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", `subscribers_export_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const filteredSubscribers = subscribers.filter(s => {
        return (
            (s.name && s.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (s.email && s.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (s.phone && s.phone.includes(searchTerm))
        );
    });

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-violet-600 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-slate-400 font-medium animate-pulse">Loading subscribers...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-slate-50/50 font-inter overflow-hidden">
            <AdminSidebar userEmail={userEmail} />

            <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
                <main className="flex-1 p-6 md:p-8 max-w-7xl mx-auto w-full">

                    {/* Header */}
                    <div className="mb-8">
                        <motion.div
                            initial="hidden"
                            animate="show"
                            variants={fadeUp(0)}
                            className="flex flex-col xl:flex-row xl:items-end justify-between gap-6 bg-white p-6 md:p-8 rounded-[2rem] border border-slate-100 shadow-sm relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-64 h-64 bg-violet-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 opacity-60"></div>

                            <div className="space-y-2 relative z-10">
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-violet-50 text-violet-600 text-sm font-bold mb-2">
                                    <Users className="w-4 h-4" />
                                    Newsletter Audience
                                </div>
                                <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Subscribers</h1>
                                <p className="text-slate-500 font-medium">
                                    Manage your email list and contacts efficiently.
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row items-center gap-4 w-full xl:w-auto relative z-10">
                                {/* Stat box */}
                                <div className="flex items-center gap-4 px-5 py-3.5 bg-slate-50/80 backdrop-blur-sm rounded-2xl border border-slate-100 w-full sm:w-auto">
                                    <div className="p-2.5 bg-white rounded-xl shadow-sm text-violet-600">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Active</p>
                                        <p className="text-xl font-black text-slate-900 leading-none mt-1">{subscribers.length}</p>
                                    </div>
                                </div>

                                <div className="relative group w-full sm:w-80">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-violet-600 transition-colors" />
                                    <input
                                        type="text"
                                        placeholder="Search by name, email, or phone..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-11 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-violet-600/10 focus:border-violet-600/50 transition-all shadow-sm"
                                    />
                                </div>

                                <button
                                    onClick={handleExportCSV}
                                    className="flex items-center gap-2 px-5 py-3.5 bg-slate-900 text-white hover:bg-slate-800 rounded-2xl text-sm font-bold shadow-sm shadow-slate-900/20 hover:shadow-md hover:-translate-y-0.5 transition-all w-full sm:w-auto justify-center shrink-0"
                                >
                                    <Download className="w-4 h-4" />
                                    Export CSV
                                </button>
                            </div>
                        </motion.div>
                    </div>

                    {/* Subscribers List */}
                    {filteredSubscribers.length > 0 ? (
                        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-slate-50/80 border-b border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-wider">
                                            <th className="px-6 py-5">Name</th>
                                            <th className="px-6 py-5">Contact Details</th>
                                            <th className="px-6 py-5">Subscribed On</th>
                                            <th className="px-6 py-5 text-right flex-shrink-0">Actions</th>
                                        </tr>
                                    </thead>
                                    <motion.tbody
                                        variants={stagger}
                                        initial="hidden"
                                        animate="show"
                                        className="divide-y divide-slate-100"
                                    >
                                        <AnimatePresence>
                                            {filteredSubscribers.map((subscriber) => (
                                                <motion.tr
                                                    key={subscriber.id}
                                                    variants={fadeUp()}
                                                    exit={{ opacity: 0, x: -20 }}
                                                    className="group hover:bg-slate-50/50 transition-colors"
                                                >
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-4">
                                                            <div className={`w-11 h-11 rounded-2xl flex items-center justify-center font-bold text-lg shadow-sm ${getAvatarColor(subscriber.name)}`}>
                                                                {subscriber.name ? subscriber.name.charAt(0).toUpperCase() : '?'}
                                                            </div>
                                                            <span className="font-semibold text-slate-900 text-sm">
                                                                {subscriber.name || '-'}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex flex-col gap-1.5">
                                                            <div className="flex items-center gap-2 text-sm text-slate-600">
                                                                <Mail className="w-3.5 h-3.5 text-slate-400" />
                                                                <a href={`mailto:${subscriber.email}`} className="hover:text-violet-600 transition-colors">
                                                                    {subscriber.email}
                                                                </a>
                                                            </div>
                                                            <div className="flex items-center gap-2 text-xs font-medium text-slate-500 bg-slate-50/50 inline-flex px-2 py-1 rounded-lg w-fit">
                                                                <Phone className="w-3.5 h-3.5 text-slate-400" />
                                                                <a href={`tel:${subscriber.phone}`} className="hover:text-violet-600 transition-colors">
                                                                    {subscriber.phone || 'No phone provided'}
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-2 text-sm text-slate-500">
                                                            <Calendar className="w-4 h-4 text-slate-400" />
                                                            {subscriber.created_at ? new Date(subscriber.created_at).toLocaleDateString() : 'N/A'}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        <button
                                                            onClick={() => handleDelete(subscriber.id)}
                                                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all border border-transparent hover:border-red-100"
                                                            title="Delete Subscriber"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </td>
                                                </motion.tr>
                                            ))}
                                        </AnimatePresence>
                                    </motion.tbody>
                                </table>
                            </div>
                        </div>
                    ) : (
                        <motion.div
                            initial="hidden"
                            animate="show"
                            variants={fadeUp(0.2)}
                            className="bg-white rounded-[2rem] border border-slate-100 py-32 flex flex-col items-center justify-center text-center shadow-sm relative overflow-hidden"
                        >
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-slate-50 rounded-full blur-3xl opacity-50"></div>

                            <div className="relative mb-8">
                                <div className="absolute inset-0 bg-violet-100 blur-2xl opacity-40 rounded-full animate-pulse"></div>
                                <div className="relative w-24 h-24 bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-50 flex items-center justify-center text-slate-300">
                                    <Users size={40} />
                                </div>
                            </div>

                            <h3 className="text-2xl font-black text-slate-900 mb-3 tracking-tight relative z-10">No Subscribers Found</h3>
                            <p className="text-slate-500 font-medium mb-10 max-w-sm mx-auto leading-relaxed relative z-10">
                                {searchTerm ? "We couldn't find any subscribers matching your search criteria. Try a different term." : "Wait for visitors to subscribe to your newsletter. You can also adjust your search keywords."}
                            </p>
                        </motion.div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default AdminSubscribers;
