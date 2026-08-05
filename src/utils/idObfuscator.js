export const encodeCourseId = async (id) => {
    try {
        const keyString = 'aindhin_encryption_key_2024_ad!!';
        const ivString = 'aindhin_v_123456';
        
        const keyData = new TextEncoder().encode(keyString);
        const iv = new TextEncoder().encode(ivString);
        
        const key = await crypto.subtle.importKey(
            'raw',
            keyData,
            { name: 'AES-CBC' },
            false,
            ['encrypt']
        );
        
        const plainText = new TextEncoder().encode(`course-${id}`);
        const encryptedBuffer = await crypto.subtle.encrypt(
            {
                name: 'AES-CBC',
                iv: iv,
            },
            key,
            plainText
        );
        
        const hashArray = Array.from(new Uint8Array(encryptedBuffer));
        const hex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        return `AD-${hex}`;
    } catch (error) {
        console.error("Encryption error", error);
        return id.toString();
    }
};
