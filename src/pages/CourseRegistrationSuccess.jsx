import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Check,
    CheckCircle2,
    Copy,
    LogIn,
    Award,
    Calendar,
    Clock
} from 'lucide-react';
import { USER_APP_URL, USER_API_URL } from '../utils/apiClient';
import comingSoonImg from '../assets/coming_soon.webp';

const CourseRegistrationSuccess = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [copied, setCopied] = useState(false);

    // Fallback if accessed directly without registration state
    if (!location.state) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 text-center">
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                    <h2 className="text-xl font-bold text-slate-800 mb-4">No registration data found</h2>
                    <button
                        onClick={() => navigate('/course-registration')}
                        className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold shadow hover:bg-blue-700"
                    >
                        Go to Registration
                    </button>
                </div>
            </div>
        );
    }

    const { email, generatedPassword, selectedCourseData } = location.state;

    const getCourseImage = (img) => {
        if (!img) return comingSoonImg;
        if (img.startsWith('http')) return img;
        return `${USER_API_URL}${img.startsWith('/') ? '' : '/'}${img}`;
    };

    const formatCourseDateTime = (course) => {
        let timeStr = '';
        const dateVal = course.course_start_date || course.course_date;
        if (!dateVal || String(dateVal).toLowerCase() === 'flexible' || String(dateVal).toLowerCase() === 'null' || String(dateVal).trim() === '') {
            return 'Coming Soon';
        }

        try {
            const dt = new Date(dateVal);
            if (!isNaN(dt.getTime())) {
                timeStr = `${dt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
            } else {
                timeStr = `${dateVal}`;
            }
        } catch (e) {
            timeStr = `${dateVal}`;
        }

        if (timeStr.toLowerCase() === 'flexible') return 'Coming Soon';

        if (course.start_time) {
            const formatTime = (t) => {
                try {
                    const parts = String(t).split(':');
                    if (parts.length >= 2) {
                        let h = parseInt(parts[0], 10);
                        const m = parts[1];
                        const ampm = h >= 12 ? 'PM' : 'AM';
                        h = h % 12 || 12;
                        return `@ ${h}:${m} ${ampm}`;
                    }
                } catch (e) {}
                return `@ ${t}`;
            };
            timeStr += ` ${formatTime(course.start_time)}`;
        }

        return timeStr || 'Coming Soon';
    };

    const formatCourseId = (course) => {
        if (course.batch_code && typeof course.batch_code === 'string') return `#${course.batch_code.toUpperCase()}`;
        if (course.course_code && typeof course.course_code === 'string') return `#${course.course_code.toUpperCase()}`;
        const idVal = String(course.id || course.course_id || '').trim();
        if (idVal && isNaN(Number(idVal))) {
            return `#${idVal.toUpperCase().replace(/^#/, '')}`;
        }
        const monthNames = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
        const curMonth = monthNames[new Date().getMonth()];
        const letters = (course.course_title || course.title || 'WD').replace(/[^a-zA-Z]/g, '').toUpperCase();
        const prefix = letters.slice(0, 2) || 'WD';
        return `#${curMonth}${prefix}${idVal || '101'}`;
    };

    const handleCopyCredentials = () => {
        const textToCopy = `Email: ${email.trim()}\nPassword: ${generatedPassword}`;
        navigator.clipboard.writeText(textToCopy);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
    };

    return (
        <div className="min-h-screen bg-slate-50 relative overflow-hidden text-slate-800 pb-24">
            <div className="absolute top-0 left-1/3 w-96 h-96 bg-blue-200/40 rounded-full blur-3xl pointer-events-none transform -translate-y-1/2" />
            <div className="absolute top-1/4 right-10 w-[32rem] h-[32rem] bg-indigo-200/40 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 pt-20">
                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white rounded-[32px] border border-slate-200/80 shadow-xl shadow-slate-200/60 p-6 sm:p-10 md:p-12 relative overflow-hidden"
                >
                    <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600" />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4 }}
                        className="space-y-8 text-center py-4 max-w-2xl mx-auto"
                    >
                        <div className="w-24 h-24 bg-emerald-50 border-2 border-emerald-200 rounded-full flex items-center justify-center mx-auto shadow-md">
                            <CheckCircle2 className="w-14 h-14 text-emerald-600 animate-bounce" />
                        </div>

                        <div>
                            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight font-outfit">
                                Registration Confirmed!
                            </h2>
                            <p className="text-slate-600 mt-2 text-sm sm:text-base max-w-md mx-auto">
                                Your student account and credentials have been successfully generated below.
                            </p>
                        </div>

                        {/* Credentials Box */}
                        <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 text-left relative shadow-inner">
                            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-200">
                                <span className="text-sm font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                                    <Award className="w-4 h-4 text-blue-600" /> Your Portal Credentials
                                </span>
                                <button
                                    type="button"
                                    onClick={handleCopyCredentials}
                                    className="inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-lg bg-white border border-slate-200 shadow-sm hover:bg-slate-100 text-slate-800 transition-colors"
                                >
                                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
                                    {copied ? 'Copied!' : 'Copy Credentials'}
                                </button>
                            </div>

                            <div className="space-y-3 font-mono text-sm sm:text-base">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-2xs">
                                    <span className="text-slate-500 font-sans text-xs sm:text-sm font-medium">Email Address:</span>
                                    <span className="font-bold text-slate-900 break-all">{email.trim()}</span>
                                </div>
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-2xs">
                                    <span className="text-slate-500 font-sans text-xs sm:text-sm font-medium">Generated Password:</span>
                                    <span className="font-extrabold text-blue-600 text-base">{generatedPassword}</span>
                                </div>
                            </div>
                        </div>

                        {/* Selected Course Display */}
                        {selectedCourseData && (
                            <div className="bg-blue-50/80 rounded-2xl p-5 border border-blue-200 text-left">
                                <h4 className="text-xs font-extrabold uppercase tracking-wider text-blue-900 mb-3 flex items-center gap-1.5">
                                    <Calendar className="w-4 h-4 text-blue-600" /> Enrolled Course Batch
                                </h4>
                                <div className="flex items-center gap-4">
                                    <img
                                        src={getCourseImage(selectedCourseData.image_url)}
                                        onError={(e) => { e.target.src = comingSoonImg; }}
                                        alt={selectedCourseData.course_title}
                                        className="w-14 h-14 rounded-xl object-cover border border-blue-200 shrink-0 shadow-xs"
                                    />
                                    <div className="min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="font-mono text-xs font-extrabold text-blue-800 bg-blue-100 px-2 py-0.5 rounded">
                                                {formatCourseId(selectedCourseData)}
                                            </span>
                                            <span className="inline-block px-2.5 py-0.5 rounded text-xs font-extrabold bg-indigo-100 text-indigo-900">
                                                {selectedCourseData.batch_name || 'Confirmed Batch'}
                                            </span>
                                        </div>
                                        <h3 className="font-bold text-slate-900 text-base sm:text-lg truncate">
                                            {selectedCourseData.course_title || 'Course'}
                                        </h3>
                                        <p className="text-xs text-slate-500 mt-1 flex items-center gap-1 font-medium">
                                            <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                            <span className="truncate">{formatCourseDateTime(selectedCourseData)}</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* CTA Actions */}
                        <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href={`${USER_APP_URL}/signin?redirect=live`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-base sm:text-lg shadow-lg shadow-blue-500/25 transition-all inline-flex items-center justify-center gap-2.5 hover:scale-[1.02] active:scale-[0.98]"
                            >
                                <LogIn className="w-5 h-5" /> Sign In to Learning Portal
                            </a>
                            <button
                                type="button"
                                onClick={() => navigate('/course-registration')}
                                className="px-6 py-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm sm:text-base transition-all inline-flex items-center justify-center gap-2"
                            >
                                Register Another Course
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

export default CourseRegistrationSuccess;
