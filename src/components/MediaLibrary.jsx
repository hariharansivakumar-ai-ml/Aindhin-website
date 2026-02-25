import { useState, useEffect, useRef } from 'react';
import { getToken, apiUploadImage } from '../utils/apiClient';
import { X, Image as ImageIcon, Loader2, Check, Trash2, Upload } from 'lucide-react';

const API_URL = 'http://localhost:5000/api';

const MediaLibrary = ({ onSelect, onClose }) => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);
    const [deleting, setDeleting] = useState(null);
    const [uploading, setUploading] = useState(false);
    const uploadInputRef = useRef(null);

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        try {
            setLoading(true);
            const res = await fetch(`${API_URL}/upload/list`, {
                headers: { 'Authorization': `Bearer ${getToken()}` }
            });
            if (!res.ok) throw new Error('Failed to load images');
            const data = await res.json();
            setImages(data || []);
        } catch (error) {
            console.error('Error fetching images:', error);
            setImages([]);
        } finally {
            setLoading(false);
        }
    };

    const handleUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        try {
            setUploading(true);
            const url = await apiUploadImage(file);
            // Refresh the list to show the new image
            await fetchImages();
        } catch (err) {
            alert('Upload failed: ' + err.message);
        } finally {
            setUploading(false);
            e.target.value = '';
        }
    };

    const handleDelete = async (image, e) => {
        e.stopPropagation();
        if (!window.confirm('Are you sure you want to permanently delete this image?')) return;

        try {
            setDeleting(image.name);
            const res = await fetch(`${API_URL}/upload/${encodeURIComponent(image.name)}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${getToken()}` }
            });
            if (!res.ok) throw new Error('Delete failed');
            setImages(images.filter(img => img.name !== image.name));
            if (selectedImage?.name === image.name) setSelectedImage(null);
        } catch (error) {
            console.error('Error deleting image:', error);
            alert('Failed to delete image');
        } finally {
            setDeleting(null);
        }
    };

    const handleSelect = () => {
        if (selectedImage) {
            onSelect(selectedImage.url);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl w-full max-w-4xl h-[80vh] flex flex-col shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-white">
                    <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                        <ImageIcon className="w-5 h-5 text-gray-400" />
                        Media Library
                    </h2>
                    <div className="flex items-center gap-2">
                        {/* Upload Button in header */}
                        <label className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold cursor-pointer transition-all ${uploading ? 'bg-gray-100 text-gray-400' : 'bg-primary/10 text-primary hover:bg-primary/20'}`}>
                            {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                            {uploading ? 'Uploading...' : 'Upload New'}
                            <input
                                ref={uploadInputRef}
                                type="file"
                                className="hidden"
                                accept="image/*"
                                disabled={uploading}
                                onChange={handleUpload}
                            />
                        </label>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 bg-gray-50/50">
                    {loading ? (
                        <div className="h-full flex flex-col items-center justify-center text-gray-400 gap-3">
                            <Loader2 className="w-8 h-8 animate-spin text-primary" />
                            <p className="text-sm font-medium">Loading images...</p>
                        </div>
                    ) : images.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-gray-400 gap-4">
                            <ImageIcon className="w-12 h-12 opacity-20" />
                            <p className="text-sm font-medium">No images found in library</p>
                            <label className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-bold cursor-pointer hover:bg-primary/90 transition-colors shadow-md shadow-primary/20">
                                <Upload className="w-4 h-4" />
                                Upload Your First Image
                                <input type="file" className="hidden" accept="image/*" disabled={uploading} onChange={handleUpload} />
                            </label>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {images.map((image) => (
                                <div
                                    key={image.name}
                                    onClick={() => setSelectedImage(image)}
                                    className={`group relative aspect-square rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${selectedImage?.name === image.name
                                        ? 'border-primary ring-2 ring-primary/20 bg-primary/5'
                                        : 'border-transparent hover:border-gray-200 bg-gray-100'
                                        }`}
                                >
                                    <img
                                        src={image.url}
                                        alt={image.filename || image.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        loading="lazy"
                                    />

                                    {/* Filename tooltip on hover */}
                                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent px-2 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                        <p className="text-white text-[10px] font-medium truncate">{image.filename || image.name.split('/').pop()}</p>
                                    </div>

                                    {/* Selection Indicator */}
                                    {selectedImage?.name === image.name && (
                                        <div className="absolute inset-0 bg-primary/10 flex items-center justify-center pointer-events-none">
                                            <div className="bg-primary text-white p-2 rounded-full shadow-lg">
                                                <Check className="w-5 h-5" />
                                            </div>
                                        </div>
                                    )}

                                    {/* Delete Button */}
                                    <button
                                        onClick={(e) => handleDelete(image, e)}
                                        className="absolute top-2 right-2 p-2 bg-white/90 text-red-500 rounded-lg shadow-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50 z-10"
                                        disabled={deleting === image.name}
                                        title="Delete Image Permanently"
                                    >
                                        {deleting === image.name ? (
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                        ) : (
                                            <Trash2 className="w-4 h-4" />
                                        )}
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-gray-100 bg-white flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                        {images.length} image{images.length !== 1 ? 's' : ''} found
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={onClose}
                            className="px-5 py-2.5 rounded-xl font-semibold text-gray-600 hover:bg-gray-100 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSelect}
                            disabled={!selectedImage}
                            className={`px-6 py-2.5 rounded-xl font-bold text-white shadow-lg shadow-primary/20 transition-all ${selectedImage
                                ? 'bg-primary hover:bg-primary/90 transform hover:-translate-y-0.5'
                                : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
                                }`}
                        >
                            Select Image
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MediaLibrary;

