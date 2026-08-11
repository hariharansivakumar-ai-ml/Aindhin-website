import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiGetAdminPanelUsers, apiGetSession } from '../utils/apiClient';
import Preloader from '../components/Preloader';
import AdminSidebar from '../components/AdminSidebar';
import { Search, Filter } from 'lucide-react';

const AdminUsers = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [typeFilter, setTypeFilter] = useState('ALL');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userEmail, setUserEmail] = useState('');

    useEffect(() => {
        const init = async () => {
            const session = await apiGetSession();
            if (!session) {
                navigate('/wp-admin');
                return;
            }
            setUserEmail(session.user.email);
            fetchUsers();
        };
        init();
    }, [navigate]);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            setError(null);
            let allUsers = [];
            let nextUrl = null;
            
            do {
                const res = await apiGetAdminPanelUsers(nextUrl);
                if (res && res.results) {
                    allUsers = [...allUsers, ...res.results];
                    nextUrl = res.next;
                } else if (Array.isArray(res)) {
                    allUsers = [...allUsers, ...res];
                    nextUrl = null;
                } else {
                    nextUrl = null;
                }
            } while (nextUrl);
            
            setUsers(allUsers);
        } catch (err) {
            console.error('Failed to load users', err);
            setError('Failed to load users');
        } finally {
            setLoading(false);
        }
    };

    const filteredUsers = users.filter(user => {
        const name = `${user.first_name || ''} ${user.last_name || ''}`.trim().toLowerCase();
        const email = (user.email || '').toLowerCase();
        const phone = (user.profile?.phone_number || '').toLowerCase();
        const city = (user.profile?.current_city || '').toLowerCase();
        const typeStr = String(user.role || user.profile?.profession || user.profile?.user_type || user.profile?.role || '').toLowerCase();
        
        const term = searchTerm.toLowerCase();
        const matchesSearch = name.includes(term) || email.includes(term) || phone.includes(term) || city.includes(term) || typeStr.includes(term);
        
        let matchesType = true;
        if (typeFilter !== 'ALL') {
            if (typeFilter === 'Student') matchesType = typeStr.includes('student');
            else if (typeFilter === 'Employee') matchesType = typeStr.includes('employee') || typeStr.includes('professional') || typeStr.includes('working') || typeStr.includes('corporate');
            else if (typeFilter === 'Individual') matchesType = typeStr.includes('individual');
        }
        
        return matchesSearch && matchesType;
    });

    const handleDownloadCsv = () => {
        if (!filteredUsers || filteredUsers.length === 0) return;

        const headers = ["Name", "Email", "Mobile Number", "Location", "Type"];
        const rows = filteredUsers.map(user => {
            const name = `${user.first_name || ''} ${user.last_name || ''}`.trim() || 'N/A';
            
            const phone = user.profile?.phone_number || 'N/A';
            const city = user.profile?.current_city || 'N/A';
            const type = user.role || user.profile?.profession || user.profile?.user_type || user.profile?.role || 'N/A';

            return [
                `"${name.replace(/"/g, '""')}"`,
                `"${user.email || ''}"`,
                `"${phone}"`,
                `"${city.replace(/"/g, '""')}"`,
                `"${String(type).replace(/"/g, '""')}"`
            ].join(',');
        });

        const csvContent = [headers.join(','), ...rows].join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", `admin_users_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (loading && users.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-950">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-violet-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-white/50 font-medium text-sm animate-pulse">Loading Users...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-slate-50 font-inter overflow-hidden">
            <AdminSidebar userEmail={userEmail} />

            <main className="flex-1 min-w-0 flex flex-col overflow-hidden">
                <div className="flex-1 overflow-y-auto">
                    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8">
                        
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
                            <div>
                                <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">Users</h2>
                                <p className="text-slate-500 mt-1 text-sm">Manage and export registered users.</p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <input 
                                        type="text" 
                                        placeholder="Search users..." 
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full sm:w-64 pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all shadow-sm"
                                    />
                                </div>
                                <div className="relative">
                                    <select
                                        value={typeFilter}
                                        onChange={(e) => setTypeFilter(e.target.value)}
                                        className="w-full sm:w-auto pl-10 pr-8 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all shadow-sm appearance-none cursor-pointer"
                                    >
                                        <option value="ALL">All Types</option>
                                        <option value="Student">Students</option>
                                        <option value="Employee">Employees</option>
                                        <option value="Individual">Individuals</option>
                                    </select>
                                    <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                                </div>
                                <button 
                                    onClick={handleDownloadCsv}
                                    className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-medium py-2 px-5 rounded-xl transition-all shadow-md shadow-violet-500/20 text-sm whitespace-nowrap"
                                >
                                    Export to CSV
                                </button>
                            </div>
                        </div>

                        {error && (
                            <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 shadow-sm text-sm">
                                {error}
                            </div>
                        )}

                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-slate-200">
                                    <thead className="bg-slate-50">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Name</th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Email</th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Mobile Number</th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Location</th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Type</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-slate-100">
                                        {filteredUsers.map((user) => {
                                            const name = `${user.first_name || ''} ${user.last_name || ''}`.trim() || 'N/A';
                                            const phone = user.profile?.phone_number || 'N/A';
                                            const city = user.profile?.current_city || 'N/A';
                                            const type = user.role || user.profile?.profession || user.profile?.user_type || user.profile?.role || 'N/A';
                                            
                                            return (
                                                <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-slate-900">{name}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{user.email}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{phone}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{city}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 capitalize">{String(type)}</td>
                                                </tr>
                                            );
                                        })}
                                        {filteredUsers.length === 0 && !loading && (
                                            <tr>
                                                <td colSpan="5" className="px-6 py-12 text-center text-sm text-slate-500">
                                                    <div className="flex flex-col items-center gap-2">
                                                        <span className="text-slate-400">No users found.</span>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminUsers;
