import { useState, useEffect, useRef } from 'react';
import { Heading1, Heading2, Heading3, Image as ImageIcon, X, List, Quote, Bold, Italic, Link as LinkIcon, Underline } from 'lucide-react';

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
        { id: 'ul', label: 'Bullet List', icon: List, desc: 'Create a simple list' },
        { id: 'blockquote', label: 'Quote', icon: Quote, desc: 'Capture a quote' },
    ];

    return (
        <div
            ref={menuRef}
            className="fixed bg-white shadow-xl border border-gray-200 rounded-lg overflow-hidden z-50 w-72 animate-in fade-in zoom-in-95 duration-100"
            style={{
                top: position.top + 24,
                left: position.left
            }}
        >
            <div className="text-xs font-semibold text-gray-500 bg-gray-50 px-3 py-2 border-b border-gray-100">
                BASIC BLOCKS
            </div>
            <div className="py-1">
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

const FloatingToolbar = ({ position, onAction }) => {
    if (!position) return null;

    const items = [
        { id: 'bold', icon: Bold },
        { id: 'italic', icon: Italic },
        { id: 'underline', icon: Underline },
        { id: 'h2', icon: Heading2 },
        { id: 'link', icon: LinkIcon },
    ];

    return (
        <div
            className="fixed bg-gray-900 shadow-xl rounded-lg overflow-hidden z-50 flex items-center p-1 animate-in fade-in zoom-in-95 duration-100"
            style={{
                top: position.top - 50,
                left: position.left
            }}
            onMouseDown={(e) => e.preventDefault()} // Prevent losing focus
        >
            {items.map((item) => (
                <button
                    key={item.id}
                    onClick={() => onAction(item.id)}
                    className="p-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded transition-colors"
                >
                    <item.icon size={18} />
                </button>
            ))}
        </div>
    );
};

const SlashEditor = ({ content, onChange, onImageUpload }) => {
    const editorRef = useRef(null);
    const [menuState, setMenuState] = useState({ visible: false, position: null });
    const [toolbarState, setToolbarState] = useState({ visible: false, position: null });
    const fileInputRef = useRef(null);

    // Initial content load
    useEffect(() => {
        if (editorRef.current && content && editorRef.current.innerHTML !== content) {
            if (editorRef.current.innerHTML === '') {
                editorRef.current.innerHTML = content;
            }
        }
    }, []);

    // Selection detection logic
    useEffect(() => {
        const handleSelectionChange = () => {
            const selection = window.getSelection();
            if (!selection || selection.rangeCount === 0 || selection.isCollapsed) {
                setToolbarState({ visible: false, position: null });
                return;
            }

            const range = selection.getRangeAt(0);
            const rect = range.getBoundingClientRect();

            // Check if selection is within editor
            if (editorRef.current.contains(range.commonAncestorContainer)) {
                setToolbarState({
                    visible: true,
                    position: { top: rect.top, left: rect.left + (rect.width / 2) - 100 } // Center it roughly
                });
            } else {
                setToolbarState({ visible: false, position: null });
            }
        };

        document.addEventListener('selectionchange', handleSelectionChange);
        return () => document.removeEventListener('selectionchange', handleSelectionChange);
    }, []);

    const handleInput = (e) => {
        onChange(editorRef.current.innerHTML);

        // Slash menu detection
        const selection = window.getSelection();
        if (!selection.rangeCount) return;

        const range = selection.getRangeAt(0);

        if (e.nativeEvent.data === '/') {
            const rect = range.getBoundingClientRect();
            setMenuState({
                visible: true,
                position: { top: rect.top, left: rect.left }
            });
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            document.execCommand('defaultParagraphSeparator', false, 'p');
        }
        if (menuState.visible && e.key !== '/' && e.key.length === 1) {
            if (e.key === ' ') setMenuState({ ...menuState, visible: false });
        }
    };

    const executeCommand = async (command) => {
        setMenuState({ ...menuState, visible: false });

        // Slash menu commands often assume we need to delete the slash first
        // But for consistency let's just delete the slash if it was a slash command that triggered this
        // This logic is tricky without proper state, but simpler:
        // Assume slash was the last char typed.
        if (menuState.visible) {
            document.execCommand('delete');
        }

        if (command === 'h1') document.execCommand('formatBlock', false, 'h1');
        if (command === 'h2') document.execCommand('formatBlock', false, 'h2');
        if (command === 'h3') document.execCommand('formatBlock', false, 'h3');
        if (command === 'ul') document.execCommand('insertUnorderedList');
        if (command === 'blockquote') document.execCommand('formatBlock', false, 'blockquote');

        if (command === 'image') {
            fileInputRef.current?.click();
        }

        editorRef.current.focus();
    };

    const executeToolbarAction = (action) => {
        if (action === 'bold') document.execCommand('bold');
        if (action === 'italic') document.execCommand('italic');
        if (action === 'underline') document.execCommand('underline');
        if (action === 'h2') document.execCommand('formatBlock', false, 'h2');
        if (action === 'link') {
            const url = prompt("Enter Link URL:");
            if (url) document.execCommand('createLink', false, url);
        }
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (file && onImageUpload) {
            try {
                document.execCommand('insertHTML', false, '<p id="uploading-placeholder" class="text-gray-400 italic">Uploading image...</p>');
                const url = await onImageUpload(file);
                const placeholder = editorRef.current.querySelector('#uploading-placeholder');
                if (placeholder) placeholder.remove();
                if (url) {
                    document.execCommand('insertImage', false, url);
                    document.execCommand('insertHTML', false, '<br>');
                }
            } catch (err) {
                console.error("Upload failed", err);
                alert("Upload failed");
            }
        }
    };

    return (
        <div className="relative">
            <style>{`
                .prose h1 { font-size: 2.25em; font-weight: 800; margin-top: 0.8em; margin-bottom: 0.4em; color: #111827; }
                .prose h2 { font-size: 1.5em; font-weight: 700; margin-top: 0.8em; margin-bottom: 0.4em; color: #1f2937; }
                .prose h3 { font-size: 1.25em; font-weight: 600; margin-top: 0.6em; margin-bottom: 0.2em; color: #374151; }
                .prose p { margin-bottom: 0.8em; line-height: 1.6; color: #4b5563; }
                .prose img { max-width: 100%; border-radius: 0.5rem; margin: 1em 0; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); }
                .prose ul { list-style-type: disc; padding-left: 1.5em; margin-bottom: 0.8em; }
                .prose blockquote { border-left: 4px solid #e5e7eb; padding-left: 1em; font-style: italic; color: #6b7280; }
                .prose a { color: #2563EB; text-decoration: underline; }
                .prose:focus { outline: none; }
            `}</style>

            <div
                ref={editorRef}
                className="w-full min-h-[500px] p-6 text-lg text-gray-700 outline-none prose max-w-none"
                contentEditable
                onInput={handleInput}
                onKeyDown={handleKeyDown}
                placeholder="Type '/' for commands..."
            />

            {menuState.visible && (
                <SlashMenu
                    position={menuState.position}
                    onSelect={executeCommand}
                    onClose={() => setMenuState({ ...menuState, visible: false })}
                />
            )}

            {toolbarState.visible && (
                <FloatingToolbar
                    position={toolbarState.position}
                    onAction={executeToolbarAction}
                />
            )}

            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
            />
        </div>
    );
};

export default SlashEditor;
