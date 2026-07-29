import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, CheckCircle, Monitor, Smartphone, BookOpen, BarChart3, Users, Rocket } from 'lucide-react';
import { USER_APP_URL } from '../utils/apiClient';
import './DownloadApp.css';
import downloadAppImg from '../assets/download image.webp';

const DownloadApp = () => {
    React.useEffect(() => {
        document.title = "Aindhin Web App: Learn Smarter Anywhere, Anytime";
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute("content", "Aindhin is an online learning platform in India offering skill-based and career-oriented courses.");
        }
    }, []);

    return (
        <div className="download-page-section font-inter">
            <div className="download-container">

                {/* Left Content */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="download-content"
                >
                    <span className="web-app-live-badge">Web App Live</span>

                    <h1 className="download-title">
                        Access the Future of Learning: Start Your Journey with the Aindhin Web App
                    </h1>

                    <p className="download-description">
                        The Aindhin web app is ready. Jump into interactive lessons, track your progress, and collaborate with your classroom — right from your browser. Mobile app is in development.
                    </p>

                    {/* Features */}
                    <div className="feature-badges">
                        <div className="feature-badge">
                            <div className="feature-icon-circle bg-pink-100 text-pink-600">
                                <BookOpen size={14} />
                            </div>
                            <span>Interactive lessons</span>
                        </div>
                        <div className="feature-badge">
                            <div className="feature-icon-circle bg-green-100 text-green-600">
                                <BarChart3 size={14} />
                            </div>
                            <span>Progress tracking</span>
                        </div>
                        <div className="feature-badge">
                            <div className="feature-icon-circle bg-yellow-100 text-yellow-600">
                                <Users size={14} />
                            </div>
                            <span>Classroom & collaboration</span>
                        </div>
                    </div>

                    {/* CTA Button */}
                    <a
                        href={USER_APP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="open-web-app-btn no-underline hover:text-white"
                    >
                        <Rocket size={20} />
                        Open Web App
                    </a>

                    {/* Status Cards */}
                    <div className="status-cards">
                        <div className="status-card">
                            <div className="status-icon-box bg-green-50 text-green-600">
                                <Monitor size={24} />
                            </div>
                            <div className="status-info">
                                <h4>Website Platform</h4>
                                <p>Full desktop experience for learners.</p>
                            </div>
                            <span className="status-badge live">Live</span>
                        </div>

                        <div className="status-card">
                            <div className="status-icon-box bg-orange-50 text-orange-400">
                                <Smartphone size={24} />
                            </div>
                            <div className="status-info">
                                <h4>Mobile App</h4>
                                <p>Learn on the go — coming soon.</p>
                            </div>
                            <span className="status-badge coming-soon">Coming soon</span>
                        </div>
                    </div>

                    <p className="footer-note">
                        Web app is live at <a href={USER_APP_URL} className="text-blue-600 underline">{USER_APP_URL.replace(/^https?:\/\//, '')}</a>. No installation required.
                    </p>
                </motion.div>


                {/* Right Image */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="download-image-container"
                >
                    <img
                        src={downloadAppImg}
                        alt="Aindhin App Preview"
                        className="download-app-image"
                    />
                </motion.div>

            </div>
        </div>
    );
};

export default DownloadApp;
