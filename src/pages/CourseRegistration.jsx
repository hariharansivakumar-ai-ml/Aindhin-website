import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
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
    X,
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

const CourseRegistration = () => {
    const navigate = useNavigate();
    // Form States
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [selectedCountry, setSelectedCountry] = useState(COUNTRY_CODES[0]);
    const [customCountryCode, setCustomCountryCode] = useState('');
    const [selectedCourseId, setSelectedCourseId] = useState(null);

    // Search & Filter States
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('ALL');

    // App & Network States
    const [courses, setCourses] = useState([]);
    const [loadingCourses, setLoadingCourses] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);
    const [showAlreadyEnrolledModal, setShowAlreadyEnrolledModal] = useState(false);

    const getCourseImage = (img) => {
        if (!img) return comingSoonImg;
        if (img.startsWith('http')) return img;
        return `${USER_API_URL}${img.startsWith('/') ? '' : '/'}${img}`;
    };

    const isCourseOpen = (c) => {
        if (c.is_ended || c.is_completed || c.is_active === false || c.is_deleted) {
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
        const fetchAllCourses = async () => {
            try {
                setLoadingCourses(true);
                const [assignedRes, liveRes] = await Promise.all([
                    apiGetAssignedCourses().catch(() => []),
                    apiGetPublicLiveCourses().catch(() => [])
                ]);

                const combined = [];
                const seenTitles = new Set();

                const addCourse = (c, isLiveBatch) => {
                    const isLiveClass = c.class_mode ? (c.class_mode === 'Live Class') : isLiveBatch;

                    // Only filter out ended/completed courses if they are Live Classes
                    if (isLiveClass && !isCourseOpen(c)) return;

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
                // Removed auto-selection so the user must explicitly choose a course
            } catch (err) {
                console.error('Failed to load courses:', err);
            } finally {
                setLoadingCourses(false);
            }
        };
        fetchAllCourses();
    }, []);

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
            setErrorMsg('Please select an active upcoming course from the options.');
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

            navigate('/course-registration-success', {
                state: {
                    email: email.trim(),
                    generatedPassword: response?.password || 'Sent to your registered email',
                    selectedCourseData: courses.find((c) => String(c.unique_id) === String(selectedCourseId))
                }
            });
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

    const selectedCourseData = courses.find((c) => String(c.unique_id) === String(selectedCourseId));

    return (
        <div className="min-h-screen bg-slate-50 relative overflow-hidden text-slate-800 pb-24">
            {/* Soft Light Background Accent Gradients */}
            <div className="absolute top-0 left-1/3 w-96 h-96 bg-blue-200/40 rounded-full blur-3xl pointer-events-none transform -translate-y-1/2" />
            <div className="absolute top-1/4 right-10 w-[32rem] h-[32rem] bg-indigo-200/40 rounded-full blur-3xl pointer-events-none" />

            {/* Hero Banner Header */}
            <div className="relative pt-12 pb-14 px-4 sm:px-6 lg:px-8 text-center max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100/80 border border-blue-200 text-blue-800 text-xs sm:text-sm font-bold mb-5 shadow-sm"
                >
                    <GraduationCap className="w-4 h-4 text-blue-600 animate-pulse" />
                    <span>Active Upcoming Cohorts Open</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 mb-4 font-outfit"
                >
                    Live Course <span className="text-blue-600">Registration</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-inter leading-relaxed"
                >
                    Enroll in our certified active learning programs today and gain immediate access to schedules, mentorship, and student portal resources.
                </motion.p>
            </div>

            {/* Main Form Container */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.25 }}
                    className="bg-white rounded-[32px] border border-slate-200/80 shadow-xl shadow-slate-200/60 p-6 sm:p-10 md:p-12 relative overflow-hidden"
                >
                    {/* Top Decorative Line */}
                    <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600" />

                    {/* REGISTRATION FORM */}
                    <form onSubmit={handleRegister} className="space-y-8">
                            {errorMsg && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="p-4 rounded-2xl bg-rose-50 border border-rose-200 flex items-start gap-3 text-rose-700 text-sm font-semibold shadow-xs"
                                >
                                    <AlertCircle className="w-5 h-5 shrink-0 text-rose-500 mt-0.5" />
                                    <div className="flex-1">{errorMsg}</div>
                                </motion.div>
                            )}

                            {/* Section 1: Personal Info */}
                            <div className="space-y-6">
                                <h3 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2 font-outfit border-b border-slate-200 pb-3">
                                    <User className="w-5 h-5 text-blue-600" /> Student Details
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700">
                                            Full Name <span className="text-rose-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <User className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                            <input
                                                type="text"
                                                required
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                placeholder="Enter your student full name"
                                                className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm font-semibold focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 transition-all font-inter"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700">
                                            Email Address <span className="text-rose-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <Mail className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                            <input
                                                type="email"
                                                required
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="name@example.com"
                                                className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm font-semibold focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 transition-all font-inter"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700">
                                        WhatsApp / Mobile Number <span className="text-rose-500">*</span>
                                    </label>
                                    <div className="flex flex-col sm:flex-row gap-3">
                                        <div className="relative shrink-0 sm:w-56">
                                            <select
                                                value={selectedCountry.code}
                                                onChange={(e) => {
                                                    const val = e.target.value;
                                                    const c = COUNTRY_CODES.find((item) => item.code === val);
                                                    if (c) setSelectedCountry(c);
                                                    if (val !== '+') setCustomCountryCode('');
                                                }}
                                                className="w-full pl-4 pr-10 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm font-bold appearance-none focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 transition-all cursor-pointer"
                                            >
                                                {COUNTRY_CODES.map((c, idx) => (
                                                    <option key={c.code + idx} value={c.code}>
                                                        {c.flag} {c.code} ({c.name})
                                                    </option>
                                                ))}
                                            </select>
                                            <ChevronDown className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                        </div>

                                        {selectedCountry.code === '+' && (
                                            <div className="flex items-center w-24 px-3 py-3.5 rounded-xl bg-slate-50 border border-slate-200 focus-within:ring-2 focus-within:ring-blue-600 focus-within:bg-white shrink-0">
                                                <span className="text-slate-500 font-bold text-base mr-1">+</span>
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
                                                className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm font-semibold focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 transition-all font-inter shadow-2xs"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Section 2: Course Selection & Search */}
                            <div className="space-y-4 pt-4 border-t border-slate-200">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2 font-outfit">
                                        <GraduationCap className="w-5 h-5 text-blue-600" /> Select Active Upcoming Course <span className="text-rose-500 text-sm">*</span>
                                    </h3>
                                    {loadingCourses ? (
                                        <span className="text-xs text-blue-600 inline-flex items-center gap-1.5 font-bold animate-pulse">
                                            <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Loading courses...
                                        </span>
                                    ) : courses.length > 0 ? (
                                        <span className="text-xs font-extrabold text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
                                            Showing {filteredCourses.length} of {courses.length} courses
                                        </span>
                                    ) : null}
                                </div>

                                {/* Search Bar & Category Dropdown Filter */}
                                {!loadingCourses && courses.length > 1 && (
                                    <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 shadow-2xs">
                                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                                            <div className="relative flex-1">
                                                <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                                                <input
                                                    type="text"
                                                    value={searchQuery}
                                                    onChange={(e) => setSearchQuery(e.target.value)}
                                                    placeholder="Search by course name or domain..."
                                                    className="w-full pl-11 pr-10 py-2.5 rounded-xl bg-white border border-slate-200 text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 transition-all"
                                                />
                                                {searchQuery && (
                                                    <button
                                                        type="button"
                                                        onClick={() => setSearchQuery('')}
                                                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                )}
                                            </div>

                                            {categories.length > 1 && (
                                                <div className="relative shrink-0 sm:w-56">
                                                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2 flex items-center gap-1.5 pointer-events-none text-slate-500">
                                                        <Filter className="w-4 h-4 text-blue-600" />
                                                    </div>
                                                    <select
                                                        value={selectedCategory}
                                                        onChange={(e) => setSelectedCategory(e.target.value)}
                                                        className="w-full pl-9 pr-9 py-2.5 rounded-xl bg-white border border-slate-200 text-sm font-bold text-slate-800 appearance-none focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 transition-all cursor-pointer shadow-2xs"
                                                    >
                                                        {categories.map((cat) => (
                                                            <option key={cat} value={cat}>
                                                                {cat === 'ALL' ? `All Categories (${courses.length})` : cat}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    <ChevronDown className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {loadingCourses ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-2">
                                        {[1, 2, 3, 4].map((idx) => (
                                            <div key={idx} className="h-28 rounded-2xl bg-slate-100 animate-pulse border border-slate-200" />
                                        ))}
                                    </div>
                                ) : courses.length === 0 ? (
                                    <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-2">
                                        <BookOpen className="w-8 h-8 text-slate-400 mx-auto" />
                                        <h4 className="text-sm font-bold text-slate-700">No Upcoming Active Courses Available</h4>
                                        <p className="text-xs text-slate-500 max-w-sm mx-auto font-inter">
                                            Please check back soon! New open cohorts and training batches are being added regularly.
                                        </p>
                                    </div>
                                ) : filteredCourses.length === 0 ? (
                                    <div className="p-10 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-3">
                                        <Search className="w-9 h-9 text-slate-300 mx-auto" />
                                        <h4 className="text-base font-extrabold text-slate-800">No Matching Courses Found</h4>
                                        <p className="text-sm text-slate-500 max-w-md mx-auto font-inter">
                                            We couldn't find any training courses matching "{searchQuery}". Try a different keyword or view all programs.
                                        </p>
                                        <button
                                            type="button"
                                            onClick={() => { setSearchQuery(''); setSelectedCategory('ALL'); }}
                                            className="px-5 py-2 rounded-xl bg-blue-100 hover:bg-blue-200 text-blue-800 text-xs sm:text-sm font-extrabold transition-colors mt-2"
                                        >
                                            Clear Search & View All ({courses.length})
                                        </button>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {filteredCourses.map((course) => {
                                            const cId = course.unique_id;
                                            const isSelected = String(selectedCourseId) === cId;
                                            const timeStr = formatCourseDateTime(course);
                                            const batchName = course.batch_name || 'Live Training';
                                            const categoryName = course.category || 'General';

                                            return (
                                                <div
                                                    key={cId}
                                                    onClick={() => setSelectedCourseId(isSelected ? null : cId)}
                                                    className={`group p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between relative overflow-hidden ${
                                                        isSelected
                                                            ? 'bg-blue-50/90 border-2 border-blue-600 shadow-md ring-2 ring-blue-600/10'
                                                            : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/80 hover:shadow-sm'
                                                    }`}
                                                >
                                                    <div className="flex items-start justify-between gap-3 mb-3">
                                                        <div className="flex items-center gap-3.5 min-w-0">
                                                            <img
                                                                src={getCourseImage(course.image_url)}
                                                                onError={(e) => { e.target.src = comingSoonImg; }}
                                                                alt={course.course_title}
                                                                className="w-14 h-14 rounded-xl object-cover border border-slate-200 shrink-0 group-hover:scale-105 transition-transform duration-300 shadow-2xs"
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
                                                                <h4 className="font-extrabold text-slate-900 text-sm sm:text-base leading-snug line-clamp-2">
                                                                    {course.course_title || course.title || 'Course Program'}
                                                                </h4>
                                                            </div>
                                                        </div>

                                                        <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-1 transition-all ${
                                                            isSelected ? 'bg-blue-600 text-white shadow-sm scale-110' : 'border-2 border-slate-300 bg-slate-50 group-hover:border-slate-400'
                                                        }`}>
                                                            {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                                                        </div>
                                                    </div>

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
                                    className="w-full py-4 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg shadow-lg shadow-blue-600/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2.5 hover:scale-[1.01] active:scale-[0.99]"
                                >
                                    {submitting ? (
                                        <>
                                            <RefreshCw className="w-5 h-5 animate-spin" />
                                            <span>Processing Registration...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>Submit Registration</span>
                                            <ArrowRight className="w-5 h-5" />
                                        </>
                                    )}
                                </button>
                            </div>
                    </form>
                </motion.div>
            </div>

            {/* ALREADY ENROLLED MODAL */}
            {showAlreadyEnrolledModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm">
                    <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full text-center shadow-2xl border border-slate-200">
                        <div className="w-14 h-14 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto mb-4">
                            <Info className="w-7 h-7" />
                        </div>

                        <h3 className="text-2xl font-bold text-slate-900 font-outfit mb-2">
                            Already Enrolled
                        </h3>

                        <p className="text-slate-600 text-sm mb-7 leading-relaxed font-inter">
                            You are already registered and enrolled in this course! Please proceed to the Sign In page to access your student portal and class links.
                        </p>

                        <div className="space-y-3">
                            <a
                                href={`${USER_APP_URL}/signin?redirect=live`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-base shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 transition-all"
                            >
                                <LogIn className="w-5 h-5" /> Sign In to Your Portal
                            </a>
                            <button
                                type="button"
                                onClick={() => setShowAlreadyEnrolledModal(false)}
                                className="w-full py-2.5 px-6 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CourseRegistration;
