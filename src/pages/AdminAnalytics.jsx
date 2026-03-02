import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Activity, Globe, Users, Clock, MousePointerClick, TrendingUp, BarChart2,
    Settings, ExternalLink, RefreshCw, Layers
} from 'lucide-react';
import { apiGetSession } from '../utils/apiClient';
import AdminSidebar from '../components/AdminSidebar';

const AdminAnalytics = () => {
    const navigate = useNavigate();
    const [userEmail, setUserEmail] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);

    // Mock real-time data for demonstration
    const [liveUsers, setLiveUsers] = useState(124);

    const fadeUp = (delay = 0) => ({
        hidden: { opacity: 0, y: 20 },
        show: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, delay, ease: [0.25, 0.1, 0.25, 1] }
        }
    });

    useEffect(() => {
        const checkAuth = async () => {
            const session = await apiGetSession();
            if (!session) {
                navigate('/wp-admin');
            } else {
                setUserEmail(session.user.email);
            }
            setIsLoading(false);
        };
        checkAuth();

        // Simulate fluctuating live users
        const interval = setInterval(() => {
            setLiveUsers(prev => {
                const fluctuation = Math.floor(Math.random() * 5) - 2; // -2 to +2
                return Math.max(0, prev + fluctuation);
            });
        }, 5000);

        return () => clearInterval(interval);
    }, [navigate]);

    const handleRefresh = () => {
        setIsRefreshing(true);
        setTimeout(() => setIsRefreshing(false), 1000);
    };

    if (isLoading) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-slate-50">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-slate-50/50 font-inter overflow-hidden">
            <AdminSidebar userEmail={userEmail} />

            <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
                <main className="flex-1 p-4 md:p-6 max-w-[1600px] mx-auto w-full flex flex-col h-full">

                    {/* Header */}
                    <div className="mb-4 shrink-0">
                        <motion.div
                            initial="hidden"
                            animate="show"
                            variants={fadeUp(0)}
                            className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 bg-white p-4 md:px-6 md:py-4 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 opacity-60"></div>

                            <div className="space-y-1 relative z-10 flex items-center gap-4">
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-50 text-blue-600 text-sm font-bold">
                                    <Activity className="w-4 h-4" />
                                    Google Analytics Integration
                                </div>
                                <h1 className="text-2xl font-black text-slate-900 tracking-tight">Real-Time Data monitor</h1>
                            </div>

                            <div className="flex flex-col sm:flex-row items-center gap-4 w-full xl:w-auto relative z-10">

                                <button
                                    onClick={handleRefresh}
                                    className="flex items-center gap-2 px-3 py-2.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-blue-600 rounded-xl text-sm font-bold shadow-sm transition-all shrink-0"
                                >
                                    <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-blue-600' : ''}`} />
                                </button>

                                <a
                                    href="https://analytics.google.com/"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white hover:bg-blue-700 hover:-translate-y-0.5 rounded-xl text-sm font-bold shadow-sm shadow-blue-500/30 transition-all shrink-0 w-full sm:w-auto"
                                >
                                    Open Full GA4
                                    <ExternalLink className="w-4 h-4" />
                                </a>
                            </div>
                        </motion.div>
                    </div>

                    <motion.div
                        initial="hidden"
                        animate="show"
                        variants={fadeUp(0.1)}
                        className="flex-1 w-full bg-slate-50 rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden min-h-[600px]"
                    >
                        <iframe
                            width="100%"
                            height="100%"
                            src="https://lookerstudio.google.com/embed/reporting/f032450b-5b71-47ba-b224-7228ceb4894e/page/p_oco6wt979c"
                            frameBorder="0"
                            style={{ border: 0 }}
                            allowFullScreen
                            sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
                        ></iframe>
                    </motion.div>
                </main>
            </div>
        </div>
    );
};

export default AdminAnalytics;
