import { X, Lock, ExternalLink } from 'lucide-react';
import { USER_APP_URL } from '../utils/apiClient';

const SignInModal = ({ isOpen, onClose, redirectUrl = `${USER_APP_URL}/signin` }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 z-[9999] cursor-default animate-fade-in">
            <div 
                className="bg-white w-full max-w-[420px] rounded-[32px] p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.12)] border border-slate-100 relative flex flex-col items-center gap-5 text-center"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button 
                    onClick={onClose}
                    className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-50 border-none bg-transparent cursor-pointer transition-colors"
                >
                    <X size={20} />
                </button>

                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-primary mb-2 shadow-inner">
                    <Lock size={32} />
                </div>
                
                <h3 className="text-2xl font-bold text-slate-800 font-inter">Sign In Required</h3>
                
                <p className="text-slate-500 font-medium text-[15px] leading-relaxed">
                    To explore this course in detail and enroll, please sign in to the Aindhin User Portal.
                </p>

                <div className="flex flex-col w-full gap-3 mt-4">
                    <button
                        onClick={() => {
                            window.open(redirectUrl, '_blank');
                            onClose();
                        }}
                        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-white text-sm font-bold rounded-xl shadow-lg hover:shadow-xl shadow-blue-200 transition-all duration-300 hover:bg-blue-700 decoration-transparent no-underline border-none cursor-pointer"
                    >
                        <span>Proceed to Sign In</span>
                        <ExternalLink size={16} />
                    </button>
                    
                    <button
                        onClick={onClose}
                        className="w-full px-6 py-3.5 bg-slate-50 text-slate-600 hover:bg-slate-100 text-sm font-bold rounded-xl transition-all duration-300 border-none cursor-pointer font-inter"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SignInModal;
