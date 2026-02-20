import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Send, Youtube } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer } from '../utils/motion';
import logo from '../assets/logo_aindhin.png';

const Footer = () => {
    return (
        <footer className="bg-white pt-16 font-inter overflow-hidden">
            <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.1 }}
                className="max-w-[1400px] mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12"
            >

                {/* Brand Column */}
                <motion.div variants={fadeIn("up", 0.2)} className="flex flex-col gap-6 lg:col-span-1">
                    <Link to="/" className="inline-block">
                        <img src={logo} alt="Aindhin Logo" className="w-32 h-auto" />
                    </Link>
                    <p className="text-text text-[15px] leading-relaxed pr-4">
                        Aindhin empowers learners and organizations with high-quality online courses, skill development programs, and corporate training solutions.
                    </p>

                </motion.div>

                {/* Quick Links */}
                <motion.div variants={fadeIn("up", 0.3)} className="flex flex-col gap-6">
                    <h4 className="text-primary font-bold text-lg">Quick Links</h4>
                    <ul className="flex flex-col gap-3 text-text text-[15px]">
                        <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
                        <li><Link to="/about-us" className="hover:text-primary transition-colors">About us</Link></li>
                        <li><Link to="/service" className="hover:text-primary transition-colors">Services</Link></li>
                        <li><Link to="/contact-us" className="hover:text-primary transition-colors">Contact us</Link></li>
                    </ul>
                </motion.div>

                {/* Courses Sidebar */}
                <motion.div variants={fadeIn("up", 0.4)} className="flex flex-col gap-6">
                    <h4 className="text-primary font-bold text-lg">Our Courses</h4>
                    <ul className="flex flex-col gap-3 text-text text-[15px]">
                        <li><Link to="/ai-machine-learning-course" className="hover:text-primary transition-colors">AI & Machine Learning</Link></li>
                        <li><Link to="/data-analytics-course" className="hover:text-primary transition-colors">Data Analytics</Link></li>
                        <li><Link to="/digital-marketing-course" className="hover:text-primary transition-colors">Digital Marketing</Link></li>
                        <li><Link to="/full-stack-development-course" className="hover:text-primary transition-colors">Full Stack Development</Link></li>
                    </ul>
                </motion.div>

                {/* Social Media Icons (Moved from left) */}
                <motion.div variants={fadeIn("up", 0.5)} className="flex flex-col gap-6">
                    <h4 className="text-primary font-bold text-lg">Resources</h4>
                    <ul className="flex flex-col gap-3 text-text text-[15px]">
                        <li><a href="/sitemap.xml" className="hover:text-primary transition-colors">Sitemap</a></li>
                    </ul>
                    <h4 className="text-primary font-bold text-lg">Follow Us</h4>
                    <p className="text-text text-[15px]">
                        Stay connected with us on social media for latest updates.
                    </p>
                    <div className="flex items-center gap-3">
                        <a href="https://www.instagram.com/aindhin_academy/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-[#E1306C] flex items-center justify-center text-white hover:-translate-y-1 transition-transform">
                            <Instagram className="w-4 h-4" />
                        </a>
                        <a href="https://www.facebook.com/profile.php?id=61583224692187" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-[#1877F2] flex items-center justify-center text-white hover:-translate-y-1 transition-transform">
                            <Facebook className="w-4 h-4" />
                        </a>
                        <a href="https://www.youtube.com/@AINDHIN" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-[#FF0000] flex items-center justify-center text-white hover:-translate-y-1 transition-transform">
                            <Youtube className="w-4 h-4" />
                        </a>
                        <a href="https://www.linkedin.com/company/aindhin/?viewAsMember=true" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-[#0A66C2] flex items-center justify-center text-white hover:-translate-y-1 transition-transform">
                            <Linkedin className="w-4 h-4" />
                        </a>
                    </div>
                </motion.div>
            </motion.div>

            {/* Copyright Bar */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-primary text-white py-6"
            >
                <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between text-sm gap-4">
                    <p>© 2026. Aindhin. All Rights Reserved.</p>
                    <p>Powered By Aindhin</p>
                </div>
            </motion.div>
        </footer>
    );
};

export default Footer;
