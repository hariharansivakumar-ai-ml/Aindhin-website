import { useEffect } from 'react';
import Hero from '../components/Hero';
import HomeCourseSlider from '../components/HomeCourseSlider';
import CourseCard from '../components/CourseCard';
import Testimonials from '../components/Testimonials';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer, zoomIn, float } from '../utils/motion';
import FAQSection from '../components/FAQSection';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight, Users, BookOpen, PieChart, EyeOff, ThumbsUp, Code, ArrowDown } from 'lucide-react';
import blogIdeasImg from '../assets/blog_ideas.webp';
import blogSkillsImg from '../assets/blog_skills.webp';
import blogTechImg from '../assets/blog_tech.webp';
import aboutShapeImg from '../assets/about_shape.webp';
import imageAnimeImg from '../assets/image_anime.webp';
import shape3Img from '../assets/shape_3.webp';
import whyChoose1Img from '../assets/why_choose_1.webp';
import whyChoose2Img from '../assets/why_choose_2.webp';
import whyChoose3Img from '../assets/why_choose_3.webp';
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
        document.title = "Online Courses in India | Aindhin - Master Job-Ready Skills";
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute("content", "Aindhin is an online learning platform in India offering skill-based and career-oriented courses.");
        }
    }, []);
    return (
        <div className="flex flex-col">
            <Hero />
            <HomeCourseSlider />

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
                            <span className="font-inter text-primary font-bold text-lg tracking-wide uppercase block mb-2">About Aindhin</span>
                            <h2 className="font-inter text-3xl md:text-4xl lg:text-5xl font-bold text-secondary leading-tight">
                                What is an Online Learning Platform in India?
                            </h2>
                            <p className="font-inter text-gray-600 text-base lg:text-lg leading-relaxed max-w-lg">
                                Aindhin is the best provider of <span className="font-semibold text-gray-900">online courses in India</span>, offering career-focused skill development programs and industry-ready training for students and professionals. By providing accessible digital education, we help learners build practical skills, earn recognized certifications, and bridge the gap between academic knowledge and real-world employment opportunities.
                            </p>
                        </div>

                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            animate={float(4, 5)}
                        >
                            <Link
                                to="/about-us"
                                className="inline-flex items-center justify-center px-8 py-4 bg-primary text-white font-bold font-inter text-lg rounded-xl shadow-lg hover:bg-[#5236FF] transition-all duration-300 transform"
                            >
                                Explore More
                            </Link>
                        </motion.div>
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
                                alt="Students learning on the best online learning platform in India"
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

            {/* Mission & Vision Section */}
            <section className="py-6 px-6 lg:px-12 bg-white relative">
                <motion.div
                    variants={fadeIn("up", 0.1)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="max-w-[1400px] mx-auto text-center mb-16"
                >
                    <h2 className="font-inter text-[#644BFF] font-semibold text-xl md:text-2xl tracking-wide uppercase">How Aindhin Supports Career Growth</h2>
                </motion.div>
                <motion.div
                    variants={staggerContainer(0.2, 0.2)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24"
                >
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
                        <h3 className="font-inter text-2xl md:text-3xl font-bold text-secondary">Career-Focused Online Courses in India</h3>
                        <p className="font-inter text-gray-600 text-base lg:text-lg leading-relaxed max-w-md">
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
                        <h3 className="font-inter text-2xl md:text-3xl font-bold text-secondary">Industry-Ready Certification Courses in India</h3>
                        <p className="font-inter text-gray-600 text-base lg:text-lg leading-relaxed max-w-md">
                            To become a global EdTech ecosystem that democratizes education and career growth by uniting learners, educators, and organizations...
                        </p>
                    </motion.div>
                </motion.div>
            </section>

            {/* Why Choose Us Section */}
            <section className="py-8 px-6 lg:px-12 bg-white">
                <div className="max-w-[1400px] mx-auto">
                    <div className="text-center mb-16 space-y-4">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary font-inter leading-tight">Benefits of Online Learning in India</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto font-inter text-lg">
                            Online learning offers unparalleled flexibility and access to industry-aligned training programs. By focusing on practical application and globally recognized certifications, digital platforms empower students and professionals to learn at their own pace, gain confidence, and thrive in highly competitive job markets across India.
                        </p>
                        <div className="flex justify-center gap-1 mt-6">
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
                                <img src={whyChoose1Img} alt="Online education platform in India providing industry standards" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                            </div>
                            <div className="p-8"><div className="border-l-4 border-primary pl-4"><h3 className="font-inter text-xl font-bold text-primary mb-3">Industry-Aligned</h3><p className="font-inter text-gray-600">Relevant to current industrial standards.</p></div></div>
                        </motion.div>
                        <motion.div variants={fadeIn("up", 0.4)} className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 group hover:shadow-2xl transition-all duration-300">
                            <div className="h-56 overflow-hidden">
                                <img src={whyChoose2Img} alt="Skill development platform in India with self-paced learning" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                            </div>
                            <div className="p-8"><div className="border-l-4 border-primary pl-4"><h3 className="font-inter text-xl font-bold text-primary mb-3">Flexible Learning</h3><p className="font-inter text-gray-600">Access self-paced modules anytime.</p></div></div>
                        </motion.div>
                        <motion.div variants={fadeIn("up", 0.6)} className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 group hover:shadow-2xl transition-all duration-300">
                            <div className="h-56 overflow-hidden">
                                <img src={whyChoose3Img} alt="Career-focused online courses in India for professional growth" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                            </div>
                            <div className="p-8"><div className="border-l-4 border-primary pl-4"><h3 className="font-inter text-xl font-bold text-primary mb-3">Recognized</h3><p className="font-inter text-gray-600">Earn globally accepted certificates.</p></div></div>
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
                            question: "What is Aindhin?",
                            answer: "Aindhin is an online learning platform in India offering skill-based and career-oriented courses designed to help students and professionals excel in the modern workforce."
                        },
                        {
                            question: "How does Aindhin help students?",
                            answer: "Aindhin provides structured courses, expert mentorship, and industry-focused training, empowering learners to secure jobs and grow their careers with confidence."
                        },
                        {
                            question: "Are the courses industry-recognized?",
                            answer: "Yes, our programs focus on practical, job-ready skills and offer recognized certificates that help you stand out to employers worldwide."
                        },
                        {
                            question: "Who can enroll in Aindhin's courses?",
                            answer: "Our courses cover a wide range of levels and topics. Whether you are a college student, a fresh graduate, or a professional looking to upskill, Aindhin has a program tailored for you."
                        }
                    ]}
                />
            </div>

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
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-inter leading-tight">
                            Access Our Skill Development Platform on Mobile
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
