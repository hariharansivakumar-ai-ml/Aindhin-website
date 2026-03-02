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
