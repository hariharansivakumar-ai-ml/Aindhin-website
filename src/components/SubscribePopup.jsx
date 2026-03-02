import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2 } from 'lucide-react';
import { apiCreateSubscriber } from '../utils/apiClient';

/* 
 * NOTE: If you uploaded a specific picture to the assets folder, replace 'download image.webp' 
 * below with the exact filename of the image you added (e.g., 'newsletter_popup.png').
 */
import popupImage from '../assets/newsletter_popup_1772252090058.png';

const SubscribePopup = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [hasClosed, setHasClosed] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    // Form state
    const [formData, setFormData] = useState({ name: '', email: '', phone: '' });

    useEffect(() => {
        if (hasClosed) return;
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 5000);
        return () => clearTimeout(timer);
    }, [hasClosed]);

    const handleClose = () => {
        setIsVisible(false);
        setHasClosed(true);
    };

    const handleOpenForm = () => {
        setIsVisible(false);
        setIsFormOpen(true);
    };

    const handleCloseForm = () => {
        setIsFormOpen(false);
        setHasClosed(true);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrorMsg('');
        try {
            await apiCreateSubscriber(formData);
            setSubmitted(true);
            setTimeout(() => {
                handleCloseForm();
            }, 3000); // Close after showing success
        } catch (error) {
            setErrorMsg(error.message || 'Failed to subscribe. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            {/* INITIAL SMALL POPUP */}
            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        initial={{ x: -200, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -200, opacity: 0 }}
                        transition={{ type: "spring", bounce: 0.3, duration: 0.8 }}
                        className="fixed bottom-20 left-6 z-[9998] w-[90%] sm:w-[400px] h-[200px] bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-gray-100 overflow-hidden flex"
                    >
                        {/* LEFT SIDE: Image Layout */}
                        <div className="w-[200px] h-[200px] bg-blue-50 relative hidden sm:block">
                            <img
                                src={popupImage}
                                alt="Subscribe"
                                className="w-full h-full object-cover"
                            />
                            {/* Overlay gradient for aesthetics */}
                            <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
                        </div>

                        {/* RIGHT SIDE: Content Layout */}
                        <div className="p-5 relative flex-1 flex flex-col justify-center h-[200px]">
                            {/* Close button */}
                            <button
                                onClick={handleClose}
                                className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 p-1 rounded-full transition-colors z-[9999]"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <div className="flex flex-col justify-center mt-2">
                                <h3 className="text-xl font-extrabold text-gray-900 font-inter mb-1.5 leading-tight tracking-tight">
                                    Join The <br />
                                    <span className="text-primary">Community</span>
                                </h3>

                                <p className="text-gray-500 text-xs font-inter mb-4 leading-relaxed pr-2">
                                    Unlock exclusive courses and career tips.
                                </p>

                                <button
                                    onClick={handleOpenForm}
                                    className="w-full bg-gradient-to-r from-primary to-indigo-600 text-white font-bold rounded-xl py-2.5 shadow-md hover:-translate-y-0.5 transition-all duration-300 font-inter text-sm flex items-center justify-center gap-1.5"
                                >
                                    Subscribe Now
                                    <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* FULL SUBSCRIPTION MODAL */}
            <AnimatePresence>
                {isFormOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
                    >
                        <motion.div
                            initial={{ y: 50, opacity: 0, scale: 0.95 }}
                            animate={{ y: 0, opacity: 1, scale: 1 }}
                            exit={{ y: 20, opacity: 0, scale: 0.95 }}
                            transition={{ type: "spring", bounce: 0.4, duration: 0.6 }}
                            className="bg-white rounded-3xl shadow-2xl w-[95%] max-w-4xl overflow-hidden relative flex flex-col md:flex-row"
                        >
                            {/* Close Button Top Right */}
                            <button
                                onClick={handleCloseForm}
                                className="absolute top-4 right-4 bg-gray-100/80 hover:bg-gray-200 text-gray-700 p-2 rounded-full transition-colors z-[10010] shadow-sm"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            {/* Left Side: Stunning Attractive Background Image */}
                            <div className="w-full md:w-[45%] relative min-h-[220px] sm:min-h-[280px] md:min-h-full flex items-center p-8 lg:p-10 overflow-hidden">
                                <img
                                    src={popupImage}
                                    alt="Newsletter Background"
                                    className="absolute inset-0 w-full h-full object-cover scale-105"
                                />
                                {/* Beautiful overlays to make the image pop and look premium while allowing text readable */}
                                <div className="absolute inset-0 bg-primary/20 mix-blend-multiply" />
                                <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/90 via-indigo-900/60 to-transparent" />

                                <div className="relative z-10 text-white mt-auto md:mt-0">
                                    <h2 className="text-2xl lg:text-3xl font-black mb-3 font-inter leading-tight tracking-tight shadow-sm">
                                        Supercharge Your Career
                                    </h2>
                                    <p className="text-blue-50 text-sm lg:text-[15px] font-inter leading-relaxed opacity-95">
                                        Join over 5,000+ ambitious learners. Get exclusive curriculum drops, tech insights, and industry secrets.
                                    </p>
                                </div>
                            </div>

                            {/* Right Side: Clean Form Area */}
                            <div className="w-full md:w-[55%] p-8 lg:p-12 relative bg-white">
                                {!submitted ? (
                                    <>
                                        <div className="mb-8">
                                            <h2 className="text-2xl font-extrabold text-gray-900 font-inter mb-2">Claim Your Spot.</h2>
                                            <p className="text-gray-500 text-sm font-inter leading-relaxed">
                                                Fill in your details below to activate your free subscription instantly.
                                            </p>
                                        </div>

                                        <form onSubmit={handleFormSubmit} className="space-y-5 flex flex-col">
                                            <div>
                                                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Full Name</label>
                                                <input
                                                    type="text"
                                                    required
                                                    placeholder="John Doe"
                                                    value={formData.name}
                                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                                    className="w-full border-2 border-transparent bg-gray-50 rounded-xl px-4 py-3.5 text-sm text-gray-800 outline-none focus:border-primary focus:bg-white transition-all font-inter"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Email Address</label>
                                                <input
                                                    type="email"
                                                    required
                                                    placeholder="john@example.com"
                                                    value={formData.email}
                                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                                    className="w-full border-2 border-transparent bg-gray-50 rounded-xl px-4 py-3.5 text-sm text-gray-800 outline-none focus:border-primary focus:bg-white transition-all font-inter"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Phone Number <span className="text-gray-400 font-normal lowercase">(optional)</span></label>
                                                <input
                                                    type="tel"
                                                    pattern="[0-9\+\-\s]+"
                                                    placeholder="+91 98765 43210"
                                                    value={formData.phone}
                                                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                                    className="w-full border-2 border-transparent bg-gray-50 rounded-xl px-4 py-3.5 text-sm text-gray-800 outline-none focus:border-primary focus:bg-white transition-all font-inter"
                                                />
                                            </div>

                                            {errorMsg && (
                                                <p className="text-red-500 text-sm font-semibold">{errorMsg}</p>
                                            )}

                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className={`w-full bg-gradient-to-r from-primary to-indigo-600 text-white font-bold rounded-xl py-4 mt-4 shadow-[0_5px_15px_rgba(37,99,235,0.3)] hover:shadow-[0_10px_25px_rgba(37,99,235,0.5)] ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:-translate-y-0.5'} transition-all duration-300 font-inter text-sm flex items-center justify-center gap-2 group`}
                                            >
                                                {isSubmitting ? (
                                                    <>
                                                        <Loader2 className="w-4 h-4 animate-spin" />
                                                        Processing...
                                                    </>
                                                ) : (
                                                    <>
                                                        Activate Subscription
                                                        <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                        </svg>
                                                    </>
                                                )}
                                            </button>
                                        </form>
                                    </>
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-full text-center py-10 min-h-[300px]">
                                        <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-6 shadow-inner">
                                            <motion.svg
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                            </motion.svg>
                                        </div>
                                        <h3 className="text-2xl font-extrabold text-gray-900 font-inter mb-3">Welcome Aboard!</h3>
                                        <p className="text-gray-500 text-[15px] font-inter leading-relaxed max-w-[280px]">
                                            Your subscription has been confirmed. Get ready for exclusive insights delivered straight to your inbox!
                                        </p>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default SubscribePopup;
