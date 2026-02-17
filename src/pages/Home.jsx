import Hero from '../components/Hero';
import CourseCard from '../components/CourseCard';
import Testimonials from '../components/Testimonials';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer, zoomIn } from '../utils/motion';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight, Users, BookOpen, PieChart, EyeOff, ThumbsUp, Code, ArrowDown } from 'lucide-react';

const blogPreviews = [
    {
        title: "How to Make Innovative Ideas For Project And Skill Development",
        date: "February 6, 2026",
        image: "/src/assets/blog_ideas.png",
        desc: "Are you a college or university student looking for a project that is both exciting and useful? Higher education today is no longer just about lectures and exams. Students want experiences that..."
    },
    {
        title: "Skill Building Tips for College Students: Essential Skills Every Student Should Know",
        date: "January 30, 2026",
        image: "/src/assets/blog_skills.png",
        desc: "Skill Building Tips for College Students: Essential Skills Every Student Should Know College is more than lectures, exams, and assignments. It's a journey where students explore their strengths..."
    },
    {
        title: "Beyond textbooks: how digital learning platforms improve student outcomes",
        date: "January 23, 2026",
        image: "/src/assets/blog_tech.png",
        desc: "Beyond textbooks: how digital learning platforms improve student outcomes Higher education has always been about growth, but the way students learn has changed dramatically. Today's learners balance..."
    }
];

const Home = () => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col">
            <Hero />

            {/* About Aindhin Section */}
            <section className="pt-0 pb-24 px-6 md:px-12 bg-white relative overflow-hidden">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#F8FAFF] rounded-full blur-[100px] -z-10 opacity-70"></div>

                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
                    <motion.div
                        variants={fadeIn("right", 0.2)}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.25 }}
                        className="w-full lg:w-1/2 space-y-8"
                    >
                        <div className="space-y-4">
                            <span className="font-inter text-primary font-bold text-lg tracking-wide uppercase block mb-2">About Aindhin</span>
                            <h2 className="font-inter text-3xl lg:text-5xl font-bold text-secondary leading-tight">
                                Aindhin – Learn <br /> and Live Better
                            </h2>
                            <p className="font-inter text-gray-600 text-lg leading-relaxed max-w-lg">
                                Aindhin is a comprehensive EdTech platform in India that helps you learn and live better through skill enhancement courses.
                            </p>
                        </div>

                        <Link
                            to="/about-us"
                            className="inline-flex items-center justify-center px-8 py-4 bg-primary text-white font-bold font-inter text-lg rounded-xl shadow-lg hover:bg-[#5236FF] transition-all duration-300 transform hover:-translate-y-1"
                        >
                            Explore More
                        </Link>
                    </motion.div>

                    <motion.div
                        variants={fadeIn("left", 0.2)}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.25 }}
                        className="w-full lg:w-1/2 relative"
                    >
                        <div className="absolute -top-10 -left-10 w-[120%] h-[120%] -z-10 opacity-40">
                            <img src="/src/assets/about_shape.png" alt="" className="w-full h-full object-contain" />
                        </div>

                        <div className="relative z-10 flex justify-center">
                            <img
                                src="/src/assets/image_anime.png"
                                alt="Aindhin Students"
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
                            <img src="/src/assets/shape_3.png" alt="" className="w-24 opacity-30 rotate-180" />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Mission & Vision Section */}
            <section className="py-20 px-6 md:px-12 bg-white relative">
                <div className="max-w-7xl mx-auto text-center mb-16">
                    <span className="font-inter text-[#644BFF] font-semibold text-xl tracking-wide uppercase">Aindhin - Learn and Live</span>
                </div>
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
                    <motion.div
                        variants={fadeIn("up", 0.2)}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className="flex flex-col items-center text-center space-y-6"
                    >
                        <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center shadow-lg mb-2">
                            <PieChart className="w-10 h-10 text-white stroke-[1.5]" />
                        </div>
                        <h3 className="font-inter text-3xl font-bold text-secondary">Our Mission</h3>
                        <p className="font-inter text-[#646464] text-lg leading-relaxed max-w-md">
                            Our mission is to make high-quality education and job-ready online courses accessible to everyone through a technology-driven, learner-centric ecosystem...
                        </p>
                    </motion.div>
                    <motion.div
                        variants={fadeIn("up", 0.4)}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className="flex flex-col items-center text-center space-y-6"
                    >
                        <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center shadow-lg mb-2">
                            <EyeOff className="w-10 h-10 text-white stroke-[1.5]" />
                        </div>
                        <h3 className="font-inter text-3xl font-bold text-secondary">Our Vision</h3>
                        <p className="font-inter text-[#646464] text-lg leading-relaxed max-w-md">
                            To become a leading global EdTech ecosystem that democratizes education and career growth by uniting learners, educators, and organizations...
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="py-24 px-6 md:px-12 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16 space-y-4">
                        <h2 className="text-4xl lg:text-5xl font-bold text-primary font-inter">Why Choose Us</h2>
                        <div className="flex justify-center gap-1">
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
                        className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    >
                        <motion.div variants={fadeIn("up", 0.2)} className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 group hover:shadow-2xl transition-all duration-300">
                            <div className="h-56 overflow-hidden">
                                <img src="/src/assets/why_choose_1.jpg" alt="" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                            </div>
                            <div className="p-8"><div className="border-l-4 border-primary pl-4"><h3 className="font-inter text-xl font-bold text-primary mb-3">Industry-Aligned</h3><p className="font-inter text-gray-600">Relevant to current industrial standards.</p></div></div>
                        </motion.div>
                        <motion.div variants={fadeIn("up", 0.4)} className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 group hover:shadow-2xl transition-all duration-300">
                            <div className="h-56 overflow-hidden">
                                <img src="/src/assets/why_choose_2.jpg" alt="" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                            </div>
                            <div className="p-8"><div className="border-l-4 border-primary pl-4"><h3 className="font-inter text-xl font-bold text-primary mb-3">Flexible Learning</h3><p className="font-inter text-gray-600">Access self-paced modules anytime.</p></div></div>
                        </motion.div>
                        <motion.div variants={fadeIn("up", 0.6)} className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 group hover:shadow-2xl transition-all duration-300">
                            <div className="h-56 overflow-hidden">
                                <img src="/src/assets/why_choose_3.jpg" alt="" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                            </div>
                            <div className="p-8"><div className="border-l-4 border-primary pl-4"><h3 className="font-inter text-xl font-bold text-primary mb-3">Recognized</h3><p className="font-inter text-gray-600">Earn globally accepted certificates.</p></div></div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            <StatsSection />
            <Testimonials />

            {/* Download App Section - Refined to match screenshot */}
            <section className="py-16 px-6 md:px-12 bg-white flex justify-center">
                <div className="max-w-[1000px] w-full bg-gradient-to-br from-[#002FA7] via-[#0051D4] to-[#4FA1FF] rounded-[40px] px-6 py-10 md:px-12 md:py-12 relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl">

                    {/* Content */}
                    <motion.div
                        variants={fadeIn("right", 0.2)}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className="flex flex-col items-start text-white max-w-xl z-20 space-y-6"
                    >
                        <span className="text-white/80 font-inter text-lg font-medium tracking-wide uppercase">Mobile App</span>
                        <h2 className="text-3xl md:text-4xl font-bold font-inter leading-tight">
                            Download Our Application!
                        </h2>
                        <p className="text-white/90 text-lg leading-relaxed font-inter max-w-lg">
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
                                src="/src/assets/mobile pic.png"
                                alt="Aindhin Mobile App"
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
    <section className="py-20 px-6 md:px-12 bg-white">
        <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
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
