import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    MessageSquare, 
    X, 
    ChevronDown, 
    ChevronUp, 
    Send, 
    RefreshCw, 
    Bot, 
    Sparkles,
    User,
    ArrowRight
} from 'lucide-react';

const PRELOADED_CATEGORIES = [
    {
        id: 'courses',
        title: 'Explore Courses 📚',
        questions: [
            {
                q: 'What technical certification courses do you offer?',
                a: 'We offer specialized, career-focused certification courses in AI & Machine Learning, Full Stack Development, Cloud Computing, Cyber Security, Data Analytics, Python, and Java. Each program includes industry projects and hands-on guidance.'
            },
            {
                q: 'Tell me about your University Degree Programs.',
                a: 'Aindhin offers advanced degree courses such as B.A. Economics with Data Analytics, B.Sc. Computer Science with AI & Data Science, BBA (Bachelor of Business Administration), and B.Com (Computer Applications). These combine university syllabus with top-demand tech skills.'
            },
            {
                q: 'What are your Leadership/Corporate programs?',
                a: 'We provide professional leadership development modules like Design Thinking, The People Manager, Strategic Decision Maker, The Team Builder, and The Visionary Leader. Perfect for individuals and corporate teams aiming for management excellence.'
            },
            {
                q: 'Do you have courses for school children?',
                a: 'Yes, we offer the Abacus Mental Math Masterclass! This program is tailor-made for children to boost concentration, numerical accuracy, and overall brain development through structured, fun learning.'
            }
        ]
    },
    {
        id: 'contact',
        title: 'Contact & Locations 📍',
        questions: [
            {
                q: 'Where are Aindhin offices located?',
                a: 'We have two office hubs:\n\n• Head Office: 139, Old Airport Road, Kodihalli, Bengaluru, Karnataka - 560008.\n• Operations Center: No. 8, Manickavasagar Colony, Eraniyan Street, Karur Bypass Road, Erode, Tamil Nadu - 638002.'
            },
            {
                q: 'How can I reach support directly?',
                a: 'You can reach us directly:\n• Phone: +91 8807100669\n• Email: connect@aindhin.com\n• Form: Fill out the contact form on our /contact-us page.'
            }
        ]
    },
    {
        id: 'general',
        title: 'General Information ℹ️',
        questions: [
            {
                q: 'How do online classes work?',
                a: 'Our courses combine live interactive webinars with structured video modules. You will participate in live Q&A, write code in our hands-on sandbox, and complete real-world capstones. Plus, you get lifetime portal access!'
            },
            {
                q: 'Do you offer job placement assistance?',
                a: 'Absolutely! Our Career Assistance program includes resume drafting workshops, LinkedIn profile optimization, mock interview prep, and direct referrals to our network of corporate hiring partners.'
            },
            {
                q: 'Is there an Aindhin Mobile App?',
                a: 'Yes! Download the Aindhin Mobile App from our /download-app page to watch lessons, solve practice exercises, track course progress, and get community support directly on your Android or iOS device.'
            }
        ]
    }
];



export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    const messagesEndRef = useRef(null);

    // Initial Welcome Message
    const initChat = () => {
        setMessages([
            {
                id: 'welcome',
                sender: 'bot',
                text: "Hello! Welcome to Aindhin EdTech. 👋\nI am your digital learning assistant. How can I help you today? Please choose a topic below or type your question.",
                optionsType: 'categories'
            }
        ]);
    };

    useEffect(() => {
        initChat();
    }, []);

    // Auto-scroll to bottom of messages
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, isTyping]);

    const triggerBotResponse = (userText, overrideResponse = null) => {
        setIsTyping(true);
        
        // Dynamic typing speed simulator
        const delay = Math.floor(Math.random() * 300) + 400;

        setTimeout(() => {
            let botReply = "";
            let optionsType = null;
            let categoryId = null;

            if (overrideResponse) {
                botReply = overrideResponse.text;
                optionsType = overrideResponse.optionsType || null;
                categoryId = overrideResponse.categoryId || null;
            } else {
                const query = userText.toLowerCase().trim();

                // Check if user typed or clicked a category title directly
                const matchedCategory = PRELOADED_CATEGORIES.find(
                    cat => cat.title.toLowerCase().includes(query) || cat.id.toLowerCase() === query
                );

                if (matchedCategory) {
                    botReply = `Please select a question about ${matchedCategory.title}:`;
                    optionsType = 'questions';
                    categoryId = matchedCategory.id;
                } else if (query.includes('python') || query.includes('java') || query.includes('full stack') || query.includes('cloud') || query.includes('cyber') || query.includes('security') || query.includes('ml') || query.includes('machine learning')) {
                    botReply = 'We offer high-demand tech certifications in Python, Java, Full Stack Development, Cloud Computing, Cyber Security, and AI & Machine Learning. All certifications come with hand-on assignments, placement guidance, and expert mentorship. Check out our /our-courses page for details!';
                    optionsType = 'back';
                } else if (query.includes('abacus') || query.includes('math') || query.includes('mental math') || query.includes('kids')) {
                    botReply = 'Our Abacus Mental Math Masterclass is designed to improve focus, memory, and calculation speeds in kids. Read more on the /abacus-mental-math-masterclass page!';
                    optionsType = 'back';
                } else if (query.includes('degree') || query.includes('university') || query.includes('bba') || query.includes('bcom') || query.includes('bsc') || query.includes('ba economics')) {
                    botReply = 'Aindhin partners with universities to deliver career-aligned degrees: B.Sc. CS (AI & Data Science), B.A. Economics (Data Analytics), BBA, and B.Com (Computer Applications). Explore them under our /university-courses page.';
                    optionsType = 'back';
                } else if (query.includes('corporate') || query.includes('leadership') || query.includes('manager') || query.includes('communicator') || query.includes('thinking') || query.includes('team builder') || query.includes('visionary')) {
                    botReply = 'We have specialized Corporate and Leadership courses (e.g. Design Thinking, People Manager, Visionary Leader, Effective Communicator) to boost executive skills. Find details at /corporate-courses or /leadership-courses.';
                    optionsType = 'back';
                } else if (query.includes('office') || query.includes('address') || query.includes('location') || query.includes('bengaluru') || query.includes('bangalore') || query.includes('erode') || query.includes('located') || query.includes('where')) {
                    botReply = 'Aindhin operates from two locations:\n\n1. Bengaluru Head Office: 139, Old Airport Road, Kodihalli, Bengaluru, Karnataka - 560008.\n2. Erode Operations Center: No. 8, Manickavasagar Colony, Karur Bypass Road, Erode, Tamil Nadu - 638002.';
                    optionsType = 'back';
                } else if (query.includes('phone') || query.includes('call') || query.includes('mobile') || query.includes('contact') || query.includes('number') || query.includes('email') || query.includes('connect')) {
                    botReply = 'You can contact Aindhin via:\n\n• Phone: +91 8807100669\n• Email: connect@aindhin.com\n• Web Form: /contact-us\n\nFeel free to write to us or call us during business hours!';
                    optionsType = 'back';
                } else if (query.includes('app') || query.includes('download') || query.includes('android') || query.includes('ios')) {
                    botReply = 'Learn on the go with the Aindhin Mobile App! Track lessons, solve quizzes, and chat with peers. Download it from the /download-app page.';
                    optionsType = 'back';
                } else if (query.includes('placement') || query.includes('job') || query.includes('career') || query.includes('work') || query.includes('hire') || query.includes('salary')) {
                    botReply = 'Aindhin includes complete career support (resume workshops, mock interviews, placement referrals) to ensure our learners land jobs. 96% of our graduates complete their goals!';
                    optionsType = 'back';
                } else if (query.includes('fee') || query.includes('price') || query.includes('cost') || query.includes('discount') || query.includes('scholarship')) {
                    botReply = 'Our courses are highly affordable and cost-effective. For detailed fee structures, discounts, or installment plans, please call our advisors at +91 8807100669 or email connect@aindhin.com.';
                    optionsType = 'back';
                } else if (query === 'back to main topics' || query.includes('main topics') || query.includes('back to menu') || query.includes('go back')) {
                    botReply = "How else can I help you today? Please choose a topic below:";
                    optionsType = 'categories';
                } else {
                    // Preloaded questions check matching
                    let foundMatch = false;
                    for (const cat of PRELOADED_CATEGORIES) {
                        for (const qObj of cat.questions) {
                            if (qObj.q.toLowerCase().trim() === query) {
                                botReply = qObj.a;
                                foundMatch = true;
                                break;
                            }
                        }
                        if (foundMatch) break;
                    }

                    if (foundMatch) {
                        optionsType = 'back';
                    } else {
                        botReply = "I'm here to help, but I didn't quite catch that. You can select one of the topics below or reach out to our team directly at connect@aindhin.com / +91 8807100669 for immediate support!";
                        optionsType = 'categories';
                    }
                }
            }

            setMessages(prev => [
                ...prev,
                {
                    id: Date.now().toString(),
                    sender: 'bot',
                    text: botReply,
                    optionsType,
                    categoryId
                }
            ]);
            setIsTyping(false);
        }, delay);
    };

    const handleSendMessage = (e) => {
        if (e) e.preventDefault();
        if (!input.trim()) return;

        const userText = input;
        setMessages(prev => [
            ...prev,
            {
                id: Date.now().toString(),
                sender: 'user',
                text: userText
            }
        ]);
        setInput('');
        triggerBotResponse(userText);
    };

    const handleCategorySelect = (category) => {
        setMessages(prev => [
            ...prev,
            {
                id: Date.now().toString() + '-user',
                sender: 'user',
                text: category.title
            }
        ]);

        triggerBotResponse(category.title, {
            text: `Please select a question about ${category.title}:`,
            optionsType: 'questions',
            categoryId: category.id
        });
    };

    const handleQuestionSelect = (qObj) => {
        setMessages(prev => [
            ...prev,
            {
                id: Date.now().toString() + '-user',
                sender: 'user',
                text: qObj.q
            }
        ]);

        triggerBotResponse(qObj.q, {
            text: qObj.a,
            optionsType: 'back'
        });
    };

    const handleBackToMenu = () => {
        setMessages(prev => [
            ...prev,
            {
                id: Date.now().toString() + '-user',
                sender: 'user',
                text: "Back to Main Topics ↩️"
            }
        ]);

        triggerBotResponse("Back to Main Topics ↩️", {
            text: "How else can I help you today? Please choose a topic below:",
            optionsType: 'categories'
        });
    };

    const handleResetChat = () => {
        initChat();
    };

    return (
        <>
            {/* 1. FLOATING LAUNCHER BUTTON */}
            <button
                id="chatbot-toggle-button"
                onClick={() => setIsOpen(!isOpen)}
                className={`fixed bottom-6 right-6 z-[10000] w-14 h-14 rounded-full flex items-center justify-center text-white shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 bg-gradient-to-r from-primary to-main ${
                    isOpen ? 'rotate-90' : ''
                }`}
                aria-label="Toggle chat assistant"
            >
                {isOpen ? (
                    <X className="w-6 h-6" />
                ) : (
                    <div className="relative">
                        <MessageSquare className="w-6 h-6" />
                        <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-pulse"></span>
                    </div>
                )}
            </button>

            {/* 2. CHAT PANEL WINDOW */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        id="chatbot-window"
                        initial={{ opacity: 0, scale: 0.9, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 50 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className="fixed bottom-24 right-4 sm:right-6 z-[10000] w-[calc(100vw-32px)] sm:w-[380px] h-[480px] max-h-[calc(100vh-260px)] bg-white rounded-[24px] border border-gray-100 shadow-[0_20px_50px_rgba(21,91,172,0.15)] flex flex-col overflow-hidden font-inter"
                    >
                        {/* Header Section */}
                        <div className="bg-gradient-to-r from-primary to-main px-5 py-4 text-white flex items-center justify-between shadow-md">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center relative border border-white/20">
                                    <Bot className="w-6 h-6 text-white" />
                                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-primary"></span>
                                </div>
                                <div>
                                    <h3 className="font-bold text-sm leading-tight flex items-center gap-1.5">
                                        Aindhin Assistant
                                        <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                                    </h3>
                                    <span className="text-[11px] text-white/80 font-medium">We usually reply instantly</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button 
                                    onClick={handleResetChat} 
                                    className="p-1.5 hover:bg-white/15 rounded-lg transition-colors text-white/80 hover:text-white"
                                    title="Reset chat"
                                >
                                    <RefreshCw className="w-4 h-4" />
                                </button>
                                <button 
                                    onClick={() => setIsOpen(false)} 
                                    className="p-1.5 hover:bg-white/15 rounded-lg transition-colors text-white/80 hover:text-white"
                                    title="Close chat"
                                >
                                    <X className="w-4.5 h-4.5" />
                                </button>
                            </div>
                        </div>

                        {/* Message Feed Area */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/60 custom-scrollbar">
                            {messages.map((msg, index) => {
                                const isLatestMessage = index === messages.length - 1;
                                return (
                                    <div key={msg.id} className="flex flex-col space-y-3">
                                        {/* Message Bubble */}
                                        <div
                                            className={`flex items-start gap-2.5 max-w-[85%] ${
                                                msg.sender === 'user' ? 'self-end flex-row-reverse' : 'self-start'
                                            }`}
                                        >
                                            {msg.sender === 'bot' && (
                                                <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                                                    <Bot className="w-4 h-4 text-primary" />
                                                </div>
                                            )}
                                            {msg.sender === 'user' && (
                                                <div className="w-7 h-7 rounded-full bg-main/10 flex items-center justify-center shrink-0 border border-main/20">
                                                    <User className="w-4 h-4 text-main" />
                                                </div>
                                            )}
                                            <div
                                                className={`p-3.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                                                    msg.sender === 'user'
                                                        ? 'bg-gradient-to-br from-primary to-main text-white rounded-tr-none shadow-sm shadow-primary/20'
                                                        : 'bg-white border border-gray-100 text-gray-800 rounded-tl-none shadow-sm'
                                                }`}
                                            >
                                                {msg.text}
                                            </div>
                                        </div>

                                        {/* Guided Flow Option Buttons (only shown for the latest bot message and when bot is not typing) */}
                                        {isLatestMessage && !isTyping && msg.sender === 'bot' && (
                                            <>
                                                {/* Categories Options */}
                                                {msg.optionsType === 'categories' && (
                                                    <div className="ml-9 space-y-2 max-w-[90%]">
                                                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider pl-1 select-none">
                                                            Select a Topic:
                                                        </p>
                                                        <div className="grid grid-cols-1 gap-2">
                                                            {PRELOADED_CATEGORIES.map((category) => (
                                                                <button
                                                                    key={category.id}
                                                                    onClick={() => handleCategorySelect(category)}
                                                                    className="w-full text-left p-3.5 rounded-xl bg-white border border-gray-100 hover:border-primary/40 hover:bg-primary/5 hover:text-primary text-gray-700 font-bold text-xs flex items-center justify-between shadow-sm hover:shadow-md transition-all duration-200 group active:scale-[0.98] cursor-pointer"
                                                                >
                                                                    <span>{category.title}</span>
                                                                    <ArrowRight className="w-4 h-4 text-primary opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all shrink-0" />
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Questions in Selected Category */}
                                                {msg.optionsType === 'questions' && (
                                                    <div className="ml-9 space-y-2 max-w-[90%]">
                                                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider pl-1 select-none">
                                                            Choose a Question:
                                                        </p>
                                                        <div className="space-y-2">
                                                            {PRELOADED_CATEGORIES.find((cat) => cat.id === msg.categoryId)?.questions.map((qObj, qIdx) => (
                                                                <button
                                                                    key={qIdx}
                                                                    onClick={() => handleQuestionSelect(qObj)}
                                                                    className="w-full text-left p-3.5 rounded-xl bg-white border border-gray-100 hover:border-primary/40 hover:bg-primary/5 hover:text-primary text-gray-600 font-semibold text-xs flex items-center justify-between shadow-sm hover:shadow-md transition-all duration-200 group active:scale-[0.98] cursor-pointer"
                                                                >
                                                                    <span className="leading-snug pr-3">{qObj.q}</span>
                                                                    <ArrowRight className="w-4 h-4 text-primary opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all shrink-0" />
                                                                </button>
                                                            ))}
                                                            <button
                                                                onClick={handleBackToMenu}
                                                                className="w-full text-center p-3 rounded-xl bg-gray-50 border border-gray-200 hover:border-gray-300 hover:bg-gray-100 text-gray-500 font-bold text-xs flex items-center justify-center gap-1.5 transition-all active:scale-[0.98] cursor-pointer"
                                                            >
                                                                Back to Topics ↩️
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Back to main topics option (shown after answers) */}
                                                {msg.optionsType === 'back' && (
                                                    <div className="ml-9 max-w-[90%]">
                                                        <button
                                                            onClick={handleBackToMenu}
                                                            className="w-full text-center p-3.5 rounded-xl bg-primary/5 border border-primary/20 hover:border-primary/40 hover:bg-primary/10 text-primary font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm hover:shadow-md transition-all duration-200 active:scale-[0.98] cursor-pointer"
                                                        >
                                                            Explore Other Topics ↩️
                                                        </button>
                                                    </div>
                                                )}
                                            </>
                                        )}
                                    </div>
                                );
                            })}

                            {/* Typing Indicator Bubble */}
                            {isTyping && (
                                <div className="flex items-start gap-2.5 max-w-[85%] self-start">
                                    <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                                        <Bot className="w-4 h-4 text-primary" />
                                    </div>
                                    <div className="bg-white border border-gray-100 px-4 py-3 rounded-2xl rounded-tl-none shadow-sm flex items-center space-x-1.5">
                                        <span className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms', animationDuration: '0.8s' }}></span>
                                        <span className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms', animationDuration: '0.8s' }}></span>
                                        <span className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms', animationDuration: '0.8s' }}></span>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>



                        {/* Custom Input Bar */}
                        <form
                            onSubmit={handleSendMessage}
                            className="p-3 bg-white border-t border-gray-100 flex items-center gap-2 shrink-0"
                        >
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask a question..."
                                className="flex-1 px-4 py-2.5 border border-gray-200 rounded-full focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary text-xs font-medium font-inter bg-gray-50/50 focus:bg-white transition-all placeholder-gray-400"
                            />
                            <button
                                type="submit"
                                disabled={!input.trim()}
                                className={`w-9 h-9 rounded-full flex items-center justify-center transition-all shrink-0 ${
                                    input.trim() 
                                        ? 'bg-primary text-white hover:bg-main hover:scale-105 active:scale-95 shadow-md shadow-primary/20 cursor-pointer' 
                                        : 'bg-gray-100 text-gray-300 cursor-not-allowed'
                                }`}
                                aria-label="Send message"
                            >
                                <Send className="w-4 h-4" />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Custom Scrollbar Styles */}
            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 5px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #cbd5e1;
                    border-radius: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #94a3b8;
                }
                .custom-scrollbar-hidden {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                .custom-scrollbar-hidden::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </>
    );
}
