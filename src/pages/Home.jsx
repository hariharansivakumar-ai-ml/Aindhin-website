import { useEffect } from 'react';
import Hero from '../components/Hero';
import HomeVideo from '../components/HomeVideo';
import CourseCard from '../components/CourseCard';
import Testimonials from '../components/Testimonials';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer, zoomIn, float } from '../utils/motion';
import FAQSection from '../components/FAQSection';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight, Users, BookOpen, ThumbsUp, Code, ArrowDown } from 'lucide-react';
import blogIdeasImg from '../assets/blog_ideas.webp';
import blogSkillsImg from '../assets/blog_skills.webp';
import blogTechImg from '../assets/blog_tech.webp';
import aboutShapeImg from '../assets/about_shape.webp';
import imageAnimeImg from '../assets/image_anime.webp';
import shape3Img from '../assets/shape_3.webp';
import mobilePicImg from '../assets/mobile pic.webp';

const blogPreviews = [
    {
        title: "How to Make Innovative Ideas For Project And Skill Development",
        date: "February 6, 2026",
        image: blogIdeasImg,
        desc: "Are you a college or university student looking for a project that is both exciting and useful? Higher education today is no longer just about lectures and exams. Students want experiences that..."
    },
    {
        title: "Skill Building Tips for College Students: Essential Skills Every Student Should Know",
        date: "January 30, 2026",
        image: blogSkillsImg,
        desc: "Skill Building Tips for College Students: Essential Skills Every Student Should Know College is more than lectures, exams, and assignments. It's a journey where students explore their strengths..."
    },
    {
        title: "Beyond textbooks: how digital learning platforms improve student outcomes",
        date: "January 23, 2026",
        image: blogTechImg,
        desc: "Beyond textbooks: how digital learning platforms improve student outcomes Higher education has always been about growth, but the way students learn has changed dramatically. Today's learners balance..."
    }
];

const Home = () => {
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Aindhin | Online Courses to Build Job-Ready Skills";
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute("content", "Learn AI, data analytics, digital marketing, web development and more at your own pace. Practical courses with real projects and certificates.");
        }
    }, []);
    return (
        <div className="flex flex-col">
            <Hero />
            {import.meta.env.VITE_SHOW_VIDEO === 'true' && <HomeVideo />}

            {/* About Aindhin Section */}
            <section className="pt-12 md:pt-16 pb-6 px-6 lg:px-12 bg-white relative overflow-hidden">
                <motion.div
                    animate={float(8, 30)}
                    className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#F8FAFF] rounded-full blur-[100px] -z-10 opacity-70"
                ></motion.div>

                <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center gap-16">
                    <motion.div
                        variants={fadeIn("right", 0.2)}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.25 }}
                        className="w-full lg:w-1/2 space-y-8"
                    >
                        <div className="space-y-4">
                            <span className="font-inter text-primary font-bold text-sm tracking-widest uppercase block mb-2 bg-blue-50 w-fit px-3 py-1 rounded-full">ONLINE COURSES IN INDIA</span>
                            <h2 className="font-poppins text-2xl md:text-3xl lg:text-4xl font-bold text-secondary leading-tight">
                                Learn Today. <span className="text-primary">Lead Tomorrow.</span>
                            </h2>
                            <p className="font-inter text-gray-600 text-base lg:text-lg leading-relaxed max-w-lg">
                                Industry-relevant courses with real projects, expert guidance and certification, available whenever you are ready to begin.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div className="flex flex-wrap items-center gap-4">
                                <Link
                                    to="/our-courses"
                                    className="inline-flex items-center justify-center px-7 py-3.5 bg-primary text-white font-bold font-inter text-base rounded-xl shadow-lg hover:bg-[#5236FF] transition-all duration-300 transform hover:-translate-y-0.5"
                                >
                                    Explore Courses
                                </Link>
                                <Link
                                    to="/contact-us"
                                    className="inline-flex items-center justify-center px-7 py-3.5 bg-white border-2 border-primary text-primary hover:bg-blue-50 font-bold font-inter text-base rounded-xl shadow-md transition-all duration-300 transform hover:-translate-y-0.5"
                                >
                                    Speak to Our Team
                                </Link>
                            </div>
                            <p className="text-xs md:text-sm font-medium text-gray-500 font-inter flex flex-wrap items-center gap-2">
                                <span>Self-paced learning</span>
                                <span className="text-gray-300">|</span>
                                <span>Hands-on projects</span>
                                <span className="text-gray-300">|</span>
                                <span>Certificate on completion</span>
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        variants={fadeIn("left", 0.2)}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.25 }}
                        className="w-full lg:w-1/2 relative"
                    >
                        <div className="absolute -top-10 -left-10 w-[120%] h-[120%] -z-10 opacity-40">
                            <img src={aboutShapeImg} alt="" className="w-full h-full object-contain" />
                        </div>

                        <div className="relative z-10 flex justify-center">
                            <img
                                src={imageAnimeImg}
                                alt="Students learning on online courses platform in India"
                                className="w-full max-w-[350px] h-auto drop-shadow-2xl relative z-20"
                            />
                            <motion.div
                                animate={{ y: [0, -15, 0] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute top-0 right-10 z-30"
                            >
                                <div className="w-14 h-14 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg flex items-center justify-center rotate-12">
                                    <span className="text-3xl">🚀</span>
                                </div>
                            </motion.div>
                            <motion.div
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute top-[40%] left-[-20px] z-30"
                            >
                                <div className="w-12 h-12 bg-[#4D94FF] rounded-full shadow-lg flex items-center justify-center transform -rotate-12 border-2 border-white">
                                    <span className="text-xl text-white">👍</span>
                                </div>
                            </motion.div>
                            <motion.div
                                animate={{ y: [0, 8, 0] }}
                                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute bottom-20 left-0 z-30"
                            >
                                <div className="w-14 h-14 bg-[#FF4D4D] rounded-full shadow-xl flex items-center justify-center text-white text-2xl border-4 border-white">
                                    ❤️
                                </div>
                            </motion.div>
                            <motion.div
                                animate={{ rotate: [0, 10, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute bottom-10 right-10 z-30"
                            >
                                <div className="text-4xl drop-shadow-md text-[#FFD700]">⚡</div>
                            </motion.div>
                            <div className="absolute top-20 left-[-40px] w-10 h-10 bg-blue-100 rounded-lg -z-10 rotate-45 opacity-60"></div>
                        </div>
                        <div className="absolute bottom-0 right-0 -z-10 translate-x-10 translate-y-10">
                            <img src={shape3Img} alt="" className="w-24 opacity-30 rotate-180" />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Primary Training Categories Section */}
            <section className="py-12 px-6 lg:px-12 bg-[#F8FAFC]">
                <div className="max-w-[1400px] mx-auto space-y-10">
                    <div className="text-center max-w-2xl mx-auto space-y-3">
                        <span className="font-inter text-primary font-bold text-sm tracking-widest uppercase bg-blue-50 px-3 py-1 rounded-full inline-block">Featured Domains</span>
                        <h2 className="font-poppins text-2xl md:text-3xl lg:text-4xl font-bold text-secondary leading-tight">
                            Primary Training <span className="text-primary">Categories</span>
                        </h2>
                        <p className="text-gray-600 font-inter text-base">Practical, career-focused learning paths designed for real-world application.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <Link to="/ai-and-machine-learning" className="group bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
                            <div className="space-y-3">
                                <div className="w-12 h-12 bg-blue-50 text-primary rounded-xl flex items-center justify-center text-2xl font-bold">🤖</div>
                                <h3 className="font-inter font-bold text-xl text-secondary group-hover:text-primary transition-colors">AI &amp; Machine Learning</h3>
                                <p className="font-inter text-gray-600 text-sm leading-relaxed">Build models with real data and learn how they work outside a textbook.</p>
                            </div>
                            <span className="text-primary font-semibold text-sm mt-4 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">Explore Domain →</span>
                        </Link>

                        <Link to="/data-analytics" className="group bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
                            <div className="space-y-3">
                                <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center text-2xl font-bold">📊</div>
                                <h3 className="font-inter font-bold text-xl text-secondary group-hover:text-primary transition-colors">Data Analytics</h3>
                                <p className="font-inter text-gray-600 text-sm leading-relaxed">Turn messy spreadsheets into clear answers using SQL, Power BI and Tableau.</p>
                            </div>
                            <span className="text-primary font-semibold text-sm mt-4 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">Explore Domain →</span>
                        </Link>

                        <Link to="/digital-marketing-from-basics-to-growth-campaigns" className="group bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
                            <div className="space-y-3">
                                <div className="w-12 h-12 bg-pink-50 text-pink-600 rounded-xl flex items-center justify-center text-2xl font-bold">📈</div>
                                <h3 className="font-inter font-bold text-xl text-secondary group-hover:text-primary transition-colors">Digital Marketing</h3>
                                <p className="font-inter text-gray-600 text-sm leading-relaxed">Run real SEO, social media and ad campaigns, and see what works.</p>
                            </div>
                            <span className="text-primary font-semibold text-sm mt-4 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">Explore Domain →</span>
                        </Link>

                        <Link to="/full-stack-development" className="group bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
                            <div className="space-y-3">
                                <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center text-2xl font-bold">💻</div>
                                <h3 className="font-inter font-bold text-xl text-secondary group-hover:text-primary transition-colors">Full Stack Development</h3>
                                <p className="font-inter text-gray-600 text-sm leading-relaxed">Start with a blank screen and finish with a working web app.</p>
                            </div>
                            <span className="text-primary font-semibold text-sm mt-4 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">Explore Domain →</span>
                        </Link>

                        <Link to="/leadership-courses" className="group bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
                            <div className="space-y-3">
                                <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center text-2xl font-bold">🎯</div>
                                <h3 className="font-inter font-bold text-xl text-secondary group-hover:text-primary transition-colors">Leadership &amp; Management</h3>
                                <p className="font-inter text-gray-600 text-sm leading-relaxed">Learn how to lead a team, make tough calls and communicate better.</p>
                            </div>
                            <span className="text-primary font-semibold text-sm mt-4 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">Explore Domain →</span>
                        </Link>

                        {/* Other Courses Row 9 */}
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100 shadow-sm flex flex-col justify-between">
                            <div className="space-y-3">
                                <div className="w-12 h-12 bg-white text-primary rounded-xl flex items-center justify-center text-2xl font-bold shadow-sm">⚡</div>
                                <h3 className="font-inter font-bold text-xl text-secondary">Also On Offer</h3>
                                <p className="font-inter text-gray-700 text-sm font-medium">Python, Java, Cyber Security, Cloud Computing (AWS and Azure)</p>
                                <div className="flex flex-wrap gap-2 pt-2">
                                    <Link to="/python-certification" className="text-xs bg-white text-gray-700 hover:text-primary px-2.5 py-1 rounded-full border border-gray-200 hover:border-primary font-medium transition-colors">Python</Link>
                                    <Link to="/java-certification" className="text-xs bg-white text-gray-700 hover:text-primary px-2.5 py-1 rounded-full border border-gray-200 hover:border-primary font-medium transition-colors">Java</Link>
                                    <Link to="/cyber-security" className="text-xs bg-white text-gray-700 hover:text-primary px-2.5 py-1 rounded-full border border-gray-200 hover:border-primary font-medium transition-colors">Cyber Security</Link>
                                    <Link to="/cloud-computing" className="text-xs bg-white text-gray-700 hover:text-primary px-2.5 py-1 rounded-full border border-gray-200 hover:border-primary font-medium transition-colors">Cloud Computing</Link>
                                </div>
                            </div>
                            <Link to="/our-courses" className="text-primary font-semibold text-sm mt-4 inline-flex items-center gap-1 hover:translate-x-1 transition-transform">View All Courses →</Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* About / Learning Advantage Section */}
            <section className="py-12 px-6 lg:px-12 bg-white relative">
                <div className="max-w-[1000px] mx-auto text-center space-y-6">
                    <span className="font-inter text-primary font-bold text-sm tracking-widest uppercase bg-blue-50 px-3 py-1 rounded-full inline-block">About Aindhin</span>
                    <h2 className="font-poppins text-2xl md:text-3xl lg:text-4xl font-bold text-secondary leading-tight">
                        The Aindhin <span className="text-primary">Learning Advantage</span>
                    </h2>
                    <p className="font-inter text-gray-700 text-lg md:text-xl leading-relaxed">
                        We started Aindhin because practical skill development should be accessible to everyone. Today we help students, working professionals and career-switchers pick up practical skills without leaving home.
                    </p>
                    <p className="font-inter text-gray-600 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
                        We're a small team that cares about one thing: that you finish a course and feel ready for the next step.
                    </p>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="py-12 px-6 lg:px-12 bg-[#F8FAFC]">
                <div className="max-w-[1400px] mx-auto">
                    <div className="text-center mb-12 space-y-3">
                        <h2 className="font-poppins text-2xl md:text-3xl lg:text-4xl font-bold text-secondary leading-tight">
                            Why Choose <span className="text-primary">Aindhin</span>
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto font-inter text-base md:text-lg">
                            Clear, practical training built around how you actually learn and work.
                        </p>
                        <div className="flex justify-center gap-1 mt-4">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary opacity-60"></span>
                            <span className="w-1.5 h-1.5 rounded-full bg-primary opacity-80"></span>
                            <span className="w-8 h-1.5 rounded-full bg-primary"></span>
                        </div>
                    </div>
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.25 }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                    >
                        <motion.div variants={fadeIn("up", 0.1)} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
                            <div className="space-y-3">
                                <div className="w-12 h-12 bg-blue-50 text-primary rounded-xl flex items-center justify-center text-2xl font-bold">🏢</div>
                                <h3 className="font-inter text-lg font-bold text-secondary">Industry Relevance</h3>
                                <p className="font-inter text-gray-600 text-sm leading-relaxed">Our courses follow what companies actually use today.</p>
                            </div>
                        </motion.div>
                        <motion.div variants={fadeIn("up", 0.2)} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
                            <div className="space-y-3">
                                <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center text-2xl font-bold">⏱️</div>
                                <h3 className="font-inter text-lg font-bold text-secondary">Flexible Pace</h3>
                                <p className="font-inter text-gray-600 text-sm leading-relaxed">Lessons are recorded by working educators, so you can pause, rewind and learn when it suits you.</p>
                            </div>
                        </motion.div>
                        <motion.div variants={fadeIn("up", 0.3)} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
                            <div className="space-y-3">
                                <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center text-2xl font-bold">🛠️</div>
                                <h3 className="font-inter text-lg font-bold text-secondary">Hands-On Projects</h3>
                                <p className="font-inter text-gray-600 text-sm leading-relaxed">Every course has hands-on projects, so you finish with something to show.</p>
                            </div>
                        </motion.div>
                        <motion.div variants={fadeIn("up", 0.4)} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
                            <div className="space-y-3">
                                <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center text-2xl font-bold">🎓</div>
                                <h3 className="font-inter text-lg font-bold text-secondary">Certification</h3>
                                <p className="font-inter text-gray-600 text-sm leading-relaxed">You get a certificate when you complete a course.</p>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            <StatsSection />

            <Testimonials />

            {/* General FAQs */}
            <div className="mb-6">
                <FAQSection
                    faqs={[
                        {
                            question: "What is Aindhin and how does it support career growth?",
                            answer: "Aindhin is a premier EdTech platform in India focused on bridging the gap between academic learning and industry requirements through career-oriented certification courses."
                        },
                        {
                            question: "How do Aindhin's online courses benefit working professionals?",
                            answer: "Our courses are designed for flexibility, allowing professionals to upskill at their own pace while gaining industry-recognized credentials that enhance their career prospects."
                        },
                        {
                            question: "Are the certifications from Aindhin globally recognized?",
                            answer: "Yes, our certifications are valued by top employers and institutions, focusing on practical skills that meet international industry standards."
                        },
                        {
                            question: "Does Aindhin provide support for placement after course completion?",
                            answer: "We offer dedicated career guidance, portfolio building sessions, and connections to our industry partners to help our graduates secure rewarding positions."
                        }
                    ]}
                />
            </div>

            {/* Closing Guidance Section */}
            <section className="py-8 px-6 lg:px-12 bg-white flex justify-center">
                <div className="max-w-[1000px] w-full bg-gradient-to-br from-blue-50 via-indigo-50/40 to-purple-50/30 rounded-[32px] p-8 md:p-12 border border-blue-100/80 shadow-md text-center space-y-6">
                    <span className="text-4xl inline-block">👋</span>
                    <h2 className="font-poppins text-2xl md:text-3xl lg:text-4xl font-bold text-secondary leading-tight">
                        Not Sure <span className="text-primary">Where to Start?</span>
                    </h2>
                    <p className="font-inter text-gray-600 text-base md:text-lg leading-relaxed max-w-xl mx-auto">
                        That's completely normal. Tell us what you're hoping to do, and we'll help you find the right course. No pressure, no sales pitch.
                    </p>
                    <div className="pt-2">
                        <Link
                            to="/contact-us"
                            className="inline-flex items-center justify-center px-8 py-4 bg-primary text-white font-bold font-inter text-base md:text-lg rounded-xl shadow-lg hover:bg-[#5236FF] transition-all duration-300 transform hover:-translate-y-0.5"
                        >
                            Talk to Us
                        </Link>
                    </div>
                </div>
            </section>

            {/* Download App Section - Refined to match screenshot */}
            <section className="py-2 pb-12 px-6 lg:px-12 bg-white flex justify-center">
                <div className="max-w-[1000px] w-full bg-gradient-to-br from-[#002FA7] via-[#0051D4] to-[#4FA1FF] rounded-[40px] px-6 py-6 md:px-12 md:py-8 relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-6 shadow-2xl">

                    {/* Content */}
                    <motion.div
                        variants={fadeIn("right", 0.2)}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className="flex flex-col items-start text-white max-w-xl z-20 space-y-6"
                    >
                        <span className="text-white/80 font-inter text-lg font-medium tracking-wide uppercase">Mobile App</span>
                        <h2 className="font-poppins text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">
                            <span className="text-white">Access Skill Development </span><span className="text-blue-200">on Mobile</span>
                        </h2>
                        <p className="text-white/90 text-base lg:text-lg leading-relaxed font-inter max-w-lg">
                            Aindhin is an edutech platform that makes learning simple, interactive, and accessible from anywhere. Explore lessons, quizzes, and progress tracking right from your phone.
                            <br /><br />
                            Stay ahead in your studies and keep learning on the go with the Aindhin mobile app.
                        </p>

                        <button
                            onClick={() => navigate('/download-app')}
                            className="hidden lg:flex items-center gap-2 bg-primary hover:bg-[#1D4ED8] text-white px-8 py-4 rounded-xl font-bold font-inter transition-all shadow-xl text-lg mt-4 group"
                        >
                            Download App
                            <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                        </button>
                    </motion.div>

                    {/* Image */}
                    <div className="relative z-20 w-full lg:w-[45%] flex justify-center lg:justify-end">
                        <motion.div
                            animate={{ y: [0, -15, 0] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            className="relative w-full max-w-[380px]"
                        >
                            <img
                                src={mobilePicImg}
                                alt="Industry-ready training platform in India available on mobile"
                                className="w-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
                            />
                        </motion.div>
                    </div>

                    {/* Mobile Button (Visible only on mobile) */}
                    <div className="w-full flex justify-center lg:hidden relative z-20">
                        <button
                            onClick={() => navigate('/download-app')}
                            className="flex items-center gap-2 bg-primary hover:bg-[#1D4ED8] text-white px-8 py-4 rounded-xl font-bold font-inter transition-all shadow-xl text-lg group"
                        >
                            Download App
                            <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                        </button>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute top-[-100px] left-[-100px] w-80 h-80 bg-white/10 rounded-full blur-[80px]"></div>
                    <div className="absolute bottom-[-150px] right-[-100px] w-[500px] h-[500px] bg-blue-400/20 rounded-full blur-[100px]"></div>
                </div>
            </section>
        </div>
    );
};

const StatsSection = () => (
    <section className="py-8 px-6 lg:px-12 bg-white">
        <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
            <StatCard icon={<Users className="w-10 h-10 text-[#2B59C3]" />} val="100+" label="Team member" bg="#2B59C3" />
            <StatCard icon={<BookOpen className="w-10 h-10 text-[#A855F7]" />} val="10+" label="Courses" bg="#A855F7" />
            <StatCard icon={<ThumbsUp className="w-10 h-10 text-[#2B59C3]" />} val="2K+" label="Students Trained" bg="#2B59C3" />
            <StatCard icon={<Code className="w-10 h-10 text-[#A855F7]" />} val="10+" label="Services Offered" bg="#A855F7" />
        </motion.div>
    </section>
);

const StatCard = ({ icon, val, label, bg }) => (
    <motion.div
        variants={fadeIn("up", 0.3)}
        whileHover={{ y: -5 }}
        style={{ backgroundColor: bg }}
        className="rounded-2xl p-4 flex flex-col items-center justify-center text-white aspect-square shadow-lg w-full max-w-[280px] lg:max-w-[180px] mx-auto"
    >
        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-3 shadow-md">
            {/* Clone icon to pass className for resizing if needed, but assuming icon usage in StatsSection handles it or we wrap it */}
            <div className="scale-75 origin-center">{icon}</div>
        </div>
        <h3 className="text-3xl font-bold mb-1 font-inter">{val}</h3>
        <p className="text-sm font-medium opacity-90 font-inter text-center leading-tight">{label}</p>
    </motion.div>
);

export default Home;
