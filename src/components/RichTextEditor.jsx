import { useState, useRef, useMemo, useEffect } from 'react';
import ReactQuill, { Quill } from 'react-quill-new';
import 'react-quill-new/dist/quill.bubble.css';
import { Heading1, Heading2, Heading3, Image as ImageIcon, List, Quote, CheckSquare, Code, X } from 'lucide-react';

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

// --- Main Editor Component ---
const RichTextEditor = ({ content, onChange, onImageUpload }) => {
    const quillRef = useRef(null);
    const onImageUploadRef = useRef(onImageUpload);
    const [slashMenu, setSlashMenu] = useState({ visible: false, position: null });

    useEffect(() => {
        onImageUploadRef.current = onImageUpload;
    }, [onImageUpload]);

    // Custom Key Bindings
    const modules = useMemo(() => ({
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'header': [1, 2, 3, false] }],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'align': [] }],
            ['link', 'image', 'video'],
            ['clean']
        ],
    }), []);

    // Handle Slash Command Detection
    const handleKeyDown = (e) => {
        if (e.key === '/') {
            // We initiate the check slightly after the key press so the slash is in the DOM
            setTimeout(() => {
                try {
                    const quill = quillRef.current.getEditor();
                    const selection = quill.getSelection();
                    if (selection) {
                        const bounds = quill.getBounds(selection.index);
                        // Adjust bounds to be relative to viewport
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
            // Hide menu if user types something else
            if (slashMenu.visible) setSlashMenu({ ...slashMenu, visible: false });
        }
    };

    const handleSlashCommand = async (command) => {
        setSlashMenu({ ...slashMenu, visible: false });
        const quill = quillRef.current.getEditor();
        const selection = quill.getSelection();
        if (!selection) return;

        // Delete the '/' character. It should be at index - 1
        // We need to be careful. We assume the cursor is right after '/'. 
        // Let's check if the character before cursor is indeed '/'
        const textBefore = quill.getText(selection.index - 1, 1);
        if (textBefore === '/') {
            quill.deleteText(selection.index - 1, 1);
        }

        // Execute Command
        switch (command) {
            case 'h1':
                quill.format('header', 1);
                break;
            case 'h2':
                quill.format('header', 2);
                break;
            case 'h3':
                quill.format('header', 3);
                break;
            case 'list-ul':
                quill.format('list', 'bullet');
                break;
            case 'list-ol':
                quill.format('list', 'ordered');
                break;
            case 'blockquote':
                quill.format('blockquote', true);
                break;
            case 'code-block':
                quill.format('code-block', true);
                break;
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
                            if (url) quill.insertEmbed(selection.index - 1, 'image', url); // -1 because we deleted slash
                        } catch (e) {
                            console.error('Image upload failed');
                        }
                    }
                };
                break;
            default:
                break;
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

            <style>{`
                .rich-text-editor-container .ql-editor {
                    height: 600px;
                    overflow-y: auto;
                    padding: 2rem;
                    font-family: 'Inter', sans-serif;
                    line-height: 1.8;
                    font-size: 1.125rem; /* 18px */
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
                /* Bubble Tooltip Customization */
                .ql-tooltip.ql-bubble {
                    background-color: #1F2937 !important; /* Dark gray */
                    border-radius: 8px !important;
                    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1) !important;
                    padding: 8px 12px !important;
                }
                .ql-bubble .ql-toolbar .ql-formats {
                    margin-right: 12px;
                }
                .ql-bubble .ql-stroke {
                    stroke: #E5E7EB !important; /* Light gray icons */
                }
                .ql-bubble .ql-fill {
                    fill: #E5E7EB !important;
                }
                .ql-bubble .ql-active .ql-stroke {
                    stroke: #60A5FA !important; /* Blue active */
                }
                .ql-bubble .ql-active .ql-fill {
                    fill: #60A5FA !important;
                }
                /* Hide some scrollbars if they appear */
                .ql-tooltip::-webkit-scrollbar {
                    display: none;
                }
                /* Increase heading sizes for visualization in editor */
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
