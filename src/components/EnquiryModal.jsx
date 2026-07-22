import { useState } from 'react';
import { X, CheckCircle, AlertCircle, Send } from 'lucide-react';
import { apiSubmitEnquiry } from '../utils/apiClient';

const EnquiryModal = ({ isOpen, onClose, courseTitle }) => {
    if (!isOpen) return null;

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.phone) {
            setErrorMessage('Please fill out all required fields.');
            setStatus('error');
            return;
        }

        try {
            setStatus('loading');
            await apiSubmitEnquiry({
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                course_title: courseTitle,
                message: formData.message
            });
            setStatus('success');
            setFormData({ name: '', email: '', phone: '', message: '' });
        } catch (error) {
            console.error('Enquiry submission failed:', error);
            setErrorMessage(error.message || 'Something went wrong. Please try again.');
            setStatus('error');
        }
    };

    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 z-[9999] cursor-default animate-fade-in">
            <div 
                className="bg-white w-full max-w-[500px] rounded-[32px] p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.12)] border border-slate-100 relative flex flex-col gap-6"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button 
                    onClick={onClose}
                    className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-50 border-none bg-transparent cursor-pointer transition-colors"
                >
                    <X size={20} />
                </button>

                {status === 'success' ? (
                    <div className="flex flex-col items-center text-center py-6 gap-4">
                        <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-500 mb-2">
                            <CheckCircle size={36} />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-800 font-inter">Enquiry Submitted!</h3>
                        <p className="text-gray-500 font-medium text-sm leading-relaxed max-w-sm">
                            Thank you for your interest in <strong className="text-slate-700">{courseTitle}</strong>. Our admissions team will contact you shortly with the schedule details.
                        </p>
                        <button
                            onClick={onClose}
                            className="mt-4 px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl transition-all duration-300 text-sm border-none cursor-pointer"
                        >
                            Close
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="flex flex-col gap-1.5 text-left pr-8">
                            <span className="text-primary font-bold text-xs uppercase tracking-wider">Course Enquiry</span>
                            <h3 className="text-xl md:text-2xl font-bold text-slate-800 leading-tight font-inter">
                                {courseTitle}
                            </h3>
                            <p className="text-xs text-gray-400 font-medium">
                                Registration is currently closed. Submit your details below to get notified of the next batch schedule.
                            </p>
                        </div>

                        {status === 'error' && (
                            <div className="flex items-center gap-3 p-3.5 bg-rose-50 border border-rose-100 rounded-xl text-rose-600 text-xs font-semibold text-left">
                                <AlertCircle size={18} className="shrink-0" />
                                <span>{errorMessage}</span>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-bold text-slate-600">Full Name <span className="text-rose-500">*</span></label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    placeholder="Enter your name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-semibold text-slate-800 placeholder-slate-400 bg-slate-50/50 hover:bg-slate-50 transition-all font-inter"
                                />
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-bold text-slate-600">Email Address <span className="text-rose-500">*</span></label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    placeholder="Enter your email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-semibold text-slate-800 placeholder-slate-400 bg-slate-50/50 hover:bg-slate-50 transition-all font-inter"
                                />
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-bold text-slate-600">Phone Number <span className="text-rose-500">*</span></label>
                                <input
                                    type="tel"
                                    name="phone"
                                    required
                                    placeholder="Enter your phone number"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-semibold text-slate-800 placeholder-slate-400 bg-slate-50/50 hover:bg-slate-50 transition-all font-inter"
                                />
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-bold text-slate-600">Message / Particulars <span className="text-slate-400 font-normal">(Optional)</span></label>
                                <textarea
                                    name="message"
                                    rows={3}
                                    placeholder="Add any specific questions or message..."
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-semibold text-slate-800 placeholder-slate-400 bg-slate-50/50 hover:bg-slate-50 transition-all font-inter resize-none"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className="w-full mt-2 py-3.5 bg-primary hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl shadow-blue-200 transition-all duration-300 text-sm border-none cursor-pointer flex items-center justify-center gap-2 disabled:opacity-55 disabled:cursor-not-allowed"
                            >
                                {status === 'loading' ? (
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                    <>
                                        <Send size={16} />
                                        <span>Submit Enquiry</span>
                                    </>
                                )}
                            </button>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
};

export default EnquiryModal;
