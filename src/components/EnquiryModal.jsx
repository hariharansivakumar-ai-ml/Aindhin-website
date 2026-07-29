import { useState } from 'react';
import { X, CheckCircle, AlertCircle, Send } from 'lucide-react';
import { apiSubmitEnquiry } from '../utils/apiClient';

const COUNTRY_CODES = [
    { name: 'India', code: '+91', flag: '🇮🇳', minLen: 10, maxLen: 10 },
    { name: 'USA/Canada', code: '+1', flag: '🇺🇸', minLen: 10, maxLen: 10 },
    { name: 'UK', code: '+44', flag: '🇬🇧', minLen: 10, maxLen: 11 },
    { name: 'UAE', code: '+971', flag: '🇦🇪', minLen: 7, maxLen: 9 },
    { name: 'Singapore', code: '+65', flag: '🇸🇬', minLen: 8, maxLen: 8 },
    { name: 'Australia', code: '+61', flag: '🇦🇺', minLen: 9, maxLen: 9 },
    { name: 'Germany', code: '+49', flag: '🇩🇪', minLen: 10, maxLen: 11 },
    { name: 'Saudi Arabia', code: '+966', flag: '🇸🇦', minLen: 9, maxLen: 9 },
    { name: 'Qatar', code: '+974', flag: '🇶🇦', minLen: 8, maxLen: 8 },
    { name: 'Malaysia', code: '+60', flag: '🇲🇾', minLen: 9, maxLen: 10 },
    { name: 'Other', code: '+', flag: '🌐', minLen: 7, maxLen: 15 }
];

const EnquiryModal = ({ isOpen, onClose, courseTitle }) => {
    if (!isOpen) return null;

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    const [selectedCountryCode, setSelectedCountryCode] = useState('+91');
    const [customCountryCode, setCustomCountryCode] = useState('');
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
        if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
            setErrorMessage('Please fill out all required fields.');
            setStatus('error');
            return;
        }

        // Email regex validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email.trim())) {
            setErrorMessage('Please enter a valid email address.');
            setStatus('error');
            return;
        }

        if (selectedCountryCode === '+' && !customCountryCode.trim()) {
            setErrorMessage('Please enter your custom country code number.');
            setStatus('error');
            return;
        }

        // Phone digit count validation based on selected country code
        const digits = formData.phone.replace(/\D/g, '');
        const rule = COUNTRY_CODES.find(c => c.code === selectedCountryCode) || { minLen: 7, maxLen: 15 };
        if (digits.length < rule.minLen || digits.length > rule.maxLen) {
            if (rule.minLen === rule.maxLen) {
                setErrorMessage(`Phone number must be exactly ${rule.minLen} digits for ${selectedCountryCode}.`);
            } else {
                setErrorMessage(`Phone number must be between ${rule.minLen} and ${rule.maxLen} digits for ${selectedCountryCode}.`);
            }
            setStatus('error');
            return;
        }

        try {
            setStatus('loading');
            const actualCode = selectedCountryCode === '+' ? `+${customCountryCode.trim()}` : selectedCountryCode;
            await apiSubmitEnquiry({
                name: formData.name.trim(),
                email: formData.email.trim(),
                phone: `${actualCode} ${digits}`,
                course_title: courseTitle,
                message: formData.message.trim()
            });
            setStatus('success');
            setFormData({ name: '', email: '', phone: '', message: '' });
            setCustomCountryCode('');
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
                                <label className="text-xs font-bold text-slate-600">Full Name <span className="text-slate-600">*</span></label>
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
                                <label className="text-xs font-bold text-slate-600">Email Address <span className="text-slate-600">*</span></label>
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
                                <label className="text-xs font-bold text-slate-600">Phone Number <span className="text-slate-600">*</span></label>
                                <div className="flex gap-2">
                                    <select
                                        value={selectedCountryCode}
                                        onChange={(e) => {
                                            setSelectedCountryCode(e.target.value);
                                            if (e.target.value !== '+') setCustomCountryCode('');
                                        }}
                                        className="w-24 md:w-28 px-3 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-semibold text-slate-800 bg-slate-50/50 hover:bg-slate-50 transition-all font-inter cursor-pointer shrink-0"
                                    >
                                        {COUNTRY_CODES.map((item) => (
                                            <option key={item.code + item.name} value={item.code}>
                                                {item.flag} {item.code}
                                            </option>
                                        ))}
                                    </select>
                                    {selectedCountryCode === '+' && (
                                        <div className="flex items-center w-20 px-2 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus-within:ring-2 focus-within:ring-primary focus-within:border-transparent shrink-0">
                                            <span className="text-slate-500 font-bold text-sm mr-0.5">+</span>
                                            <input
                                                type="text"
                                                required
                                                placeholder="Code"
                                                value={customCountryCode}
                                                onChange={(e) => setCustomCountryCode(e.target.value.replace(/\D/g, ''))}
                                                className="w-full bg-transparent border-none focus:outline-none text-sm font-semibold text-slate-800 placeholder-slate-400 font-inter p-0"
                                                maxLength={4}
                                            />
                                        </div>
                                    )}
                                    <input
                                        type="tel"
                                        name="phone"
                                        required
                                        placeholder="Enter phone number"
                                        value={formData.phone}
                                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value.replace(/\D/g, '') }))}
                                        className="flex-1 w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-semibold text-slate-800 placeholder-slate-400 bg-slate-50/50 hover:bg-slate-50 transition-all font-inter"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-bold text-slate-600">Message / Particulars <span className="text-gray-400 font-normal">(optional)</span></label>
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
