import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    GraduationCap, Search, Users, UserCheck, Calendar, Clock, Award,
    Layers, ChevronRight, ChevronDown, CheckCircle2, RefreshCw, X,
    Edit3, Bell, BellOff, ArrowRightLeft, UserPlus, Sparkles, ShieldCheck,
    Download, FileSpreadsheet
} from 'lucide-react';
import {
    apiGetSession, apiGetAdminPanelCourses, apiGetAdminPanelCourse,
    apiGetAdminPanelCategories, apiGetAdminPanelInstructors,
    apiGetBatchUsers, apiUpdateBatch, apiTransferStudent
} from '../utils/apiClient';
import AdminSidebar from '../components/AdminSidebar';

const AdminEnrollments = () => {
    const navigate = useNavigate();
    const [userEmail, setUserEmail] = useState('');
    const [courses, setCourses] = useState([]);
    const [categories, setCategories] = useState(['All']);
    const [instructors, setInstructors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCat, setSelectedCat] = useState('All');
    const [selectedClassMode, setSelectedClassMode] = useState('All');

    // Active course for batches management
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [courseBatches, setCourseBatches] = useState([]);
    const [loadingBatches, setLoadingBatches] = useState(false);

    // Expanded batch users
    const [expandedBatchId, setExpandedBatchId] = useState(null);
    const [batchUsers, setBatchUsers] = useState({});
    const [loadingUsers, setLoadingUsers] = useState({});

    // Edit Batch Modal
    const [editingBatch, setEditingBatch] = useState(null);
    const [batchName, setBatchName] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [maxSeats, setMaxSeats] = useState('20');
    const [meetUrl, setMeetUrl] = useState('');

    // Transfer Student Modal
    const [transferStudent, setTransferStudent] = useState(null);
    const [targetBatchId, setTargetBatchId] = useState('');
    const [transferring, setTransferring] = useState(false);

    // Assign Instructor state
    const [assigningBatchId, setAssigningBatchId] = useState(null);
    const [selectedInstructorId, setSelectedInstructorId] = useState('');

    // Exporting CSV loaders
    const [exportingCourseId, setExportingCourseId] = useState(null);
    const [exportingBatchId, setExportingBatchId] = useState(null);

    const downloadCSV = (filename, rows) => {
        const csvContent = "\uFEFF" + rows.map(e => 
            e.map(cell => `"${String(cell !== null && cell !== undefined ? cell : '').replace(/"/g, '""')}"`).join(",")
        ).join("\r\n");
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const handleExportCourseCSV = async (course) => {
        setExportingCourseId(course.id);
        try {
            const fullCourse = await apiGetAdminPanelCourse(course.id).catch(() => course);
            const batches = Array.isArray(fullCourse.batches) ? fullCourse.batches : (Array.isArray(course.batches) ? course.batches : []);
            
            const rows = [
                ["Course ID", "Course Title", "Category", "Batch ID", "Batch Name", "Timings", "Instructor Name", "Student Name", "Student Email", "Phone", "Status"]
            ];

            for (const batch of batches) {
                const bId = typeof batch === 'object' ? batch.id : batch;
                const bName = typeof batch === 'object' ? (batch.batch_name || `Batch #${bId}`) : `Batch #${bId}`;
                const startT = typeof batch === 'object' && batch.start_time ? batch.start_time : '';
                const endT = typeof batch === 'object' && batch.end_time ? batch.end_time : '';
                const timing = (startT || endT) ? `${startT} - ${endT}`.trim().replace(/^-$/, 'N/A') : 'N/A';
                const instructorName = typeof batch === 'object' ? (batch.instructor_name || batch.instructor_details?.full_name || batch.instructor_details?.email || 'Not Assigned') : 'Not Assigned';

                const users = await apiGetBatchUsers(bId, false).catch(() => []);
                
                if (Array.isArray(users) && users.length > 0) {
                    for (const u of users) {
                        rows.push([
                            course.id,
                            course.title || 'Course',
                            course.category || 'General',
                            bId || 'N/A',
                            bName || `Batch #${bId}`,
                            timing || 'N/A',
                            instructorName || 'Not Assigned',
                            u.name || u.first_name || u.username || 'Student',
                            u.email || 'N/A',
                            u.phone_number || u.phone || 'N/A',
                            u.role === 'student' ? 'Enrolled' : (u.role || 'Enrolled')
                        ]);
                    }
                } else {
                    rows.push([
                        course.id,
                        course.title || 'Course',
                        course.category || 'General',
                        bId || 'N/A',
                        bName || `Batch #${bId}`,
                        timing || 'N/A',
                        instructorName || 'Not Assigned',
                        'No students enrolled yet',
                        '-',
                        '-',
                        'Active Cohort'
                    ]);
                }
            }

            if (batches.length === 0) {
                rows.push([course.id, course.title || 'Course', course.category || 'General', 'N/A', 'No cohorts created', 'N/A', 'N/A', 'No students enrolled yet', '-', '-', 'No Batches']);
            }

            const cleanName = (course.title || 'Course').replace(/[^a-zA-Z0-9]/g, '_');
            downloadCSV(`Course_Enrollments_${cleanName}_${new Date().toISOString().slice(0,10)}.csv`, rows);
        } catch (err) {
            alert('Failed to generate CSV export for course.');
            console.error(err);
        } finally {
            setExportingCourseId(null);
        }
    };

    const handleExportBatchCSV = async (batch) => {
        setExportingBatchId(batch.id);
        try {
            const bId = typeof batch === 'object' ? batch.id : batch;
            let users = batchUsers[bId];
            if (!users) {
                users = await apiGetBatchUsers(bId, false).catch(() => []);
                setBatchUsers(prev => ({ ...prev, [bId]: Array.isArray(users) ? users : [] }));
            }
            const rows = [
                ["Course Title", "Batch ID", "Batch Name", "Start Time", "End Time", "Instructor", "Student Name", "Student Email", "Phone Number", "Enrollment Status"]
            ];
            const courseTitle = selectedCourse?.title || 'Course';
            const bName = typeof batch === 'object' ? (batch.batch_name || `Batch #${bId}`) : `Batch #${bId}`;
            const instructorName = typeof batch === 'object' ? (batch.instructor_name || batch.instructor_details?.full_name || batch.instructor_details?.email || 'Not Assigned') : 'Not Assigned';

            if (Array.isArray(users) && users.length > 0) {
                for (const u of users) {
                    rows.push([
                        courseTitle,
                        bId || 'N/A',
                        bName || `Batch #${bId}`,
                        (typeof batch === 'object' && batch.start_time) ? batch.start_time : 'N/A',
                        (typeof batch === 'object' && batch.end_time) ? batch.end_time : 'N/A',
                        instructorName || 'Not Assigned',
                        u.name || u.first_name || u.username || 'Student',
                        u.email || 'N/A',
                        u.phone_number || u.phone || 'N/A',
                        u.role === 'student' ? 'Enrolled' : (u.role || 'Enrolled')
                    ]);
                }
            } else {
                rows.push([courseTitle, bId || 'N/A', bName || `Batch #${bId}`, (typeof batch === 'object' && batch.start_time) ? batch.start_time : 'N/A', (typeof batch === 'object' && batch.end_time) ? batch.end_time : 'N/A', instructorName || 'Not Assigned', 'No students enrolled yet', '-', '-', 'Empty Batch']);
            }

            const cleanName = (bName || `Batch_${bId}`).replace(/[^a-zA-Z0-9]/g, '_');
            downloadCSV(`Batch_Roster_${cleanName}_${new Date().toISOString().slice(0,10)}.csv`, rows);
        } catch (err) {
            alert('Failed to generate CSV for this batch.');
        } finally {
            setExportingBatchId(null);
        }
    };

    useEffect(() => {
        const init = async () => {
            const session = await apiGetSession();
            if (!session && !localStorage.getItem('aindhin_token')) {
                navigate('/wp-admin');
            } else if (session) {
                setUserEmail(session.user?.email || 'admin@aindhin.com');
            }
            fetchInitialData();
        };
        init();
    }, [navigate]);

    const fetchInitialData = async () => {
        setLoading(true);
        try {
            const [courseList, catList, instructorList] = await Promise.all([
                apiGetAdminPanelCourses().catch(() => []),
                apiGetAdminPanelCategories().catch(() => []),
                apiGetAdminPanelInstructors().catch(() => [])
            ]);
            
            const list = Array.isArray(courseList) ? courseList : (courseList?.results || []);
            setCourses(list);

            const rawInstructors = Array.isArray(instructorList) ? instructorList : (instructorList?.results || []);
            const normalizedInstructors = rawInstructors.map(inst => {
                const u = inst.user || inst.user_details || {};
                const fullName = [u.first_name, u.last_name].filter(Boolean).join(' ').trim();
                const displayName = inst.name || inst.full_name || fullName || u.email || u.username || `Instructor #${inst.id}`;
                return {
                    ...inst,
                    name: displayName,
                    email: inst.email || u.email || ''
                };
            });
            setInstructors(normalizedInstructors);

            if (Array.isArray(catList) && catList.length > 0) {
                const catNames = catList.map(c => typeof c === 'object' ? c.name : c).filter(Boolean);
                setCategories(['All', ...Array.from(new Set([...catNames, ...list.map(c => c.category).filter(Boolean)]))]);
            } else {
                setCategories(['All', ...Array.from(new Set(list.map(c => c.category || 'Uncategorized')))]);
            }
        } catch (err) {
            console.error('Error fetching enrollments data:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenBatches = async (course) => {
        setSelectedCourse(course);
        setLoadingBatches(true);
        setExpandedBatchId(null);
        try {
            const fullDetails = await apiGetAdminPanelCourse(course.id);
            setCourseBatches(Array.isArray(fullDetails.batches) ? fullDetails.batches : []);
        } catch (err) {
            console.error(err);
            setCourseBatches([]);
        } finally {
            setLoadingBatches(false);
        }
    };

    const handleToggleUsers = async (batchId) => {
        if (expandedBatchId === batchId) {
            setExpandedBatchId(null);
            return;
        }
        setExpandedBatchId(batchId);
        if (!batchUsers[batchId]) {
            setLoadingUsers(prev => ({ ...prev, [batchId]: true }));
            try {
                const users = await apiGetBatchUsers(batchId, false);
                setBatchUsers(prev => ({ ...prev, [batchId]: Array.isArray(users) ? users : [] }));
            } catch (err) {
                console.error('Error fetching students:', err);
                setBatchUsers(prev => ({ ...prev, [batchId]: [] }));
            } finally {
                setLoadingUsers(prev => ({ ...prev, [batchId]: false }));
            }
        }
    };

    const handleToggleReminder = async (batch) => {
        try {
            const newVal = !batch.reminder_enabled;
            await apiUpdateBatch(batch.id, { reminder_enabled: newVal });
            setCourseBatches(prev => prev.map(b => b.id === batch.id ? { ...b, reminder_enabled: newVal } : b));
        } catch (err) {
            alert('Failed to update reminder status.');
        }
    };

    const handleSaveBatchEdit = async (e) => {
        e.preventDefault();
        try {
            const formatTimeForBackend = (timeStr) => {
                if (!timeStr || !timeStr.trim()) return null;
                const cleaned = timeStr.trim();
                const ampmMatch = cleaned.match(/^(\d{1,2}):?(\d{2})?\s*(AM|PM|am|pm)$/i);
                if (ampmMatch) {
                    let hours = parseInt(ampmMatch[1], 10);
                    const minutes = ampmMatch[2] ? ampmMatch[2] : "00";
                    const mod = ampmMatch[3].toUpperCase();
                    if (hours === 12) hours = 0;
                    if (mod === 'PM') hours += 12;
                    return `${hours.toString().padStart(2, '0')}:${minutes}:00`;
                }
                if (/^\d{1,2}:\d{2}(:\d{2})?$/.test(cleaned)) {
                    return cleaned.length === 5 ? `${cleaned}:00` : cleaned;
                }
                return null;
            };

            const cleanStartTime = formatTimeForBackend(startTime);
            const cleanEndTime = formatTimeForBackend(endTime);

            const isModule = selectedCourse?.class_mode === 'Module Class' || selectedCourse?.course_type === 'Module' || selectedCourse?.classMode === 'Module Class';
            const updated = await apiUpdateBatch(editingBatch.id, {
                batch_name: isModule ? (batchName || `Batch #${editingBatch.id}`) : (batchName || `Batch #${editingBatch.id}`),
                start_time: cleanStartTime,
                end_time: cleanEndTime,
                max_seats: isModule ? 999999 : (parseInt(maxSeats, 10) || 20)
            });
            setCourseBatches(prev => prev.map(b => b.id === editingBatch.id ? { ...b, ...updated, max_seats: isModule ? 999999 : (parseInt(maxSeats, 10) || 20), batch_name: batchName, start_time: cleanStartTime || '', end_time: cleanEndTime || '' } : b));
            setEditingBatch(null);
        } catch (err) {
            alert(`Error updating batch details: ${err.message || 'Invalid data submitted'}`);
        }
    };

    const handleTransferSubmit = async (e) => {
        e.preventDefault();
        if (!targetBatchId) return;
        setTransferring(true);
        try {
            await apiTransferStudent(transferStudent.user.id, transferStudent.currentBatch.id, parseInt(targetBatchId, 10));
            const [oldUsers, newUsers] = await Promise.all([
                apiGetBatchUsers(transferStudent.currentBatch.id, false),
                apiGetBatchUsers(parseInt(targetBatchId, 10), false)
            ]);
            setBatchUsers(prev => ({
                ...prev,
                [transferStudent.currentBatch.id]: Array.isArray(oldUsers) ? oldUsers : [],
                [parseInt(targetBatchId, 10)]: Array.isArray(newUsers) ? newUsers : []
            }));
            setCourseBatches(prev => prev.map(b => {
                if (b.id === transferStudent.currentBatch.id) return { ...b, enrolled_count: Math.max(0, (b.enrolled_count || 1) - 1) };
                if (b.id === parseInt(targetBatchId, 10)) return { ...b, enrolled_count: (b.enrolled_count || 0) + 1 };
                return b;
            }));
            setTransferStudent(null);
        } catch (err) {
            alert('Failed to transfer student: ' + (err.message || 'Server error'));
        } finally {
            setTransferring(false);
        }
    };

    const handleAssignInstructor = async (batchId) => {
        if (!selectedInstructorId) return;
        try {
            const instId = parseInt(selectedInstructorId, 10);
            await apiUpdateBatch(batchId, { instructor: instId, instructor_ids: [instId] });
            const instObj = instructors.find(i => i.id === instId);
            setCourseBatches(prev => prev.map(b => b.id === batchId ? { ...b, instructor: instId, instructor_details: instObj, instructor_name: instObj?.name || instObj?.email || 'Instructor' } : b));
            setAssigningBatchId(null);
            setSelectedInstructorId('');
        } catch (err) {
            alert('Failed to assign instructor.');
        }
    };

    // Filter logic with active courses sorted first
    const filteredCourses = courses.filter(c => {
        const matchCat = selectedCat === 'All' || (c.category || 'Uncategorized') === selectedCat;
        const matchSearch = searchTerm.trim() === '' ||
            c.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.category?.toLowerCase().includes(searchTerm.toLowerCase());
            
        const mode = (c.class_mode || c.classMode || 'Live Class').trim();
        const normalizedMode = (mode === 'Module Class' || mode === 'Module' || c.course_type === 'Module') ? 'Module Class' : 'Live Class';
        const matchMode = selectedClassMode === 'All' || normalizedMode === selectedClassMode;
            
        return matchCat && matchSearch && matchMode;
    }).sort((a, b) => {
        const aActive = (a.is_active !== false && !a.is_ended) ? 1 : 0;
        const bActive = (b.is_active !== false && !b.is_ended) ? 1 : 0;
        return bActive - aActive;
    });

    const totalStudents = courses.reduce((acc, c) => acc + (c.total_enrolled || c.enrolled_count || c.total_students || 0), 0);

    return (
        <div className="flex h-screen bg-slate-50 font-inter overflow-hidden text-slate-900">
            <AdminSidebar userEmail={userEmail} />

            <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
                <main className="flex-1 p-6 md:p-8 max-w-7xl mx-auto w-full space-y-8">
                    {/* Page Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
                        <div>
                            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
                                    <GraduationCap className="w-6 h-6" />
                                </div>
                                Enrollments & Live Batches
                            </h2>
                            <p className="text-slate-500 text-sm mt-1">
                                Monitor student cohorts, schedule class sessions, assign instructors, and transfer seat enrollments.
                            </p>
                        </div>
                        <button
                            onClick={fetchInitialData}
                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold text-sm transition-all shadow-sm"
                        >
                            <RefreshCw className={`w-4 h-4 text-indigo-600 ${loading ? 'animate-spin' : ''}`} />
                            Refresh Roster
                        </button>
                    </div>

                    {/* Stat Summary */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {[
                            { label: 'Tracked Courses', val: courses.length, icon: Layers, gradient: 'from-violet-500 to-indigo-600', glow: 'shadow-violet-500/15' },
                            { label: 'Total Enrolled Seats', val: `${totalStudents}+`, icon: Users, gradient: 'from-emerald-500 to-teal-600', glow: 'shadow-emerald-500/15' },
                            { label: 'Assigned Instructors', val: instructors.length || 'Active', icon: UserCheck, gradient: 'from-cyan-500 to-blue-600', glow: 'shadow-cyan-500/15' },
                            { label: 'Live Cohort Health', val: '100%', icon: Sparkles, gradient: 'from-amber-500 to-orange-600', glow: 'shadow-amber-500/15' }
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

                    {/* Controls Bar */}
                    <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
                        <div className="relative flex-1 w-full">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search courses to inspect enrollments..."
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-10 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-violet-600 focus:ring-2 focus:ring-violet-600/10 transition-all"
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
                                    value={selectedCat}
                                    onChange={(e) => setSelectedCat(e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-10 py-2.5 text-sm font-semibold text-slate-700 hover:border-violet-300 focus:outline-none focus:bg-white focus:border-violet-600 focus:ring-2 focus:ring-violet-600/10 appearance-none transition-all cursor-pointer shadow-xs"
                                >
                                    {categories.map(cat => (
                                        <option key={cat} value={cat}>
                                            {cat === 'All' ? 'Filter by Category (All)' : cat}
                                        </option>
                                    ))}
                                </select>
                                <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                            </div>
                        </div>
                    </div>

                    {/* Courses & Batches List */}
                    {loading ? (
                        <div className="py-24 flex flex-col items-center justify-center gap-3">
                            <RefreshCw className="w-10 h-10 text-indigo-600 animate-spin" />
                            <p className="text-sm font-semibold text-slate-500">Loading enrollment cohorts...</p>
                        </div>
                    ) : filteredCourses.length === 0 ? (
                        <div className="py-20 text-center bg-white rounded-3xl border border-slate-200 shadow-sm">
                            <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                            <h3 className="text-lg font-bold text-slate-800">No Courses Found</h3>
                            <p className="text-sm text-slate-500 mt-1 max-w-md mx-auto">
                                No matching courses found to display batches or student enrollments.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-4">
                            {filteredCourses.map(course => (
                                <div
                                    key={course.id}
                                    className="p-6 rounded-2xl bg-white border border-slate-200/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-violet-300 hover:shadow-md transition-all shadow-sm"
                                >
                                    <div className="flex items-center gap-5 flex-1 min-w-0">
                                        <div className="w-16 h-16 rounded-2xl bg-slate-900 overflow-hidden shrink-0 border border-slate-200 relative shadow-sm">
                                            {(course.image_url || course.image) ? (
                                                <img src={course.image_url || course.image} alt="" className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-indigo-50 text-indigo-600 font-bold text-[10px] uppercase">
                                                    COURSE
                                                </div>
                                            )}
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <div className="flex flex-wrap items-center gap-2.5 text-xs font-bold mb-1.5">
                                                <span className={`px-2.5 py-0.5 rounded-md text-[10px] uppercase font-extrabold tracking-wider shadow-xs ${
                                                    course.is_ended
                                                        ? 'bg-slate-600 text-white'
                                                        : course.is_active !== false
                                                            ? 'bg-emerald-500 text-white'
                                                            : 'bg-rose-500 text-white'
                                                }`}>
                                                    {course.is_ended ? 'Completed' : course.is_active !== false ? 'Active' : 'Inactive'}
                                                </span>
                                                <span className="text-violet-600 font-extrabold">{course.category || 'General'}</span>
                                                <span className="text-slate-300">•</span>
                                                <span className="uppercase text-slate-500 font-semibold">{course.course_type || 'Free'}</span>
                                                {course.class_mode && (
                                                    <span className={`px-2.5 py-0.5 rounded-md text-[10px] uppercase font-extrabold tracking-wider shadow-xs ${
                                                        course.class_mode === 'Module Class' ? 'bg-indigo-500 text-white' : 'bg-cyan-500 text-white'
                                                    }`}>
                                                        {course.class_mode}
                                                    </span>
                                                )}
                                            </div>
                                            <h3 className="text-lg font-extrabold text-slate-900 truncate">{course.title}</h3>
                                            <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                                                {!(course.class_mode === 'Module Class' || course.classMode === 'Module Class') && (
                                                    <span className="flex items-center gap-1.5 font-medium">
                                                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                                                        {course.course_duration || 'Flexible schedule'}
                                                    </span>
                                                )}
                                                <span className="flex items-center gap-1.5 font-bold text-emerald-600">
                                                    <Users className="w-3.5 h-3.5" />
                                                    {course.total_enrolled || course.enrolled_count || course.total_students || 0} active students
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap items-center gap-3 shrink-0">
                                        <button
                                            onClick={() => handleExportCourseCSV(course)}
                                            disabled={exportingCourseId === course.id}
                                            className="px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs border border-slate-200 shadow-sm transition-all flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 whitespace-nowrap"
                                            title="Download CSV report of all cohorts and students for this course"
                                        >
                                            {exportingCourseId === course.id ? (
                                                <RefreshCw className="w-3.5 h-3.5 animate-spin text-violet-600" />
                                            ) : (
                                                <Download className="w-3.5 h-3.5 text-emerald-600" />
                                            )}
                                            {exportingCourseId === course.id ? 'Exporting...' : 'Export Course CSV'}
                                        </button>

                                        <button
                                            onClick={() => handleOpenBatches(course)}
                                            className="px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-bold text-sm shadow-lg shadow-violet-500/20 whitespace-nowrap transition-all flex items-center gap-2.5 hover:scale-[1.02] active:scale-[0.98]"
                                        >
                                            <Users className="w-4 h-4" />
                                            Manage Batches & Students
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </main>
            </div>

            {/* ── Batches & Roster Modal (Light Theme) ────────────────────────────── */}
            <AnimatePresence>
                {selectedCourse && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-900/60 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white border border-slate-200 rounded-3xl shadow-2xl w-full max-w-5xl overflow-hidden flex flex-col max-h-[92vh] text-slate-900"
                        >
                            <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between bg-slate-50 shrink-0">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold shadow-sm shrink-0">
                                        <GraduationCap className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-extrabold text-slate-900">
                                            {selectedCourse.title} — Cohort Batches
                                        </h2>
                                        <p className="text-xs text-slate-500">
                                            Manage schedules, trigger class reminders, assign teaching staff, and transfer student enrollments.
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setSelectedCourse(null)}
                                    className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
                                {loadingBatches ? (
                                    <div className="py-20 flex flex-col items-center justify-center gap-3">
                                        <RefreshCw className="w-8 h-8 text-violet-600 animate-spin" />
                                        <p className="text-sm font-semibold text-slate-500">Loading class batches & timetables...</p>
                                    </div>
                                ) : courseBatches.length === 0 ? (
                                    <div className="py-16 text-center bg-white rounded-2xl border border-dashed border-slate-300 shadow-sm">
                                        <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                                        <h3 className="text-base font-bold text-slate-800">No Batches Found For This Course</h3>
                                        <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                                            To set up class schedules or seat counts, edit this course under Course Management.
                                        </p>
                                    </div>
                                ) : (
                                    <div className="space-y-6">
                                        {courseBatches.map(batch => {
                                            const isExpanded = expandedBatchId === batch.id;
                                            const students = batchUsers[batch.id] || [];
                                            const isReminder = Boolean(batch.reminder_enabled);

                                            return (
                                                <div key={batch.id} className="p-6 rounded-2xl bg-white border border-slate-200/90 space-y-5 shadow-sm hover:shadow transition-shadow">
                                                        {/* Batch Top Header Row */}
                                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                                            {!(selectedCourse?.class_mode === 'Module Class' || selectedCourse?.classMode === 'Module Class' || selectedCourse?.course_type === 'Module') ? (
                                                                <div>
                                                                    <div className="flex items-center gap-3">
                                                                        <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                                                                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                                                                            {batch.batch_name || `Batch #${batch.id}`}
                                                                        </h3>
                                                                        <span className="px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-xs text-slate-700 font-semibold">
                                                                            {batch.enrolled_count || 0} / {batch.max_seats || 20} Seats
                                                                        </span>
                                                                    </div>
                                                                    <p className="text-xs text-slate-500 mt-1.5 flex items-center gap-3">
                                                                        <span className="flex items-center gap-1.5 font-medium text-slate-600">
                                                                            <Clock className="w-3.5 h-3.5 text-violet-600" />
                                                                            Timing: {batch.start_time || 'N/A'} - {batch.end_time || 'N/A'}
                                                                        </span>
                                                                    </p>
                                                                </div>
                                                            ) : <div />}

                                                        {/* Actions Group */}
                                                        <div className="flex flex-wrap items-center gap-2.5">
                                                            {/* Reminder Switch Button */}
                                                            {!(selectedCourse?.class_mode === 'Module Class' || selectedCourse?.classMode === 'Module Class' || selectedCourse?.course_type === 'Module') && (
                                                                <button
                                                                    onClick={() => handleToggleReminder(batch)}
                                                                    className={`px-3.5 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition-all border ${
                                                                        isReminder
                                                                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200 shadow-sm'
                                                                            : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200/70'
                                                                    }`}
                                                                >
                                                                    {isReminder ? <Bell className="w-3.5 h-3.5 text-emerald-600" /> : <BellOff className="w-3.5 h-3.5" />}
                                                                    {isReminder ? 'Reminder ON' : 'Reminder OFF'}
                                                                </button>
                                                            )}

                                                            {/* Edit Batch button */}
                                                            {!(selectedCourse?.class_mode === 'Module Class' || selectedCourse?.classMode === 'Module Class' || selectedCourse?.course_type === 'Module') && (
                                                                <button
                                                                    onClick={() => {
                                                                        setEditingBatch(batch);
                                                                        setBatchName(batch.batch_name || '');
                                                                        setStartTime(batch.start_time ? batch.start_time.slice(0, 5) : '');
                                                                        setEndTime(batch.end_time ? batch.end_time.slice(0, 5) : '');
                                                                        setMaxSeats(batch.max_seats?.toString() || '20');
                                                                        setMeetUrl(batch.google_meet_url || '');
                                                                    }}
                                                                    className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all flex items-center gap-1.5"
                                                                >
                                                                    <Edit3 className="w-3.5 h-3.5 text-violet-600" />
                                                                    Edit Timings
                                                                </button>
                                                            )}

                                                            {/* Export Batch CSV button */}
                                                            <button
                                                                onClick={() => handleExportBatchCSV(batch)}
                                                                disabled={exportingBatchId === batch.id}
                                                                className="px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 font-bold text-xs transition-all flex items-center gap-1.5 disabled:opacity-50 shadow-xs"
                                                                title="Download Excel/CSV roster for this batch"
                                                            >
                                                                {exportingBatchId === batch.id ? (
                                                                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-600" />
                                                                ) : (
                                                                    <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
                                                                )}
                                                                {exportingBatchId === batch.id ? 'Exporting...' : 'Export Batch CSV'}
                                                            </button>

                                                            {/* Toggle Roster button */}
                                                            <button
                                                                onClick={() => handleToggleUsers(batch.id)}
                                                                className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 ${
                                                                    isExpanded
                                                                        ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md shadow-violet-500/20'
                                                                        : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
                                                                }`}
                                                            >
                                                                <Users className="w-3.5 h-3.5" />
                                                                {isExpanded ? 'Hide Students' : `View Students (${batch.enrolled_count || 0})`}
                                                                {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                                                            </button>
                                                        </div>
                                                    </div>

                                                    {/* Instructor Assignment Banner */}
                                                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                                                        <div className="flex items-center gap-2.5">
                                                            <ShieldCheck className="w-4 h-4 text-indigo-600 shrink-0" />
                                                            <div>
                                                                <span className="text-slate-500 font-medium">Lead Instructor: </span>
                                                                <span className="text-slate-900 font-bold">
                                                                    {(() => {
                                                                        const foundInst = instructors.find(i => i.id === (typeof batch.instructor === 'object' ? batch.instructor?.id : parseInt(batch.instructor, 10)));
                                                                        return batch.instructor_name || batch.instructor_details?.name || batch.instructor_details?.full_name || batch.instructor_details?.user?.first_name || foundInst?.name || 'No instructor assigned yet';
                                                                    })()}
                                                                </span>
                                                            </div>
                                                        </div>

                                                        {assigningBatchId === batch.id ? (
                                                            <div className="flex items-center gap-2">
                                                                <select
                                                                    value={selectedInstructorId}
                                                                    onChange={(e) => setSelectedInstructorId(e.target.value)}
                                                                    className="bg-white border border-slate-300 rounded-lg px-2.5 py-1 text-xs text-slate-800 focus:outline-none focus:border-violet-600"
                                                                >
                                                                    <option value="">Select instructor...</option>
                                                                    {instructors.map(inst => (
                                                                        <option key={inst.id} value={inst.id}>{inst.name}{inst.email && inst.name !== inst.email ? ` (${inst.email})` : ''}</option>
                                                                    ))}
                                                                </select>
                                                                <button onClick={() => handleAssignInstructor(batch.id)} className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3 py-1 rounded-lg">Save</button>
                                                                <button onClick={() => setAssigningBatchId(null)} className="text-slate-500 hover:text-slate-800 px-2 font-semibold">Cancel</button>
                                                            </div>
                                                        ) : (
                                                            <button
                                                                onClick={() => {
                                                                    setAssigningBatchId(batch.id);
                                                                    setSelectedInstructorId(batch.instructor_details?.id || (typeof batch.instructor === 'object' ? batch.instructor?.id : batch.instructor) || '');
                                                                }}
                                                                className="text-violet-600 hover:text-violet-700 font-bold flex items-center gap-1.5 shrink-0"
                                                            >
                                                                <UserPlus className="w-3.5 h-3.5" /> Change Instructor
                                                            </button>
                                                        )}
                                                    </div>

                                                    {/* Student Roster Table Expansion */}
                                                    {isExpanded && (
                                                        <motion.div
                                                            initial={{ opacity: 0, height: 0 }}
                                                            animate={{ opacity: 1, height: 'auto' }}
                                                            className="pt-4 border-t border-slate-100"
                                                        >
                                                            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-3">
                                                                Enrolled Student Roster ({students.length})
                                                            </h4>

                                                            {loadingUsers[batch.id] ? (
                                                                <div className="py-8 flex justify-center text-xs text-slate-500 font-semibold">Loading student directory...</div>
                                                            ) : students.length === 0 ? (
                                                                <div className="py-6 text-center text-xs text-slate-500 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                                                                    No students currently enrolled in this batch.
                                                                </div>
                                                            ) : (
                                                                <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
                                                                    <table className="w-full text-left text-xs">
                                                                        <thead>
                                                                            <tr className="border-b border-slate-200 bg-slate-50 font-extrabold uppercase text-slate-600">
                                                                                <th className="p-3.5">Student Name</th>
                                                                                <th className="p-3.5">Email Address</th>
                                                                                <th className="p-3.5">Role / Status</th>
                                                                                <th className="p-3.5 text-right">Actions</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody className="divide-y divide-slate-100">
                                                                            {students.map((student, idx) => (
                                                                                <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                                                                                    <td className="p-3.5 font-bold text-slate-900 flex items-center gap-2.5">
                                                                                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 text-[10px] font-extrabold flex items-center justify-center text-white shrink-0 shadow-xs">
                                                                                            {(student.name || student.email || 'U').charAt(0).toUpperCase()}
                                                                                        </div>
                                                                                        {student.name || student.first_name || 'Student'}
                                                                                    </td>
                                                                                    <td className="p-3.5 text-slate-600 font-medium">{student.email}</td>
                                                                                    <td className="p-3.5">
                                                                                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">
                                                                                            Enrolled
                                                                                        </span>
                                                                                    </td>
                                                                                    <td className="p-3.5 text-right">
                                                                                        <button
                                                                                            onClick={() => {
                                                                                                setTransferStudent({ user: student, currentBatch: batch });
                                                                                                const nextB = courseBatches.find(b => b.id !== batch.id);
                                                                                                setTargetBatchId(nextB ? nextB.id.toString() : '');
                                                                                            }}
                                                                                            className="px-3 py-1.5 rounded-lg bg-violet-50 hover:bg-violet-100 text-violet-700 font-bold transition-all inline-flex items-center gap-1.5"
                                                                                        >
                                                                                            <ArrowRightLeft className="w-3 h-3 text-violet-600" /> Transfer Batch
                                                                                        </button>
                                                                                    </td>
                                                                                </tr>
                                                                            ))}
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            )}
                                                        </motion.div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* ── Edit Batch Specs Dialog (Light Theme) ────────────────────────────── */}
            <AnimatePresence>
                {editingBatch && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white border border-slate-200 rounded-3xl p-6 shadow-2xl w-full max-w-md space-y-5 text-slate-900"
                        >
                            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                                <h3 className="text-base font-extrabold text-slate-900">Edit Batch Settings</h3>
                                <button onClick={() => setEditingBatch(null)} className="text-slate-400 hover:text-slate-700"><X className="w-5 h-5" /></button>
                            </div>
                            <form onSubmit={handleSaveBatchEdit} className="space-y-4">
                                {!(selectedCourse?.class_mode === 'Module Class' || selectedCourse?.course_type === 'Module' || selectedCourse?.classMode === 'Module Class') && (
                                    <div>
                                        <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">Batch Name</label>
                                        <input type="text" value={batchName} onChange={(e) => setBatchName(e.target.value)} className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-violet-600 focus:ring-2 focus:ring-violet-600/15" required />
                                    </div>
                                )}
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">Start Time</label>
                                        <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-violet-600 focus:ring-2 focus:ring-violet-600/15" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">End Time</label>
                                        <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-violet-600 focus:ring-2 focus:ring-violet-600/15" />
                                    </div>
                                </div>
                                {!(selectedCourse?.class_mode === 'Module Class' || selectedCourse?.course_type === 'Module' || selectedCourse?.classMode === 'Module Class') && (
                                    <div>
                                        <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">Max Seats Capacity</label>
                                        <input type="number" value={maxSeats} onChange={(e) => setMaxSeats(e.target.value)} className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-violet-600 focus:ring-2 focus:ring-violet-600/15" />
                                    </div>
                                )}
                                <div className="pt-4 flex items-center justify-end gap-2.5 border-t border-slate-200">
                                    <button type="button" onClick={() => setEditingBatch(null)} className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold">Cancel</button>
                                    <button type="submit" className="px-5 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 text-white text-xs font-extrabold shadow-md shadow-violet-500/20">Save Changes</button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* ── Transfer Student Dialog (Light Theme) ────────────────────────────── */}
            <AnimatePresence>
                {transferStudent && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white border border-slate-200 rounded-3xl p-6 shadow-2xl w-full max-w-md space-y-5 text-slate-900"
                        >
                            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                                <h3 className="text-base font-extrabold text-slate-900">Transfer Student Seat</h3>
                                <button onClick={() => setTransferStudent(null)} className="text-slate-400 hover:text-slate-700"><X className="w-5 h-5" /></button>
                            </div>
                            <form onSubmit={handleTransferSubmit} className="space-y-4">
                                <p className="text-xs text-slate-600 leading-relaxed">
                                    You are transferring <strong className="text-slate-900 font-bold">{transferStudent.user.name || transferStudent.user.email}</strong> from batch <strong className="text-indigo-600 font-bold">{transferStudent.currentBatch.batch_name || `#${transferStudent.currentBatch.id}`}</strong>.
                                </p>
                                <div>
                                    <label className="block text-xs font-bold uppercase text-slate-700 mb-2">Select Destination Batch</label>
                                    <select
                                        value={targetBatchId}
                                        onChange={(e) => setTargetBatchId(e.target.value)}
                                        className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-violet-600 focus:ring-2 focus:ring-violet-600/15"
                                        required
                                    >
                                        <option value="">Select target batch...</option>
                                        {courseBatches.filter(b => b.id !== transferStudent.currentBatch.id).map(b => (
                                            <option key={b.id} value={b.id}>{b.batch_name || `Batch #${b.id}`} ({b.start_time} - {b.end_time})</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="pt-4 flex items-center justify-end gap-2.5 border-t border-slate-200">
                                    <button type="button" onClick={() => setTransferStudent(null)} className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold">Cancel</button>
                                    <button type="submit" disabled={transferring || !targetBatchId} className="px-5 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 text-white text-xs font-extrabold shadow-md shadow-violet-500/20 disabled:opacity-50 flex items-center gap-1.5">
                                        {transferring && <RefreshCw className="w-3.5 h-3.5 animate-spin" />} Confirm Transfer
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminEnrollments;
