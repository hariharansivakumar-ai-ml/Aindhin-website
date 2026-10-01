import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    BookOpen, Search, PlusCircle, Trash2, Edit2, CheckCircle2, XCircle,
    Layers, Clock, Award, Users, FileText, Image, IndianRupee, ChevronDown,
    ChevronUp, Plus, X, AlertCircle, Sparkles, Check, RefreshCw, ArrowRight, ArrowLeft, Calendar
} from 'lucide-react';
import {
    apiGetSession, apiGetAdminPanelCourses, apiGetAdminPanelCourse,
    apiCreateAdminPanelCourse, apiUpdateAdminPanelCourse, apiDeleteAdminPanelCourse,
    apiGetAdminPanelCategories
} from '../utils/apiClient';
import AdminSidebar from '../components/AdminSidebar';

const frequencyOptions = [
    'Once', 'Mon - Fri', 'Mon - Sat', 'Mon, Wed, Fri', 'Tue, Thu',
    'Every Monday', 'Every Tuesday', 'Every Wednesday', 'Every Thursday', 'Every Friday',
    'Every Saturday', 'Every Sunday', 'All 7 days'
];

const durationUnits = ['Weeks', 'Months', 'Days', 'Hours'];

const tabsOrder = ['general', 'details', 'modules', 'media', 'settings'];

const AdminCourses = () => {
    const navigate = useNavigate();
    const [userEmail, setUserEmail] = useState('');
    const [courses, setCourses] = useState([]);
    const [categories, setCategories] = useState(['Technology', 'Design', 'Business']);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCatFilter, setSelectedCatFilter] = useState('All');
    const [selectedClassMode, setSelectedClassMode] = useState('All');

    // Modal state
    const [showModal, setShowModal] = useState(false);
    const [editingCourse, setEditingCourse] = useState(null);
    const [modalTab, setModalTab] = useState('general'); // general, details, modules, media, settings
    const [saving, setSaving] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    // Form fields - Tab 1 (General)
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('Technology');
    const [customCategory, setCustomCategory] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [courseType, setCourseType] = useState('Free');
    const [classMode, setClassMode] = useState('Live Class');

    // Form fields - Tab 2 (Specs)
    const [aboutCourse, setAboutCourse] = useState('');
    const [durationVal, setDurationVal] = useState('');
    const [durationUnit, setDurationUnit] = useState('Weeks');
    const [frequency, setFrequency] = useState('Once');
    const [skillLevel, setSkillLevel] = useState('Beginner');
    const [includes, setIncludes] = useState('');
    const [isComingSoon, setIsComingSoon] = useState(false);
    const [startDate, setStartDate] = useState('');
    const [completionDate, setCompletionDate] = useState('');
    const [certificateDetails, setCertificateDetails] = useState('');

    // Form fields - Tab 5 (Settings)
    const [isActive, setIsActive] = useState(true);
    const [isProjectActive, setIsProjectActive] = useState(true);
    const [isAssessmentActive, setIsAssessmentActive] = useState(true);
    const [autoGenCert, setAutoGenCert] = useState(false);

    // Media fields
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const [bannerFile, setBannerFile] = useState(null);
    const [bannerPreview, setBannerPreview] = useState('');

    // Modules state
    const [modules, setModules] = useState([]);
    
    // Class mode prompt state
    const [showClassModePrompt, setShowClassModePrompt] = useState(false);

    useEffect(() => {
        if (isComingSoon || !durationVal || !durationVal.toString().trim() || !durationUnit || classMode === 'Module Class' || !startDate) {
            setCompletionDate('');
            return;
        }

        try {
            const start = new Date(startDate);
            if (isNaN(start.getTime())) {
                setCompletionDate('');
                return;
            }

            let end = new Date(start);
            const duration = parseInt(durationVal, 10);
            if (isNaN(duration)) {
                setCompletionDate('');
                return;
            }

            const getAllowedDays = (freq) => {
                switch (freq) {
                    case 'Mon - Fri': return [1, 2, 3, 4, 5];
                    case 'Mon - Sat': return [1, 2, 3, 4, 5, 6];
                    case 'Mon, Wed, Fri': return [1, 3, 5];
                    case 'Tue, Thu': return [2, 4];
                    case 'Every Monday': return [1];
                    case 'Every Tuesday': return [2];
                    case 'Every Wednesday': return [3];
                    case 'Every Thursday': return [4];
                    case 'Every Friday': return [5];
                    case 'Every Saturday': return [6];
                    case 'Every Sunday': return [0]; // Sunday is 0 in JS
                    case 'All 7 days': return [0, 1, 2, 3, 4, 5, 6];
                    default: return [1, 2, 3, 4, 5];
                }
            };

            if (frequency === 'Once') {
                end = new Date(start);
            } else if (durationUnit === 'Hours') {
                const daysToAdd = duration > 0 ? Math.floor((duration - 1) / 24) : 0;
                end.setDate(end.getDate() + daysToAdd);
            } else if (durationUnit === 'Days' && frequency !== 'Once') {
                let counted = 0;
                let current = new Date(start);
                const allowedDays = getAllowedDays(frequency);
                
                while (counted < duration) {
                    if (allowedDays.includes(current.getDay())) {
                        counted++;
                    }
                    if (counted < duration) {
                        current.setDate(current.getDate() + 1);
                    }
                }
                end = current;
            } else if (durationUnit === 'Days') {
                const daysToAdd = duration - 1 >= 0 ? duration - 1 : 0;
                end.setDate(end.getDate() + daysToAdd);
            } else if (durationUnit === 'Weeks') {
                end.setDate(end.getDate() + duration * 7 - 1);
            } else if (durationUnit === 'Months') {
                let newMonth = start.getMonth() + duration; // 0-indexed
                end.setMonth(newMonth);
                end.setDate(end.getDate() - 1);
            }

            if ((durationUnit === 'Weeks' || durationUnit === 'Months') && frequency !== 'Once') {
                const allowedDays = getAllowedDays(frequency);
                while (!allowedDays.includes(end.getDay()) && end > start) {
                    end.setDate(end.getDate() - 1);
                }
            }

            const yyyy = end.getFullYear();
            const mm = String(end.getMonth() + 1).padStart(2, '0');
            const dd = String(end.getDate()).padStart(2, '0');
            setCompletionDate(`${yyyy}-${mm}-${dd}`);

        } catch (e) {
            setCompletionDate('');
        }
    }, [startDate, durationVal, durationUnit, frequency, classMode, isComingSoon]);

    useEffect(() => {
        const checkAuthAndLoad = async () => {
            const session = await apiGetSession();
            if (!session && !localStorage.getItem('aindhin_token')) {
                navigate('/wp-admin');
            } else if (session) {
                setUserEmail(session.user?.email || 'admin@aindhin.com');
            }
            fetchCoursesAndCategories();
        };
        checkAuthAndLoad();
    }, [navigate]);

    const fetchCoursesAndCategories = async () => {
        setLoading(true);
        try {
            const [courseList, catList] = await Promise.all([
                apiGetAdminPanelCourses().catch(() => []),
                apiGetAdminPanelCategories().catch(() => [])
            ]);
            setCourses(Array.isArray(courseList) ? courseList : []);
            
            if (Array.isArray(catList) && catList.length > 0) {
                const catNames = catList.map(c => typeof c === 'object' ? c.name : c).filter(Boolean);
                setCategories(Array.from(new Set([...catNames, 'Technology', 'Design', 'Business'])));
            }
        } catch (err) {
            console.error('Error fetching admin data:', err);
        } finally {
            setLoading(false);
        }
    };

    const openModal = async (course = null) => {
        setErrorMsg('');
        setSuccessMsg('');
        setModalTab('general');
        if (course) {
            setLoading(true);
            try {
                const fullCourse = await apiGetAdminPanelCourse(course.id);
                setEditingCourse(fullCourse);
                setTitle(fullCourse.title || '');
                const cat = fullCourse.category || 'Technology';
                if (!categories.includes(cat) && cat !== '') {
                    setCategories(prev => [...prev, cat]);
                }
                setCategory(cat);
                setCustomCategory('');
                setDescription(fullCourse.description || '');
                const rawType = fullCourse.course_type || '';
                const rawCert = fullCourse.certificate_details || '';
                const hasNoPrice = fullCourse.price === null || fullCourse.price === '' || fullCourse.price === '0' || fullCourse.price === '0.00' || parseFloat(fullCourse.price) === 0;
                const isNM = rawCert.includes('[type:not_mentioned]') ||
                    ['not mentioned', 'not mention', 'none', 'not_mentioned'].includes(rawType.toLowerCase()) ||
                    (rawType === 'Free' && hasNoPrice);

                setPrice(isNM ? '' : (fullCourse.price?.toString() || ''));
                setCourseType(isNM ? 'Not Mentioned' : (rawType || 'Free'));
                setCertificateDetails(rawCert.replace(/\s*\[type:not_mentioned\]/g, '').trim());
                setClassMode(fullCourse.class_mode || 'Live Class');
                setAboutCourse(fullCourse.about_course || '');

                // Parse duration value & unit
                const rawDur = (fullCourse.course_duration || '').trim();
                const parts = rawDur.split(' ');
                if (parts.length >= 2 && !isNaN(parseInt(parts[0], 10))) {
                    setDurationVal(parts[0]);
                    const unit = parts[1];
                    setDurationUnit(durationUnits.includes(unit) ? unit : 'Weeks');
                } else if (parts.length === 1 && parts[0] && !isNaN(parseInt(parts[0], 10))) {
                    setDurationVal(parts[0]);
                    setDurationUnit('Weeks');
                } else {
                    setDurationVal('');
                    setDurationUnit('Weeks');
                }

                setFrequency(fullCourse.frequency || 'Once');
                setSkillLevel(fullCourse.skill_level || 'Beginner');
                setIncludes(fullCourse.includes || '');
                const rawStart = fullCourse.course_start_date;
                const isCS = !rawStart || 
                    ['flexible', 'coming soon', 'coming_soon', 'null'].includes(String(rawStart).toLowerCase()) ||
                    String(rawStart).trim() === '';
                setIsComingSoon(isCS);
                setStartDate(isCS ? '' : (rawStart || ''));
                setCertificateDetails(fullCourse.certificate_details || '');
                setIsActive(fullCourse.is_active !== false);
                setIsProjectActive(fullCourse.is_project_active !== false);
                setIsAssessmentActive(fullCourse.is_assessment_active !== false);
                setAutoGenCert(Boolean(fullCourse.auto_generate_certificate));
                
                setImagePreview(fullCourse.image_url || fullCourse.image || '');
                setImageFile(null);
                setBannerPreview(fullCourse.banner_image_url || fullCourse.banner_image || '');
                setBannerFile(null);

                if (Array.isArray(fullCourse.modules)) {
                    setModules(fullCourse.modules.map(m => ({
                        id: m.id,
                        title: m.title || '',
                        lessons: Array.isArray(m.lessons) ? m.lessons.map(l => ({
                            id: l.id,
                            title: typeof l === 'object' ? l.title : l
                        })) : []
                    })));
                } else {
                    setModules([]);
                }
            } catch (err) {
                console.error(err);
                setErrorMsg('Failed to load course details.');
            } finally {
                setLoading(false);
            }
        } else {
            setEditingCourse(null);
            setTitle('');
            setCategory(categories[0] || 'Technology');
            setCustomCategory('');
            setDescription('');
            setPrice('');
            setCourseType('Free');
            setClassMode('Live Class');
            setAboutCourse('');
            setDurationVal('');
            setDurationUnit('Weeks');
            setFrequency('Once');
            setSkillLevel('Beginner');
            setIncludes('Live Sessions, Study Materials, Certificate');
            setIsComingSoon(false);
            setStartDate('');
            setCertificateDetails('Certificate of Completion');
            setIsActive(true);
            setIsProjectActive(true);
            setIsAssessmentActive(true);
            setAutoGenCert(false);
            setImageFile(null);
            setImagePreview('');
            setBannerFile(null);
            setBannerPreview('');
            setModules([{ title: 'Introduction & Fundamentals', lessons: [{ title: 'Course Overview' }] }]);
        }
        if (!course) {
            setShowClassModePrompt(true);
        } else {
            setShowModal(true);
        }
    };

    const handleDelete = async (id, courseTitle) => {
        if (!window.confirm(`Are you sure you want to delete "${courseTitle}"? This cannot be undone.`)) return;
        try {
            await apiDeleteAdminPanelCourse(id);
            setCourses(prev => prev.filter(c => c.id !== id));
        } catch (err) {
            alert('Failed to delete course. Please check network connection.');
        }
    };

    const handleNextStep = () => {
        setErrorMsg('');
        if (modalTab === 'general') {
            if (!title.trim()) {
                setErrorMsg('Course Title is required to continue.');
                return;
            }
        }
        const currentIdx = tabsOrder.indexOf(modalTab);
        if (currentIdx < tabsOrder.length - 1) {
            setModalTab(tabsOrder[currentIdx + 1]);
        }
    };

    const handlePrevStep = () => {
        setErrorMsg('');
        const currentIdx = tabsOrder.indexOf(modalTab);
        if (currentIdx > 0) {
            setModalTab(tabsOrder[currentIdx - 1]);
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        if (!title.trim()) {
            setModalTab('general');
            setErrorMsg('Course Title is required.');
            return;
        }
        if (!isProjectActive && !isAssessmentActive && !autoGenCert) {
            setModalTab('settings');
            setErrorMsg('At least one evaluation method or auto-certificate must be enabled.');
            return;
        }
        setSaving(true);
        setErrorMsg('');

        try {
            const finalCategory = customCategory.trim() || category;
            const moduleData = modules.map(m => ({
                id: m.id ? m.id : undefined,
                title: m.title,
                lessons: m.lessons.map(l => ({
                    id: l.id ? l.id : undefined,
                    title: l.title
                }))
            }));

            const combinedDuration = durationVal && durationVal.toString().trim() 
                ? `${durationVal.toString().trim()} ${durationUnit || 'Weeks'}` 
                : 'Flexible';
            const courseStartDateVal = (isComingSoon || !startDate || !startDate.trim()) ? 'Coming Soon' : startDate.trim();

            const isNotMentioned = courseType === 'Not Mentioned';
            // Django ChoiceField only accepts 'Free' or 'Paid'
            const backendCourseType = (courseType === 'Paid' || courseType === 'University') ? 'Paid' : 'Free';
            let finalCertDetails = (certificateDetails || '').replace(/\s*\[type:not_mentioned\]/g, '').trim();
            if (isNotMentioned) {
                finalCertDetails = finalCertDetails ? `${finalCertDetails} [type:not_mentioned]` : '[type:not_mentioned]';
            }

            const payloadData = {
                title,
                description,
                category: finalCategory,
                price: isNotMentioned ? '' : (price ? price.toString() : '0'),
                course_type: backendCourseType,
                class_mode: classMode,
                about_course: aboutCourse,
                course_duration: combinedDuration,
                skill_level: skillLevel,
                includes,
                course_start_date: courseStartDateVal,
                certificate_details: finalCertDetails,
                modules: moduleData,
                frequency: frequency || 'Once',
                is_active: isActive.toString(),
                is_project_active: isProjectActive.toString(),
                is_assessment_active: isAssessmentActive.toString(),
                auto_generate_certificate: autoGenCert.toString(),
                default_batch_size: '20'
            };

            const formData = new FormData();
            formData.append('data', JSON.stringify(payloadData));
            if (imageFile) formData.append('image', imageFile);
            if (bannerFile) formData.append('banner_image', bannerFile);

            if (editingCourse) {
                await apiUpdateAdminPanelCourse(editingCourse.id, formData);
                setSuccessMsg('Course updated successfully!');
            } else {
                await apiCreateAdminPanelCourse(formData);
                setSuccessMsg('Course created successfully!');
            }

            setTimeout(() => {
                setShowModal(false);
                fetchCoursesAndCategories();
            }, 800);
        } catch (err) {
            console.error(err);
            setErrorMsg(err.message || 'Error occurred saving course.');
        } finally {
            setSaving(false);
        }
    };

    const addModule = () => {
        setModules([...modules, { title: `Module ${modules.length + 1}`, lessons: [{ title: 'Lesson 1' }] }]);
    };
    const updateModuleTitle = (idx, newTitle) => {
        const copy = [...modules];
        copy[idx].title = newTitle;
        setModules(copy);
    };
    const removeModule = (idx) => {
        setModules(modules.filter((_, i) => i !== idx));
    };
    const addLesson = (modIdx) => {
        const copy = [...modules];
        copy[modIdx].lessons.push({ title: `New Lesson ${copy[modIdx].lessons.length + 1}` });
        setModules(copy);
    };
    const updateLessonTitle = (modIdx, lessIdx, newTitle) => {
        const copy = [...modules];
        copy[modIdx].lessons[lessIdx].title = newTitle;
        setModules(copy);
    };
    const removeLesson = (modIdx, lessIdx) => {
        const copy = [...modules];
        copy[modIdx].lessons = copy[modIdx].lessons.filter((_, i) => i !== lessIdx);
        setModules(copy);
    };

    const allCategoriesFilter = ['All', ...Array.from(new Set(courses.map(c => c.category || 'Uncategorized')))];
    const filteredCourses = courses.filter(c => {
        const matchCat = selectedCatFilter === 'All' || (c.category || 'Uncategorized') === selectedCatFilter;
        const matchSearch = searchTerm.trim() === '' || 
            c.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.category?.toLowerCase().includes(searchTerm.toLowerCase());
            
        const mode = (c.class_mode || c.classMode || 'Live Class').trim();
        const normalizedMode = (mode === 'Module Class' || mode === 'Module' || c.course_type === 'Module') ? 'Module Class' : 'Live Class';
        const matchMode = selectedClassMode === 'All' || normalizedMode === selectedClassMode;
            
        return matchCat && matchSearch && matchMode;
    }).sort((a, b) => {
        const aActive = (a.is_active !== false && !a.is_ended) ? 1 : 0;
        const bActive = (b.is_active !== false && !b.is_ended) ? 1 : 0;
        return bActive - aActive; // Show active courses first
    });

    const activeCount = courses.filter(c => c.is_active !== false && !c.is_ended).length;
    const paidCount = courses.filter(c => c.course_type?.toLowerCase() === 'paid' || c.course_type?.toLowerCase() === 'university').length;
    const currentTabIndex = tabsOrder.indexOf(modalTab);
    const isLastTab = currentTabIndex === tabsOrder.length - 1;
    const isFirstTab = currentTabIndex === 0;

    if (loading && courses.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 font-inter">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-violet-600 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-slate-500 font-medium text-sm animate-pulse">Loading Course Management...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-slate-50 font-inter overflow-hidden text-slate-900">
            <AdminSidebar userEmail={userEmail} />

            <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
                <main className="flex-1 p-6 md:p-8 max-w-7xl mx-auto w-full space-y-8">
                    {/* Page Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
                        <div>
                            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-violet-100 text-violet-700 flex items-center justify-center shrink-0">
                                    <BookOpen className="w-6 h-6" />
                                </div>
                                Course Management
                            </h2>
                            <p className="text-slate-500 text-sm mt-1">
                                Create, edit curriculum modules, pricing, and live batches across the Aindhin platform.
                            </p>
                        </div>

                        <button
                            onClick={() => openModal(null)}
                            className="inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-semibold shadow-lg shadow-violet-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                        >
                            <PlusCircle className="w-5 h-5" />
                            Add New Course
                        </button>
                    </div>

                    {/* Stat Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {[
                            { label: 'Total Courses', val: courses.length, icon: Layers, gradient: 'from-violet-500 to-indigo-600', glow: 'shadow-violet-500/15' },
                            { label: 'Active Courses', val: activeCount, icon: CheckCircle2, gradient: 'from-emerald-500 to-teal-600', glow: 'shadow-emerald-500/15' },
                            { label: 'Premium / Paid', val: paidCount, icon: IndianRupee, gradient: 'from-amber-500 to-orange-600', glow: 'shadow-amber-500/15' },
                            { label: 'Categories', val: allCategoriesFilter.length - 1, icon: Sparkles, gradient: 'from-cyan-500 to-blue-600', glow: 'shadow-cyan-500/15' }
                        ].map((stat, i) => {
                            const Icon = stat.icon;
                            return (
                                <div key={i} className={`relative rounded-2xl p-6 bg-gradient-to-br ${stat.gradient} text-white shadow-lg ${stat.glow} overflow-hidden group`}>
                                    <div className="absolute -right-3 -bottom-3 opacity-15 group-hover:opacity-25 transition-opacity">
                                        <Icon size={84} />
                                    </div>
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="p-2.5 bg-white/20 rounded-xl backdrop-blur-sm">
                                            <Icon className="w-5 h-5 text-white" />
                                        </div>
                                    </div>
                                    <p className="text-xs text-white/80 uppercase font-bold tracking-wider">{stat.label}</p>
                                    <h3 className="text-3xl font-extrabold text-white mt-1">{stat.val}</h3>
                                </div>
                            );
                        })}
                    </div>

                    {/* Controls & Filter Bar */}
                    <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
                        <div className="relative flex-1 w-full">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search courses by title, skill or category..."
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-10 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 transition-all"
                            />
                            {searchTerm && (
                                <button onClick={() => setSearchTerm('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                                    <X className="w-4 h-4" />
                                </button>
                            )}
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                            <div className="relative min-w-[180px]">
                                <select
                                    value={selectedClassMode}
                                    onChange={(e) => setSelectedClassMode(e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-4 pr-10 py-2.5 text-sm font-semibold text-slate-700 hover:border-violet-300 focus:outline-none focus:bg-white focus:border-violet-600 focus:ring-2 focus:ring-violet-600/10 appearance-none transition-all cursor-pointer shadow-xs"
                                >
                                    <option value="All">All Class Modes</option>
                                    <option value="Live Class">Live Class</option>
                                    <option value="Module Class">Module Class</option>
                                </select>
                                <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                            </div>
                            <div className="relative min-w-[220px]">
                                <Layers className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-violet-600 pointer-events-none" />
                                <select
                                    value={selectedCatFilter}
                                    onChange={(e) => setSelectedCatFilter(e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-10 py-2.5 text-sm font-semibold text-slate-700 hover:border-violet-300 focus:outline-none focus:bg-white focus:border-violet-600 focus:ring-2 focus:ring-violet-600/10 appearance-none transition-all cursor-pointer shadow-xs"
                                >
                                    {allCategoriesFilter.map(cat => (
                                        <option key={cat} value={cat}>
                                            {cat === 'All' ? 'Filter by Category (All)' : cat}
                                        </option>
                                    ))}
                                </select>
                                <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                            </div>
                        </div>
                    </div>

                    {/* Courses Grid */}
                    {filteredCourses.length === 0 ? (
                        <div className="py-20 text-center bg-white rounded-2xl border border-slate-200/80 shadow-sm">
                            <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                            <h3 className="text-lg font-bold text-slate-800">No Courses Found</h3>
                            <p className="text-sm text-slate-500 mt-1 max-w-md mx-auto">
                                No courses matched your filter or search criteria. Create your first course or clear filters to view existing curriculum.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredCourses.map((course) => {
                                const typeStr = (course.course_type || '').toLowerCase();
                                const certDet = course.certificate_details || '';
                                const hasNoPrice = course.price === null || course.price === '' || course.price === '0' || course.price === '0.00' || parseFloat(course.price) === 0;
                                const isNotMentioned = certDet.includes('[type:not_mentioned]') ||
                                    typeStr === 'not mentioned' || typeStr === 'not mention' || typeStr === 'none' || typeStr === 'not_mentioned' ||
                                    (typeStr === 'free' && hasNoPrice);
                                const isPaid = !isNotMentioned && (typeStr === 'paid' || typeStr === 'university');
                                return (
                                    <motion.div
                                        key={course.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col shadow-sm hover:shadow-md hover:border-violet-300 transition-all group"
                                    >
                                        <div className="relative h-44 bg-slate-900 overflow-hidden">
                                            {(course.image_url || course.image) ? (
                                                <img src={course.image_url || course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                            ) : (
                                                <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-violet-800 to-indigo-900 text-white/40">
                                                    <BookOpen className="w-10 h-10 mb-2 opacity-60 text-violet-300" />
                                                    <span className="text-xs font-bold uppercase tracking-wider text-white/70">{course.category || 'Course'}</span>
                                                </div>
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                                            
                                            <div className="absolute top-3 right-3 flex gap-1.5">
                                                <span className={`px-2.5 py-1 rounded-lg text-[11px] font-bold tracking-wide uppercase shadow-sm ${
                                                    course.is_ended
                                                        ? 'bg-slate-600 text-white'
                                                        : course.is_active !== false 
                                                            ? 'bg-emerald-500 text-white shadow-sm'
                                                            : 'bg-rose-500 text-white shadow-sm'
                                                }`}>
                                                    {course.is_ended ? 'Completed' : course.is_active !== false ? 'Active' : 'Inactive'}
                                                </span>
                                                {!isNotMentioned && (
                                                    <span className={`px-2.5 py-1 rounded-lg text-[11px] font-bold tracking-wide uppercase shadow-sm ${
                                                        isPaid ? 'bg-amber-500 text-white' : 'bg-violet-600 text-white'
                                                    }`}>
                                                        {course.course_type || 'Free'}
                                                    </span>
                                                )}
                                                {course.class_mode && (
                                                    <span className={`px-2.5 py-1 rounded-lg text-[11px] font-bold tracking-wide uppercase shadow-sm ${
                                                        course.class_mode === 'Module Class' ? 'bg-indigo-500 text-white' : 'bg-cyan-500 text-white'
                                                    }`}>
                                                        {course.class_mode}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="p-5 flex-1 flex flex-col justify-between">
                                            <div>
                                                <div className="flex items-center gap-2 text-xs text-violet-600 font-semibold mb-2">
                                                    <Layers className="w-3.5 h-3.5" />
                                                    {course.category || 'General'}
                                                </div>
                                                <h3 className="text-lg font-extrabold text-slate-900 line-clamp-2 leading-snug group-hover:text-violet-600 transition-colors">
                                                    {course.title}
                                                </h3>
                                                <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                                                    {course.description || 'No detailed course overview provided yet.'}
                                                </p>
                                            </div>

                                            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                                                <div className="flex items-center gap-2">
                                                    {(!course.course_start_date || ['flexible', 'coming soon', 'coming_soon', 'null'].includes(String(course.course_start_date).toLowerCase()) || String(course.course_start_date).trim() === '') ? (
                                                        <span className="inline-flex items-center gap-1 font-bold text-[11px] px-2 py-0.5 bg-amber-50 text-amber-700 border border-amber-200 rounded-md">
                                                            ⚡ Coming Soon
                                                        </span>
                                                    ) : (
                                                        <span className="flex items-center gap-1 font-medium text-slate-600">
                                                            <Calendar className="w-3.5 h-3.5 text-slate-400" />
                                                            {course.course_start_date}
                                                        </span>
                                                    )}
                                                    {!(course.class_mode === 'Module Class' || course.classMode === 'Module Class') && (
                                                        <span className="flex items-center gap-1 font-medium">
                                                            <Clock className="w-3.5 h-3.5 text-slate-400" />
                                                            {course.course_duration || 'Flexible'}
                                                        </span>
                                                    )}
                                                </div>
                                                {!isNotMentioned && (
                                                    isPaid ? (
                                                        <span className="text-sm font-black text-slate-900">₹{course.price}</span>
                                                    ) : (
                                                        <div className="flex items-center gap-1.5">
                                                            {course.price && parseFloat(course.price) > 0 && (
                                                                <span className="text-xs font-bold text-slate-400 line-through decoration-red-500 decoration-2">₹{course.price}</span>
                                                            )}
                                                            <span className="text-xs font-bold px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-md">FREE</span>
                                                        </div>
                                                    )
                                                )}
                                            </div>

                                            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
                                                <button
                                                    onClick={() => openModal(course)}
                                                    className="flex-1 py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-2 transition-all"
                                                >
                                                    <Edit2 className="w-3.5 h-3.5 text-violet-600" />
                                                    Edit Course
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(course.id, course.title)}
                                                    className="py-2.5 px-3 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold text-xs transition-all flex items-center justify-center"
                                                    title="Delete Course"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    )}
                </main>
            </div>

            {/* ── Class Mode Prompt Modal ────────────────────────────── */}
            <AnimatePresence>
                {showClassModePrompt && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-white border border-slate-200 rounded-3xl shadow-2xl w-full max-w-md overflow-hidden p-6 relative"
                        >
                            <button
                                onClick={() => setShowClassModePrompt(false)}
                                className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all"
                            >
                                <X className="w-5 h-5" />
                            </button>
                            
                            <div className="text-center mb-6">
                                <div className="w-16 h-16 bg-violet-100 text-violet-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <Sparkles className="w-8 h-8" />
                                </div>
                                <h2 className="text-2xl font-black text-slate-900">Select Class Mode</h2>
                                <p className="text-sm text-slate-500 mt-2">Choose the delivery format for your new course to tailor the specifications appropriately.</p>
                            </div>

                            <div className="space-y-3">
                                <button
                                    onClick={() => {
                                        setClassMode('Live Class');
                                        setAutoGenCert(false);
                                        setShowClassModePrompt(false);
                                        setShowModal(true);
                                    }}
                                    className="w-full text-left p-4 rounded-2xl border-2 border-slate-100 hover:border-violet-600 hover:bg-violet-50 transition-all group flex items-center gap-4"
                                >
                                    <div className="w-12 h-12 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center shrink-0">
                                        <Clock className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900 group-hover:text-violet-700 text-lg">Live Class</h3>
                                        <p className="text-xs text-slate-500 mt-0.5">Instructor-led batches with fixed schedules.</p>
                                    </div>
                                </button>
                                
                                <button
                                    onClick={() => {
                                        setClassMode('Module Class');
                                        setAutoGenCert(true);
                                        setShowClassModePrompt(false);
                                        setShowModal(true);
                                    }}
                                    className="w-full text-left p-4 rounded-2xl border-2 border-slate-100 hover:border-indigo-600 hover:bg-indigo-50 transition-all group flex items-center gap-4"
                                >
                                    <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                                        <Layers className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900 group-hover:text-indigo-700 text-lg">Module Class</h3>
                                        <p className="text-xs text-slate-500 mt-0.5">Self-paced video modules for flexible learning.</p>
                                    </div>
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* ── Add / Edit Course Modal ────────────────────────────── */}
            <AnimatePresence>
                {showModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-900/60 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white border border-slate-200 rounded-3xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col max-h-[90vh] text-slate-900"
                        >
                            {/* Modal Header */}
                            <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/80 shrink-0">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-violet-100 text-violet-700 flex items-center justify-center font-bold shadow-sm shrink-0">
                                        <BookOpen className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-extrabold text-slate-900">
                                            {editingCourse ? 'Edit Course Curriculum' : 'Create New Course'}
                                        </h2>
                                        <p className="text-xs text-slate-500">
                                            Step {currentTabIndex + 1} of {tabsOrder.length} — Fill in specifications and transition through the steps.
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Modal Tabs */}
                            <div className="px-6 flex items-center gap-2 border-b border-slate-200 bg-slate-100/60 overflow-x-auto shrink-0 scrollbar-none">
                                {[
                                    { id: 'general', label: '1. Basic Details', icon: FileText },
                                    { id: 'details', label: '2. Course Specs', icon: Clock },
                                    { id: 'modules', label: '3. Modules & Lessons', icon: Layers },
                                    { id: 'media', label: '4. Covers & Media', icon: Image },
                                    { id: 'settings', label: '5. Settings & Status', icon: Sparkles },
                                ].map((tab, idx) => {
                                    const Icon = tab.icon;
                                    const active = modalTab === tab.id;
                                    return (
                                        <button
                                            key={tab.id}
                                            type="button"
                                            onClick={() => {
                                                setErrorMsg('');
                                                if (modalTab === 'general' && !title.trim() && tab.id !== 'general') {
                                                    setErrorMsg('Please provide a Course Title first.');
                                                    return;
                                                }
                                                setModalTab(tab.id);
                                            }}
                                            className={`flex items-center gap-2 py-3 px-4 border-b-2 text-xs font-bold transition-all whitespace-nowrap ${
                                                active
                                                    ? 'border-violet-600 text-violet-700 bg-white shadow-sm'
                                                    : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-200/50'
                                            }`}
                                        >
                                            <Icon className="w-3.5 h-3.5" />
                                            {tab.label}
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Form Body */}
                            <form onSubmit={(e) => { e.preventDefault(); if (isLastTab) handleSave(e); }} className="flex-1 overflow-y-auto p-6 space-y-6">
                                {errorMsg && (
                                    <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 flex items-center gap-3 text-rose-700 text-sm font-semibold">
                                        <AlertCircle className="w-5 h-5 shrink-0 text-rose-500" />
                                        <span>{errorMsg}</span>
                                    </div>
                                )}
                                {successMsg && (
                                    <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-3 text-emerald-700 text-sm font-semibold">
                                        <Check className="w-5 h-5 shrink-0 text-emerald-600" />
                                        <span>{successMsg}</span>
                                    </div>
                                )}

                                {/* TAB 1: GENERAL DETAILS */}
                                {modalTab === 'general' && (
                                    <div className="space-y-5">
                                        <div>
                                            <label className="block text-xs font-bold uppercase text-slate-700 mb-2">Course Title *</label>
                                            <input
                                                type="text"
                                                required
                                                value={title}
                                                onChange={(e) => setTitle(e.target.value)}
                                                placeholder="e.g. Master Artificial Intelligence & Deep Learning"
                                                className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-violet-600 focus:ring-2 focus:ring-violet-600/15"
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                            <div>
                                                <label className="block text-xs font-bold uppercase text-slate-700 mb-2">Category</label>
                                                <select
                                                    value={category}
                                                    onChange={(e) => {
                                                        setCategory(e.target.value);
                                                        if (e.target.value !== 'CUSTOM_ADD') setCustomCategory('');
                                                    }}
                                                    className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-violet-600 focus:ring-2 focus:ring-violet-600/15"
                                                >
                                                    {categories.map(cat => (
                                                        <option key={cat} value={cat}>{cat}</option>
                                                    ))}
                                                    <option value="CUSTOM_ADD">+ Add New Custom Category...</option>
                                                </select>
                                                {category === 'CUSTOM_ADD' && (
                                                    <input
                                                        type="text"
                                                        value={customCategory}
                                                        onChange={(e) => setCustomCategory(e.target.value)}
                                                        placeholder="Enter custom category name..."
                                                        className="mt-2 w-full bg-white border border-violet-600 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none"
                                                    />
                                                )}
                                            </div>

                                            <div>
                                                <label className="block text-xs font-bold uppercase text-slate-700 mb-2">Course Type</label>
                                                <select
                                                    value={courseType}
                                                    onChange={(e) => setCourseType(e.target.value)}
                                                    className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-violet-600 focus:ring-2 focus:ring-violet-600/15"
                                                >
                                                    <option value="Free">Free Certification</option>
                                                    <option value="Paid">Paid Professional Program</option>
                                                    <option value="University">University Degree Program</option>
                                                    <option value="Not Mentioned">Not Mentioned</option>
                                                </select>
                                            </div>
                                        </div>

                                        {courseType !== 'Not Mentioned' && (
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                                <div>
                                                    <label className="block text-xs font-bold uppercase text-slate-700 mb-2">
                                                        {courseType === 'Free' ? 'Original Price (INR / ₹)' : 'Price (in INR / ₹)'}
                                                    </label>
                                                    <div className="relative">
                                                        <IndianRupee className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                                        <input
                                                            type="number"
                                                            value={price}
                                                            onChange={(e) => setPrice(e.target.value)}
                                                            placeholder="e.g. 14999"
                                                            className={`w-full border border-slate-300 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-violet-600 focus:ring-2 focus:ring-violet-600/15 transition-all ${
                                                                courseType === 'Free'
                                                                    ? 'bg-slate-50 text-slate-500 font-bold line-through decoration-red-500 decoration-2'
                                                                    : 'bg-white text-slate-900'
                                                            }`}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        <div>
                                            <label className="block text-xs font-bold uppercase text-slate-700 mb-2">Short Overview / Subtitle</label>
                                            <textarea
                                                rows={3}
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                                placeholder="Brief summary displayed on course discovery cards..."
                                                className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-violet-600 focus:ring-2 focus:ring-violet-600/15 resize-none"
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* TAB 2: COURSE SPECS */}
                                {modalTab === 'details' && (
                                    <div className="space-y-5">
                                        <div>
                                            <label className="block text-xs font-bold uppercase text-slate-700 mb-2">Comprehensive About Course</label>
                                            <textarea
                                                rows={4}
                                                value={aboutCourse}
                                                onChange={(e) => setAboutCourse(e.target.value)}
                                                placeholder="In-depth explanation of learning outcomes, prerequisite requirements, and career prospects..."
                                                className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-violet-600 focus:ring-2 focus:ring-violet-600/15"
                                            />
                                        </div>

                                        {/* Duration Value, Unit, and Frequency */}
                                        {classMode !== 'Module Class' && (
                                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                                                <div>
                                                    <label className="block text-xs font-bold uppercase text-slate-700 mb-2">
                                                        Duration (Value) <span className="text-slate-400 font-normal lowercase">(optional)</span>
                                                    </label>
                                                    <input
                                                        type="number"
                                                        min="1"
                                                        value={durationVal}
                                                        onChange={(e) => setDurationVal(e.target.value)}
                                                        placeholder="e.g. 4 (optional)"
                                                        className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-violet-600 focus:ring-2 focus:ring-violet-600/15"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-bold uppercase text-slate-700 mb-2">Duration Unit</label>
                                                    <select
                                                        value={durationUnit}
                                                        onChange={(e) => setDurationUnit(e.target.value)}
                                                        className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-violet-600 focus:ring-2 focus:ring-violet-600/15"
                                                    >
                                                        {durationUnits.map(unit => (
                                                            <option key={unit} value={unit}>{unit}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-bold uppercase text-slate-700 mb-2">Class Frequency</label>
                                                    <select
                                                        value={frequency}
                                                        onChange={(e) => setFrequency(e.target.value)}
                                                        className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-violet-600 focus:ring-2 focus:ring-violet-600/15"
                                                    >
                                                        {frequencyOptions.map(f => (
                                                            <option key={f} value={f}>{f}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                        )}

                                        {/* Selectable Date & Skill Level */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                            {classMode !== 'Module Class' ? (
                                                <div className="space-y-2">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-xs font-bold uppercase text-slate-700">Course Schedule</span>
                                                        <label className="inline-flex items-center gap-1.5 cursor-pointer select-none">
                                                            <input
                                                                type="checkbox"
                                                                checked={isComingSoon}
                                                                onChange={(e) => {
                                                                    const checked = e.target.checked;
                                                                    setIsComingSoon(checked);
                                                                    if (checked) {
                                                                        setStartDate('');
                                                                        setCompletionDate('');
                                                                    }
                                                                }}
                                                                className="w-4 h-4 text-violet-600 rounded border-slate-300 focus:ring-violet-500 cursor-pointer accent-violet-600"
                                                            />
                                                            <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full transition-colors ${
                                                                isComingSoon 
                                                                    ? 'bg-amber-100 text-amber-800 border border-amber-300 shadow-sm' 
                                                                    : 'bg-slate-100 text-slate-600 border border-slate-200 hover:bg-slate-200'
                                                            }`}>
                                                                ⚡ Coming Soon (No Dates)
                                                            </span>
                                                        </label>
                                                    </div>

                                                    {isComingSoon ? (
                                                        <div className="grid grid-cols-2 gap-4">
                                                            <div>
                                                                <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">Course Start Date</label>
                                                                <div className="w-full bg-amber-50/70 border border-dashed border-amber-300 rounded-xl px-4 py-3 text-sm text-amber-800 font-semibold flex items-center justify-between">
                                                                    <span>Coming Soon</span>
                                                                    <span className="text-[10px] uppercase font-bold tracking-wider bg-amber-200/80 text-amber-900 px-2 py-0.5 rounded">TBA</span>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">Completion Date</label>
                                                                <div className="w-full bg-amber-50/70 border border-dashed border-amber-300 rounded-xl px-4 py-3 text-sm text-amber-800 font-semibold flex items-center justify-between">
                                                                    <span>To Be Announced</span>
                                                                    <span className="text-[10px] uppercase font-bold tracking-wider bg-amber-200/80 text-amber-900 px-2 py-0.5 rounded">TBA</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="grid grid-cols-2 gap-4">
                                                            <div>
                                                                <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
                                                                    Course Start Date <span className="text-slate-400 font-normal lowercase">(optional)</span>
                                                                </label>
                                                                <input
                                                                    type="date"
                                                                    value={startDate}
                                                                    onChange={(e) => setStartDate(e.target.value)}
                                                                    className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-violet-600 focus:ring-2 focus:ring-violet-600/15 cursor-pointer"
                                                                />
                                                            </div>
                                                            <div>
                                                                <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">Completion Date</label>
                                                                <input
                                                                    type="text"
                                                                    readOnly
                                                                    value={completionDate}
                                                                    placeholder={durationVal ? "Auto-calculated" : "Requires duration"}
                                                                    className="w-full bg-slate-100 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-600 font-medium cursor-not-allowed"
                                                                />
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            ) : <div />}
                                            <div>
                                                <label className="block text-xs font-bold uppercase text-slate-700 mb-2">Target Skill Level</label>
                                                <select
                                                    value={skillLevel}
                                                    onChange={(e) => setSkillLevel(e.target.value)}
                                                    className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-violet-600 focus:ring-2 focus:ring-violet-600/15"
                                                >
                                                    <option value="Beginner">Beginner Level</option>
                                                    <option value="Intermediate">Intermediate Level</option>
                                                    <option value="Advanced">Advanced / Expert Level</option>
                                                    <option value="All Levels">All Levels Welcome</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                            <div>
                                                <label className="block text-xs font-bold uppercase text-slate-700 mb-2">What's Included</label>
                                                <input
                                                    type="text"
                                                    value={includes}
                                                    onChange={(e) => setIncludes(e.target.value)}
                                                    placeholder="Live mentoring, hands-on labs, recordings..."
                                                    className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-violet-600 focus:ring-2 focus:ring-violet-600/15"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold uppercase text-slate-700 mb-2">Certificate Details</label>
                                                <input
                                                    type="text"
                                                    value={certificateDetails}
                                                    onChange={(e) => setCertificateDetails(e.target.value)}
                                                    placeholder="Aindhin Recognized Industry Credential"
                                                    className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-violet-600 focus:ring-2 focus:ring-violet-600/15"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* TAB 3: MODULE & LESSON BUILDER */}
                                {modalTab === 'modules' && (
                                    <div className="space-y-6">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">Curriculum Module Builder</h3>
                                                <p className="text-xs text-slate-500">Structure interactive modules and lecture topics for student enrollments.</p>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={addModule}
                                                className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold text-xs flex items-center gap-2 transition-all shadow-md shadow-violet-500/20"
                                            >
                                                <Plus className="w-4 h-4" /> Add Module
                                            </button>
                                        </div>

                                        {modules.length === 0 ? (
                                            <div className="p-10 rounded-2xl bg-slate-50 border border-dashed border-slate-300 text-center text-slate-500 text-sm">
                                                No modules added yet. Click "+ Add Module" to build your course outline.
                                            </div>
                                        ) : (
                                            <div className="space-y-4">
                                                {modules.map((mod, modIdx) => (
                                                    <div key={modIdx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 shadow-sm">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-8 h-8 rounded-lg bg-violet-100 text-violet-700 font-extrabold flex items-center justify-center text-xs shrink-0">
                                                                M{modIdx + 1}
                                                            </div>
                                                            <input
                                                                type="text"
                                                                value={mod.title}
                                                                onChange={(e) => updateModuleTitle(modIdx, e.target.value)}
                                                                placeholder="Module Title (e.g. Module 1: Introduction to Data Structures)"
                                                                className="flex-1 bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-sm text-slate-900 font-semibold focus:outline-none focus:border-violet-600 focus:ring-1 focus:ring-violet-600"
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={() => removeModule(modIdx)}
                                                                className="p-2 rounded-lg text-rose-500 hover:bg-rose-100 transition-all"
                                                                title="Remove Module"
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                            </button>
                                                        </div>

                                                        <div className="pl-11 space-y-2.5">
                                                            <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-slate-500 font-extrabold mb-1">
                                                                <span>Lessons ({mod.lessons.length})</span>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => addLesson(modIdx)}
                                                                    className="text-violet-600 hover:text-violet-700 flex items-center gap-1 lowercase font-bold"
                                                                >
                                                                    + add lesson
                                                                </button>
                                                            </div>

                                                            {mod.lessons.map((lesson, lessIdx) => (
                                                                <div key={lessIdx} className="flex items-center gap-2">
                                                                    <span className="text-slate-400 font-semibold text-xs w-6">{modIdx + 1}.{lessIdx + 1}</span>
                                                                    <input
                                                                        type="text"
                                                                        value={lesson.title}
                                                                        onChange={(e) => updateLessonTitle(modIdx, lessIdx, e.target.value)}
                                                                        placeholder="Lesson topic..."
                                                                        className="flex-1 bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-violet-500"
                                                                    />
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => removeLesson(modIdx, lessIdx)}
                                                                        className="text-slate-400 hover:text-rose-600 p-1"
                                                                        title="Remove lesson"
                                                                    >
                                                                        <X className="w-3.5 h-3.5" />
                                                                    </button>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* TAB 4: COVERS & MEDIA */}
                                {modalTab === 'media' && (
                                    <div className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="block text-xs font-bold uppercase text-slate-700">Course Icon / Thumbnail</label>
                                                <div className="h-48 rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 overflow-hidden relative flex flex-col items-center justify-center text-center p-4 hover:border-violet-500 transition-colors">
                                                    {imagePreview ? (
                                                        <>
                                                            <img src={imagePreview} alt="Thumbnail" className="w-full h-full object-cover absolute inset-0" />
                                                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                                                <span className="text-xs text-white font-bold bg-white/20 px-3 py-1.5 rounded-lg backdrop-blur-md">Change Image</span>
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <div className="flex flex-col items-center text-slate-500">
                                                            <Image className="w-8 h-8 mb-2 text-violet-600" />
                                                            <span className="text-xs font-bold text-slate-700">Click to upload thumbnail</span>
                                                            <span className="text-[11px] text-slate-400 mt-0.5">Recommended: 800x600 WEBP or PNG</span>
                                                        </div>
                                                    )}
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={(e) => {
                                                            const file = e.target.files?.[0];
                                                            if (file) {
                                                                setImageFile(file);
                                                                setImagePreview(URL.createObjectURL(file));
                                                            }
                                                        }}
                                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="block text-xs font-bold uppercase text-slate-700">Header Banner Cover</label>
                                                <div className="h-48 rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 overflow-hidden relative flex flex-col items-center justify-center text-center p-4 hover:border-violet-500 transition-colors">
                                                    {bannerPreview ? (
                                                        <>
                                                            <img src={bannerPreview} alt="Banner" className="w-full h-full object-cover absolute inset-0" />
                                                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                                                <span className="text-xs text-white font-bold bg-white/20 px-3 py-1.5 rounded-lg backdrop-blur-md">Change Banner</span>
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <div className="flex flex-col items-center text-slate-500">
                                                            <Image className="w-8 h-8 mb-2 text-indigo-600" />
                                                            <span className="text-xs font-bold text-slate-700">Click to upload wide banner</span>
                                                            <span className="text-[11px] text-slate-400 mt-0.5">Recommended: 1920x400 Wide Cover</span>
                                                        </div>
                                                    )}
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={(e) => {
                                                            const file = e.target.files?.[0];
                                                            if (file) {
                                                                setBannerFile(file);
                                                                setBannerPreview(URL.createObjectURL(file));
                                                            }
                                                        }}
                                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* TAB 5: SETTINGS & TOGGLES */}
                                {modalTab === 'settings' && (
                                    <div className="space-y-4">
                                        {[
                                            { 
                                                label: 'Course Active Status', 
                                                sub: 'Enable visibility and enrollments across user applications & portal.', 
                                                state: isActive, 
                                                onToggle: () => setIsActive(!isActive), 
                                                col: 'bg-emerald-600' 
                                            },
                                            { 
                                                label: 'Project Submissions Enabled', 
                                                sub: 'Allow students to upload Capstone Projects for grading.', 
                                                state: isProjectActive, 
                                                onToggle: () => {
                                                    const val = !isProjectActive;
                                                    setIsProjectActive(val);
                                                    if (val || isAssessmentActive) {
                                                        setAutoGenCert(false);
                                                    } else if (!val && !isAssessmentActive) {
                                                        setAutoGenCert(true);
                                                    }
                                                }, 
                                                col: 'bg-violet-600' 
                                            },
                                            { 
                                                label: 'Proctoring & Assessments', 
                                                sub: 'Activate online quiz evaluations and progress tests for this course.', 
                                                state: isAssessmentActive, 
                                                onToggle: () => {
                                                    const val = !isAssessmentActive;
                                                    setIsAssessmentActive(val);
                                                    if (isProjectActive || val) {
                                                        setAutoGenCert(false);
                                                    } else if (!isProjectActive && !val) {
                                                        setAutoGenCert(true);
                                                    }
                                                }, 
                                                col: 'bg-indigo-600' 
                                            },
                                            { 
                                                label: 'Auto-Generate Certificate', 
                                                sub: 'Issue certificate immediately on 100% course completion (Only applies if Project & Assessment are disabled).', 
                                                state: autoGenCert, 
                                                onToggle: () => {
                                                    const val = !autoGenCert;
                                                    setAutoGenCert(val);
                                                    if (val) {
                                                        setIsProjectActive(false);
                                                        setIsAssessmentActive(false);
                                                    }
                                                }, 
                                                col: 'bg-cyan-600' 
                                            }
                                        ].filter(item => !(classMode === 'Module Class' && (item.label === 'Project Submissions Enabled' || item.label === 'Proctoring & Assessments')))
                                         .map((item, idx) => (
                                            <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-4">
                                                <div>
                                                    <h4 className="text-sm font-bold text-slate-900">{item.label}</h4>
                                                    <p className="text-xs text-slate-500 mt-0.5">{item.sub}</p>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={item.onToggle}
                                                    className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 relative ${
                                                        item.state ? item.col : 'bg-slate-300'
                                                    }`}
                                                >
                                                    <div className={`w-4 h-4 rounded-full bg-white shadow-md transform transition-transform duration-300 ${
                                                        item.state ? 'translate-x-6' : 'translate-x-0'
                                                    }`} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Footer Navigation & Submit */}
                                <div className="pt-6 border-t border-slate-200 flex items-center justify-between shrink-0">
                                    {isFirstTab ? (
                                        <button
                                            key="btn-cancel"
                                            type="button"
                                            onClick={() => setShowModal(false)}
                                            className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm transition-all"
                                        >
                                            Cancel
                                        </button>
                                    ) : (
                                        <button
                                            key="btn-prev"
                                            type="button"
                                            onClick={handlePrevStep}
                                            className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm transition-all inline-flex items-center gap-2"
                                        >
                                            <ArrowLeft className="w-4 h-4" /> Previous Step
                                        </button>
                                    )}

                                    <div className="flex items-center gap-3">
                                        {!isLastTab ? (
                                            <button
                                                key="btn-next"
                                                type="button"
                                                onClick={handleNextStep}
                                                className="px-6 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-bold text-sm shadow-md shadow-violet-500/20 transition-all inline-flex items-center gap-2"
                                            >
                                                Next Step <ArrowRight className="w-4 h-4" />
                                            </button>
                                        ) : (
                                            <button
                                                key="btn-submit"
                                                type="button"
                                                onClick={handleSave}
                                                disabled={saving}
                                                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-extrabold text-sm shadow-lg shadow-violet-500/25 transition-all disabled:opacity-50 inline-flex items-center gap-2"
                                            >
                                                {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                                                {saving ? 'Saving...' : editingCourse ? 'Update Course' : 'Create Course'}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminCourses;
