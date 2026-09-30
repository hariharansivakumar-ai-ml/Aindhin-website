import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    X,
    User,
    Mail,
    Phone,
    Check,
    CheckCircle2,
    AlertCircle,
    ArrowRight,
    BookOpen,
    Clock,
    Calendar,
    Sparkles,
    Copy,
    LogIn,
    RefreshCw,
    PlayCircle,
    GraduationCap,
    Award,
    Info,
    ChevronDown,
    Search,
    Filter,
    Tag
} from 'lucide-react';
import { apiGetPublicLiveCourses, apiGetAssignedCourses, apiRegisterLiveCourse, USER_APP_URL, USER_API_URL } from '../utils/apiClient';
import comingSoonImg from '../assets/coming_soon.webp';

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

const CourseRegistrationModal = ({ isOpen, onClose, defaultCourseId = null }) => {
    // Form States
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [selectedCountry, setSelectedCountry] = useState(COUNTRY_CODES[0]);
    const [customCountryCode, setCustomCountryCode] = useState('');
    const [selectedCourseId, setSelectedCourseId] = useState(defaultCourseId);

    // Search & Filter States
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('ALL');

    // App & Network States
    const [courses, setCourses] = useState([]);
    const [loadingCourses, setLoadingCourses] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);
    const [isSuccess, setIsSuccess] = useState(false);
    const [generatedPassword, setGeneratedPassword] = useState('');
    const [copied, setCopied] = useState(false);
    const [showAlreadyEnrolledModal, setShowAlreadyEnrolledModal] = useState(false);
    const didAutoSelectRef = useRef(false);

    // Lock background page scroll when dialog modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
            document.documentElement.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
            document.documentElement.style.overflow = 'unset';
        };
    }, [isOpen]);

    const getCourseImage = (img) => {
        if (!img) return comingSoonImg;
        if (img.startsWith('http')) return img;
        return `${USER_API_URL}${img.startsWith('/') ? '' : '/'}${img}`;
    };

    const isCourseCompleted = (c) => {
        if (c.is_ended || c.is_completed || c.is_active === false || c.is_deleted) {
            return true;
        }
        if (c.class_mode === 'Module Class') return false;
        const total = parseInt(c.total_classes, 10);
        const startStr = c.course_start_date || c.course_date;
        if (!total || total <= 0 || !startStr || String(startStr).toLowerCase() === 'flexible') {
            return false;
        }
        try {
            const start = new Date(startStr);
            const now = new Date();
            if (now < start) return false;

            const freq = (c.frequency || 'Daily').toLowerCase();
            let allowedDays = [1, 2, 3, 4, 5]; // Mon-Fri
            if (total === 1 || freq.includes('once')) allowedDays = [start.getDay() === 0 ? 7 : start.getDay()];
            else if (freq.includes('all 7 days') || freq.includes('daily') || freq.includes('everyday')) allowedDays = [1, 2, 3, 4, 5, 6, 7];
            else if (freq.includes('mon') && freq.includes('sat')) allowedDays = [1, 2, 3, 4, 5, 6];
            else if (freq.includes('mon') && freq.includes('wed') && freq.includes('fri')) allowedDays = [1, 3, 5];
            else if (freq.includes('tue') && freq.includes('thu')) allowedDays = [2, 4];
            else if (freq.includes('weekend')) allowedDays = [6, 7];
            else if (freq.includes('monday')) allowedDays = [1];
            else if (freq.includes('tuesday')) allowedDays = [2];
            else if (freq.includes('wednesday')) allowedDays = [3];
            else if (freq.includes('thursday')) allowedDays = [4];
            else if (freq.includes('friday')) allowedDays = [5];
            else if (freq.includes('saturday')) allowedDays = [6];
            else if (freq.includes('sunday')) allowedDays = [7];

            let completed = 0;
            let cur = new Date(start.getFullYear(), start.getMonth(), start.getDate());
            const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            while (cur <= today) {
                const day = cur.getDay() === 0 ? 7 : cur.getDay();
                if (allowedDays.includes(day)) completed++;
                cur.setDate(cur.getDate() + 1);
            }
            return completed >= total;
        } catch (_) {
            return false;
        }
    };

    const isCourseOpen = (c) => {
        if (c.is_ended || c.is_completed || c.is_active === false || c.is_deleted || isCourseCompleted(c)) {
            return false;
        }
        return true;
    };

    const isCourseStarted = (c) => {
        const dateStr = c.course_start_date || c.course_date;
        if (dateStr && String(dateStr).toLowerCase() !== 'flexible') {
            const timeStr = c.start_time || '00:00:00';
            const cleanTime = String(timeStr).split(' ')[0];
            const courseDateTime = new Date(`${dateStr}T${cleanTime}`);
            if (!isNaN(courseDateTime.getTime())) {
                if (new Date() >= courseDateTime) return true;
            } else {
                const onlyDate = new Date(dateStr);
                if (!isNaN(onlyDate.getTime())) {
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    if (onlyDate < today) return true;
                }
            }
        }
        return false;
    };

    const isCourseNew = (c) => {
        if (!c.created_at) return false;
        const createdDate = new Date(c.created_at);
        if (isNaN(createdDate.getTime())) return false;
        const diffHours = (new Date() - createdDate) / (1000 * 60 * 60);
        return diffHours <= 48;
    };

    useEffect(() => {
        if (!isOpen) {
            // Reset state when closing so it's fresh next time
            setIsSuccess(false);
            setSubmitting(false);
            setErrorMsg(null);
            didAutoSelectRef.current = false;
            return;
        }
        
        // Reset form fields when opening
        setIsSuccess(false);
        setErrorMsg(null);
        setSubmitting(false);
        // Only clear name/email/phone if you want them strictly cleared each time
        // setName(''); setEmail(''); setPhone(''); 

        const fetchAllCourses = async () => {
            setLoadingCourses(true);
            try {
                const [assignedRes, liveRes] = await Promise.all([
                    apiGetAssignedCourses().catch(() => []),
                    apiGetPublicLiveCourses().catch(() => [])
                ]);

                const combined = [];
                const seenTitles = new Set();

                const addCourse = (c, isLiveBatch) => {
                    // Filter out ended, completed, or inactive courses
                    if (isCourseCompleted(c) || !isCourseOpen(c)) return;

                    const batchId = String(c.id || c.course_id || '').trim();
                    const courseId = String(c.course_id || c.id || '').trim();
                    const normTitle = String(c.course_title || c.title || '').trim().toLowerCase();

                    if (!batchId && !normTitle) return;

                    // Exclude duplicates based on course title to prevent showing courses repeatedly
                    if (seenTitles.has(normTitle)) {
                        return;
                    }
                    if (normTitle) seenTitles.add(normTitle);

                    const rawCategory = c.category && !String(c.category).trim().startsWith('#') 
                        ? c.category 
                        : (c.batch_name && !String(c.batch_name).trim().startsWith('#') ? c.batch_name : 'General');

                    combined.push({
                        ...c,
                        id: c.id || c.course_id,
                        course_id: c.course_id || c.id,
                        batch_code: c.batch_code || c.course_code || null,
                        course_title: c.course_title || c.title || 'Course Program',
                        category: rawCategory,
                        batch_name: c.batch_name || rawCategory,
                        course_date: c.course_start_date || c.course_date || null,
                        start_time: c.start_time || null,
                        end_time: c.end_time || null,
                        image_url: c.image_url || c.thumbnail_url || c.image || null,
                        isLiveClass: c.class_mode ? (c.class_mode === 'Live Class') : isLiveBatch,
                        unique_id: isLiveBatch ? `batch_${c.id || c.course_id}` : `course_${c.id || c.course_id}`
                    });
                };

                // Prioritize live batches (liveRes) first since enrollment requires valid CourseBatch records
                if (Array.isArray(liveRes)) {
                    liveRes.forEach((c) => addCourse(c, true));
                }

                // Add active fallback courses only if not already represented in live cohorts
                if (Array.isArray(assignedRes)) {
                    assignedRes.forEach((c) => addCourse(c, false));
                }

                const isOngoing = (c) => isCourseStarted(c) && isCourseOpen(c);
                
                combined.sort((a, b) => {
                    const aNew = isCourseNew(a);
                    const bNew = isCourseNew(b);
                    if (aNew && !bNew) return -1;
                    if (!aNew && bNew) return 1;

                    const aOngoing = isOngoing(a);
                    const bOngoing = isOngoing(b);
                    if (aOngoing && !bOngoing) return -1;
                    if (!aOngoing && bOngoing) return 1;

                    return 0;
                });

                setCourses(combined);
            } catch (err) {
                console.error('Failed to fetch courses for dialog:', err);
            } finally {
                setLoadingCourses(false);
            }
        };

        fetchAllCourses();
    }, [isOpen]);

    useEffect(() => {
        if (!courses.length) return;

        if (selectedCourseId) {
            const resolved = courses.find((course) =>
                String(course.unique_id) === String(selectedCourseId) ||
                String(course.id) === String(selectedCourseId) ||
                String(course.course_id) === String(selectedCourseId)
            );

            if (resolved && String(resolved.unique_id) !== String(selectedCourseId)) {
                setSelectedCourseId(resolved.unique_id);
            }
            return;
        }

        if (!didAutoSelectRef.current) {
            setSelectedCourseId(courses[0].unique_id);
            didAutoSelectRef.current = true;
        }
    }, [courses, selectedCourseId]);

    if (!isOpen) return null;

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
        // Synthesize friendly batch ID like #JULWD445
        const monthNames = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
        const curMonth = monthNames[new Date().getMonth()];
        const letters = (course.course_title || course.title || 'WD').replace(/[^a-zA-Z]/g, '').toUpperCase();
        const prefix = letters.slice(0, 2) || 'WD';
        return `#${curMonth}${prefix}${idVal || '101'}`;
    };

    const categories = ['ALL', ...Array.from(new Set(courses.map(c => (c.category || 'General').trim()).filter(Boolean)))];

    const filteredCourses = courses.filter((c) => {
        const matchesCat = selectedCategory === 'ALL' || (c.category || 'General').trim() === selectedCategory;
        if (!matchesCat) return false;
        if (!searchQuery.trim()) return true;
        const q = searchQuery.toLowerCase();
        const title = (c.course_title || c.title || '').toLowerCase();
        const cid = formatCourseId(c).toLowerCase();
        const cat = (c.category || 'General').toLowerCase();
        return title.includes(q) || cid.includes(q) || cat.includes(q);
    });

    const handleRegister = async (e) => {
        e.preventDefault();
        setErrorMsg(null);

        if (!name.trim() || name.trim().length < 2) {
            setErrorMsg('Please enter your full name (at least 2 characters).');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.trim())) {
            setErrorMsg('Please enter a valid email address.');
            return;
        }

        if (selectedCountry.code === '+' && !customCountryCode.trim()) {
            setErrorMsg('Please enter your custom country code number.');
            return;
        }

        const cleanPhone = phone.replace(/\D/g, '');
        if (cleanPhone.length < selectedCountry.minLen || cleanPhone.length > selectedCountry.maxLen) {
            if (selectedCountry.minLen === selectedCountry.maxLen) {
                setErrorMsg(`Phone number must be exactly ${selectedCountry.minLen} digits for ${selectedCountry.name} (${selectedCountry.code}).`);
            } else {
                setErrorMsg(`Phone number must be between ${selectedCountry.minLen} and ${selectedCountry.maxLen} digits for ${selectedCountry.name} (${selectedCountry.code}).`);
            }
            return;
        }

        if (courses.length > 0 && !selectedCourseId) {
            setErrorMsg('Please select an active course from the options below.');
            return;
        }

        try {
            setSubmitting(true);
            const actualCode = selectedCountry.code === '+' ? `+${customCountryCode.trim()}` : selectedCountry.code;
            const response = await apiRegisterLiveCourse(
                name.trim(),
                email.trim(),
                cleanPhone,
                actualCode,
                selectedCourseId || ''
            );

            setIsSuccess(true);
            setGeneratedPassword(response?.password || 'Sent to your registered email');
        } catch (err) {
            const msg = err.message || 'Registration failed';
            if (msg.includes('already_enrolled') || msg.toLowerCase().includes('already enrolled')) {
                setShowAlreadyEnrolledModal(true);
            } else {
                setErrorMsg(msg);
            }
        } finally {
            setSubmitting(false);
        }
    };

    const isExistingPassword = !generatedPassword ||
        String(generatedPassword).toLowerCase().includes('existing') ||
        String(generatedPassword).toLowerCase().includes('sent to your');

    const handleCopyCredentials = () => {
        const textToCopy = isExistingPassword
            ? `Email: ${email.trim()}`
            : `Email: ${email.trim()}\nPassword: ${generatedPassword}`;
        navigator.clipboard.writeText(textToCopy);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
    };

    const selectedCourseData = courses.find((c) => String(c.unique_id) === String(selectedCourseId));

    return (
        <AnimatePresence>
            <div 
                className="fixed inset-0 z-[9999] bg-slate-900/65 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto overscroll-none"
                onClick={(e) => {
                    if (e.target === e.currentTarget) onClose();
                }}
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.94, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.94, y: 20 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="bg-white rounded-[32px] shadow-2xl border border-slate-200 w-full max-w-5xl max-h-[94vh] overflow-y-auto md:overflow-hidden flex flex-col md:flex-row relative my-auto overscroll-none"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Close Button */}
                    <button
                        type="button"
                        onClick={onClose}
                        className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors z-30 shadow-sm"
                        aria-label="Close modal"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    {/* Left Side: Premium Illustration Panel */}
                    <div className="w-full md:w-[38%] bg-gradient-to-br from-blue-700 via-indigo-700 to-violet-900 p-6 sm:p-8 text-white flex flex-col justify-between relative overflow-hidden shrink-0">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none transform translate-x-1/3 -translate-y-1/3" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-500/25 rounded-full blur-3xl pointer-events-none transform -translate-x-1/3 translate-y-1/3" />

                        <div className="relative z-10 space-y-4">
                            <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg">
                                <GraduationCap className="w-6 h-6 text-cyan-300" />
                            </div>
                            <span className="inline-block px-3 py-1 rounded-full bg-white/15 text-cyan-200 font-semibold text-xs border border-white/20 uppercase tracking-wider">
                                Active Cohort Enrollments
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-extrabold font-outfit tracking-tight leading-tight">
                                Live Course Registration
                            </h2>
                            <p className="text-indigo-100 text-xs sm:text-sm leading-relaxed font-inter">
                                Search and select your targeted training program. Receive instant student portal login credentials and training materials immediately upon registration.
                            </p>
                        </div>

                        {/* Feature Badges */}
                        <div className="relative z-10 mt-8 pt-6 border-t border-white/15 space-y-3">
                            <div className="flex items-center gap-3 text-xs font-semibold text-indigo-100">
                                <div className="w-6 h-6 rounded-full bg-emerald-400/20 text-emerald-300 flex items-center justify-center shrink-0">
                                    <Check className="w-3.5 h-3.5" />
                                </div>
                                <span>Live Interactive Training & Sessions</span>
                            </div>
                            <div className="flex items-center gap-3 text-xs font-semibold text-indigo-100">
                                <div className="w-6 h-6 rounded-full bg-emerald-400/20 text-emerald-300 flex items-center justify-center shrink-0">
                                    <Check className="w-3.5 h-3.5" />
                                </div>
                                <span>Unique Student & Batch ID Tracking</span>
                            </div>
                            <div className="flex items-center gap-3 text-xs font-semibold text-indigo-100">
                                <div className="w-6 h-6 rounded-full bg-emerald-400/20 text-emerald-300 flex items-center justify-center shrink-0">
                                    <Check className="w-3.5 h-3.5" />
                                </div>
                                <span>Instant Portal Login Access</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Form or Success View */}
                    <div className="w-full md:w-[62%] bg-white p-6 sm:p-8 md:overflow-y-auto md:max-h-[88vh] overflow-visible text-slate-800 flex flex-col overscroll-contain">
                        {isSuccess ? (
                            /* SUCCESS VIEW */
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="my-auto text-center space-y-6 py-4"
                            >
                                <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border-2 border-emerald-200 shadow-md">
                                    <CheckCircle2 className="w-10 h-10 animate-bounce" />
                                </div>

                                <div>
                                    <h3 className="text-2xl font-bold text-slate-900 font-outfit">
                                        Registration Confirmed!
                                    </h3>
                                    <p className="text-slate-600 text-sm mt-1 max-w-sm mx-auto font-inter">
                                        Your seat is reserved! We have generated your secure learning portal credentials below.
                                    </p>
                                </div>

                                {/* Credentials Box */}
                                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-left shadow-inner">
                                    <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-3">
                                        <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                                            <Award className="w-4 h-4 text-blue-600" /> Account Credentials
                                        </span>
                                        <button
                                            type="button"
                                            onClick={handleCopyCredentials}
                                            className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-white border border-slate-200 shadow-sm text-xs font-bold text-slate-700 hover:bg-slate-100 transition-all"
                                        >
                                            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
                                            {copied ? 'Copied!' : 'Copy'}
                                        </button>
                                    </div>
                                    <div className="space-y-2.5 font-mono text-xs sm:text-sm">
                                        <div className="flex justify-between items-center bg-white p-2.5 rounded-xl border border-slate-200/80">
                                            <span className="text-slate-500 font-sans text-xs">Email:</span>
                                            <span className="font-bold text-slate-900">{email.trim()}</span>
                                        </div>
                                        <div className="flex justify-between items-center bg-white p-2.5 rounded-xl border border-slate-200/80">
                                            <span className="text-slate-500 font-sans text-xs">
                                                {isExistingPassword ? 'Password:' : 'Generated Password:'}
                                            </span>
                                            <span className={isExistingPassword ? "font-medium text-slate-400 text-xs sm:text-sm select-none" : "font-extrabold text-blue-600 text-sm"}>
                                                {generatedPassword}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Selected Course Summary */}
                                {selectedCourseData && (
                                    <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-4 text-left flex items-center justify-between gap-3.5">
                                        <div className="flex items-center gap-3.5 min-w-0">
                                            <img
                                                src={getCourseImage(selectedCourseData.image_url)}
                                                onError={(e) => { e.target.src = comingSoonImg; }}
                                                alt={selectedCourseData.course_title}
                                                className="w-12 h-12 rounded-xl object-cover border border-blue-200 shrink-0 shadow-xs"
                                            />
                                            <div className="min-w-0">
                                                <div className="flex items-center gap-1.5 mb-0.5">
                                                    <span className="font-mono text-[11px] font-extrabold text-blue-700 bg-blue-100 px-1.5 py-0.5 rounded">
                                                        {formatCourseId(selectedCourseData)}
                                                    </span>
                                                    <span className="text-[11px] font-extrabold text-indigo-900 bg-indigo-100 px-2 py-0.5 rounded">
                                                        {selectedCourseData.batch_name || 'Cohort'}
                                                    </span>
                                                </div>
                                                <h4 className="font-bold text-slate-900 text-sm truncate">
                                                    {selectedCourseData.course_title || 'Course'}
                                                </h4>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="pt-2 space-y-3">
                                    <a
                                        href={`${USER_APP_URL}/signin?redirect=live`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-base shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
                                    >
                                        <LogIn className="w-5 h-5" /> Sign In to Learning Portal
                                    </a>
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="w-full py-2.5 px-6 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm transition-colors"
                                    >
                                        Done
                                    </button>
                                </div>
                            </motion.div>
                        ) : (
                            /* FORM VIEW */
                            <form onSubmit={handleRegister} className="space-y-6 my-auto">
                                <div className="pr-8">
                                    <h3 className="text-2xl font-extrabold text-slate-900 font-outfit">
                                        Course Registration
                                    </h3>
                                    <p className="text-slate-500 text-xs sm:text-sm mt-0.5 font-inter">
                                        Complete your registration below to reserve a seat in our upcoming batches.
                                    </p>
                                </div>

                                {errorMsg && (
                                    <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-2.5 text-rose-700 text-xs font-semibold">
                                        <AlertCircle className="w-4 h-4 shrink-0 text-rose-500 mt-0.5" />
                                        <div className="flex-1">{errorMsg}</div>
                                    </div>
                                )}

                                {/* Student Details Section */}
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1">
                                            Full Name <span className="text-rose-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                                            <input
                                                type="text"
                                                required
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                placeholder="Enter your student full name"
                                                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm font-semibold focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 transition-all font-inter"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1">
                                            Email Address <span className="text-rose-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                                            <input
                                                type="email"
                                                required
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="name@example.com"
                                                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm font-semibold focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 transition-all font-inter"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1">
                                            Phone Number <span className="text-rose-500">*</span>
                                        </label>
                                        <div className="flex gap-2.5">
                                            <div className="relative sm:w-44 shrink-0">
                                                <select
                                                    value={selectedCountry.code}
                                                    onChange={(e) => {
                                                        const val = e.target.value;
                                                        const c = COUNTRY_CODES.find((item) => item.code === val);
                                                        if (c) setSelectedCountry(c);
                                                        if (val !== '+') setCustomCountryCode('');
                                                    }}
                                                    className="w-full pl-3 pr-8 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm font-bold appearance-none focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 transition-all cursor-pointer shadow-2xs"
                                                >
                                                    {COUNTRY_CODES.map((c, i) => (
                                                        <option key={c.code + i} value={c.code}>
                                                            {c.flag} {c.code} ({c.name})
                                                        </option>
                                                    ))}
                                                </select>
                                                <ChevronDown className="w-4 h-4 absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                            </div>

                                            {selectedCountry.code === '+' && (
                                                <div className="flex items-center w-20 px-2 py-3 rounded-xl bg-slate-50 border border-slate-200 focus-within:ring-2 focus-within:ring-blue-600 focus-within:bg-white shrink-0">
                                                    <span className="text-slate-500 font-bold text-sm mr-0.5">+</span>
                                                    <input
                                                        type="text"
                                                        required
                                                        placeholder="Code"
                                                        value={customCountryCode}
                                                        onChange={(e) => setCustomCountryCode(e.target.value.replace(/\D/g, ''))}
                                                        className="w-full bg-transparent border-none focus:outline-none text-sm font-semibold text-slate-900 placeholder-slate-400 p-0"
                                                        maxLength={4}
                                                    />
                                                </div>
                                            )}

                                            <div className="flex-1 min-w-0">
                                                <input
                                                    type="tel"
                                                    required
                                                    value={phone}
                                                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                                                    maxLength={selectedCountry.maxLen}
                                                    placeholder={`Enter ${selectedCountry.minLen}-digit mobile number`}
                                                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm font-semibold focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 transition-all font-inter shadow-2xs"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Course Selection & Search Section */}
                                <div className="space-y-3 pt-2 border-t border-slate-200">
                                    <div className="flex items-center justify-between">
                                        <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                                            <GraduationCap className="w-4 h-4 text-blue-600" /> Select Active Upcoming Course <span className="text-rose-500">*</span>
                                        </label>
                                        {loadingCourses ? (
                                            <span className="text-[11px] text-blue-600 font-semibold flex items-center gap-1 animate-pulse">
                                                <RefreshCw className="w-3 h-3 animate-spin" /> Loading courses...
                                            </span>
                                        ) : courses.length > 0 ? (
                                            <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
                                                {filteredCourses.length} {filteredCourses.length === 1 ? 'course' : 'courses'} found
                                            </span>
                                        ) : null}
                                    </div>

                                    {/* Search Bar and Category Dropdown Filter */}
                                    {!loadingCourses && courses.length > 1 && (
                                        <div className="bg-slate-50/90 p-3 rounded-2xl border border-slate-200/90 shadow-2xs">
                                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                                                <div className="relative flex-1">
                                                    <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                                                    <input
                                                        type="text"
                                                        value={searchQuery}
                                                        onChange={(e) => setSearchQuery(e.target.value)}
                                                        placeholder="Search by course title or topic..."
                                                        className="w-full pl-10 pr-8 py-2 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 font-medium focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 transition-all"
                                                    />
                                                    {searchQuery && (
                                                        <button
                                                            type="button"
                                                            onClick={() => setSearchQuery('')}
                                                            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                                                        >
                                                            <X className="w-3.5 h-3.5" />
                                                        </button>
                                                    )}
                                                </div>

                                                {categories.length > 1 && (
                                                    <div className="relative shrink-0 sm:w-48">
                                                        <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 pointer-events-none text-slate-500">
                                                            <Filter className="w-3.5 h-3.5 text-blue-600" />
                                                        </div>
                                                        <select
                                                            value={selectedCategory}
                                                            onChange={(e) => setSelectedCategory(e.target.value)}
                                                            className="w-full pl-8 pr-8 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-800 appearance-none focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 transition-all cursor-pointer shadow-2xs"
                                                        >
                                                            {categories.map((cat) => (
                                                                <option key={cat} value={cat}>
                                                                    {cat === 'ALL' ? `All Categories (${courses.length})` : cat}
                                                                </option>
                                                            ))}
                                                        </select>
                                                        <ChevronDown className="w-3.5 h-3.5 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {/* Courses Card Grid */}
                                    {loadingCourses ? (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-2">
                                            {[1, 2, 3, 4].map((i) => (
                                                <div key={i} className="h-24 bg-slate-100 animate-pulse rounded-2xl border border-slate-200" />
                                            ))}
                                        </div>
                                    ) : courses.length === 0 ? (
                                        <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                                            <BookOpen className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                                            <span className="text-sm font-bold text-slate-700 block">No upcoming active courses available right now.</span>
                                            <p className="text-xs text-slate-500 mt-1">Please check back soon! New cohorts are being added regularly.</p>
                                        </div>
                                    ) : filteredCourses.length === 0 ? (
                                        <div className="p-7 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-2">
                                            <Search className="w-7 h-7 text-slate-400 mx-auto" />
                                            <h4 className="text-sm font-bold text-slate-700">No matching courses found</h4>
                                            <p className="text-xs text-slate-500 max-w-sm mx-auto">
                                                We couldn't find any courses matching "{searchQuery}".
                                            </p>
                                            <button
                                                type="button"
                                                onClick={() => { setSearchQuery(''); setSelectedCategory('ALL'); }}
                                                className="px-4 py-1.5 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-800 text-xs font-extrabold transition-colors mt-1"
                                            >
                                                Clear Filters & Show All
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                            {filteredCourses.map((course) => {
                                                const cId = String(course.unique_id);
                                                const isSelected = String(selectedCourseId) === cId;
                                                const timeStr = formatCourseDateTime(course);
                                                const batchName = course.batch_name || 'Live Training';
                                                const categoryName = course.category || 'General';

                                                return (
                                                    <div
                                                        key={cId}
                                                        onClick={() => setSelectedCourseId(isSelected ? null : cId)}
                                                        className={`group p-3.5 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between relative overflow-hidden ${
                                                            isSelected
                                                                ? 'bg-blue-50/90 border-2 border-blue-600 shadow-md ring-2 ring-blue-600/10'
                                                                : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/80 hover:shadow-2xs'
                                                        }`}
                                                    >
                                                        <div className="flex items-start justify-between gap-2.5 mb-3">
                                                            <div className="flex items-center gap-3 min-w-0">
                                                                <img
                                                                    src={getCourseImage(course.image_url)}
                                                                    onError={(e) => { e.target.src = comingSoonImg; }}
                                                                    alt={course.course_title || course.title}
                                                                    className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0 shadow-2xs group-hover:scale-105 transition-transform duration-300"
                                                                />
                                                                <div className="min-w-0">
                                                                    <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                                                                        {course.isLiveClass && (
                                                                            <span className="text-[10px] font-extrabold text-blue-700 bg-blue-100 px-2 py-0.5 rounded shrink-0 truncate max-w-[130px]">
                                                                                {batchName}
                                                                            </span>
                                                                        )}
                                                                        {categoryName && (!course.isLiveClass || categoryName !== batchName) && (
                                                                            <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 truncate max-w-[95px]">
                                                                                {categoryName}
                                                                            </span>
                                                                        )}
                                                                        <span className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded ${course.isLiveClass ? 'bg-emerald-100 text-emerald-700' : 'bg-purple-100 text-purple-700'}`}>
                                                                            {course.isLiveClass ? 'Live Class' : 'Module Class'}
                                                                        </span>
                                                                        {isCourseStarted(course) && (
                                                                            <span className="text-[10px] font-extrabold text-orange-700 bg-orange-100 px-1.5 py-0.5 rounded shrink-0 flex items-center gap-1">
                                                                                <Sparkles className="w-2.5 h-2.5" /> Ongoing
                                                                            </span>
                                                                        )}
                                                                        {isCourseNew(course) && (
                                                                            <span className="text-[10px] font-extrabold text-rose-700 bg-rose-100 px-1.5 py-0.5 rounded shrink-0 flex items-center gap-1">
                                                                                <Tag className="w-2.5 h-2.5" /> New
                                                                            </span>
                                                                        )}
                                                                    </div>
                                                                    <h4 className="font-extrabold text-slate-900 text-xs sm:text-sm leading-snug line-clamp-2">
                                                                        {course.course_title || course.title || 'Course Program'}
                                                                    </h4>
                                                                </div>
                                                            </div>

                                                            <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-1 transition-all ${
                                                                isSelected ? 'bg-blue-600 text-white shadow-sm scale-110' : 'border-2 border-slate-300 bg-slate-50 group-hover:border-slate-400'
                                                            }`}>
                                                                {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                                                            </div>
                                                        </div>

                                                        {/* Schedule strip */}
                                                        <div className={`pt-2 mt-auto border-t border-slate-100 flex items-center text-[11px] font-semibold text-slate-500 ${course.isLiveClass ? 'justify-between' : 'justify-end'}`}>
                                                            {course.isLiveClass && (
                                                                <div className="flex items-center gap-1 text-slate-600 truncate mr-2">
                                                                    <Calendar className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                                                                    {timeStr === 'Coming Soon' ? (
                                                                        <span className="text-amber-700 font-extrabold bg-amber-100 px-2 py-0.5 rounded text-[10px] animate-pulse">
                                                                            Coming Soon
                                                                        </span>
                                                                    ) : (
                                                                        <span className="truncate font-bold text-slate-700">{timeStr}</span>
                                                                    )}
                                                                </div>
                                                            )}
                                                            <span className={`text-[11px] font-extrabold shrink-0 ${isSelected ? 'text-blue-600 underline' : 'text-slate-400 group-hover:text-blue-600'}`}>
                                                                {isSelected ? 'Selected' : 'Select'}
                                                            </span>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>

                                {/* Submit Button */}
                                <div className="pt-2">
                                    <button
                                        type="submit"
                                        disabled={submitting || loadingCourses || courses.length === 0}
                                        className="w-full py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-base shadow-lg shadow-blue-600/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99]"
                                    >
                                        {submitting ? (
                                            <>
                                                <RefreshCw className="w-5 h-5 animate-spin" />
                                                <span>Submitting Registration...</span>
                                            </>
                                        ) : (
                                            <>
                                                <span>Confirm & Register</span>
                                                <ArrowRight className="w-5 h-5" />
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </motion.div>
            </div>

            {/* Already Enrolled Modal */}
            {showAlreadyEnrolledModal && (
                <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl p-6 sm:p-7 max-w-md w-full text-center shadow-2xl border border-slate-200">
                        <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto mb-4">
                            <Info className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 font-outfit mb-2">
                            Already Enrolled
                        </h3>
                        <p className="text-slate-600 text-xs sm:text-sm mb-6 leading-relaxed font-inter">
                            You are already registered and enrolled in this course! Please proceed to the Sign In page to access your training materials and class links.
                        </p>
                        <div className="space-y-2">
                            <a
                                href={`${USER_APP_URL}/signin?redirect=live`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full py-3 px-5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all"
                            >
                                <LogIn className="w-4 h-4" /> Sign In to Your Portal
                            </a>
                            <button
                                type="button"
                                onClick={() => setShowAlreadyEnrolledModal(false)}
                                className="w-full py-2.5 px-5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default CourseRegistrationModal;
// Vite HMR trigger
