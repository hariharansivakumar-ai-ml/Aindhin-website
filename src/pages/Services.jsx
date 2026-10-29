import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer, float } from '../utils/motion';
import { BookOpen, Compass, Users, Award, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import servicesHeroImg from '../assets/Gemini_Generated_Image_2ly66v2ly66v2ly6.webp';
import collegePartnershipImg from '../assets/steptodown.com436606 (1).webp';
import { useEffect } from 'react';

const services = [
    {
        icon: BookOpen,
        title: "Online Courses",
        description: "Self-paced courses with recorded lessons, projects and a certificate.",
        badge: "Self-Paced Learning",
        linkText: "Explore Courses",
        link: "/our-courses",
        accent: "bg-blue-50 text-primary border-blue-100",
        bulletPoints: [
            "Recorded lessons by working educators",
            "Hands-on portfolio projects",
            "Learn on your own schedule"
        ]
    },
    {
        icon: Compass,
        title: "Guidance & Selection",
        description: "Not sure which course to take? Talk to us and we'll suggest what fits your goal.",
        badge: "Personal Advisory",
        linkText: "Talk to Us",
        link: "/contact-us",
        accent: "bg-purple-50 text-purple-600 border-purple-100",
        bulletPoints: [
            "Honest, goal-aligned recommendations",
            "No pressure or aggressive sales pitch",
            "Guidance for beginners and switchers"
        ]
    },
    {
        icon: Users,
        title: "Team Training",
        description: "Want to train your team? We can arrange courses for groups and companies.",
        badge: "Teams & Groups",
        linkText: "Arrange Team Training",
        link: "/corporate-courses",
        accent: "bg-emerald-50 text-emerald-600 border-emerald-100",
        bulletPoints: [
            "Tailored cohorts for companies & institutions",
            "Directly applicable workplace tools",
            "Track team participation & completion"
        ]
    },
    {
        icon: Award,
        title: "Certificates",
        description: "Complete a course and get a certificate you can add to your resume and LinkedIn.",
        badge: "Career Credential",
        linkText: "View Programs",
        link: "/our-courses",
        accent: "bg-amber-50 text-amber-600 border-amber-100",
        bulletPoints: [
            "Verifiable course completion certificates",
            "Easy to attach to resumes & LinkedIn",
            "Demonstrates real project work"
        ]
    }
];

const Services = () => {
    useEffect(() => {
        document.title = "Our Services | Aindhin";
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute("content", "See how Aindhin supports learners and teams with practical online training.");
        }
    }, []);

    return (
        <div className="min-h-screen bg-white relative overflow-hidden flex flex-col pt-8 lg:pt-0">
            {/* Background Blobs */}
            <motion.div
                animate={float(10, 40)}
                className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#F5F3FF] rounded-full blur-3xl opacity-60 z-0 pointer-events-none"
            ></motion.div>
            <div className="absolute top-[20%] left-[-5%] w-[400px] h-[400px] bg-[#EFF6FF] rounded-full blur-3xl opacity-50 z-0 pointer-events-none"></div>

            {/* 1. Hero Section */}
            <section className="w-full relative z-10 overflow-hidden bg-white">
                <div className="w-full grid grid-cols-1 lg:grid-cols-2 items-center min-h-[520px] lg:min-h-[580px]">
                    
                    {/* Left Content */}
                    <div className="flex flex-col items-start gap-6 z-20 px-6 sm:px-12 lg:pl-16 xl:pl-28 lg:pr-8 py-10 lg:py-16 max-w-2xl justify-self-center lg:justify-self-end w-full">
                        <span className="font-inter text-primary font-bold text-xs md:text-sm tracking-widest uppercase bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-100">
                            SERVICES & SUPPORT
                        </span>

                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary font-inter leading-tight">
                            How we can help you
                        </h1>

                        <p className="text-gray-600 text-base lg:text-lg leading-relaxed font-inter">
                            Learning works best when someone is on your side. Here is how Aindhin supports you.
                        </p>

                        <div className="flex flex-wrap items-center gap-4 pt-2">
                            <Link
                                to="/our-courses"
                                className="inline-flex items-center justify-center px-7 py-3.5 bg-primary text-white font-bold font-inter text-base rounded-xl shadow-lg hover:bg-[#5236FF] transition-all duration-300 transform hover:-translate-y-0.5"
                            >
                                Explore Courses
                            </Link>
                            <Link
                                to="/contact-us"
                                className="inline-flex items-center justify-center px-7 py-3.5 bg-white border-2 border-primary text-primary hover:bg-blue-50 font-bold font-inter text-base rounded-xl shadow-sm transition-all duration-300 transform hover:-translate-y-0.5"
                            >
                                Speak to Our Team
                            </Link>
                        </div>
                    </div>

                    {/* Right Hero Image - Fully Occupied */}
                    <div className="relative w-full h-[380px] sm:h-[460px] lg:h-full lg:min-h-[580px] self-stretch flex items-center justify-end overflow-hidden">
                        <motion.div
                            variants={fadeIn("left", 0.3)}
                            initial="hidden"
                            animate="show"
                            className="w-full h-full"
                        >
                            <img
                                src={servicesHeroImg}
                                alt="Aindhin services and career development support"
                                className="w-full h-full object-cover object-center lg:object-left"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 2. Core Services Grid */}
            <section className="w-full px-6 lg:px-12 py-16 bg-[#F8FAFC]/80 border-y border-gray-100 relative z-10">
                <div className="max-w-[1400px] mx-auto space-y-12">
                    
                    {/* Header */}
                    <div className="text-center max-w-2xl mx-auto space-y-3">
                        <span className="font-inter text-primary font-bold text-xs uppercase tracking-widest bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-100">
                            WHAT WE OFFER
                        </span>
                        <h2 className="font-poppins text-2xl md:text-3xl lg:text-4xl font-bold text-secondary leading-tight">
                            Support Tailored to <span className="text-primary">Your Goals</span>
                        </h2>
                        <p className="text-gray-600 text-base font-inter">
                            Whether you're an individual learner or upgrading an entire team, we provide practical tools and genuine guidance.
                        </p>
                    </div>

                    {/* 4 Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {services.map((item, idx) => {
                            const IconComp = item.icon;
                            return (
                                <motion.div
                                    key={idx}
                                    variants={fadeIn("up", 0.1 * (idx + 1))}
                                    initial="hidden"
                                    whileInView="show"
                                    viewport={{ once: true }}
                                    className="bg-white rounded-3xl p-8 md:p-10 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6"
                                >
                                    <div className="space-y-5">
                                        <div className="flex items-center justify-between">
                                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border ${item.accent}`}>
                                                <IconComp className="w-7 h-7" />
                                            </div>
                                            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 bg-slate-50 border border-slate-200/60 px-3 py-1 rounded-full font-inter">
                                                {item.badge}
                                            </span>
                                        </div>

                                        <h3 className="text-2xl font-bold text-secondary font-inter">
                                            {item.title}
                                        </h3>

                                        <p className="text-gray-600 text-base leading-relaxed font-inter">
                                            {item.description}
                                        </p>

                                        {/* Key Points */}
                                        <ul className="space-y-2.5 pt-2">
                                            {item.bulletPoints.map((point, pIdx) => (
                                                <li key={pIdx} className="flex items-center gap-2.5 text-sm text-slate-700 font-inter">
                                                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                                                    <span>{point}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="pt-4 border-t border-slate-100">
                                        <Link
                                            to={item.link}
                                            className="inline-flex items-center gap-2 text-primary hover:text-[#5236FF] font-bold font-inter text-sm group"
                                        >
                                            <span>{item.linkText}</span>
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* 3. Partnerships & Groups Section */}
            <section className="w-full px-6 lg:px-12 py-16 bg-white relative z-10">
                <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    
                    {/* Left: Info */}
                    <div className="flex flex-col items-start gap-6">
                        <span className="font-inter text-primary font-bold text-xs uppercase tracking-widest bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-100">
                            PARTNERSHIPS
                        </span>
                        
                        <h2 className="font-poppins text-2xl md:text-3xl lg:text-4xl font-bold text-secondary leading-tight">
                            Partner with Aindhin for <span className="text-primary">Group & Institutional Training</span>
                        </h2>

                        <p className="text-gray-600 text-base leading-relaxed font-inter">
                            We collaborate with colleges, universities, and enterprise teams to bring modern, job-ready curriculum directly to learners.
                        </p>

                        <div className="space-y-3 w-full">
                            {[
                                "Curriculum mapped to active company tech stacks and tools",
                                "Self-paced video modules paired with hands-on labs",
                                "Recognized completion certificates for portfolios and resumes",
                                "Dedicated cohort management and instructor guidance"
                            ].map((text, i) => (
                                <div key={i} className="flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                    <span className="text-slate-700 text-sm font-inter">{text}</span>
                                </div>
                            ))}
                        </div>

                        <div className="pt-2">
                            <Link
                                to="/corporate-courses"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold font-inter text-sm rounded-xl transition-all shadow-sm"
                            >
                                <span>Learn More About Corporate Programs</span>
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>

                    {/* Right: Illustration */}
                    <div className="flex justify-center lg:justify-end">
                        <div className="relative">
                            <div className="absolute inset-0 bg-blue-100/50 rounded-3xl -rotate-2 transform"></div>
                            <img
                                src={collegePartnershipImg}
                                alt="Institutional partnerships with Aindhin"
                                className="relative z-10 w-full max-w-[500px] rounded-2xl object-contain drop-shadow-xl"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. Bottom Banner */}
            <section className="py-12 px-6 lg:px-12 bg-white flex justify-center relative z-10">
                <div className="max-w-[1000px] w-full bg-gradient-to-br from-blue-50 via-indigo-50/40 to-purple-50/30 rounded-[32px] p-8 md:p-12 border border-blue-100/80 shadow-md text-center space-y-6">
                    <span className="text-4xl inline-block">💡</span>
                    <h2 className="font-poppins text-2xl md:text-3xl lg:text-4xl font-bold text-secondary leading-tight">
                        Have something <span className="text-primary">specific in mind?</span>
                    </h2>
                    <p className="font-inter text-gray-600 text-base md:text-lg leading-relaxed max-w-xl mx-auto">
                        Tell us what you need. Whether you're looking for tailored training, group arrangements, or custom course guidance, our team is ready to assist.
                    </p>
                    <div className="pt-2">
                        <Link
                            to="/contact-us"
                            className="inline-flex items-center justify-center px-8 py-4 bg-primary text-white font-bold font-inter text-base md:text-lg rounded-xl shadow-lg hover:bg-[#5236FF] transition-all duration-300 transform hover:-translate-y-0.5"
                        >
                            Contact Us
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Services;
