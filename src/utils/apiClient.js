const API_URL = 'http://localhost:5000/api';

// --- Token Helpers ---
export const getToken = () => localStorage.getItem('aindhin_token');
export const setToken = (token) => localStorage.setItem('aindhin_token', token);
export const removeToken = () => localStorage.removeItem('aindhin_token');

const authHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${getToken()}`
});

// --- Auth ---
export const apiLogin = async (email, password) => {
    const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
        const res = await fetch(`${API_URL}/auth/me`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!res.ok) { removeToken(); return null; }
        return await res.json();
    } catch {
        return null;
    }
};

// --- Blogs ---
export const apiGetPublicBlogs = async () => {
    const res = await fetch(`${API_URL}/blogs`);
    if (!res.ok) throw new Error('Failed to fetch blogs');
    return res.json();
};

export const apiGetBlogBySlug = async (slug) => {
    const res = await fetch(`${API_URL}/blogs/${slug}`);
    if (!res.ok) throw new Error('Blog not found');
    return res.json();
};

export const apiGetAdminBlogs = async (status = 'all') => {
    const res = await fetch(`${API_URL}/blogs?status=${status}`, {
        headers: authHeaders()
    });
    if (!res.ok) throw new Error('Failed to fetch blogs');
    return res.json();
};

export const apiSaveBlog = async (blogData) => {
    const res = await fetch(`${API_URL}/blogs`, {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify(blogData)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to save blog');
    return data;
};

export const apiUpdateBlog = async (id, blogData) => {
    const res = await fetch(`${API_URL}/blogs/${id}`, {
        method: 'PUT',
        headers: authHeaders(),
        body: JSON.stringify(blogData)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.detail || data.error || 'Failed to update blog');
    return data;
};

export const apiDeleteBlog = async (id) => {
    const res = await fetch(`${API_URL}/blogs/${id}`, {
        method: 'DELETE',
        headers: authHeaders()
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.detail || data.error || 'Failed to delete blog');
    return data;
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
    const res = await fetch(`${API_URL}/upload/list`, {
        headers: { 'Authorization': `Bearer ${getToken()}` }
    });
    if (!res.ok) throw new Error('Failed to fetch media');
    return res.json();
};

export const apiDeleteMedia = async (public_id) => {
    const res = await fetch(`${API_URL}/upload/${encodeURIComponent(public_id)}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${getToken()}` }
    });
    if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail || data.error || 'Delete failed');
    }
    return res.json();
};

// --- Comments ---
export const apiSubmitComment = async (commentData) => {
    const res = await fetch(`${API_URL}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(commentData)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.detail || data.error || 'Failed to submit comment');
    return data;
};

export const apiGetApprovedComments = async (postId) => {
    const res = await fetch(`${API_URL}/comments/${postId}`);
    if (!res.ok) throw new Error('Failed to fetch comments');
    return res.json();
};

export const apiGetAllCommentsAdmin = async () => {
    const res = await fetch(`${API_URL}/comments/admin`, {
        headers: authHeaders()
    });
    if (!res.ok) throw new Error('Failed to fetch comments');
    return res.json();
};

export const apiUpdateCommentStatus = async (commentId, status) => {
    const res = await fetch(`${API_URL}/comments/${commentId}/status`, {
        method: 'PUT',
        headers: authHeaders(),
        body: JSON.stringify({ status })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.detail || data.error || 'Failed to update status');
    return data;
};

export const apiDeleteComment = async (commentId) => {
    const res = await fetch(`${API_URL}/comments/${commentId}`, {
        method: 'DELETE',
        headers: authHeaders()
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.detail || data.error || 'Failed to delete comment');
    return data;
};

// --- Subscribers ---
export const apiGetAllSubscribers = async () => {
    const res = await fetch(`${API_URL}/subscribers`, {
        headers: authHeaders()
    });
    if (!res.ok) throw new Error('Failed to fetch subscribers');
    return res.json();
};

export const apiDeleteSubscriber = async (subscriberId) => {
    const res = await fetch(`${API_URL}/subscribers/${subscriberId}`, {
        method: 'DELETE',
        headers: authHeaders()
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.detail || data.error || 'Failed to delete subscriber');
    return data;
};

export const apiCreateSubscriber = async (subscriberData) => {
    const res = await fetch(`${API_URL}/subscribers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(subscriberData)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.detail || data.error || 'Failed to submit form');
    return data;
};
