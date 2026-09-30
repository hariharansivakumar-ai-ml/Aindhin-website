import { useState, useRef, useMemo, useEffect } from 'react';
import ReactQuill, { Quill } from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { 
    Heading1, Heading2, Heading3, Heading4, Image as ImageIcon, List, Quote, 
    CheckSquare, Code, X, Link as LinkIcon, ExternalLink, 
    AlignLeft, AlignCenter, AlignRight, Table as TableIcon, Palette, Trash2,
    Video, Lightbulb, Plus, Minus
} from 'lucide-react';

// --- Custom Link Blot to support target="_blank" and custom color ---
const Link = Quill.import('formats/link');
class CustomLink extends Link {
    static blotName = 'link';
    static tagName = 'A';

    static create(value) {
        let url = '';
        let target = false;
        let color = '';

        if (typeof value === 'object' && value !== null) {
            url = value.url || '';
            target = Boolean(value.target);
            color = value.color || '';
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
        if (color) {
            node.style.color = color;
        }
        return node;
    }

    static formats(domNode) {
        const url = domNode.getAttribute('href') || '';
        const target = domNode.getAttribute('target') === '_blank';
        const color = domNode.style.color || '';
        return {
            url,
            target,
            color,
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
        let color = '';

        if (typeof value === 'object' && value !== null) {
            url = value.url || '';
            target = Boolean(value.target);
            color = value.color || '';
        } else if (typeof value === 'string') {
            url = value;
            target = this.domNode.getAttribute('target') === '_blank';
            color = this.domNode.style.color || '';
        }

        this.domNode.setAttribute('href', this.constructor.sanitize(url));
        if (target) {
            this.domNode.setAttribute('target', '_blank');
            this.domNode.setAttribute('rel', 'noopener noreferrer');
        } else {
            this.domNode.removeAttribute('target');
            this.domNode.removeAttribute('rel');
        }
        if (color) {
            this.domNode.style.color = color;
        } else {
            this.domNode.style.removeProperty('color');
        }
    }
}
Quill.register(CustomLink, true);

// --- Custom Image Blot to support style, width, alt, alignment ---
const ImageBlot = Quill.import('formats/image');
const CUSTOM_IMAGE_ATTRIBUTES = ['alt', 'height', 'width', 'style', 'class', 'data-align', 'data-caption'];

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
            if (value['data-caption']) node.setAttribute('data-caption', value['data-caption']);
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

// --- Custom Block-Level Background Attributor for WordPress-Style Box Containers ---
const Parchment = Quill.import('parchment');
const BackgroundStyle = Quill.import('attributors/style/background');

class BlockBackgroundAttributor extends BackgroundStyle.constructor {
    constructor() {
        super('background', 'background-color', { scope: Parchment.Scope.BLOCK });
    }
}
const blockBackground = new BlockBackgroundAttributor();
Quill.register({
    'attributors/style/background': blockBackground,
    'formats/background': blockBackground
}, true);

// Utility to normalize existing paragraphs where Quill wrapped text in inline background spans
export const normalizeBackgroundBoxes = (html) => {
    if (!html || typeof html !== 'string') return html;
    try {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const blocks = doc.querySelectorAll('p, h1, h2, h3, h4, blockquote');
        let modified = false;

        blocks.forEach(block => {
            if (!block.style.backgroundColor) {
                const bgSpans = Array.from(block.querySelectorAll('span[style*="background-color"]'));
                if (bgSpans.length > 0) {
                    const blockText = block.textContent.trim();
                    const bgText = bgSpans.map(s => s.textContent).join('').trim();
                    if (blockText && bgText && (blockText === bgText || (bgSpans.length === 1 && block.children.length === 1))) {
                        const bgColor = bgSpans[0].style.backgroundColor;
                        if (bgColor && bgColor !== 'transparent') {
                            block.style.backgroundColor = bgColor;
                            bgSpans.forEach(s => s.style.removeProperty('background-color'));
                            modified = true;
                        }
                    }
                }
            }
        });

        return modified ? doc.body.innerHTML : html;
    } catch (e) {
        return html;
    }
};

// --- Register Custom Icons in Quill UI ---
const icons = Quill.import('ui/icons');
icons['undo'] = `<svg viewBox="0 0 18 18"><polyline class="ql-stroke" points="5 9 2 6 5 3"/><path class="ql-stroke" d="M2.5,6h7a4.5,4.5,0,0,1,4.5,4.5v0a4.5,4.5,0,0,1-4.5,4.5H6"/></svg>`;
icons['redo'] = `<svg viewBox="0 0 18 18"><polyline class="ql-stroke" points="13 9 16 6 13 3"/><path class="ql-stroke" d="M15.5,6H8.5a4.5,4.5,0,0,0-4.5,4.5v0a4.5,4.5,0,0,0,4.5,4.5H12"/></svg>`;
icons['table-insert'] = `<svg viewBox="0 0 18 18"><rect class="ql-stroke" height="12" width="12" x="3" y="3" rx="1.5"/><line class="ql-stroke" x1="9" x2="9" y1="3" y2="15"/><line class="ql-stroke" x1="3" x2="15" y1="9" y2="9"/></svg>`;
icons['callout-insert'] = `<svg viewBox="0 0 18 18"><path class="ql-stroke" d="M9,2.5A4.5,4.5,0,0,0,5.8,10.2c.5.5.7,1.1.7,1.8h5c0-.7.2-1.3.7-1.8A4.5,4.5,0,0,0,9,2.5Z"/><line class="ql-stroke" x1="7" x2="11" y1="13.5" y2="13.5"/><line class="ql-stroke" x1="7.5" x2="10.5" y1="15.5" y2="15.5"/></svg>`;

// --- Color Palette Options ---
const COLOR_PALETTE = [
    '#111827', '#374151', '#6B7280', '#9CA3AF', '#FFFFFF',
    '#DC2626', '#EA580C', '#D97706', '#CA8A04', '#16A34A',
    '#059669', '#0284C7', '#2563EB', '#4F46E5', '#7C3AED', '#DB2777'
];

const BG_COLOR_PALETTE = [
    'transparent', '#FEF08A', '#BBF7D0', '#BAE6FD', '#DDD6FE',
    '#FBCFE8', '#FED7AA', '#F3F4F6'
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
        { id: 'h4', label: 'Heading 4', icon: Heading4, desc: 'Sub-section heading' },
        { id: 'callout', label: 'Callout Box', icon: Lightbulb, desc: 'Highlight box (Info/Tip/Warning)' },
        { id: 'image', label: 'Image', icon: ImageIcon, desc: 'Upload an image' },
        { id: 'video', label: 'Video Embed', icon: Video, desc: 'YouTube or Instagram video' },
        { id: 'list-ul', label: 'Bullet List', icon: List, desc: 'Create a simple bullet list' },
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
const LinkModal = ({ visible, initialText, initialUrl = '', initialNewTab = false, initialColor = '', onCancel, onSubmit }) => {
    const [url, setUrl] = useState(initialUrl || '');
    const [text, setText] = useState(initialText || '');
    const [newTab, setNewTab] = useState(Boolean(initialNewTab));
    const [color, setColor] = useState(initialColor || '#2563EB');

    useEffect(() => {
        if (visible) {
            setText(initialText || '');
            setUrl(initialUrl || '');
            setNewTab(Boolean(initialNewTab));
            setColor(initialColor || '#2563EB');
        }
    }, [visible, initialText, initialUrl, initialNewTab, initialColor]);

    if (!visible) return null;

    const linkColors = [
        { label: 'Royal Blue', val: '#2563EB' },
        { label: 'Sky Blue', val: '#0284C7' },
        { label: 'Emerald Green', val: '#059669' },
        { label: 'Warm Orange', val: '#EA580C' },
        { label: 'Crimson Red', val: '#DC2626' },
        { label: 'Purple', val: '#7C3AED' },
        { label: 'Charcoal', val: '#1F2937' },
    ];

    return (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-[2px] flex items-center justify-center z-[10001] animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                            <LinkIcon size={18} />
                        </div>
                        <div>
                            <h3 className="text-base font-bold text-gray-900">Insert / Edit Link</h3>
                            <p className="text-[11px] text-gray-400">Configure destination, display text, styling & tab behavior</p>
                        </div>
                    </div>
                    <button type="button" onClick={onCancel} className="text-gray-400 hover:text-gray-600 p-1">
                        <X size={20} />
                    </button>
                </div>
                <div className="p-6 space-y-4">
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Destination URL</label>
                        <input 
                            type="text" 
                            autoFocus
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all bg-gray-50/50 focus:bg-white font-mono text-xs"
                            placeholder="https://example.com or /blog/slug"
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Link Text</label>
                        <input 
                            type="text" 
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all bg-gray-50/50 focus:bg-white"
                            placeholder="Display text"
                        />
                    </div>

                    {/* Link Color Option */}
                    <div className="space-y-1.5">
                        <div className="flex justify-between items-center">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Link Colour (Works even if bold)</label>
                            <span className="text-[11px] font-mono text-gray-600 font-bold" style={{ color }}>{color}</span>
                        </div>
                        <div className="flex items-center gap-2 pt-1 flex-wrap">
                            {linkColors.map(c => (
                                <button
                                    key={c.val}
                                    type="button"
                                    onClick={() => setColor(c.val)}
                                    title={c.label}
                                    style={{ backgroundColor: c.val }}
                                    className={`w-7 h-7 rounded-full border-2 transition-all ${
                                        color === c.val ? 'border-gray-900 scale-110 shadow-md ring-2 ring-blue-300' : 'border-white hover:scale-105 shadow-sm'
                                    }`}
                                />
                            ))}
                            <div className="relative flex items-center">
                                <input
                                    type="color"
                                    value={color || '#2563EB'}
                                    onChange={e => setColor(e.target.value)}
                                    title="Custom Color"
                                    className="w-7 h-7 rounded-full cursor-pointer border border-gray-300 p-0 overflow-hidden shadow-sm"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Open in new tab option visible */}
                    <label className="flex items-center justify-between cursor-pointer group p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors border border-gray-100">
                        <div className="flex items-center gap-2.5">
                            <ExternalLink size={16} className="text-blue-600" />
                            <div>
                                <span className="text-xs font-bold text-gray-800 block">Open in New Tab</span>
                                <span className="text-[11px] text-gray-400 block">Adds target="_blank" and rel="noopener noreferrer"</span>
                            </div>
                        </div>
                        <input 
                            type="checkbox" 
                            checked={newTab}
                            onChange={(e) => setNewTab(e.target.checked)}
                            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
                        />
                    </label>
                </div>
                <div className="px-6 py-4 bg-gray-50/80 border-t border-gray-100 flex justify-end gap-3">
                    <button 
                        type="button"
                        onClick={onCancel}
                        className="px-5 py-2 text-sm font-bold text-gray-500 hover:text-gray-800 transition-colors"
                    >
                        Cancel
                    </button>
                    <button 
                        type="button"
                        onClick={() => onSubmit({ url, text, newTab, color })}
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
const ImageSettingsModal = ({ visible, initialAlt, initialWidth, initialAlign, initialCaption, onCancel, onSubmit }) => {
    const [alt, setAlt] = useState(initialAlt || '');
    const [width, setWidth] = useState(initialWidth || '100%');
    const [align, setAlign] = useState(initialAlign || 'center');
    const [caption, setCaption] = useState(initialCaption || '');

    useEffect(() => {
        if (visible) {
            setAlt(initialAlt || '');
            setWidth(initialWidth || '100%');
            setAlign(initialAlign || 'center');
            setCaption(initialCaption || '');
        }
    }, [visible, initialAlt, initialWidth, initialAlign, initialCaption]);

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
                <div className="p-6 space-y-5">
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Alt Text (SEO)</label>
                        <input 
                            type="text" 
                            value={alt}
                            onChange={(e) => setAlt(e.target.value)}
                            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all bg-gray-50/50 focus:bg-white"
                            placeholder="Describe this image..."
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Caption (Optional)</label>
                        <input 
                            type="text" 
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)}
                            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all bg-gray-50/50 focus:bg-white"
                            placeholder="Add image caption..."
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
                                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all bg-gray-50/50 focus:bg-white pr-12"
                                    placeholder={isFullWidth ? "Auto (100%)" : "e.g. 600"}
                                />
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400">
                                    px
                                </div>
                            </div>
                            <button 
                                type="button"
                                onClick={() => setWidth('100%')}
                                className={`px-4 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all border ${
                                    isFullWidth 
                                        ? 'bg-orange-600 border-orange-600 text-white shadow-sm shadow-orange-200' 
                                        : 'bg-gray-100 border-gray-200 text-gray-600 hover:bg-gray-200'
                                }`}
                            >
                                Full
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
                                    className={`flex flex-col items-center gap-1.5 p-2.5 rounded-xl border transition-all ${
                                        align === opt.id 
                                            ? 'bg-orange-50 border-orange-200 text-orange-600 shadow-sm' 
                                            : 'bg-white border-gray-100 text-gray-400 hover:bg-gray-50'
                                    }`}
                                >
                                    <opt.icon size={18} />
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
                        onClick={() => onSubmit({ alt, width, align, caption })}
                        className="px-8 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-sm font-bold shadow-lg shadow-orange-100 transition-all"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

// --- Callout / Highlight Box Modal ---
const CalloutModal = ({ visible, onCancel, onSubmit }) => {
    const [type, setType] = useState('info');
    const [title, setTitle] = useState('Important Note');
    const [text, setText] = useState('');

    if (!visible) return null;

    const types = [
        { id: 'info', label: 'Info', icon: '💡', bg: '#EFF6FF', border: '#3B82F6', text: '#1E40AF', defaultTitle: 'Important Note' },
        { id: 'tip', label: 'Tip', icon: '⚡', bg: '#ECFDF5', border: '#10B981', text: '#065F46', defaultTitle: 'Pro Tip' },
        { id: 'warning', label: 'Warning', icon: '⚠️', bg: '#FFFBEB', border: '#F59E0B', text: '#92400E', defaultTitle: 'Caution' },
        { id: 'note', label: 'Highlight', icon: '📌', bg: '#FAF5FF', border: '#8B5CF6', text: '#5B21B6', defaultTitle: 'Key Takeaway' },
    ];

    const currentType = types.find(t => t.id === type) || types[0];

    return (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-[2px] flex items-center justify-center z-[10001] animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <div className="flex items-center gap-2">
                        <span className="text-xl">{currentType.icon}</span>
                        <h3 className="text-base font-bold text-gray-900">Insert Callout / Highlight Box</h3>
                    </div>
                    <button type="button" onClick={onCancel} className="text-gray-400 hover:text-gray-600 p-1">
                        <X size={20} />
                    </button>
                </div>
                <div className="p-6 space-y-4">
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Box Theme</label>
                        <div className="grid grid-cols-4 gap-2">
                            {types.map(t => (
                                <button
                                    key={t.id}
                                    type="button"
                                    onClick={() => { setType(t.id); setTitle(t.defaultTitle); }}
                                    className={`py-2 px-1 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition-all ${
                                        type === t.id 
                                            ? 'ring-2 ring-blue-500 border-blue-500 bg-blue-50/50 text-blue-700 shadow-sm' 
                                            : 'border-gray-200 hover:bg-gray-50 text-gray-600'
                                    }`}
                                >
                                    <span>{t.icon}</span>
                                    <span>{t.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Heading / Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            placeholder="Title..."
                            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 bg-gray-50/50 focus:bg-white"
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Content</label>
                        <textarea
                            rows={3}
                            value={text}
                            onChange={e => setText(e.target.value)}
                            placeholder="Write your callout message here..."
                            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 bg-gray-50/50 focus:bg-white resize-none"
                        />
                    </div>
                </div>
                <div className="px-6 py-4 bg-gray-50/80 border-t border-gray-100 flex justify-end gap-3">
                    <button type="button" onClick={onCancel} className="px-5 py-2 text-sm font-bold text-gray-500 hover:text-gray-800 transition-colors">Cancel</button>
                    <button
                        type="button"
                        onClick={() => onSubmit({ type, title, text, currentType })}
                        disabled={!text.trim()}
                        className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-100 transition-all"
                    >
                        Insert Box
                    </button>
                </div>
            </div>
        </div>
    );
};

// --- Video Embed Modal Component (YouTube / Instagram / Vimeo) ---
const VideoEmbedModal = ({ visible, onCancel, onSubmit }) => {
    const [videoUrl, setVideoUrl] = useState('');
    const [platform, setPlatform] = useState('youtube');

    if (!visible) return null;

    const parseVideoUrl = (raw) => {
        if (!raw) return '';
        const trimmed = raw.trim();
        const iframeSrcMatch = trimmed.match(/src=["'](.*?)["']/);
        if (iframeSrcMatch) return iframeSrcMatch[1];

        // YouTube
        const ytMatch = trimmed.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
        if (ytMatch) {
            return `https://www.youtube.com/embed/${ytMatch[1]}`;
        }

        // Instagram
        const igMatch = trimmed.match(/instagram\.com\/(?:p|reel|tv)\/([a-zA-Z0-9_-]+)/);
        if (igMatch) {
            return `https://www.instagram.com/p/${igMatch[1]}/embed/`;
        }

        // Vimeo
        const vmMatch = trimmed.match(/vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|)(\d+)/);
        if (vmMatch) {
            return `https://player.vimeo.com/video/${vmMatch[3]}`;
        }

        return trimmed;
    };

    return (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-[2px] flex items-center justify-center z-[10001] animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-rose-50 text-rose-600 rounded-lg">
                            <Video size={18} />
                        </div>
                        <h3 className="text-base font-bold text-gray-900">Embed Video</h3>
                    </div>
                    <button type="button" onClick={onCancel} className="text-gray-400 hover:text-gray-600 p-1">
                        <X size={20} />
                    </button>
                </div>
                <div className="p-6 space-y-4">
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Platform</label>
                        <div className="grid grid-cols-3 gap-2">
                            {['youtube', 'instagram', 'vimeo'].map(p => (
                                <button
                                    key={p}
                                    type="button"
                                    onClick={() => setPlatform(p)}
                                    className={`py-2 px-3 rounded-xl border text-xs font-bold capitalize transition-all ${
                                        platform === p ? 'bg-rose-50 text-rose-600 border-rose-300 ring-2 ring-rose-200' : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                                    }`}
                                >
                                    {p}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Video URL or Embed Code</label>
                        <input
                            type="text"
                            value={videoUrl}
                            onChange={e => setVideoUrl(e.target.value)}
                            placeholder={platform === 'youtube' ? 'https://www.youtube.com/watch?v=...' : platform === 'instagram' ? 'https://www.instagram.com/reel/...' : 'https://vimeo.com/...'}
                            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 bg-gray-50/50 focus:bg-white"
                        />
                        <p className="text-[11px] text-gray-400">
                            Paste standard share URL or iframe embed code. Will be rendered with a responsive 16:9 ratio.
                        </p>
                    </div>
                </div>
                <div className="px-6 py-4 bg-gray-50/80 border-t border-gray-100 flex justify-end gap-3">
                    <button type="button" onClick={onCancel} className="px-5 py-2 text-sm font-bold text-gray-500 hover:text-gray-800 transition-colors">Cancel</button>
                    <button
                        type="button"
                        onClick={() => {
                            const embedUrl = parseVideoUrl(videoUrl);
                            if (embedUrl) onSubmit({ embedUrl, raw: videoUrl, platform });
                        }}
                        disabled={!videoUrl.trim()}
                        className="px-6 py-2.5 bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white rounded-xl text-sm font-bold shadow-lg shadow-rose-100 transition-all"
                    >
                        Embed Video
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
    const [linkModal, setLinkModal] = useState({ visible: false, range: null, initialText: '', initialUrl: '', initialNewTab: false, initialColor: '' });
    const [imageModal, setImageModal] = useState({ visible: false, imgNode: null, initialAlt: '', initialWidth: '', initialAlign: '', initialCaption: '' });
    const [tableModal, setTableModal] = useState({ visible: false });
    const [calloutModal, setCalloutModal] = useState({ visible: false });
    const [videoModal, setVideoModal] = useState({ visible: false });
    const [activeTable, setActiveTable] = useState(null);
    const [tableColorPickerOpen, setTableColorPickerOpen] = useState(false);

    const { wordCount, charCount } = useMemo(() => {
        const text = (content || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
        const words = text ? text.split(/\s+/).length : 0;
        const chars = text.length;
        return { wordCount: words, charCount: chars };
    }, [content]);

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
                    initialAlign: alignVal,
                    initialCaption: img.getAttribute('data-caption') || ''
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
                { selector: '.ql-undo', title: 'Undo (Ctrl+Z)' },
                { selector: '.ql-redo', title: 'Redo (Ctrl+Y)' },
                { selector: '.ql-bold', title: 'Bold' },
                { selector: '.ql-italic', title: 'Italic' },
                { selector: '.ql-underline', title: 'Underline' },
                { selector: '.ql-strike', title: 'Strikethrough' },
                { selector: '.ql-header.ql-picker', title: 'Heading Style (H1-H4)' },
                { selector: '.ql-list[value="ordered"]', title: 'Numbered List' },
                { selector: '.ql-list[value="bullet"]', title: 'Bullet List' },
                { selector: '.ql-indent[value="-1"]', title: 'Decrease Indent' },
                { selector: '.ql-indent[value="+1"]', title: 'Increase Indent' },
                { selector: '.ql-blockquote', title: 'Quote / Blockquote' },
                { selector: '.ql-callout-insert', title: 'Insert Callout / Highlight Box' },
                { selector: '.ql-color.ql-picker', title: 'Text Color' },
                { selector: '.ql-background.ql-picker', title: 'Background / Highlight Box' },
                { selector: '.ql-align.ql-picker', title: 'Text Alignment' },
                { selector: '.ql-link', title: 'Insert Link' },
                { selector: '.ql-image', title: 'Insert Image' },
                { selector: '.ql-video', title: 'Embed Video (YouTube / Instagram)' },
                { selector: '.ql-table-insert', title: 'Insert Table' },
                { selector: '.ql-clean', title: 'Clear All Formatting / Remove Box (Tx)' }
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

            const bgItems = container.querySelectorAll('.ql-background .ql-picker-item');
            bgItems.forEach((item, idx) => {
                const val = item.getAttribute('data-value');
                if (!val || val === 'transparent' || idx === 0) {
                    item.setAttribute('title', 'No Background (Remove / Delete Box)');
                    item.setAttribute('aria-label', 'No Background');
                } else {
                    item.setAttribute('title', `Background: ${val}`);
                }
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

        const getTargetAtPosition = (index) => {
            try {
                const [linkBlot] = quill.scroll.descendant(CustomLink, index);
                if (linkBlot && linkBlot.domNode) {
                    return linkBlot.domNode.getAttribute('target') === '_blank';
                }
            } catch (err) {}
            return false;
        };

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
                ['undo', 'redo'],
                [{ 'header': [1, 2, 3, 4, false] }],
                ['bold', 'italic', 'underline', 'strike'],
                [{ 'color': COLOR_PALETTE }, { 'background': BG_COLOR_PALETTE }],
                [{ 'align': ['', 'center', 'right', 'justify'] }],
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                [{ 'indent': '-1'}, { 'indent': '+1' }],
                ['blockquote', 'callout-insert'],
                ['link', 'image', 'video'],
                ['table-insert'],
                ['clean']
            ],
            handlers: {
                undo: function() {
                    this.quill.history.undo();
                },
                redo: function() {
                    this.quill.history.redo();
                },
                clean: function() {
                    const quill = this.quill;
                    const range = quill.getSelection();
                    if (!range) return;

                    // 1. Remove standard inline formatting
                    quill.removeFormat(range.index, range.length || 1, Quill.sources.USER);

                    // 2. Remove block-level formats (background box, alignment, color)
                    quill.formatLine(range.index, range.length || 1, 'background', false, Quill.sources.USER);
                    quill.formatLine(range.index, range.length || 1, 'align', false, Quill.sources.USER);
                    quill.formatLine(range.index, range.length || 1, 'color', false, Quill.sources.USER);

                    // 3. Clear direct DOM styles on the current paragraph/block and all child elements
                    const [line] = quill.getLine(range.index);
                    if (line && line.domNode) {
                        line.domNode.style.removeProperty('background-color');
                        line.domNode.style.removeProperty('color');
                        line.domNode.style.removeProperty('text-align');
                        const styledElements = line.domNode.querySelectorAll('[style*="background-color"], [style*="color"]');
                        styledElements.forEach(el => {
                            el.style.removeProperty('background-color');
                            el.style.removeProperty('color');
                        });
                    }

                    quill.update();
                    if (onChange) onChange(quill.root.innerHTML);
                },
                background: function(value) {
                    const quill = this.quill;
                    const range = quill.getSelection();
                    if (!range) return;

                    // Check if current selection/block already has this background color (click same color to toggle off)
                    const currentFormats = quill.getFormat(range);
                    const isCurrentColor = currentFormats.background === value;

                    if (!value || value === 'transparent' || isCurrentColor) {
                        // REMOVE / DELETE the background box
                        quill.formatLine(range.index, range.length || 1, 'background', false, Quill.sources.USER);
                        quill.formatText(range.index, range.length || 1, 'background', false, Quill.sources.USER);

                        const [line] = quill.getLine(range.index);
                        if (line && line.domNode) {
                            line.domNode.style.removeProperty('background-color');
                            const bgSpans = line.domNode.querySelectorAll('[style*="background-color"]');
                            bgSpans.forEach(s => s.style.removeProperty('background-color'));
                        }
                    } else {
                        // Clear any conflicting inline highlights within the selection
                        quill.formatText(range.index, range.length || 1, 'background', false, Quill.sources.USER);
                        // Apply block-level background container box
                        quill.formatLine(range.index, range.length || 1, 'background', value, Quill.sources.USER);
                    }

                    quill.update();
                    if (onChange) onChange(quill.root.innerHTML);
                },
                link: function(value) {
                    if (value) {
                        const quill = this.quill;
                        const range = quill.getSelection();
                        if (range) {
                            const selectedText = quill.getText(range.index, range.length);
                            const formats = quill.getFormat(range);
                            let existingUrl = '';
                            let existingNewTab = false;
                            let existingColor = '';

                            if (formats.link) {
                                if (typeof formats.link === 'object') {
                                    existingUrl = formats.link.url || '';
                                    existingNewTab = Boolean(formats.link.target);
                                    existingColor = formats.link.color || '';
                                } else if (typeof formats.link === 'string') {
                                    existingUrl = formats.link;
                                }
                            }

                            setLinkModal({
                                visible: true,
                                range: range,
                                initialText: selectedText,
                                initialUrl: existingUrl,
                                initialNewTab: existingNewTab,
                                initialColor: existingColor
                            });
                        }
                    } else {
                        this.quill.format('link', false);
                    }
                },
                'table-insert': function() {
                    setTableModal({ visible: true });
                },
                'callout-insert': function() {
                    setCalloutModal({ visible: true });
                },
                video: function() {
                    setVideoModal({ visible: true });
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
        },
        keyboard: {
            bindings: {
                'background empty enter': {
                    key: 'Enter',
                    collapsed: true,
                    format: ['background'],
                    empty: true,
                    handler() {
                        this.quill.format('background', false, Quill.sources.USER);
                    }
                }
            }
        }
    }), []);

    const handleLinkSubmit = ({ url, text, newTab, color }) => {
        const quill = quillRef.current?.getEditor();
        const range = linkModal.range;
        
        if (range && quill) {
            quill.setSelection(range.index, range.length);
            
            if (text && text !== linkModal.initialText) {
                quill.deleteText(range.index, range.length);
                quill.insertText(range.index, text, {
                    link: { url, target: newTab, color: color || undefined }
                });
                quill.setSelection(range.index, text.length);
            } else {
                quill.format('link', { url, target: newTab, color: color || undefined }, Quill.sources.USER);
            }
            if (onChange) {
                onChange(quill.root.innerHTML);
            }
        }
        setLinkModal({ visible: false, range: null, initialText: '', initialUrl: '', initialNewTab: false, initialColor: '' });
    };

    const handleCalloutSubmit = ({ type, title, text, currentType }) => {
        const quill = quillRef.current?.getEditor();
        if (!quill) return;
        const range = quill.getSelection(true);
        const index = range ? range.index : 0;

        const calloutHtml = `
            <div class="blog-callout blog-callout-${type}" style="border-left:4px solid ${currentType.border};background-color:${currentType.bg};padding:1.25rem 1.5rem;border-radius:0.75rem;margin:1.75rem 0;">
                <div style="font-weight:700;color:${currentType.text};display:flex;align-items:center;gap:0.5rem;margin-bottom:0.5rem;font-size:1.05rem;">
                    <span>${currentType.icon}</span>
                    <span>${title}</span>
                </div>
                <p style="margin:0;color:#374151;font-size:1rem;line-height:1.6;">${text}</p>
            </div>
            <p><br></p>
        `;
        quill.clipboard.dangerouslyPasteHTML(index, calloutHtml);
        setCalloutModal({ visible: false });
        if (onChange) onChange(quill.root.innerHTML);
    };

    const handleVideoSubmit = ({ embedUrl }) => {
        const quill = quillRef.current?.getEditor();
        if (!quill) return;
        const range = quill.getSelection(true);
        const index = range ? range.index : 0;

        const videoHtml = `
            <div class="video-container" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;margin:2rem 0;border-radius:1rem;box-shadow:0 4px 20px rgba(0,0,0,0.08);">
                <iframe src="${embedUrl}" style="position:absolute;top:0;left:0;width:100%;height:100%;border:none;border-radius:1rem;" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            <p><br></p>
        `;
        quill.clipboard.dangerouslyPasteHTML(index, videoHtml);
        setVideoModal({ visible: false });
        if (onChange) onChange(quill.root.innerHTML);
    };

    const handleImageSubmit = ({ alt, width, align, caption }) => {
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
            if (caption) {
                img.setAttribute('data-caption', caption);
            } else {
                img.removeAttribute('data-caption');
            }
            if (widthAttr) {
                img.setAttribute('width', widthAttr);
            } else {
                img.removeAttribute('width');
            }

            // Update Quill Blot
            const blot = Quill.find(img);
            if (blot) {
                blot.format('alt', alt || '');
                blot.format('style', styleString);
                blot.format('data-align', align || 'center');
                blot.format('data-caption', caption || null);
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
        setImageModal({ visible: false, imgNode: null, initialAlt: '', initialWidth: '', initialAlign: '', initialCaption: '' });
    };

    const handleTableSubmit = ({ rows, cols, hasHeader }) => {
        const quill = quillRef.current.getEditor();
        const range = quill.getSelection(true);

        const totalRows = parseInt(rows) || 3;
        const totalCols = parseInt(cols) || 3;

        let tableHtml = '<div class="table-responsive-wrapper" style="overflow-x:auto;-webkit-overflow-scrolling:touch;width:100%;margin:1.5rem 0;"><table style="width:100%; border-collapse:collapse; font-size:0.95rem;"><tbody>';
        
        for (let r = 1; r <= totalRows; r++) {
            const isHeaderRow = hasHeader && r === 1;
            tableHtml += `<tr style="${isHeaderRow ? 'background-color:#F9FAFB;' : ''}">`;
            for (let c = 1; c <= totalCols; c++) {
                if (isHeaderRow) {
                    tableHtml += `<th style="border:1px solid #E5E7EB; padding:0.75rem 1rem; text-align:left; font-weight:700; background-color:#F9FAFB; color:#111827;">Header ${c}</th>`;
                } else {
                    const dataRowIdx = hasHeader ? r - 1 : r;
                    tableHtml += `<td style="border:1px solid #E5E7EB; padding:0.75rem 1rem; color:#374151;">Row ${dataRowIdx} Col ${c}</td>`;
                }
            }
            tableHtml += '</tr>';
        }
        tableHtml += '</tbody></table></div><p><br></p>';

        quill.clipboard.dangerouslyPasteHTML(range ? range.index : 0, tableHtml);
        setTableModal({ visible: false });
    };

    const handleDeleteTable = () => {
        if (activeTable?.node) {
            const wrapper = activeTable.node.closest('.table-responsive-wrapper') || activeTable.node;
            wrapper.remove();
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

    const handleDeleteRow = () => {
        if (activeTable?.node) {
            const table = activeTable.node;
            const tbody = table.querySelector('tbody') || table;
            const rows = tbody.querySelectorAll('tr');
            if (rows.length > 1) {
                rows[rows.length - 1].remove();
                const quill = quillRef.current?.getEditor();
                if (quill) {
                    quill.update();
                    onChange(quill.root.innerHTML);
                }
            } else {
                handleDeleteTable();
            }
        }
    };

    const handleAddColumn = () => {
        if (activeTable?.node) {
            const table = activeTable.node;
            const rows = table.querySelectorAll('tr');
            rows.forEach((tr, idx) => {
                const firstCell = tr.children[0];
                const isHeaderRow = firstCell && (firstCell.tagName === 'TH' || firstCell.style.fontWeight === '700' || firstCell.style.backgroundColor?.includes('249'));
                const cell = document.createElement(isHeaderRow ? 'th' : 'td');
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

    const handleDeleteColumn = () => {
        if (activeTable?.node) {
            const table = activeTable.node;
            const rows = table.querySelectorAll('tr');
            if (rows.length > 0 && rows[0].children.length > 1) {
                rows.forEach(tr => {
                    if (tr.lastElementChild) tr.lastElementChild.remove();
                });
                const quill = quillRef.current?.getEditor();
                if (quill) {
                    quill.update();
                    onChange(quill.root.innerHTML);
                }
            }
        }
    };

    const handleToggleHeader = () => {
        if (activeTable?.node) {
            const table = activeTable.node;
            const rows = table.querySelectorAll('tr');
            if (rows.length > 0) {
                const firstRow = rows[0];
                const cells = Array.from(firstRow.children);
                const isCurrentlyHeader = cells.some(c => c.tagName === 'TH' || c.style.fontWeight === '700');
                
                cells.forEach(c => {
                    if (isCurrentlyHeader) {
                        c.style.backgroundColor = '';
                        c.style.fontWeight = 'normal';
                        c.style.color = '#374151';
                    } else {
                        c.style.backgroundColor = '#F9FAFB';
                        c.style.fontWeight = '700';
                        c.style.color = '#111827';
                    }
                });

                const quill = quillRef.current?.getEditor();
                if (quill) {
                    quill.update();
                    onChange(quill.root.innerHTML);
                }
            }
        }
    };

    const handleBoldCell = () => {
        if (activeTable?.node) {
            const sel = window.getSelection();
            if (sel && sel.rangeCount > 0 && !sel.isCollapsed && activeTable.node.contains(sel.anchorNode)) {
                document.execCommand('bold', false, null);
            } else {
                const cells = activeTable.node.querySelectorAll('td, th');
                const anyNotBold = Array.from(cells).some(c => c.style.fontWeight !== '700');
                cells.forEach(c => {
                    c.style.fontWeight = anyNotBold ? '700' : 'normal';
                });
            }
            const quill = quillRef.current?.getEditor();
            if (quill) {
                quill.update();
                if (onChange) onChange(quill.root.innerHTML);
            }
        }
    };

    const handleCellColor = (color) => {
        if (activeTable?.node) {
            const sel = window.getSelection();
            if (sel && sel.rangeCount > 0 && !sel.isCollapsed && activeTable.node.contains(sel.anchorNode)) {
                document.execCommand('foreColor', false, color);
            } else {
                const cells = activeTable.node.querySelectorAll('td, th');
                cells.forEach(c => {
                    c.style.color = color;
                });
            }
            setTableColorPickerOpen(false);
            const quill = quillRef.current?.getEditor();
            if (quill) {
                quill.update();
                if (onChange) onChange(quill.root.innerHTML);
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
            case 'h4': quill.format('header', 4); break;
            case 'callout': setCalloutModal({ visible: true }); break;
            case 'video': setVideoModal({ visible: true }); break;
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

    // Initial one-time normalization for legacy content
    useEffect(() => {
        if (content && content.includes('background-color') && !content.includes('p style="background-color')) {
            const normalized = normalizeBackgroundBoxes(content);
            if (normalized !== content) {
                onChange(normalized);
            }
        }
    }, []);

    return (
        <div className="rich-text-editor-container bg-white rounded-xl shadow-sm border border-gray-200 relative overflow-visible" onKeyDown={handleKeyDown}>
            <ReactQuill
                ref={quillRef}
                theme="snow"
                value={content}
                onChange={onChange}
                modules={modules}
                placeholder="Type your story or paste rich content here..."
                className="min-h-[800px] text-lg flex-1 flex flex-col"
            />

            {/* Editor Stats / Hints Footer */}
            <div className="bg-slate-50 border-t border-gray-200 px-4 py-2 flex flex-wrap items-center justify-between gap-3 text-xs text-gray-500 select-none">
                <div className="flex items-center gap-4">
                    <span>Words: <strong className="text-gray-800 font-semibold">{wordCount}</strong></span>
                    <span>Characters: <strong className="text-gray-800 font-semibold">{charCount}</strong></span>
                    <span className="hidden sm:inline-flex items-center gap-1">
                        Est. Reading: <strong className="text-gray-800 font-semibold">{Math.max(1, Math.ceil(wordCount / 200))} min</strong>
                    </span>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-gray-400">
                    <span className="px-1.5 py-0.5 bg-gray-200/80 text-gray-700 rounded font-mono font-bold">/</span>
                    <span>Type slash anywhere in editor for quick blocks</span>
                </div>
            </div>

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
                initialColor={linkModal.initialColor}
                onCancel={() => setLinkModal({ visible: false, range: null, initialText: '', initialUrl: '', initialNewTab: false, initialColor: '' })}
                onSubmit={handleLinkSubmit}
            />

            <ImageSettingsModal
                visible={imageModal.visible}
                initialAlt={imageModal.initialAlt}
                initialWidth={imageModal.initialWidth}
                initialAlign={imageModal.initialAlign}
                initialCaption={imageModal.initialCaption}
                onCancel={() => setImageModal({ visible: false, imgNode: null, initialAlt: '', initialWidth: '', initialAlign: '', initialCaption: '' })}
                onSubmit={handleImageSubmit}
            />

            <TableModal
                visible={tableModal.visible}
                onCancel={() => setTableModal({ visible: false })}
                onSubmit={handleTableSubmit}
            />

            <CalloutModal
                visible={calloutModal.visible}
                onCancel={() => setCalloutModal({ visible: false })}
                onSubmit={handleCalloutSubmit}
            />

            <VideoEmbedModal
                visible={videoModal.visible}
                onCancel={() => setVideoModal({ visible: false })}
                onSubmit={handleVideoSubmit}
            />

            {activeTable && (
                <div 
                    className="table-floating-toolbar absolute z-[999] bg-white/95 backdrop-blur-sm rounded-xl shadow-xl border border-gray-200/90 p-1.5 flex items-center gap-1.5 animate-in fade-in zoom-in-95 duration-100 flex-wrap"
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
                        title="Add Row Below"
                    >
                        + Row
                    </button>

                    <button
                        type="button"
                        onClick={handleDeleteRow}
                        className="flex items-center gap-1 px-2 py-1 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg text-xs font-semibold transition-colors border border-gray-200"
                        title="Delete Last Row"
                    >
                        - Row
                    </button>

                    <div className="h-4 w-px bg-gray-200" />

                    <button
                        type="button"
                        onClick={handleAddColumn}
                        className="flex items-center gap-1 px-2.5 py-1 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg text-xs font-semibold transition-colors border border-gray-200"
                        title="Add Column Right"
                    >
                        + Col
                    </button>

                    <button
                        type="button"
                        onClick={handleDeleteColumn}
                        className="flex items-center gap-1 px-2 py-1 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg text-xs font-semibold transition-colors border border-gray-200"
                        title="Delete Last Column"
                    >
                        - Col
                    </button>

                    <div className="h-4 w-px bg-gray-200" />

                    <button
                        type="button"
                        onClick={handleToggleHeader}
                        className="flex items-center gap-1 px-2.5 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-xs font-semibold transition-colors border border-blue-200"
                        title="Toggle Header Row"
                    >
                        Header
                    </button>

                    <button
                        type="button"
                        onClick={handleBoldCell}
                        className="px-2.5 py-1 bg-gray-50 hover:bg-gray-100 text-gray-800 rounded-lg text-xs font-bold transition-colors border border-gray-200"
                        title="Toggle Bold for Cell or Selection"
                    >
                        B
                    </button>

                    <div className="relative">
                        <button
                            type="button"
                            onClick={() => setTableColorPickerOpen(!tableColorPickerOpen)}
                            className="flex items-center gap-1 px-2 py-1 bg-gray-50 hover:bg-gray-100 text-gray-800 rounded-lg text-xs font-semibold transition-colors border border-gray-200"
                            title="Set Text Color in Table"
                        >
                            <span className="font-bold underline text-blue-600">A</span>
                            <span className="text-[9px]">▼</span>
                        </button>
                        {tableColorPickerOpen && (
                            <div className="absolute left-0 bottom-full mb-1.5 bg-white border border-gray-200 rounded-xl shadow-2xl p-2 flex items-center gap-1.5 z-[10002]">
                                {['#111827', '#DC2626', '#EA580C', '#059669', '#2563EB', '#7C3AED'].map(c => (
                                    <button
                                        key={c}
                                        type="button"
                                        onClick={() => handleCellColor(c)}
                                        style={{ backgroundColor: c }}
                                        className="w-5 h-5 rounded-full border border-gray-300 hover:scale-110 transition-transform"
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="h-4 w-px bg-gray-200" />

                    <button
                        type="button"
                        onClick={handleDeleteTable}
                        className="flex items-center gap-1.5 px-2.5 py-1 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg text-xs font-bold transition-all border border-rose-200/60 shadow-sm"
                        title="Delete Entire Table"
                    >
                        <Trash2 size={13} />
                        Delete
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
                    min-height: 900px;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    position: relative;
                }

                /* Fixed & Sticky Top Toolbar Bar in Navbar Position */
                .rich-text-editor-container .ql-toolbar.ql-snow {
                    background-color: #0F172A !important;
                    border: none !important;
                    border-bottom: 1px solid #1E293B !important;
                    padding: 0.65rem 0.85rem !important;
                    display: flex;
                    flex-wrap: wrap;
                    align-items: center;
                    gap: 0.35rem;
                    position: sticky !important;
                    top: 0 !important;
                    z-index: 50 !important;
                    border-top-left-radius: 0.9rem;
                    border-top-right-radius: 0.9rem;
                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.25) !important;
                }

                /* Toolbar Group Capsules */
                .rich-text-editor-container .ql-snow .ql-formats {
                    margin-right: 0.35rem !important;
                    padding: 2px 4px !important;
                    background: rgba(255, 255, 255, 0.05) !important;
                    border: 1px solid rgba(255, 255, 255, 0.08) !important;
                    border-radius: 8px !important;
                    display: inline-flex !important;
                    align-items: center !important;
                    gap: 2px !important;
                }

                .rich-text-editor-container .ql-snow button {
                    width: 28px !important;
                    height: 28px !important;
                    border-radius: 6px !important;
                    display: flex !important;
                    align-items: center !important;
                    justify-content: center !important;
                    transition: all 0.15s ease !important;
                }

                .rich-text-editor-container .ql-snow button:hover {
                    background: rgba(255, 255, 255, 0.12) !important;
                }

                .rich-text-editor-container .ql-snow button.ql-active {
                    background: rgba(59, 130, 246, 0.25) !important;
                }

                .rich-text-editor-container .ql-container.ql-snow {
                    border: none !important;
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    min-height: 800px;
                }

                .rich-text-editor-container .ql-editor {
                    flex: 1;
                    min-height: 800px;
                    padding: 2rem 2.5rem;
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
                .rich-text-editor-container .ql-snow button {
                    color: #E2E8F0 !important;
                }
                .rich-text-editor-container .ql-snow button svg {
                    color: #E2E8F0 !important;
                }
                .rich-text-editor-container .ql-snow .ql-stroke {
                    stroke: #E2E8F0 !important;
                }
                .rich-text-editor-container .ql-snow .ql-fill {
                    fill: #E2E8F0 !important;
                }
                .rich-text-editor-container .ql-snow button.ql-undo svg *,
                .rich-text-editor-container .ql-snow button.ql-redo svg *,
                .rich-text-editor-container .ql-snow button.ql-table-insert svg *,
                .rich-text-editor-container .ql-snow button.ql-callout-insert svg * {
                    stroke: #E2E8F0 !important;
                }
                .rich-text-editor-container .ql-snow button:hover,
                .rich-text-editor-container .ql-snow button:hover svg {
                    color: #60A5FA !important;
                }
                .rich-text-editor-container .ql-snow button:hover .ql-stroke,
                .rich-text-editor-container .ql-snow .ql-active .ql-stroke,
                .rich-text-editor-container .ql-snow button:hover.ql-undo svg *,
                .rich-text-editor-container .ql-snow button:hover.ql-redo svg *,
                .rich-text-editor-container .ql-snow button:hover.ql-table-insert svg *,
                .rich-text-editor-container .ql-snow button:hover.ql-callout-insert svg * {
                    stroke: #60A5FA !important;
                }
                .rich-text-editor-container .ql-snow button:hover .ql-fill,
                .rich-text-editor-container .ql-snow .ql-active .ql-fill {
                    fill: #60A5FA !important;
                }
                .rich-text-editor-container .ql-snow .ql-picker {
                    color: #E2E8F0 !important;
                }

                /* Header picker neat dropdown styling */
                .rich-text-editor-container .ql-snow .ql-header.ql-picker {
                    width: 125px !important;
                    height: 28px !important;
                    border-radius: 6px !important;
                    background: rgba(255, 255, 255, 0.05) !important;
                    color: #F1F5F9 !important;
                }

                .rich-text-editor-container .ql-snow .ql-header .ql-picker-label {
                    padding: 4px 8px !important;
                    font-size: 12px !important;
                    font-weight: 600 !important;
                }

                .rich-text-editor-container .ql-snow .ql-header .ql-picker-label::before {
                    content: 'Paragraph' !important;
                }
                .rich-text-editor-container .ql-snow .ql-header .ql-picker-label[data-value="1"]::before {
                    content: 'Heading 1' !important;
                }
                .rich-text-editor-container .ql-snow .ql-header .ql-picker-label[data-value="2"]::before {
                    content: 'Heading 2' !important;
                }
                .rich-text-editor-container .ql-snow .ql-header .ql-picker-label[data-value="3"]::before {
                    content: 'Heading 3' !important;
                }
                .rich-text-editor-container .ql-snow .ql-header .ql-picker-label[data-value="4"]::before {
                    content: 'Heading 4' !important;
                }

                .rich-text-editor-container .ql-snow .ql-header .ql-picker-item[data-value="1"]::before {
                    content: 'Heading 1' !important;
                    font-size: 15px !important;
                    font-weight: 700 !important;
                }
                .rich-text-editor-container .ql-snow .ql-header .ql-picker-item[data-value="2"]::before {
                    content: 'Heading 2' !important;
                    font-size: 14px !important;
                    font-weight: 700 !important;
                }
                .rich-text-editor-container .ql-snow .ql-header .ql-picker-item[data-value="3"]::before {
                    content: 'Heading 3' !important;
                    font-size: 13px !important;
                    font-weight: 600 !important;
                }
                .rich-text-editor-container .ql-snow .ql-header .ql-picker-item[data-value="4"]::before {
                    content: 'Heading 4' !important;
                    font-size: 12px !important;
                    font-weight: 600 !important;
                }
                .rich-text-editor-container .ql-snow .ql-header .ql-picker-item:not([data-value])::before {
                    content: 'Normal (Paragraph)' !important;
                    font-size: 12px !important;
                    font-weight: 400 !important;
                }

                /* Toolbar Dropdown Popovers */
                .rich-text-editor-container .ql-snow .ql-picker-options {
                    background-color: #0F172A !important;
                    border: 1px solid #334155 !important;
                    border-radius: 8px !important;
                    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5) !important;
                    padding: 8px !important;
                    z-index: 10005 !important;
                }

                /* Color & Background Picker Swatches - Only when expanded */
                .rich-text-editor-container .ql-snow .ql-color-picker.ql-expanded .ql-picker-options,
                .rich-text-editor-container .ql-snow .ql-icon-picker.ql-expanded .ql-picker-options {
                    display: flex !important;
                    flex-wrap: wrap !important;
                    gap: 5px !important;
                    width: 190px !important;
                }

                .rich-text-editor-container .ql-snow .ql-color-picker .ql-picker-item,
                .rich-text-editor-container .ql-snow .ql-background .ql-picker-item {
                    width: 22px !important;
                    height: 22px !important;
                    border-radius: 4px !important;
                    padding: 0 !important;
                    border: 1px solid rgba(255, 255, 255, 0.2) !important;
                }

                /* Style transparent / Remove Background swatch in background picker */
                .ql-background .ql-picker-item[data-value="transparent"],
                .ql-background .ql-picker-item:first-child {
                    background-color: #FFFFFF !important;
                    position: relative !important;
                    border: 1.5px dashed #DC2626 !important;
                }
                .ql-background .ql-picker-item[data-value="transparent"]::after,
                .ql-background .ql-picker-item:first-child::after {
                    content: "" !important;
                    position: absolute !important;
                    top: 50% !important;
                    left: 15% !important;
                    right: 15% !important;
                    height: 2px !important;
                    background-color: #DC2626 !important;
                    transform: rotate(-45deg) !important;
                }

                /* WordPress-Style Text Background Box Containers */
                .ql-editor p[style*="background-color"],
                .ql-editor h1[style*="background-color"],
                .ql-editor h2[style*="background-color"],
                .ql-editor h3[style*="background-color"],
                .ql-editor h4[style*="background-color"],
                .ql-editor blockquote[style*="background-color"] {
                    display: block !important;
                    padding: 1.25rem 1.75rem !important;
                    border-radius: 0.75rem !important;
                    margin: 1.25rem 0 1.5rem !important;
                    line-height: 1.8 !important;
                    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04) !important;
                    box-sizing: border-box !important;
                }

                /* Fallback: If paragraph text is wrapped in a background span */
                .ql-editor p > span[style*="background-color"]:only-child {
                    display: block !important;
                    padding: 1.25rem 1.75rem !important;
                    border-radius: 0.75rem !important;
                    margin: 0.5rem 0 !important;
                    line-height: 1.8 !important;
                    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04) !important;
                    box-sizing: border-box !important;
                }

                /* Partial text / inline highlight (smooth pill with no broken line gaps) */
                .ql-editor span[style*="background-color"]:not(:only-child) {
                    display: inline !important;
                    padding: 0.18em 0.45em !important;
                    border-radius: 0.35rem !important;
                    -webkit-box-decoration-break: clone !important;
                    box-decoration-break: clone !important;
                    line-height: 1.8 !important;
                }

                /* Headings & Paragraph Color Inheritance */
                .ql-editor h1 { font-size: 2.5em; font-weight: 800; margin-top: 1em; margin-bottom: 0.5em; color: inherit; }
                .ql-editor h2 { font-size: 2em; font-weight: 700; margin-top: 1em; margin-bottom: 0.5em; color: inherit; }
                .ql-editor h3 { font-size: 1.6em; font-weight: 600; margin-top: 1em; margin-bottom: 0.5em; color: inherit; }
                .ql-editor h4 { font-size: 1.25em; font-weight: 600; margin-top: 0.8em; margin-bottom: 0.4em; color: inherit; }
                .ql-editor p { color: inherit; }

                /* Text Color Works Whether Bold or Normal */
                .ql-editor strong, .ql-editor b {
                    font-weight: 700 !important;
                }
                .ql-editor strong:not([style*="color"]), .ql-editor b:not([style*="color"]) {
                    color: inherit;
                }

                /* Links Color and Styling */
                .ql-editor a:not([style*="color"]) {
                    color: #2563EB;
                }
                .ql-editor a {
                    text-decoration: underline;
                    text-underline-offset: 3px;
                }
                .ql-editor a[style*="color"] strong, .ql-editor a[style*="color"] b {
                    color: inherit !important;
                }
                .ql-editor strong a:not([style*="color"]), .ql-editor b a:not([style*="color"]) {
                    color: inherit;
                }
                
                /* Alignment Classes */
                .ql-editor .ql-align-center { text-align: center; }
                .ql-editor .ql-align-right { text-align: right; }
                .ql-editor .ql-align-justify { text-align: justify; }

                /* Indent Classes - Paragraphs & Headings */
                .ql-editor p.ql-indent-1, .ql-editor h1.ql-indent-1, .ql-editor h2.ql-indent-1, .ql-editor h3.ql-indent-1, .ql-editor h4.ql-indent-1 { padding-left: 2rem !important; }
                .ql-editor p.ql-indent-2, .ql-editor h1.ql-indent-2, .ql-editor h2.ql-indent-2, .ql-editor h3.ql-indent-2, .ql-editor h4.ql-indent-2 { padding-left: 4rem !important; }
                .ql-editor p.ql-indent-3 { padding-left: 6rem !important; }
                .ql-editor p.ql-indent-4 { padding-left: 8rem !important; }

                /* Indent Classes - Bullet Lists & Numbered Lists (Preserve bullet point position) */
                .ql-editor li.ql-indent-1:not(.ql-direction-rtl) { padding-left: 3em !important; }
                .ql-editor li.ql-indent-2:not(.ql-direction-rtl) { padding-left: 6em !important; }
                .ql-editor li.ql-indent-3:not(.ql-direction-rtl) { padding-left: 9em !important; }
                .ql-editor li.ql-indent-4:not(.ql-direction-rtl) { padding-left: 12em !important; }

                /* Callout Block inside Editor */
                .ql-editor .blog-callout {
                    border-radius: 0.75rem;
                    padding: 1.25rem 1.5rem;
                    margin: 1.75rem 0;
                    box-shadow: 0 1px 3px rgba(0,0,0,0.04);
                }

                /* Responsive Video Embeds */
                .ql-editor .video-container {
                    position: relative;
                    padding-bottom: 56.25%;
                    height: 0;
                    overflow: hidden;
                    border-radius: 1rem;
                    margin: 2rem 0;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.08);
                }
                .ql-editor .video-container iframe {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    border: none;
                    border-radius: 1rem;
                }

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
                
                /* Styled Quote / Blockquote */
                .ql-editor blockquote { 
                    border-left: 4px solid #3B82F6 !important;
                    border-radius: 0.5rem; 
                    padding: 1.25rem 1.5rem; 
                    margin: 1.5rem 0; 
                    font-style: italic; 
                    box-shadow: 0 1px 3px rgba(0,0,0,0.04); 
                }
                .ql-editor blockquote:not([style*="background-color"]) {
                    background-color: #EFF6FF;
                }
                .ql-editor blockquote:not([style*="color"]) {
                    color: #1E293B;
                }

                /* Styled Tables */
                .ql-editor .table-responsive-wrapper {
                    overflow-x: auto;
                    -webkit-overflow-scrolling: touch;
                    width: 100%;
                    margin: 1.5rem 0;
                }
                .ql-editor table { 
                    width: 100%; 
                    border-collapse: collapse; 
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
