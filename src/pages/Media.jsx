import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Upload, Search, Trash2, Image as ImageIcon,
    MoreVertical, Copy, Check, X, Download, Eye, ExternalLink, ArrowLeft
} from 'lucide-react';
import { apiGetSession, apiGetMedia, apiUploadImage, apiDeleteMedia } from '../utils/apiClient';
import AdminSidebar from '../components/AdminSidebar';

const Media = () => {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const [userEmail, setUserEmail] = useState('');
    const [loading, setLoading] = useState(true);
    const [mediaItems, setMediaItems] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [copiedId, setCopiedId] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);

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

    const fetchMedia = async () => {
        try {
            const data = await apiGetMedia();
            setMediaItems(data || []);
        } catch (error) {
            console.error('Error fetching media:', error);
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
        fetchMedia();
    }, [navigate]);

    const handleUpload = async (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        setUploading(true);
        try {
            for (const file of files) {
                await apiUploadImage(file);
            }
            await fetchMedia();
        } catch (error) {
            alert("Upload failed: " + error.message);
        } finally {
            setUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    const handleDelete = async (public_id) => {
        if (!window.confirm("Are you sure you want to delete this image permanently?")) return;
        try {
            await apiDeleteMedia(public_id);
            setMediaItems(mediaItems.filter(item => item.name !== public_id));
            if (selectedItem?.name === public_id) setSelectedItem(null);
        } catch (error) {
            alert("Delete failed: " + error.message);
        }
    };

    const copyToClipboard = (url, id) => {
        navigator.clipboard.writeText(url);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const filteredMedia = mediaItems.filter(item =>
        item.filename?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-violet-600 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-slate-400 font-medium animate-pulse">Organizing Library...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-slate-50 font-inter overflow-hidden">
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
                            <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Media Library</h1>
                            <p className="text-slate-400 text-sm font-medium flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                                {mediaItems.length} assets available for use
                            </p>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="relative group flex-1 md:w-80">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-violet-600 transition-colors" />
                                <input
                                    type="text"
                                    placeholder="Search library..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-violet-600/10 focus:border-violet-600/50 transition-all shadow-sm"
                                />
                            </div>
                            <input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                onChange={handleUpload}
                                multiple
                                accept="image/*"
                            />
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                disabled={uploading}
                                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-2xl hover:shadow-xl hover:shadow-violet-600/20 transition-all font-bold text-sm shrink-0 active:scale-95 disabled:opacity-50"
                            >
                                {uploading ? (
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                ) : (
                                    <Upload className="w-4 h-4" />
                                )}
                                {uploading ? 'Uploading...' : 'Upload Files'}
                            </button>
                        </div>
                    </motion.div>

                    {/* Media Grid */}
                    {filteredMedia.length > 0 ? (
                        <motion.div
                            variants={stagger}
                            initial="hidden"
                            animate="show"
                            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6"
                        >
                            {filteredMedia.map((item) => (
                                <motion.div
                                    key={item.name}
                                    variants={fadeUp()}
                                    className="group relative bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 aspect-square overflow-hidden cursor-pointer"
                                    onClick={() => setSelectedItem(item)}
                                >
                                    <img
                                        src={item.url}
                                        alt={item.filename}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />

                                    {/* Overlays */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                                        <p className="text-[10px] text-white font-medium truncate mb-2">{item.filename}</p>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    copyToClipboard(item.url, item.name);
                                                }}
                                                className="p-1.5 bg-white/20 backdrop-blur-md rounded-lg hover:bg-white/40 transition-colors text-white"
                                            >
                                                {copiedId === item.name ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                                            </button>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDelete(item.name);
                                                }}
                                                className="p-1.5 bg-red-500/80 backdrop-blur-md rounded-lg hover:bg-red-600 transition-colors text-white ml-auto"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Action indicator */}
                                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <div className="p-1.5 bg-white shadow-lg rounded-lg text-slate-400">
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
                                <div className="relative w-24 h-24 bg-white rounded-3xl shadow-xl border border-slate-50 flex items-center justify-center">
                                    <ImageIcon className="w-10 h-10 text-slate-200" />
                                </div>
                                <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-violet-600 rounded-2xl flex items-center justify-center shadow-lg border-4 border-white">
                                    <Upload className="w-4 h-4 text-white" />
                                </div>
                            </div>

                            <h3 className="text-2xl font-black text-slate-900 mb-2 tracking-tight">Empty Canvas</h3>
                            <p className="text-slate-400 text-sm mb-10 max-w-sm mx-auto leading-relaxed">
                                Your media library is looking a bit lonely. Upload some stunning visuals to power your stories.
                            </p>

                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className="px-10 py-4 bg-slate-900 text-white font-bold rounded-2xl shadow-xl shadow-slate-950/10 hover:bg-violet-600 transition-all active:scale-95 flex items-center gap-3"
                            >
                                <Upload className="w-5 h-5" />
                                Select First Asset
                            </button>
                        </motion.div>
                    )}
                </main>
            </div>

            {/* Detail / Edit Modal */}
            <AnimatePresence>
                {selectedItem && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedItem(null)}
                            className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative bg-white w-full max-w-5xl h-full max-h-[85vh] rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col md:flex-row"
                        >
                            {/* Preview Area */}
                            <div className="flex-1 bg-slate-50 flex items-center justify-center p-8 relative min-h-[300px]">
                                <img
                                    src={selectedItem.url}
                                    alt={selectedItem.filename}
                                    className="max-w-full max-h-full rounded-2xl shadow-2xl object-contain"
                                />
                                <button
                                    onClick={() => setSelectedItem(null)}
                                    className="absolute top-6 left-6 p-3 bg-white/80 backdrop-blur-md rounded-2xl text-slate-900 hover:bg-white transition-all shadow-xl md:hidden"
                                >
                                    <ArrowLeft size={20} />
                                </button>
                            </div>

                            {/* Info Area */}
                            <div className="w-full md:w-80 lg:w-96 p-8 border-l border-slate-100 flex flex-col bg-white overflow-y-auto shrink-0">
                                <div className="flex items-center justify-between mb-8">
                                    <h2 className="text-xl font-black text-slate-900 tracking-tight">Asset Details</h2>
                                    <button
                                        onClick={() => setSelectedItem(null)}
                                        className="p-2 bg-slate-50 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>

                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Filename</label>
                                        <p className="text-sm font-bold text-slate-800 break-all">{selectedItem.filename}</p>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Public ID</label>
                                        <p className="text-[11px] font-mono text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-100 truncate">{selectedItem.name}</p>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Public URL</label>
                                        <div className="flex gap-2">
                                            <div className="flex-1 text-[11px] font-mono text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-100 truncate">
                                                {selectedItem.url}
                                            </div>
                                            <button
                                                onClick={() => copyToClipboard(selectedItem.url, 'modal')}
                                                className="p-3 bg-slate-900 text-white rounded-xl hover:bg-violet-600 transition-all shrink-0"
                                            >
                                                {copiedId === 'modal' ? <Check size={16} /> : <Copy size={16} />}
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-auto pt-8 flex flex-col gap-3">
                                    <a
                                        href={selectedItem.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center gap-2 w-full py-4 bg-slate-50 text-slate-900 font-bold rounded-2xl hover:bg-slate-100 transition-all text-sm"
                                    >
                                        <ExternalLink size={16} />
                                        Open Original
                                    </a>
                                    <button
                                        onClick={() => handleDelete(selectedItem.name)}
                                        className="flex items-center justify-center gap-2 w-full py-4 bg-red-50 text-red-600 font-bold rounded-2xl hover:bg-red-500 hover:text-white transition-all text-sm"
                                    >
                                        <Trash2 size={16} />
                                        Delete Forever
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Media;
