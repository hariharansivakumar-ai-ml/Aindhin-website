import { useState, useRef, useMemo, useEffect } from 'react';
import ReactQuill, { Quill } from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { 
    Heading1, Heading2, Heading3, Image as ImageIcon, List, Quote, 
    CheckSquare, Code, X, Link as LinkIcon, ExternalLink, 
    AlignLeft, AlignCenter, AlignRight, Table as TableIcon, Palette, Trash2
} from 'lucide-react';

// --- Custom Link Blot to support target="_blank" ---
const Link = Quill.import('formats/link');
class CustomLink extends Link {
    static blotName = 'link';
    static tagName = 'A';

    static create(value) {
        let url = '';
        let target = false;

        if (typeof value === 'object' && value !== null) {
            url = value.url || '';
            target = Boolean(value.target);
        } else if (typeof value === 'string') {
            url = value;
        }

        const node = super.create(url);
        node.setAttribute('href', this.sanitize(url));
        if (target) {
            node.setAttribute('target', '_blank');
            node.setAttribute('rel', 'noopener noreferrer');
        } else {
            node.removeAttribute('target');
            node.removeAttribute('rel');
        }
        return node;
    }

    static formats(domNode) {
        const url = domNode.getAttribute('href') || '';
        const target = domNode.getAttribute('target') === '_blank';
        return {
            url,
            target,
            toString() {
                return this.url;
            }
        };
    }

    format(name, value) {
        if (name !== this.statics.blotName || !value) {
            super.format(name, value);
            return;
        }

        let url = '';
        let target = false;

        if (typeof value === 'object' && value !== null) {
            url = value.url || '';
            target = Boolean(value.target);
        } else if (typeof value === 'string') {
            url = value;
            // Preserve existing target if already set
            target = this.domNode.getAttribute('target') === '_blank';
        }

        this.domNode.setAttribute('href', this.constructor.sanitize(url));
        if (target) {
            this.domNode.setAttribute('target', '_blank');
            this.domNode.setAttribute('rel', 'noopener noreferrer');
        } else {
            this.domNode.removeAttribute('target');
            this.domNode.removeAttribute('rel');
        }
    }
}
Quill.register(CustomLink, true);

// --- Custom Image Blot to support style, width, alt, alignment ---
const ImageBlot = Quill.import('formats/image');
const CUSTOM_IMAGE_ATTRIBUTES = ['alt', 'height', 'width', 'style', 'class', 'data-align'];

class CustomImage extends ImageBlot {
    static blotName = 'image';
    static tagName = 'IMG';

    static create(value) {
        let node;
        if (typeof value === 'object' && value !== null) {
            node = super.create(value.src || value.url || '');
            if (value.alt) node.setAttribute('alt', value.alt);
            if (value.width) node.setAttribute('width', value.width);
            if (value.height) node.setAttribute('height', value.height);
            if (value.style) node.setAttribute('style', value.style);
            if (value['data-align']) node.setAttribute('data-align', value['data-align']);
            if (value.class) node.setAttribute('class', value.class);
        } else {
            node = super.create(value);
        }
        return node;
    }

    static formats(domNode) {
        return CUSTOM_IMAGE_ATTRIBUTES.reduce((formats, attribute) => {
            if (domNode.hasAttribute(attribute)) {
                formats[attribute] = domNode.getAttribute(attribute);
            }
            return formats;
        }, {});
    }

    format(name, value) {
        if (CUSTOM_IMAGE_ATTRIBUTES.indexOf(name) > -1) {
            if (value) {
                this.domNode.setAttribute(name, value);
            } else {
                this.domNode.removeAttribute(name);
            }
        } else {
            super.format(name, value);
        }
    }
}
Quill.register(CustomImage, true);

// --- Register Custom Icons in Quill UI ---
const icons = Quill.import('ui/icons');
icons['table-insert'] = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v18"/><path d="M3 12h18"/><rect width="18" height="18" x="3" y="3" rx="2"/></svg>`;

// --- Color Palette Options ---
const COLOR_PALETTE = [
    '#000000', '#1F2937', '#4B5563', '#6B7280', '#9CA3AF', '#FFFFFF',
    '#DC2626', '#EA580C', '#D97706', '#CA8A04', '#16A34A', '#059669', '#0284C7',
    '#2563EB', '#4F46E5', '#7C3AED', '#9333EA', '#DB2777',
    '#FDF2F2', '#FFF7ED', '#FEFCE8', '#F0FDF4', '#EFF6FF', '#FAF5FF', '#F3F4F6'
];

// --- Slash Menu Component ---
const SlashMenu = ({ position, onSelect, onClose }) => {
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                onClose();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [onClose]);

    if (!position) return null;

    const items = [
        { id: 'h1', label: 'Heading 1', icon: Heading1, desc: 'Big section heading' },
        { id: 'h2', label: 'Heading 2', icon: Heading2, desc: 'Medium section heading' },
        { id: 'h3', label: 'Heading 3', icon: Heading3, desc: 'Small section heading' },
        { id: 'image', label: 'Image', icon: ImageIcon, desc: 'Upload an image' },
        { id: 'list-ul', label: 'Bullet List', icon: List, desc: 'Create a simple list' },
        { id: 'list-ol', label: 'Numbered List', icon: CheckSquare, desc: 'Create a numbered list' },
        { id: 'blockquote', label: 'Quote', icon: Quote, desc: 'Format paragraph as a quote' },
        { id: 'table', label: 'Table', icon: TableIcon, desc: 'Insert a customizable table' },
        { id: 'code-block', label: 'Code Block', icon: Code, desc: 'Capture a code snippet' },
    ];

    return (
        <div
            ref={menuRef}
            className="fixed bg-white shadow-xl border border-gray-200 rounded-lg overflow-hidden z-[9999] w-72 animate-in fade-in zoom-in-95 duration-100"
            style={{
                top: position.top + 30,
                left: position.left
            }}
        >
            <div className="text-xs font-semibold text-gray-500 bg-gray-50 px-3 py-2 border-b border-gray-100 flex justify-between items-center">
                <span>BASIC BLOCKS</span>
                <button onClick={onClose} className="hover:bg-gray-200 rounded p-0.5"><X size={12} /></button>
            </div>
            <div className="py-1 max-h-[300px] overflow-y-auto">
                {items.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => onSelect(item.id)}
                        className="w-full text-left px-3 py-2 hover:bg-gray-100 flex items-center gap-3 transition-colors"
                    >
                        <div className="w-10 h-10 border border-gray-200 rounded bg-white flex items-center justify-center text-gray-600 shadow-sm">
                            <item.icon size={20} />
                        </div>
                        <div>
                            <div className="text-sm font-medium text-gray-900">{item.label}</div>
                            <div className="text-xs text-gray-500">{item.desc}</div>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};

// --- Link Modal Component ---
const LinkModal = ({ visible, initialText, initialUrl = '', initialNewTab = false, onCancel, onSubmit }) => {
    const [url, setUrl] = useState(initialUrl || '');
    const [text, setText] = useState(initialText || '');
    const [newTab, setNewTab] = useState(Boolean(initialNewTab));

    useEffect(() => {
        if (visible) {
            setText(initialText || '');
            setUrl(initialUrl || '');
            setNewTab(Boolean(initialNewTab));
        }
    }, [visible, initialText, initialUrl, initialNewTab]);

    if (!visible) return null;

    return (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-[2px] flex items-center justify-center z-[10001] animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                            <LinkIcon size={18} />
                        </div>
                        <h3 className="text-base font-bold text-gray-900">Insert Link</h3>
                    </div>
                    <button onClick={onCancel} className="text-gray-400 hover:text-gray-600 p-1">
                        <X size={20} />
                    </button>
                </div>
                <div className="p-6 space-y-5">
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">URL</label>
                        <input 
                            type="text" 
                            autoFocus
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all bg-gray-50/50 focus:bg-white"
                            placeholder="https://example.com"
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Link Text</label>
                        <input 
                            type="text" 
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all bg-gray-50/50 focus:bg-white"
                            placeholder="Text to display"
                        />
                    </div>
                    <label className="flex items-center gap-3 cursor-pointer group p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                        <div className="relative flex items-center">
                            <input 
                                type="checkbox" 
                                checked={newTab}
                                onChange={(e) => setNewTab(e.target.checked)}
                                className="peer w-5 h-5 opacity-0 absolute cursor-pointer"
                            />
                            <div className="w-5 h-5 border-2 border-gray-300 rounded-md bg-white peer-checked:bg-blue-600 peer-checked:border-blue-600 transition-all flex items-center justify-center">
                                <div className="w-2.5 h-2.5 bg-white rounded-sm opacity-0 peer-checked:opacity-100 transition-opacity" />
                            </div>
                        </div>
                        <span className="text-sm font-medium text-gray-600 group-hover:text-gray-900 flex items-center gap-2">
                            Open in new tab
                            <ExternalLink size={14} className="text-gray-400" />
                        </span>
                    </label>
                </div>
                <div className="px-6 py-4 bg-gray-50/80 border-t border-gray-100 flex justify-end gap-3">
                    <button 
                        onClick={onCancel}
                        className="px-5 py-2 text-sm font-bold text-gray-500 hover:text-gray-800 transition-colors"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={() => onSubmit({ url, text, newTab })}
                        disabled={!url}
                        className="px-8 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-100 transition-all"
                    >
                        Insert Link
                    </button>
                </div>
            </div>
        </div>
    );
};

// --- Image Settings Modal Component ---
const ImageSettingsModal = ({ visible, initialAlt, initialWidth, initialAlign, onCancel, onSubmit }) => {
    const [alt, setAlt] = useState(initialAlt || '');
    const [width, setWidth] = useState(initialWidth || '100%');
    const [align, setAlign] = useState(initialAlign || 'center');

    useEffect(() => {
        if (visible) {
            setAlt(initialAlt || '');
            setWidth(initialWidth || '100%');
            setAlign(initialAlign || 'center');
        }
    }, [visible, initialAlt, initialWidth, initialAlign]);

    if (!visible) return null;

    const isFullWidth = !width || width === '100%';
    const numericWidth = !isFullWidth ? (parseInt(width) || '') : '';

    const alignOptions = [
        { id: 'left', icon: AlignLeft, label: 'Left' },
        { id: 'center', icon: AlignCenter, label: 'Center' },
        { id: 'right', icon: AlignRight, label: 'Right' },
    ];

    const presets = [
        { label: 'Small (300px)', val: '300px' },
        { label: 'Medium (600px)', val: '600px' },
        { label: 'Large (900px)', val: '900px' }
    ];

    return (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-[2px] flex items-center justify-center z-[10001] animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-orange-50 text-orange-600 rounded-lg">
                            <ImageIcon size={18} />
                        </div>
                        <h3 className="text-base font-bold text-gray-900">Image Settings</h3>
                    </div>
                    <button onClick={onCancel} className="text-gray-400 hover:text-gray-600 p-1">
                        <X size={20} />
                    </button>
                </div>
                <div className="p-6 space-y-6">
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Alt Text (SEO)</label>
                        <input 
                            type="text" 
                            value={alt}
                            onChange={(e) => setAlt(e.target.value)}
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all bg-gray-50/50 focus:bg-white"
                            placeholder="Describe this image..."
                        />
                    </div>
                    
                    <div className="space-y-1.5">
                        <div className="flex justify-between items-center">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Image Width</label>
                            <span className="text-[11px] font-semibold text-orange-600">
                                {isFullWidth ? 'Full Width (100%)' : `${numericWidth}px`}
                            </span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="relative flex-1">
                                <input 
                                    type="number" 
                                    min="50"
                                    max="2400"
                                    value={numericWidth}
                                    onChange={(e) => {
                                        const val = e.target.value;
                                        setWidth(val ? `${val}px` : '100%');
                                    }}
                                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all bg-gray-50/50 focus:bg-white pr-12"
                                    placeholder={isFullWidth ? "Auto (100%)" : "e.g. 600"}
                                />
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400">
                                    px
                                </div>
                            </div>
                            <button 
                                type="button"
                                onClick={() => setWidth('100%')}
                                className={`px-4 py-3 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all border ${
                                    isFullWidth 
                                        ? 'bg-orange-600 border-orange-600 text-white shadow-sm shadow-orange-200' 
                                        : 'bg-gray-100 border-gray-200 text-gray-600 hover:bg-gray-200'
                                }`}
                            >
                                Full Width
                            </button>
                        </div>

                        {/* Quick Presets */}
                        <div className="flex items-center gap-2 pt-1">
                            <span className="text-[10px] font-medium text-gray-400">Presets:</span>
                            {presets.map((preset) => (
                                <button
                                    key={preset.val}
                                    type="button"
                                    onClick={() => setWidth(preset.val)}
                                    className={`text-[10px] font-semibold px-2.5 py-1 rounded-lg border transition-colors ${
                                        width === preset.val 
                                            ? 'bg-orange-50 border-orange-300 text-orange-600 font-bold' 
                                            : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                                    }`}
                                >
                                    {preset.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Alignment</label>
                        <div className="grid grid-cols-3 gap-3">
                            {alignOptions.map((opt) => (
                                <button
                                    key={opt.id}
                                    type="button"
                                    onClick={() => setAlign(opt.id)}
                                    className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${
                                        align === opt.id 
                                            ? 'bg-orange-50 border-orange-200 text-orange-600 shadow-sm' 
                                            : 'bg-white border-gray-100 text-gray-400 hover:bg-gray-50'
                                    }`}
                                >
                                    <opt.icon size={20} />
                                    <span className="text-[10px] font-bold uppercase tracking-wider">{opt.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="px-6 py-4 bg-gray-50/80 border-t border-gray-100 flex justify-end gap-3">
                    <button type="button" onClick={onCancel} className="px-5 py-2 text-sm font-bold text-gray-500 hover:text-gray-800 transition-colors">Cancel</button>
                    <button 
                        type="button"
                        onClick={() => onSubmit({ alt, width, align })}
                        className="px-8 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-sm font-bold shadow-lg shadow-orange-100 transition-all"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

// --- Table Modal Component ---
const TableModal = ({ visible, onCancel, onSubmit }) => {
    const [rows, setRows] = useState(3);
    const [cols, setCols] = useState(3);
    const [hasHeader, setHasHeader] = useState(true);

    if (!visible) return null;

    return (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-[2px] flex items-center justify-center z-[10001] animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                            <TableIcon size={18} />
                        </div>
                        <h3 className="text-base font-bold text-gray-900">Insert Table</h3>
                    </div>
                    <button onClick={onCancel} className="text-gray-400 hover:text-gray-600 p-1">
                        <X size={20} />
                    </button>
                </div>
                <div className="p-6 space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Rows</label>
                            <input 
                                type="number" 
                                min="1"
                                max="20"
                                value={rows}
                                onChange={(e) => setRows(Math.max(1, parseInt(e.target.value) || 1))}
                                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all bg-gray-50/50 focus:bg-white"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Columns</label>
                            <input 
                                type="number" 
                                min="1"
                                max="10"
                                value={cols}
                                onChange={(e) => setCols(Math.max(1, parseInt(e.target.value) || 1))}
                                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all bg-gray-50/50 focus:bg-white"
                            />
                        </div>
                    </div>
                    <label className="flex items-center gap-3 cursor-pointer group p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                        <input 
                            type="checkbox" 
                            checked={hasHeader}
                            onChange={(e) => setHasHeader(e.target.checked)}
                            className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500 cursor-pointer"
                        />
                        <span className="text-sm font-medium text-gray-700">Include Header Row</span>
                    </label>
                </div>
                <div className="px-6 py-4 bg-gray-50/80 border-t border-gray-100 flex justify-end gap-3">
                    <button onClick={onCancel} className="px-5 py-2 text-sm font-bold text-gray-500 hover:text-gray-800 transition-colors">Cancel</button>
                    <button 
                        onClick={() => onSubmit({ rows, cols, hasHeader })}
                        className="px-8 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-bold shadow-lg shadow-emerald-100 transition-all"
                    >
                        Insert Table
                    </button>
                </div>
            </div>
        </div>
    );
};

// --- Main Editor Component ---
const RichTextEditor = ({ content, onChange, onImageUpload }) => {
    const quillRef = useRef(null);
    const onImageUploadRef = useRef(onImageUpload);
    const [slashMenu, setSlashMenu] = useState({ visible: false, position: null });
    const [linkModal, setLinkModal] = useState({ visible: false, range: null, initialText: '', initialUrl: '', initialNewTab: false });
    const [imageModal, setImageModal] = useState({ visible: false, imgNode: null, initialAlt: '', initialWidth: '', initialAlign: '' });
    const [tableModal, setTableModal] = useState({ visible: false });
    const [activeTable, setActiveTable] = useState(null);

    useEffect(() => {
        onImageUploadRef.current = onImageUpload;
    }, [onImageUpload]);

    // Setup Image Click Listener
    useEffect(() => {
        const quill = quillRef.current?.getEditor();
        if (!quill) return;

        const handleImageClick = (e) => {
            if (e.target.tagName === 'IMG') {
                const img = e.target;
                const style = img.style;
                const dataAlign = img.getAttribute('data-align');
                const alignVal = dataAlign || (style.float === 'left' ? 'left' : style.float === 'right' ? 'right' : 'center');

                let currentWidth = '100%';
                if (style.width && style.width !== '100%') {
                    currentWidth = style.width;
                } else if (img.getAttribute('width') && img.getAttribute('width') !== '100%') {
                    currentWidth = `${img.getAttribute('width')}px`;
                } else if (style.width === '100%') {
                    currentWidth = '100%';
                }

                setImageModal({
                    visible: true,
                    imgNode: img,
                    initialAlt: img.getAttribute('alt') || '',
                    initialWidth: currentWidth,
                    initialAlign: alignVal
                });
            }
        };

        const editorElement = quill.root;
        editorElement.addEventListener('click', handleImageClick);
        return () => editorElement.removeEventListener('click', handleImageClick);
    }, []);

    // Setup Table Click Listener for floating table toolbar
    useEffect(() => {
        const quill = quillRef.current?.getEditor();
        if (!quill) return;

        const handleEditorClick = (e) => {
            const table = e.target.closest('table');
            if (table) {
                const container = document.querySelector('.rich-text-editor-container');
                if (container) {
                    const tableRect = table.getBoundingClientRect();
                    const containerRect = container.getBoundingClientRect();
                    setActiveTable({
                        node: table,
                        top: Math.max(10, tableRect.top - containerRect.top - 45),
                        left: Math.max(10, tableRect.left - containerRect.left)
                    });
                }
            } else if (!e.target.closest('.table-floating-toolbar')) {
                setActiveTable(null);
            }
        };

        const editorElement = quill.root;
        editorElement.addEventListener('click', handleEditorClick);
        return () => editorElement.removeEventListener('click', handleEditorClick);
    }, []);

    // Setup Toolbar Button Tooltips / Titles on Hover
    useEffect(() => {
        const setupTooltips = () => {
            const container = document.querySelector('.rich-text-editor-container');
            if (!container) return;

            const tooltips = [
                { selector: '.ql-bold', title: 'Bold' },
                { selector: '.ql-italic', title: 'Italic' },
                { selector: '.ql-underline', title: 'Underline' },
                { selector: '.ql-strike', title: 'Strikethrough' },
                { selector: '.ql-header.ql-picker', title: 'Heading Style' },
                { selector: '.ql-list[value="ordered"]', title: 'Numbered List' },
                { selector: '.ql-list[value="bullet"]', title: 'Bullet List' },
                { selector: '.ql-blockquote', title: 'Quote / Blockquote' },
                { selector: '.ql-color.ql-picker', title: 'Text Color' },
                { selector: '.ql-align.ql-picker', title: 'Text Alignment' },
                { selector: '.ql-link', title: 'Insert Link' },
                { selector: '.ql-image', title: 'Insert Image' },
                { selector: '.ql-video', title: 'Insert Video' },
                { selector: '.ql-table-insert', title: 'Insert Table' },
                { selector: '.ql-clean', title: 'Clear Formatting' }
            ];

            tooltips.forEach(({ selector, title }) => {
                const el = container.querySelector(selector);
                if (el) {
                    el.setAttribute('title', title);
                    el.setAttribute('aria-label', title);
                }
            });

            // Picker items
            const headerItems = container.querySelectorAll('.ql-header .ql-picker-item');
            headerItems.forEach(item => {
                const val = item.getAttribute('data-value');
                const label = val ? `Heading ${val}` : 'Normal Text';
                item.setAttribute('title', label);
            });

            const alignItems = container.querySelectorAll('.ql-align .ql-picker-item');
            alignItems.forEach(item => {
                const val = item.getAttribute('data-value') || 'left';
                const label = `Align ${val.charAt(0).toUpperCase() + val.slice(1)}`;
                item.setAttribute('title', label);
            });
        };

        const timer = setTimeout(setupTooltips, 100);
        return () => clearTimeout(timer);
    }, []);

    // Setup Toolbar Picker Outside Click Listener
    useEffect(() => {
        const handleDocumentClick = (e) => {
            const container = document.querySelector('.rich-text-editor-container');
            if (container && !container.contains(e.target)) {
                const expandedPickers = container.querySelectorAll('.ql-picker.ql-expanded');
                expandedPickers.forEach(picker => picker.classList.remove('ql-expanded'));
            }
        };
        document.addEventListener('mousedown', handleDocumentClick);
        return () => document.removeEventListener('mousedown', handleDocumentClick);
    }, []);

    // Prevent Toolbar Clicks from deselecting text selection in editor
    useEffect(() => {
        let cleanup = null;
        const timer = setTimeout(() => {
            const container = document.querySelector('.rich-text-editor-container');
            if (!container) return;

            const toolbar = container.querySelector('.ql-toolbar');
            if (!toolbar) return;

            const handleToolbarMouseDown = (e) => {
                const tag = e.target.tagName;
                if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') {
                    return;
                }

                // Prevent mousedown from stealing focus and deselecting text
                e.preventDefault();
            };

            toolbar.addEventListener('mousedown', handleToolbarMouseDown);
            cleanup = () => toolbar.removeEventListener('mousedown', handleToolbarMouseDown);
        }, 100);

        return () => {
            clearTimeout(timer);
            if (cleanup) cleanup();
        };
    }, []);

    // Setup and Enhance Quill Snow Tooltip with "Open in new tab" option
    useEffect(() => {
        const quill = quillRef.current?.getEditor();
        if (!quill || !quill.theme?.tooltip) return;

        const tooltip = quill.theme.tooltip;
        const root = tooltip.root;

        // Inject custom Open in New Tab checkbox inside tooltip
        let newTabWrapper = root.querySelector('.ql-newtab-wrapper');
        let newTabCheckbox = root.querySelector('.ql-newtab-checkbox');

        if (!newTabWrapper) {
            newTabWrapper = document.createElement('label');
            newTabWrapper.className = 'ql-newtab-wrapper';
            newTabWrapper.title = 'Open link in a new tab (target="_blank")';
            newTabWrapper.innerHTML = `
                <input type="checkbox" class="ql-newtab-checkbox" />
                <span class="ql-newtab-label-text">Open in new tab</span>
            `;

            const actionBtn = root.querySelector('a.ql-action');
            if (actionBtn) {
                root.insertBefore(newTabWrapper, actionBtn);
            } else {
                root.appendChild(newTabWrapper);
            }

            newTabCheckbox = newTabWrapper.querySelector('.ql-newtab-checkbox');
        }

        // Helper to get target of link at current position
        const getTargetAtPosition = (index) => {
            try {
                const [linkBlot] = quill.scroll.descendant(CustomLink, index);
                if (linkBlot && linkBlot.domNode) {
                    return linkBlot.domNode.getAttribute('target') === '_blank';
                }
            } catch (err) {}
            return false;
        };

        // When checkbox is toggled directly in tooltip (preview or edit mode):
        const handleCheckboxChange = (e) => {
            const isChecked = e.target.checked;
            if (!root.classList.contains('ql-editing') && tooltip.linkRange) {
                try {
                    const [linkBlot] = quill.scroll.descendant(CustomLink, tooltip.linkRange.index);
                    if (linkBlot && linkBlot.domNode) {
                        const url = linkBlot.domNode.getAttribute('href') || '';
                        quill.formatText(tooltip.linkRange, 'link', { url, target: isChecked }, Quill.sources.USER);
                        if (onChange) onChange(quill.root.innerHTML);
                    }
                } catch (err) {
                    console.error('Error updating link target from preview:', err);
                }
            }
        };

        newTabCheckbox?.addEventListener('change', handleCheckboxChange);

        // Override tooltip.edit so that checkbox is accurately initialized with the current link status
        const origEdit = tooltip.edit.bind(tooltip);
        tooltip.edit = function(mode = 'link', preview = null) {
            origEdit(mode, preview);
            if (mode === 'link' && newTabCheckbox) {
                let isBlank = false;
                if (tooltip.linkRange) {
                    isBlank = getTargetAtPosition(tooltip.linkRange.index);
                } else if (quill.selection?.savedRange) {
                    isBlank = getTargetAtPosition(quill.selection.savedRange.index);
                }
                newTabCheckbox.checked = isBlank;
            }
        };

        // Override tooltip.save so that formatted link value includes url and target
        const origSave = tooltip.save.bind(tooltip);
        tooltip.save = function() {
            const mode = root.getAttribute('data-mode');
            if (mode === 'link') {
                let value = tooltip.textbox?.value?.trim() || '';
                const isTarget = Boolean(newTabCheckbox?.checked);
                const { scrollTop } = quill.root;

                if (value) {
                    if (tooltip.linkRange) {
                        quill.formatText(tooltip.linkRange, 'link', { url: value, target: isTarget }, Quill.sources.USER);
                        delete tooltip.linkRange;
                    } else {
                        tooltip.restoreFocus();
                        quill.format('link', { url: value, target: isTarget }, Quill.sources.USER);
                    }
                } else {
                    if (tooltip.linkRange) {
                        quill.formatText(tooltip.linkRange, 'link', false, Quill.sources.USER);
                        delete tooltip.linkRange;
                    } else {
                        quill.format('link', false, Quill.sources.USER);
                    }
                }

                quill.root.scrollTop = scrollTop;
                root.classList.remove('ql-editing');
                tooltip.hide();
                if (onChange) onChange(quill.root.innerHTML);
            } else {
                origSave();
            }
        };

        // Listen for selection changes to sync checkbox in preview mode
        const handleSelectionChange = (range, oldRange, source) => {
            if (range && range.length === 0 && source === Quill.sources.USER) {
                const isBlank = getTargetAtPosition(range.index);
                if (newTabCheckbox) {
                    newTabCheckbox.checked = isBlank;
                }
            }
        };

        quill.on('selection-change', handleSelectionChange);

        return () => {
            newTabCheckbox?.removeEventListener('change', handleCheckboxChange);
            quill.off('selection-change', handleSelectionChange);
        };
    }, [onChange]);

    // Custom Key Bindings and Toolbar Configuration
    const modules = useMemo(() => ({
        toolbar: {
            container: [
                ['bold', 'italic', 'underline', 'strike'],
                [{ 'header': [1, 2, 3, false] }],
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                ['blockquote'],
                [{ 'color': COLOR_PALETTE }],
                [{ 'align': [] }],
                ['link', 'image', 'video'],
                ['table-insert'],
                ['clean']
            ],
            handlers: {
                link: function(value) {
                    if (value) {
                        const quill = this.quill;
                        const range = quill.getSelection();
                        if (range) {
                            const selectedText = quill.getText(range.index, range.length);
                            const formats = quill.getFormat(range);
                            let existingUrl = '';
                            let existingNewTab = false;

                            if (formats.link) {
                                if (typeof formats.link === 'object') {
                                    existingUrl = formats.link.url || '';
                                    existingNewTab = Boolean(formats.link.target);
                                } else if (typeof formats.link === 'string') {
                                    existingUrl = formats.link;
                                }
                            }

                            setLinkModal({
                                visible: true,
                                range: range,
                                initialText: selectedText,
                                initialUrl: existingUrl,
                                initialNewTab: existingNewTab
                            });
                        }
                    } else {
                        this.quill.format('link', false);
                    }
                },
                'table-insert': function() {
                    setTableModal({ visible: true });
                },
                image: function() {
                    const quill = this.quill;
                    const input = document.createElement('input');
                    input.setAttribute('type', 'file');
                    input.setAttribute('accept', 'image/*');
                    input.click();
                    input.onchange = async () => {
                        const file = input.files?.[0];
                        if (file) {
                            if (onImageUploadRef.current) {
                                try {
                                    const range = quill.getSelection(true);
                                    const url = await onImageUploadRef.current(file);
                                    if (url) {
                                        quill.insertEmbed(range.index, 'image', url);
                                        quill.setSelection(range.index + 1);
                                    }
                                } catch (e) {
                                    console.error('Image upload failed', e);
                                }
                            } else {
                                const reader = new FileReader();
                                reader.onload = (e) => {
                                    const range = quill.getSelection(true);
                                    quill.insertEmbed(range.index, 'image', e.target.result);
                                    quill.setSelection(range.index + 1);
                                };
                                reader.readAsDataURL(file);
                            }
                        }
                    };
                }
            }
        }
    }), []);

    const handleLinkSubmit = ({ url, text, newTab }) => {
        const quill = quillRef.current?.getEditor();
        const range = linkModal.range;
        
        if (range && quill) {
            quill.setSelection(range.index, range.length);
            
            if (text && text !== linkModal.initialText) {
                quill.deleteText(range.index, range.length);
                quill.insertText(range.index, text, {
                    link: { url, target: newTab }
                });
                quill.setSelection(range.index, text.length);
            } else {
                quill.format('link', { url, target: newTab }, Quill.sources.USER);
            }
            if (onChange) {
                onChange(quill.root.innerHTML);
            }
        }
        setLinkModal({ visible: false, range: null, initialText: '', initialUrl: '', initialNewTab: false });
    };

    const handleImageSubmit = ({ alt, width, align }) => {
        const img = imageModal.imgNode;
        if (img) {
            const quill = quillRef.current?.getEditor();
            
            const isFull = !width || width === '100%';
            let widthStyle = '100%';
            let widthAttr = '';

            if (!isFull) {
                const num = parseInt(width);
                if (num && !isNaN(num)) {
                    widthStyle = `${num}px`;
                    widthAttr = `${num}`;
                } else {
                    widthStyle = width;
                }
            }

            let displayStyle = 'block';
            let marginStyle = '1.5rem auto';
            let floatStyle = 'none';

            if (align === 'center') {
                displayStyle = 'block';
                marginStyle = '1.5rem auto';
                floatStyle = 'none';
            } else if (align === 'left') {
                displayStyle = 'inline-block';
                marginStyle = '0.5rem 1.5rem 1rem 0';
                floatStyle = 'left';
            } else if (align === 'right') {
                displayStyle = 'inline-block';
                marginStyle = '0.5rem 0 1rem 1.5rem';
                floatStyle = 'right';
            }

            const styleString = `width: ${widthStyle}; max-width: 100%; height: auto; display: ${displayStyle}; margin: ${marginStyle}; float: ${floatStyle};`;

            // Update DOM element directly
            img.setAttribute('alt', alt || '');
            img.setAttribute('style', styleString);
            img.setAttribute('data-align', align || 'center');
            if (widthAttr) {
                img.setAttribute('width', widthAttr);
            } else {
                img.removeAttribute('width');
            }

            // Update Quill Blot so Quill delta and formats preserve width, style, alt, data-align
            const blot = Quill.find(img);
            if (blot) {
                blot.format('alt', alt || '');
                blot.format('style', styleString);
                blot.format('data-align', align || 'center');
                if (widthAttr) {
                    blot.format('width', widthAttr);
                } else {
                    blot.format('width', null);
                }
            }

            if (quill) {
                quill.update();
                if (onChange) {
                    onChange(quill.root.innerHTML);
                }
            }
        }
        setImageModal({ visible: false, imgNode: null, initialAlt: '', initialWidth: '', initialAlign: '' });
    };

    const handleTableSubmit = ({ rows, cols, hasHeader }) => {
        const quill = quillRef.current.getEditor();
        const range = quill.getSelection(true);

        const totalRows = parseInt(rows) || 3;
        const totalCols = parseInt(cols) || 3;

        let tableHtml = '<table style="width:100%; border-collapse:collapse; margin:1.5rem 0; font-size:0.95rem;"><tbody>';
        
        for (let r = 1; r <= totalRows; r++) {
            const isHeaderRow = hasHeader && r === 1;
            tableHtml += `<tr style="${isHeaderRow ? 'background-color:#F9FAFB;' : ''}">`;
            for (let c = 1; c <= totalCols; c++) {
                if (isHeaderRow) {
                    tableHtml += `<td style="border:1px solid #E5E7EB; padding:0.75rem 1rem; text-align:left; font-weight:700; background-color:#F9FAFB; color:#111827;">Header ${c}</td>`;
                } else {
                    const dataRowIdx = hasHeader ? r - 1 : r;
                    tableHtml += `<td style="border:1px solid #E5E7EB; padding:0.75rem 1rem; color:#374151;">Row ${dataRowIdx} Col ${c}</td>`;
                }
            }
            tableHtml += '</tr>';
        }
        tableHtml += '</tbody></table><p><br></p>';

        quill.clipboard.dangerouslyPasteHTML(range ? range.index : 0, tableHtml);
        setTableModal({ visible: false });
    };

    const handleDeleteTable = () => {
        if (activeTable?.node) {
            activeTable.node.remove();
            const quill = quillRef.current?.getEditor();
            if (quill) {
                quill.update();
                onChange(quill.root.innerHTML);
            }
        }
        setActiveTable(null);
    };

    const handleAddRow = () => {
        if (activeTable?.node) {
            const table = activeTable.node;
            const tbody = table.querySelector('tbody') || table;
            const rows = tbody.querySelectorAll('tr');
            const lastRow = rows[rows.length - 1];
            if (lastRow) {
                const colCount = lastRow.children.length;
                const newTr = document.createElement('tr');
                const nextRowIdx = rows.length;
                for (let i = 0; i < colCount; i++) {
                    const td = document.createElement('td');
                    td.style.border = '1px solid #E5E7EB';
                    td.style.padding = '0.75rem 1rem';
                    td.style.color = '#374151';
                    td.textContent = `Row ${nextRowIdx} Col ${i + 1}`;
                    newTr.appendChild(td);
                }
                tbody.appendChild(newTr);
                const quill = quillRef.current?.getEditor();
                if (quill) {
                    quill.update();
                    onChange(quill.root.innerHTML);
                }
            }
        }
    };

    const handleAddColumn = () => {
        if (activeTable?.node) {
            const table = activeTable.node;
            const rows = table.querySelectorAll('tr');
            rows.forEach((tr, idx) => {
                const firstCell = tr.children[0];
                const isHeaderRow = firstCell && (firstCell.tagName === 'TH' || firstCell.style.fontWeight === '700' || firstCell.style.backgroundColor.includes('249'));
                const cell = document.createElement('td');
                cell.style.border = '1px solid #E5E7EB';
                cell.style.padding = '0.75rem 1rem';
                cell.textContent = isHeaderRow ? `Header ${tr.children.length + 1}` : `Row ${idx} Col ${tr.children.length + 1}`;
                if (isHeaderRow) {
                    cell.style.backgroundColor = '#F9FAFB';
                    cell.style.fontWeight = '700';
                    cell.style.textAlign = 'left';
                    cell.style.color = '#111827';
                } else {
                    cell.style.color = '#374151';
                }
                tr.appendChild(cell);
            });
            const quill = quillRef.current?.getEditor();
            if (quill) {
                quill.update();
                onChange(quill.root.innerHTML);
            }
        }
    };

    // Handle Slash Command Detection
    const handleKeyDown = (e) => {
        if (e.key === '/') {
            setTimeout(() => {
                try {
                    const quill = quillRef.current.getEditor();
                    const selection = quill.getSelection();
                    if (selection) {
                        const bounds = quill.getBounds(selection.index);
                        const editorBounds = document.querySelector('.rich-text-editor-container').getBoundingClientRect();

                        setSlashMenu({
                            visible: true,
                            position: {
                                top: editorBounds.top + bounds.top,
                                left: editorBounds.left + bounds.left
                            }
                        });
                    }
                } catch (err) {
                    console.error("Error showing slash menu:", err);
                }
            }, 10);
        } else {
            if (slashMenu.visible) setSlashMenu({ ...slashMenu, visible: false });
        }
    };

    const handleSlashCommand = async (command) => {
        setSlashMenu({ ...slashMenu, visible: false });
        const quill = quillRef.current.getEditor();
        const selection = quill.getSelection();
        if (!selection) return;

        const textBefore = quill.getText(selection.index - 1, 1);
        if (textBefore === '/') {
            quill.deleteText(selection.index - 1, 1);
        }

        switch (command) {
            case 'h1': quill.format('header', 1); break;
            case 'h2': quill.format('header', 2); break;
            case 'h3': quill.format('header', 3); break;
            case 'list-ul': quill.format('list', 'bullet'); break;
            case 'list-ol': quill.format('list', 'ordered'); break;
            case 'blockquote': quill.format('blockquote', true); break;
            case 'table': setTableModal({ visible: true }); break;
            case 'code-block': quill.format('code-block', true); break;
            case 'image':
                const input = document.createElement('input');
                input.setAttribute('type', 'file');
                input.setAttribute('accept', 'image/*');
                input.click();
                input.onchange = async () => {
                    const file = input.files[0];
                    if (file && onImageUploadRef.current) {
                        try {
                            const url = await onImageUploadRef.current(file);
                            if (url) quill.insertEmbed(selection.index - 1, 'image', url);
                        } catch (e) { console.error('Image upload failed'); }
                    }
                };
                break;
            default: break;
        }
    };

    return (
        <div className="rich-text-editor-container bg-white rounded-xl shadow-sm border border-gray-200 relative overflow-hidden" onKeyDown={handleKeyDown}>
            <ReactQuill
                ref={quillRef}
                theme="snow"
                value={content}
                onChange={onChange}
                modules={modules}
                placeholder="Type something..."
                className="min-h-[500px] text-lg"
            />

            {slashMenu.visible && (
                <SlashMenu
                    position={slashMenu.position}
                    onSelect={handleSlashCommand}
                    onClose={() => setSlashMenu({ ...slashMenu, visible: false })}
                />
            )}

            <LinkModal 
                visible={linkModal.visible}
                initialText={linkModal.initialText}
                initialUrl={linkModal.initialUrl}
                initialNewTab={linkModal.initialNewTab}
                onCancel={() => setLinkModal({ visible: false, range: null, initialText: '', initialUrl: '', initialNewTab: false })}
                onSubmit={handleLinkSubmit}
            />

            <ImageSettingsModal
                visible={imageModal.visible}
                initialAlt={imageModal.initialAlt}
                initialWidth={imageModal.initialWidth}
                initialAlign={imageModal.initialAlign}
                onCancel={() => setImageModal({ visible: false, imgNode: null, initialAlt: '', initialWidth: '', initialAlign: '' })}
                onSubmit={handleImageSubmit}
            />

            <TableModal
                visible={tableModal.visible}
                onCancel={() => setTableModal({ visible: false })}
                onSubmit={handleTableSubmit}
            />

            {activeTable && (
                <div 
                    className="table-floating-toolbar absolute z-[999] bg-white/95 backdrop-blur-sm rounded-xl shadow-xl border border-gray-200/90 p-1.5 flex items-center gap-1.5 animate-in fade-in zoom-in-95 duration-100"
                    style={{
                        top: activeTable.top,
                        left: activeTable.left
                    }}
                >
                    <span className="text-[11px] font-extrabold text-gray-500 px-2 flex items-center gap-1 uppercase tracking-wider">
                        <TableIcon size={14} className="text-blue-500" />
                        Table
                    </span>
                    <div className="h-4 w-px bg-gray-200" />

                    <button
                        type="button"
                        onClick={handleAddRow}
                        className="flex items-center gap-1 px-2.5 py-1 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg text-xs font-semibold transition-colors border border-gray-200"
                        title="Add New Row"
                    >
                        + Row
                    </button>

                    <button
                        type="button"
                        onClick={handleAddColumn}
                        className="flex items-center gap-1 px-2.5 py-1 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg text-xs font-semibold transition-colors border border-gray-200"
                        title="Add New Column"
                    >
                        + Column
                    </button>

                    <div className="h-4 w-px bg-gray-200" />

                    <button
                        type="button"
                        onClick={handleDeleteTable}
                        className="flex items-center gap-1.5 px-3 py-1 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg text-xs font-bold transition-all border border-rose-200/60 shadow-sm"
                        title="Delete Entire Table"
                    >
                        <Trash2 size={13} />
                        Delete Table
                    </button>

                    <button
                        type="button"
                        onClick={() => setActiveTable(null)}
                        className="p-1 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100"
                        title="Close Toolbar"
                    >
                        <X size={14} />
                    </button>
                </div>
            )}

            <style>{`
                .rich-text-editor-container {
                    border: 1px solid #E5E7EB;
                    border-radius: 1rem;
                    background-color: #FFFFFF;
                    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                }

                /* Fixed & Sticky Top Toolbar Bar */
                .rich-text-editor-container .ql-toolbar.ql-snow {
                    background-color: #1F2937 !important;
                    border: none !important;
                    border-bottom: 1px solid #374151 !important;
                    padding: 0.65rem 1rem !important;
                    display: flex;
                    flex-wrap: wrap;
                    align-items: center;
                    gap: 0.4rem;
                    position: sticky;
                    top: 0;
                    z-index: 30;
                    border-top-left-radius: 0.9rem;
                    border-top-right-radius: 0.9rem;
                }

                .rich-text-editor-container .ql-container.ql-snow {
                    border: none !important;
                    flex: 1;
                    height: calc(100% - 48px);
                }

                .rich-text-editor-container .ql-editor {
                    height: 100%;
                    overflow-y: auto;
                    padding: 1.75rem 2rem;
                    font-family: 'Inter', sans-serif;
                    line-height: 1.8;
                    font-size: 1.125rem;
                    word-break: break-word !important;
                    overflow-wrap: break-word !important;
                    white-space: pre-wrap !important;
                }

                .rich-text-editor-container .ql-editor * {
                    word-break: break-word !important;
                    overflow-wrap: break-word !important;
                    white-space: pre-wrap !important;
                }

                .rich-text-editor-container .ql-editor.ql-blank::before {
                    color: #9CA3AF;
                    font-style: normal;
                }

                /* Icon and Button Styling inside Dark Header Toolbar */
                .rich-text-editor-container .ql-snow .ql-stroke {
                    stroke: #E5E7EB !important;
                }
                .rich-text-editor-container .ql-snow .ql-fill {
                    fill: #E5E7EB !important;
                }
                .rich-text-editor-container .ql-snow button:hover .ql-stroke,
                .rich-text-editor-container .ql-snow .ql-active .ql-stroke {
                    stroke: #60A5FA !important;
                }
                .rich-text-editor-container .ql-snow button:hover .ql-fill,
                .rich-text-editor-container .ql-snow .ql-active .ql-fill {
                    fill: #60A5FA !important;
                }
                .rich-text-editor-container .ql-snow .ql-picker {
                    color: #E5E7EB !important;
                }

                /* Toolbar Dropdown Popovers */
                .rich-text-editor-container .ql-snow .ql-picker-options {
                    background-color: #1F2937 !important;
                    border: 1px solid #374151 !important;
                    border-radius: 8px !important;
                    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.4) !important;
                    padding: 8px !important;
                    z-index: 10005 !important;
                }

                /* Color & Background Picker Swatches - Only when expanded */
                .rich-text-editor-container .ql-snow .ql-color-picker.ql-expanded .ql-picker-options,
                .rich-text-editor-container .ql-snow .ql-icon-picker.ql-expanded .ql-picker-options {
                    display: flex !important;
                    flex-wrap: wrap !important;
                    gap: 4px !important;
                    width: 200px !important;
                }

                .rich-text-editor-container .ql-snow .ql-color-picker .ql-picker-item,
                .rich-text-editor-container .ql-snow .ql-background .ql-picker-item {
                    width: 20px !important;
                    height: 20px !important;
                    border-radius: 4px !important;
                    padding: 0 !important;
                }

                .ql-editor h1 { font-size: 2.5em; font-weight: 800; margin-top: 1em; margin-bottom: 0.5em; }
                .ql-editor h2 { font-size: 2em; font-weight: 700; margin-top: 1em; margin-bottom: 0.5em; }
                .ql-editor h3 { font-size: 1.75em; font-weight: 600; margin-top: 1em; margin-bottom: 0.5em; }
                .ql-editor img { 
                    border-radius: 0.5rem; 
                    max-width: 100%; 
                    height: auto;
                    cursor: pointer; 
                    transition: outline 0.2s, transform 0.15s; 
                }
                .ql-editor img:hover { 
                    outline: 3px solid #F97316; 
                }
                .ql-editor img[data-align="center"] {
                    display: block !important;
                    margin-left: auto !important;
                    margin-right: auto !important;
                    float: none !important;
                }
                .ql-editor img[data-align="left"] {
                    display: inline-block !important;
                    float: left !important;
                    margin: 0.5rem 1.5rem 1rem 0 !important;
                }
                .ql-editor img[data-align="right"] {
                    display: inline-block !important;
                    float: right !important;
                    margin: 0.5rem 0 1rem 1.5rem !important;
                }
                
                /* Styled Quote & Callout Blocks */
                .ql-editor blockquote { 
                    background-color: #EFF6FF; 
                    border: none;
                    border-radius: 0.75rem; 
                    padding: 1.25rem 1.5rem; 
                    margin: 1.5rem 0; 
                    color: #1E293B; 
                    font-style: normal; 
                    box-shadow: 0 1px 3px rgba(0,0,0,0.04); 
                }

                /* Ensure text inside Callout Tab Box inherits solid container background without line-by-line text highlights */
                .ql-editor blockquote span {
                    background-color: transparent !important;
                }

                /* Styled Tables */
                .ql-editor table { 
                    width: 100%; 
                    border-collapse: collapse; 
                    margin: 1.5rem 0; 
                    font-size: 0.95rem; 
                    cursor: pointer;
                    transition: outline 0.2s, box-shadow 0.2s;
                }
                .ql-editor table:hover {
                    outline: 2px dashed #60A5FA;
                }
                .ql-editor th { 
                    background-color: #F9FAFB; 
                    padding: 0.75rem 1rem; 
                    text-align: left; 
                    font-weight: 700; 
                    border: 1px solid #E5E7EB; 
                }
                .ql-editor td { 
                    padding: 0.75rem 1rem; 
                    border: 1px solid #E5E7EB; 
                }

                /* Quill Tooltip Enhancement for Open in New Tab */
                .ql-snow .ql-tooltip.ql-hidden,
                .rich-text-editor-container .ql-snow .ql-tooltip.ql-hidden {
                    display: none !important;
                    visibility: hidden !important;
                    opacity: 0 !important;
                    pointer-events: none !important;
                }

                .ql-snow .ql-tooltip:not(.ql-hidden),
                .rich-text-editor-container .ql-snow .ql-tooltip:not(.ql-hidden) {
                    border-radius: 8px !important;
                    border: 1px solid #E5E7EB !important;
                    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.12), 0 4px 6px -2px rgba(0, 0, 0, 0.05) !important;
                    padding: 8px 12px !important;
                    background-color: #FFFFFF !important;
                    display: inline-flex !important;
                    align-items: center !important;
                    gap: 8px !important;
                    z-index: 1000 !important;
                    line-height: normal !important;
                }

                .ql-snow .ql-tooltip::before {
                    font-size: 12px !important;
                    font-weight: 600 !important;
                    color: #4B5563 !important;
                    line-height: normal !important;
                    margin-right: 0 !important;
                }

                .ql-snow .ql-tooltip input[type="text"] {
                    border: 1px solid #D1D5DB !important;
                    border-radius: 6px !important;
                    padding: 4px 8px !important;
                    font-size: 13px !important;
                    outline: none !important;
                    min-width: 200px !important;
                    transition: all 0.15s ease !important;
                }

                .ql-snow .ql-tooltip input[type="text"]:focus {
                    border-color: #2563EB !important;
                    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.15) !important;
                }

                .ql-snow .ql-tooltip .ql-newtab-wrapper {
                    display: inline-flex !important;
                    align-items: center !important;
                    gap: 5px !important;
                    cursor: pointer !important;
                    user-select: none !important;
                    padding: 3px 8px !important;
                    border-radius: 6px !important;
                    background-color: #F3F4F6 !important;
                    border: 1px solid #E5E7EB !important;
                    transition: all 0.15s ease !important;
                    margin: 0 4px !important;
                }

                .ql-snow .ql-tooltip .ql-newtab-wrapper:hover {
                    background-color: #E5E7EB !important;
                }

                .ql-snow .ql-tooltip .ql-newtab-wrapper .ql-newtab-checkbox {
                    width: 14px !important;
                    height: 14px !important;
                    cursor: pointer !important;
                    accent-color: #2563EB !important;
                    margin: 0 !important;
                }

                .ql-snow .ql-tooltip .ql-newtab-wrapper .ql-newtab-label-text {
                    font-size: 12px !important;
                    font-weight: 500 !important;
                    color: #374151 !important;
                    white-space: nowrap !important;
                }

                .ql-snow .ql-tooltip a.ql-action {
                    font-size: 12px !important;
                    font-weight: 600 !important;
                    color: #2563EB !important;
                    text-decoration: none !important;
                    cursor: pointer !important;
                    padding: 4px 8px !important;
                    border-radius: 6px !important;
                }

                .ql-snow .ql-tooltip a.ql-action:hover {
                    background-color: #EFF6FF !important;
                }

                .ql-snow .ql-tooltip a.ql-remove {
                    font-size: 12px !important;
                    font-weight: 600 !important;
                    color: #DC2626 !important;
                    text-decoration: none !important;
                    cursor: pointer !important;
                    padding: 4px 8px !important;
                    border-radius: 6px !important;
                }

                .ql-snow .ql-tooltip a.ql-remove:hover {
                    background-color: #FEF2F2 !important;
                }

                .ql-snow .ql-tooltip a.ql-preview {
                    font-size: 13px !important;
                    color: #2563EB !important;
                    max-width: 220px !important;
                    overflow: hidden !important;
                    text-overflow: ellipsis !important;
                    white-space: nowrap !important;
                }
            `}</style>
        </div>
    );
};

export default RichTextEditor;
