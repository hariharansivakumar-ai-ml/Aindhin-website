import { motion } from 'framer-motion';
import { fadeIn } from '../utils/motion';
import { MapPin, Phone, Mail, Monitor, ArrowDown, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import mobilePicImg from '../assets/mobile pic.webp';

import { useEffect, useState } from 'react';
import { apiSubmitEnquiry } from '../utils/apiClient';

const ContactUs = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        document.title = "Contact Aindhin | We're Happy to Help";
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute("content", "Have a question about a course? Get in touch with the Aindhin team and we'll help you choose.");
        }
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMessage('');

        // 1. Submit to Backend DB so Admin can view in /wp-admin/enquiries
        try {
            await apiSubmitEnquiry({
                name: formData.name.trim(),
                email: formData.email.trim(),
                phone: formData.phone.trim(),
                course_title: 'Contact Us Form',
                message: formData.message.trim()
            });
        } catch (backendErr) {
            console.warn('Backend DB submission notice:', backendErr);
        }

        // 2. Submit to FormSubmit AJAX endpoint using URLSearchParams
        try {
            const params = new URLSearchParams();
            params.append('name', formData.name.trim());
            params.append('email', formData.email.trim());
            params.append('phone', formData.phone.trim());
            params.append('message', formData.message.trim());
            params.append('_subject', 'New Submission from Aindhin Contact Form');
            params.append('_cc', 'info.aindhin@gmail.com,connect@aindhin.com');
            params.append('_template', 'table');
            params.append('_captcha', 'false');

            const response = await fetch('https://formsubmit.co/ajax/aindhinbackup@gmail.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                },
                body: params
            });

            const data = await response.json();

            if (data.success === 'true' || data.success === true) {
                setStatus('success');
                setFormData({ name: '', email: '', phone: '', message: '' });
            } else if (data.message && data.message.toLowerCase().includes('activation')) {
                setStatus('error');
                setErrorMessage("FormSubmit Activation Required: An email with an 'Activate Form' button was sent to aindhinbackup@gmail.com. Please open aindhinbackup@gmail.com, click 'Activate Form', and future messages will be sent automatically.");
            } else {
                setStatus('error');
                setErrorMessage(data.message || 'Submission failed. Please try again.');
            }
        } catch (error) {
            console.error('Contact form submission error:', error);
            setStatus('error');
            setErrorMessage('Unable to connect to email server. Please check your connection or try again.');
        }
    };

    return (
        <div className="min-h-screen bg-white flex flex-col pt-4 lg:pt-8 pb-0 relative overflow-hidden">

            {/* --- SECTION 1: "Let us help you" + Contact Grid --- */}
            <div className="mb-0">
                <div className="flex flex-col items-center text-center px-6 lg:px-12 mb-10">
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mb-4"
                    >
                        <span className="inline-flex items-center gap-2 text-primary font-bold text-xs sm:text-sm font-poppins tracking-wider uppercase bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-100">
                            <Monitor className="w-4 h-4 text-primary" />
                            Get In Touch
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-3xl sm:text-4xl lg:text-[42px] xl:text-[48px] font-bold text-secondary leading-snug md:leading-[1.28] lg:leading-[1.32] font-poppins mb-4 max-w-4xl"
                    >
                        Contact Us: Get Expert Guidance for Your <span className="text-primary">Career Success</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="text-sm sm:text-base lg:text-[16px] xl:text-[17px] text-gray-600 leading-relaxed font-poppins max-w-2xl"
                    >
                        Our platform is built on the principles of innovation, quality, and inclusivity, aiming to provide a seamless learning experience for your professional growth.
                    </motion.p>
                </div>

                {/* Contact Info Grid */}
                <div className="max-w-[1400px] mx-auto px-6 lg:px-12 w-full mb-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                        <ContactCard
                            icon={<MapPin className="w-8 h-8 text-primary" />}
                            title="Head Office"
                            content={
                                <>
                                    139, Old Airport Road,<br />
                                    Kodihalli, Bengaluru,<br />
                                    Bengaluru Urban, Karnataka<br />
                                    - 560 008.
                                </>
                            }
                            linkText="Find Location"
                            href="https://www.google.com/maps/search/?api=1&query=139,+Old+Airport+Road,+Kodihalli,+Bengaluru,+Karnataka+-+560008"
                            delay={0.2}
                        />
                        <ContactCard
                            icon={<MapPin className="w-8 h-8 text-primary" />}
                            title="Operation"
                            content={
                                <>
                                    No. 8, Manickavasagar<br />
                                    Colony, Eraniyan Street,<br />
                                    Karur Bypass Road, Erode,<br />
                                    Tamil Nadu - 638002.
                                </>
                            }
                            linkText="Find Location"
                            href="https://www.google.com/maps/search/?api=1&query=No.+8,+Manickavasagar+Colony,+Eraniyan+Street,+Karur+Bypass+Road,+Erode,+Tamil+Nadu+-+638002"
                            delay={0.4}
                        />
                        <ContactCard
                            icon={<Mail className="w-8 h-8 text-primary" />}
                            title="Email Address"
                            content="connect@aindhin.com"
                            linkText="Get In Touch"
                            href="mailto:connect@aindhin.com"
                            delay={0.6}
                        />
                        <ContactCard
                            icon={<Phone className="w-8 h-8 text-primary" />}
                            title="Phone Number"
                            content="+91 8807100669"
                            linkText="Contact Us Today!"
                            href="tel:+918807100669"
                            delay={0.8}
                        />
                    </div>
                </div>
            </div>

            {/* --- SECTION 2: Split Layout Form --- */}
            <div className="w-full bg-[#F8FAFC] py-12 pb-16">
                <div className="max-w-[1400px] mx-auto px-6 lg:px-12 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

                    {/* Left Side: Text Content & Social Proof */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col items-start gap-6"
                    >
                        <div className="flex items-center gap-2 text-primary font-bold font-poppins uppercase tracking-wider text-sm bg-blue-50 px-3 py-1 rounded-md">
                            <Monitor className="w-4 h-4" />
                            <span>Contact Us</span>
                        </div>

                        <h2 className="font-poppins text-2xl md:text-3xl lg:text-4xl font-bold text-secondary leading-tight">
                            Have Questions? <span className="text-primary">Don't Hesitate to Contact Us</span>
                        </h2>

                        <p className="text-gray-500 text-lg font-poppins leading-relaxed max-w-lg">
                            We are passionate about transforming lives through education. Founded with a vision to make learning accessible to all, we believe in the power of knowledge to unlock opportunities and shape the future.
                        </p>

                        {/* Social Proof */}
                        <div className="flex items-center gap-5 mt-4">
                            <div className="flex -space-x-4">
                                {[1, 2, 3, 4].map(i => (
                                    <img
                                        key={i}
                                        src={`https://i.pravatar.cc/100?u=${i + 25}`}
                                        className="w-12 h-12 rounded-full border-[3px] border-white object-cover shadow-sm"
                                        alt="Reviewer"
                                    />
                                ))}
                            </div>
                            <div className="flex flex-col">
                                <div className="flex items-center gap-1">
                                    {[1, 2, 3, 4, 5].map(star => (
                                        <span key={star} className="text-yellow-400 text-lg">★</span>
                                    ))}
                                </div>
                                <span className="text-gray-700 font-bold font-poppins text-sm">
                                    2.5k+ reviews (4.95 of 5)
                                </span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Side: Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="bg-white p-8 lg:p-10 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 w-full"
                    >
                        <form
                            action="https://formsubmit.co/aindhinbackup@gmail.com"
                            method="POST"
                            onSubmit={handleSubmit}
                            className="flex flex-col gap-5"
                        >
                            {/* FormSubmit Configuration */}
                            <input type="hidden" name="_subject" value="New Submission from Aindhin Contact Form" />
                            <input type="hidden" name="_cc" value="info.aindhin@gmail.com,connect@aindhin.com" />
                            <input type="hidden" name="_captcha" value="false" />
                            <input type="hidden" name="_next" value={typeof window !== 'undefined' ? window.location.href : 'http://localhost:5173/contact-us'} />
                            <input type="hidden" name="_template" value="table" />

                            {status === 'success' && (
                                <div className="flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-700 text-sm font-semibold">
                                    <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                                    <span>Thank you! Your message has been sent to both the admin and backup email. We will get back to you shortly.</span>
                                </div>
                            )}

                            {status === 'error' && (
                                <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm font-semibold">
                                    <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
                                    <span>{errorMessage || 'Failed to submit message. Please try again.'}</span>
                                </div>
                            )}

                            {/* Name */}
                            <div className="flex flex-col gap-2">
                                <label className="text-gray-700 font-bold font-poppins text-sm">Name <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter Your Name"
                                    required
                                    className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-poppins bg-gray-50/50 focus:bg-white"
                                />
                            </div>

                            {/* Email */}
                            <div className="flex flex-col gap-2">
                                <label className="text-gray-700 font-bold font-poppins text-sm">Email <span className="text-red-500">*</span></label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Email Address"
                                    required
                                    className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-poppins bg-gray-50/50 focus:bg-white"
                                />
                            </div>

                            {/* Phone */}
                            <div className="flex flex-col gap-2">
                                <label className="text-gray-700 font-bold font-poppins text-sm">Phone Number <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="Enter your Phone Number"
                                    required
                                    className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-poppins bg-gray-50/50 focus:bg-white"
                                />
                            </div>

                            {/* Message */}
                            <div className="flex flex-col gap-2">
                                <label className="text-gray-700 font-bold font-poppins text-sm">Message <span className="text-red-500">*</span></label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows="4"
                                    required
                                    className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all resize-none font-poppins bg-gray-50/50 focus:bg-white"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className="mt-2 bg-primary text-white py-4 rounded-xl font-bold font-poppins text-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20 active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer"
                            >
                                {status === 'loading' ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        <span>Submitting...</span>
                                    </>
                                ) : (
                                    'Submit Form'
                                )}
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
            {/* --- SECTION 3: Download App Section --- */}
            <section className="py-12 px-6 md:px-12 bg-white flex justify-center relative overflow-hidden">
                <div className="max-w-[1000px] w-full bg-gradient-to-br from-[#002FA7] via-[#0051D4] to-[#4FA1FF] rounded-[40px] px-6 py-10 md:px-12 md:py-12 relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl z-10">

                    {/* Content */}
                    <motion.div
                        variants={fadeIn("right", 0.2)}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className="flex flex-col items-start text-white max-w-xl z-20 space-y-6"
                    >
                        <span className="text-white/80 font-poppins text-lg font-medium tracking-wide uppercase">Mobile App</span>
                        <h2 className="font-poppins text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">
                            <span className="text-white">Download Our </span><span className="text-blue-200">Mobile Application!</span>
                        </h2>
                        <p className="text-white/90 text-lg leading-relaxed font-poppins max-w-lg">
                            Aindhin is an edutech platform that makes learning simple, interactive, and accessible from anywhere. Explore lessons, quizzes, and progress tracking right from your phone.
                            <br /><br />
                            Stay ahead in your studies and keep learning on the go with the Aindhin mobile app.
                        </p>

                        <div className="hidden lg:block">
                            <button
                                onClick={() => navigate('/download-app')}
                                className="flex items-center gap-2 bg-primary hover:bg-[#1D4ED8] text-white px-8 py-4 rounded-xl font-bold font-poppins transition-all shadow-xl text-lg mt-4 group"
                            >
                                Download App
                                <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                            </button>
                        </div>
                    </motion.div>

                    {/* Image */}
                    <div className="relative z-20 w-full lg:w-[45%] flex flex-col items-center lg:items-end">
                        <motion.div
                            animate={{ y: [0, -15, 0] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            className="relative w-full max-w-[380px]"
                        >
                            <img
                                src={mobilePicImg}
                                alt="Aindhin Mobile App"
                                className="w-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
                            />
                        </motion.div>

                        {/* Mobile Button (Visible only on mobile/tablet, appearing after image) */}
                        <div className="block lg:hidden mt-8 w-full flex justify-center">
                            <button
                                onClick={() => navigate('/download-app')}
                                className="flex items-center gap-2 bg-primary hover:bg-[#1D4ED8] text-white px-8 py-4 rounded-xl font-bold font-poppins transition-all shadow-xl text-lg group"
                            >
                                Download App
                                <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-[-100px] left-[-100px] w-80 h-80 bg-white/10 rounded-full blur-[80px]"></div>
                <div className="absolute bottom-[-150px] right-[-100px] w-[500px] h-[500px] bg-blue-400/20 rounded-full blur-[100px]"></div>
            </section >
        </div >
    );
};

// Helper Component for Contact Cards
const ContactCard = ({ icon, title, content, linkText, href, delay }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay }}
            className="flex flex-col items-start gap-4 p-6 hover:bg-gray-50 rounded-2xl transition-colors cursor-default border border-transparent hover:border-gray-100"
        >
            <div className="w-14 h-14 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-center mb-2 bg-white">
                {icon}
            </div>

            <h3 className="text-xl font-bold text-secondary font-poppins">
                {title}
            </h3>

            <p className="text-gray-500 font-poppins text-sm leading-relaxed min-h-[60px]">
                {content}
            </p>

            {href ? (
                <a 
                    href={href}
                    target={href.startsWith('http') ? "_blank" : undefined}
                    rel={href.startsWith('http') ? "noopener noreferrer" : undefined}
                    className="text-primary text-sm font-medium border-b border-primary pb-0.5 cursor-pointer hover:opacity-80 transition-opacity no-underline"
                >
                    {linkText}
                </a>
            ) : (
                <span className="text-primary text-sm font-medium border-b border-primary pb-0.5 cursor-pointer hover:opacity-80 transition-opacity">
                    {linkText}
                </span>
            )}
        </motion.div>
    );
};

export default ContactUs;
