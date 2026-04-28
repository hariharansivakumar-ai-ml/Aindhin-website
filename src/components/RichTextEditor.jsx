import { useState, useRef, useMemo, useEffect } from 'react';
import ReactQuill, { Quill } from 'react-quill-new';
import 'react-quill-new/dist/quill.bubble.css';
import { Heading1, Heading2, Heading3, Image as ImageIcon, List, Quote, CheckSquare, Code, X, Link as LinkIcon, ExternalLink } from 'lucide-react';

// --- Custom Link Blot to support target="_blank" ---
const Link = Quill.import('formats/link');
class CustomLink extends Link {
    static create(value) {
        let node = super.create(value.url || value);
        if (value.target) {
            node.setAttribute('target', '_blank');
            node.setAttribute('rel', 'noopener noreferrer');
        } else {
            node.removeAttribute('target');
            node.removeAttribute('rel');
        }
        return node;
    }
    static formats(node) {
        return {
            url: node.getAttribute('href'),
            target: node.getAttribute('target') === '_blank'
        };
    }
}
Quill.register(CustomLink, true);

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
        { id: 'blockquote', label: 'Quote', icon: Quote, desc: 'Capture a quote' },
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
const LinkModal = ({ visible, initialText, onCancel, onSubmit }) => {
    const [url, setUrl] = useState('');
    const [text, setText] = useState(initialText || '');
    const [newTab, setNewTab] = useState(false);

    useEffect(() => {
        if (visible) {
            setText(initialText || '');
            setUrl('');
            setNewTab(false);
        }
    }, [visible, initialText]);

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

// --- Main Editor Component ---
const RichTextEditor = ({ content, onChange, onImageUpload }) => {
    const quillRef = useRef(null);
    const onImageUploadRef = useRef(onImageUpload);
    const [slashMenu, setSlashMenu] = useState({ visible: false, position: null });
    const [linkModal, setLinkModal] = useState({ visible: false, range: null, initialText: '' });

    useEffect(() => {
        onImageUploadRef.current = onImageUpload;
    }, [onImageUpload]);

    // Custom Key Bindings
    const modules = useMemo(() => ({
        toolbar: {
            container: [
                ['bold', 'italic', 'underline', 'strike'],
                [{ 'header': [1, 2, 3, false] }],
                [{ 'color': [] }, { 'background': [] }],
                [{ 'align': [] }],
                ['link', 'image', 'video'],
                ['clean']
            ],
            handlers: {
                link: function(value) {
                    if (value) {
                        const quill = this.quill;
                        const range = quill.getSelection();
                        if (range) {
                            const selectedText = quill.getText(range.index, range.length);
                            setLinkModal({
                                visible: true,
                                range: range,
                                initialText: selectedText
                            });
                        }
                    } else {
                        this.quill.format('link', false);
                    }
                }
            }
        }
    }), []);

    const handleLinkSubmit = ({ url, text, newTab }) => {
        const quill = quillRef.current.getEditor();
        const range = linkModal.range;
        
        if (range) {
            // Restore selection
            quill.setSelection(range.index, range.length);
            
            // If user edited the text, replace it
            if (text !== linkModal.initialText) {
                quill.deleteText(range.index, range.length);
                quill.insertText(range.index, text, {
                    link: { url, target: newTab }
                });
            } else {
                quill.format('link', { url, target: newTab });
            }
        }
        setLinkModal({ visible: false, range: null, initialText: '' });
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
        <div className="rich-text-editor-container bg-white rounded-lg relative" onKeyDown={handleKeyDown}>
            <ReactQuill
                ref={quillRef}
                theme="bubble"
                value={content}
                onChange={onChange}
                modules={modules}
                placeholder="Type something..."
                className="min-h-[600px] text-lg"
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
                onCancel={() => setLinkModal({ visible: false, range: null, initialText: '' })}
                onSubmit={handleLinkSubmit}
            />

            <style>{`
                .rich-text-editor-container .ql-editor {
                    height: 600px;
                    overflow-y: auto;
                    padding: 2rem;
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
                .ql-tooltip.ql-bubble {
                    background-color: #1F2937 !important;
                    border-radius: 8px !important;
                    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1) !important;
                    padding: 8px 12px !important;
                    z-index: 10000 !important;
                }
                /* Hide the default link input in bubble theme */
                .ql-bubble .ql-tooltip.ql-editing {
                    display: none !important;
                }
                .ql-bubble .ql-toolbar .ql-formats {
                    margin-right: 12px;
                }
                .ql-bubble .ql-stroke {
                    stroke: #E5E7EB !important;
                }
                .ql-bubble .ql-fill {
                    fill: #E5E7EB !important;
                }
                .ql-bubble .ql-active .ql-stroke {
                    stroke: #60A5FA !important;
                }
                .ql-bubble .ql-active .ql-fill {
                    fill: #60A5FA !important;
                }
                .ql-tooltip::-webkit-scrollbar {
                    display: none;
                }
                .ql-editor h1 { font-size: 2.5em; font-weight: 800; margin-top: 1em; margin-bottom: 0.5em; }
                .ql-editor h2 { font-size: 2em; font-weight: 700; margin-top: 1em; margin-bottom: 0.5em; }
                .ql-editor h3 { font-size: 1.75em; font-weight: 600; margin-top: 1em; margin-bottom: 0.5em; }
                .ql-editor img { border-radius: 0.5rem; margin: 1.5rem 0; max-width: 100%; }
                .ql-editor blockquote { border-left: 4px solid #E5E7EB; padding-left: 1rem; color: #6B7280; font-style: italic; }
            `}</style>
        </div>
    );
};

export default RichTextEditor;

