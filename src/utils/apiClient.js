export const API_URL = import.meta.env.VITE_API_URL || 'https://api2.aindhin.com/api';
export const USER_APP_URL = import.meta.env.VITE_USER_APP_URL || 'https://user.aindhin.com';
export const USER_API_URL = import.meta.env.VITE_USER_API_URL || 'https://user.aindhin.com';

// --- Token Helpers ---
export const getToken = () => localStorage.getItem('aindhin_token');
export const setToken = (token) => localStorage.setItem('aindhin_token', token);
export const removeToken = () => localStorage.removeItem('aindhin_token');

// --- Central HTTP Helper ---
export const apiFetch = async (endpoint, options = {}) => {
    const token = getToken();
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers,
    });

    // Centralised fail-safe response.json() patch
    const originalJson = response.json.bind(response);
    response.json = async () => {
        const cloned = response.clone();
        try {
            return await originalJson();
        } catch (err) {
            if (!response.ok) {
                let text = '';
                try {
                    text = await cloned.text();
                } catch {}
                throw new Error(text.substring(0, 150) || `HTTP error ${response.status}`);
            }
            throw err;
        }
    };

    return response;
};

// --- Auth ---
export const apiLogin = async (email, password) => {
    const res = await apiFetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.detail || data.error || 'Login failed');
    setToken(data.token);
    return data;
};

export const apiLogout = () => {
    removeToken();
};

export const apiGetSession = async () => {
    const token = getToken();
    if (!token) return null;
    try {
        const res = await apiFetch('/auth/me');
        if (!res.ok) { removeToken(); return null; }
        return await res.json();
    } catch {
        return null;
    }
};

// --- Blogs ---
export const apiGetPublicBlogs = async () => {
    const res = await apiFetch('/blogs');
    if (!res.ok) throw new Error('Failed to fetch blogs');
    return res.json();
};

export const apiGetBlogBySlug = async (slug) => {
    const res = await apiFetch(`/blogs/${slug}`);
    if (!res.ok) throw new Error('Blog not found');
    return res.json();
};

export const apiGetAdminBlogs = async (status = 'all') => {
    const res = await apiFetch(`/blogs?status=${status}`);
    if (!res.ok) throw new Error('Failed to fetch blogs');
    return res.json();
};

export const apiSaveBlog = async (blogData) => {
    const res = await apiFetch('/blogs', {
        method: 'POST',
        body: JSON.stringify(blogData)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to save blog');
    return data;
};

export const apiUpdateBlog = async (id, blogData) => {
    const res = await apiFetch(`/blogs/${id}`, {
        method: 'PUT',
        body: JSON.stringify(blogData)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.detail || data.error || 'Failed to update blog');
    return data;
};

export const apiDeleteBlog = async (id) => {
    const res = await apiFetch(`/blogs/${id}`, {
        method: 'DELETE'
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.detail || data.error || 'Failed to delete blog');
    return data;
};

// --- Courses ---
export const apiGetCourses = async (status = null) => {
    const endpoint = status ? `/courses?status=${status}` : '/courses';
    const res = await apiFetch(endpoint);
    if (!res.ok) throw new Error('Failed to fetch courses');
    return res.json();
};

export const apiGetAssignedCourses = async () => {
    const apiKey = import.meta.env.VITE_AINDHIN_PUBLIC_KEY || 'AINDHIN_PUBLIC_KEY_123';
    const res = await fetch(`${USER_API_URL}/api/users/public/assigned-courses/`, {
        headers: {
            'X-API-Key': apiKey
        }
    });
    if (!res.ok) throw new Error('Failed to fetch assigned courses');
    return res.json();
};

export const apiGetPublicCategories = async () => {
    const apiKey = import.meta.env.VITE_AINDHIN_PUBLIC_KEY || 'AINDHIN_PUBLIC_KEY_123';
    const res = await fetch(`${USER_API_URL}/api/users/public/categories/`, {
        headers: {
            'X-API-Key': apiKey
        }
    });
    if (!res.ok) throw new Error('Failed to fetch categories');
    return res.json();
};

// --- Admin Panel Courses & Enrollments (Django Integration) ---
export const apiGetAdminPanelCourses = async () => {
    const apiKey = import.meta.env.VITE_AINDHIN_PUBLIC_KEY || 'AINDHIN_PUBLIC_KEY_123';
    const res = await fetch(`${USER_API_URL}/api/admin-panel/courses/`, {
        headers: { 'X-API-Key': apiKey, 'Authorization': `Bearer ${getToken()}` }
    });
    if (!res.ok) throw new Error('Failed to fetch admin courses');
    return res.json();
};

export const apiGetAdminPanelCourse = async (id) => {
    const apiKey = import.meta.env.VITE_AINDHIN_PUBLIC_KEY || 'AINDHIN_PUBLIC_KEY_123';
    const res = await fetch(`${USER_API_URL}/api/admin-panel/courses/${id}/`, {
        headers: { 'X-API-Key': apiKey, 'Authorization': `Bearer ${getToken()}` }
    });
    if (!res.ok) throw new Error('Failed to fetch course details');
    return res.json();
};

export const apiCreateAdminPanelCourse = async (formData) => {
    const apiKey = import.meta.env.VITE_AINDHIN_PUBLIC_KEY || 'AINDHIN_PUBLIC_KEY_123';
    const res = await fetch(`${USER_API_URL}/api/admin-panel/courses/`, {
        method: 'POST',
        headers: { 'X-API-Key': apiKey, 'Authorization': `Bearer ${getToken()}` },
        body: formData
    });
    if (!res.ok && res.status !== 201) {
        let errText = 'Failed to create course';
        try { const d = await res.json(); errText = JSON.stringify(d); } catch (e) { try { errText = await res.text(); } catch(ex){} }
        throw new Error(errText);
    }
    try { return await res.json(); } catch (e) { return true; }
};

export const apiUpdateAdminPanelCourse = async (id, formData) => {
    const apiKey = import.meta.env.VITE_AINDHIN_PUBLIC_KEY || 'AINDHIN_PUBLIC_KEY_123';
    const res = await fetch(`${USER_API_URL}/api/admin-panel/courses/${id}/`, {
        method: 'PATCH',
        headers: { 'X-API-Key': apiKey, 'Authorization': `Bearer ${getToken()}` },
        body: formData
    });
    if (!res.ok && res.status !== 200) {
        let errText = 'Failed to update course';
        try { const d = await res.json(); errText = JSON.stringify(d); } catch (e) { try { errText = await res.text(); } catch(ex){} }
        throw new Error(errText);
    }
    try { return await res.json(); } catch (e) { return true; }
};

export const apiDeleteAdminPanelCourse = async (id) => {
    const apiKey = import.meta.env.VITE_AINDHIN_PUBLIC_KEY || 'AINDHIN_PUBLIC_KEY_123';
    const res = await fetch(`${USER_API_URL}/api/admin-panel/courses/${id}/`, {
        method: 'DELETE',
        headers: { 'X-API-Key': apiKey, 'Authorization': `Bearer ${getToken()}` }
    });
    if (!res.ok && res.status !== 204) throw new Error('Failed to delete course');
    return true;
};

export const apiGetAdminPanelCategories = async () => {
    const apiKey = import.meta.env.VITE_AINDHIN_PUBLIC_KEY || 'AINDHIN_PUBLIC_KEY_123';
    const res = await fetch(`${USER_API_URL}/api/admin-panel/categories/`, {
        headers: { 'X-API-Key': apiKey, 'Authorization': `Bearer ${getToken()}` }
    });
    if (!res.ok) throw new Error('Failed to fetch categories');
    return res.json();
};

export const apiGetAdminPanelInstructors = async () => {
    const apiKey = import.meta.env.VITE_AINDHIN_PUBLIC_KEY || 'AINDHIN_PUBLIC_KEY_123';
    const res = await fetch(`${USER_API_URL}/api/admin-panel/instructors/?page_size=1000`, {
        headers: { 'X-API-Key': apiKey, 'Authorization': `Bearer ${getToken()}` }
    });
    if (!res.ok) throw new Error('Failed to fetch instructors');
    const data = await res.json();
    return Array.isArray(data) ? data : (data?.results || []);
};

export const apiGetBatchUsers = async (batchId, includeStaff = false) => {
    const apiKey = import.meta.env.VITE_AINDHIN_PUBLIC_KEY || 'AINDHIN_PUBLIC_KEY_123';
    const res = await fetch(`${USER_API_URL}/api/admin-panel/batches/${batchId}/users/?include_staff=${includeStaff}`, {
        headers: { 'X-API-Key': apiKey, 'Authorization': `Bearer ${getToken()}` }
    });
    if (!res.ok) throw new Error('Failed to fetch batch users');
    return res.json();
};

export const apiUpdateBatch = async (batchId, data) => {
    const apiKey = import.meta.env.VITE_AINDHIN_PUBLIC_KEY || 'AINDHIN_PUBLIC_KEY_123';
    const res = await fetch(`${USER_API_URL}/api/admin-panel/batches/${batchId}/`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'X-API-Key': apiKey,
            'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify(data)
    });
    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        console.error('Batch Update Failed Details:', errorData);
        const errMsg = typeof errorData === 'object' ? Object.entries(errorData).map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(', ') : v}`).join(' | ') : 'Failed to update batch details';
        throw new Error(errMsg || 'Failed to update batch details');
    }
    return res.json();
};

export const apiTransferStudent = async (userId, currentBatchId, targetBatchId) => {
    const apiKey = import.meta.env.VITE_AINDHIN_PUBLIC_KEY || 'AINDHIN_PUBLIC_KEY_123';
    const res = await fetch(`${USER_API_URL}/api/admin-panel/transfer-student/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-API-Key': apiKey,
            'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify({
            user_id: userId,
            current_batch_id: currentBatchId,
            target_batch_id: targetBatchId
        })
    });
    if (!res.ok) throw new Error('Failed to transfer student');
    return res.json();
};

// --- Image Upload ---
const convertToWebP = (file) => {
    return new Promise((resolve, reject) => {
        if (!file.type.startsWith('image/') || file.type === 'image/webp') {
            return resolve(file);
        }

        const img = new Image();
        const objectUrl = URL.createObjectURL(file);
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);

            canvas.toBlob((blob) => {
                URL.revokeObjectURL(objectUrl);
                if (!blob) {
                    return resolve(file); // Fallback to original
                }
                const newFilename = file.name.replace(/\.[^/.]+$/, "") + ".webp";
                const webpFile = new File([blob], newFilename, { type: 'image/webp', lastModified: Date.now() });
                resolve(webpFile);
            }, 'image/webp', 0.85);
        };
        img.onerror = () => {
            URL.revokeObjectURL(objectUrl);
            resolve(file); // Fallback to original on error
        };
        img.src = objectUrl;
    });
};

export const apiUploadImage = async (file) => {
    const finalFile = await convertToWebP(file);
    const formData = new FormData();
    formData.append('file', finalFile);

    // For file uploads, we don't set Content-Type so the browser adds the boundary
    const res = await fetch(`${API_URL}/upload`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${getToken()}` },
        body: formData
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.detail || data.error || 'Upload failed');
    return data.url;
};

export const apiGetMedia = async () => {
    const res = await apiFetch('/upload/list');
    if (!res.ok) throw new Error('Failed to fetch media');
    return res.json();
};

export const apiDeleteMedia = async (public_id) => {
    const res = await apiFetch(`/upload/${encodeURIComponent(public_id)}`, {
        method: 'DELETE'
    });
    if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail || data.error || 'Delete failed');
    }
    return res.json();
};

// --- Comments ---
export const apiSubmitComment = async (commentData) => {
    const res = await apiFetch('/comments', {
        method: 'POST',
        body: JSON.stringify(commentData)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.detail || data.error || 'Failed to submit comment');
    return data;
};

export const apiGetApprovedComments = async (postId) => {
    const res = await apiFetch(`/comments/${postId}`);
    if (!res.ok) throw new Error('Failed to fetch comments');
    return res.json();
};

export const apiGetAllCommentsAdmin = async () => {
    const res = await apiFetch('/comments/admin');
    if (!res.ok) throw new Error('Failed to fetch comments');
    return res.json();
};

export const apiUpdateCommentStatus = async (commentId, status) => {
    const res = await apiFetch(`/comments/${commentId}/status`, {
        method: 'PUT',
        body: JSON.stringify({ status })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.detail || data.error || 'Failed to update status');
    return data;
};

export const apiDeleteComment = async (commentId) => {
    const res = await apiFetch(`/comments/${commentId}`, {
        method: 'DELETE'
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.detail || data.error || 'Failed to delete comment');
    return data;
};

// --- Subscribers ---
export const apiGetAllSubscribers = async () => {
    const res = await apiFetch('/subscribers');
    if (!res.ok) throw new Error('Failed to fetch subscribers');
    return res.json();
};

export const apiDeleteSubscriber = async (subscriberId) => {
    const res = await apiFetch(`/subscribers/${subscriberId}`, {
        method: 'DELETE'
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.detail || data.error || 'Failed to delete subscriber');
    return data;
};

export const apiCreateSubscriber = async (subscriberData) => {
    const res = await apiFetch('/subscribers', {
        method: 'POST',
        body: JSON.stringify(subscriberData)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.detail || data.error || 'Failed to submit form');
    return data;
};

// --- Enquiries ---
export const apiGetAllEnquiries = async () => {
    const res = await apiFetch('/enquiries');
    if (!res.ok) throw new Error('Failed to fetch enquiries');
    return res.json();
};

export const apiDeleteEnquiry = async (enquiryId) => {
    const res = await apiFetch(`/enquiries/${enquiryId}`, {
        method: 'DELETE'
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.detail || data.error || 'Failed to delete enquiry');
    return data;
};

export const apiSubmitEnquiry = async (enquiryData) => {
    const res = await apiFetch('/enquiries', {
        method: 'POST',
        body: JSON.stringify(enquiryData)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.detail || data.error || 'Failed to submit enquiry');
    return data;
};

// --- Live Course Registration ---
export const apiGetPublicLiveCourses = async () => {
    const apiKey = import.meta.env.VITE_AINDHIN_PUBLIC_KEY || 'AINDHIN_PUBLIC_KEY_123';
    const res = await fetch(`${USER_API_URL}/api/users/public-live-courses/`, {
        headers: {
            'X-API-Key': apiKey
        }
    });
    if (!res.ok) throw new Error('Failed to fetch public live courses');
    return res.json();
};

export const apiRegisterLiveCourse = async (name, email, phoneNumber, countryCode, courseId) => {
    const apiKey = import.meta.env.VITE_AINDHIN_PUBLIC_KEY || 'AINDHIN_PUBLIC_KEY_123';
    const res = await fetch(`${USER_API_URL}/api/users/live-course-register/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-API-Key': apiKey
        },
        body: JSON.stringify({
            name,
            email,
            phone_number: phoneNumber,
            country_code: countryCode,
            course_id: courseId
        })
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
        throw new Error(data.error || data.message || data.detail || 'Registration failed');
    }
    return data;
};
