import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const HomeVideo = () => {
    const iframeRef = useRef(null);
    const containerRef = useRef(null);
    const [isIframeLoaded, setIsIframeLoaded] = useState(false);

    useEffect(() => {
        const handleIntersection = (entries) => {
            entries.forEach(entry => {
                const iframe = iframeRef.current;
                if (!iframe || !isIframeLoaded || !iframe.contentWindow) return;

                try {
                    if (entry.isIntersecting) {
                        // Play the video when visible in viewport
                        iframe.contentWindow.postMessage(
                            JSON.stringify({ event: 'command', func: 'playVideo', args: '' }), 
                            '*'
                        );
                    }
                } catch (error) {
                    console.error("Error communicating with YouTube Iframe:", error);
                }
            });
        };

        const observer = new IntersectionObserver(handleIntersection, {
            root: null, // viewport
            rootMargin: '0px',
            threshold: 0.25 // Trigger when 25% of the video container is visible
        });

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            if (containerRef.current) {
                observer.unobserve(containerRef.current);
            }
        };
    }, [isIframeLoaded]);

    return (
        <section ref={containerRef} className="py-12 md:py-16 px-6 lg:px-12 bg-gradient-to-b from-white to-slate-50 relative overflow-hidden">
            {/* Background decorative glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-[100px] pointer-events-none -z-10" />

            <div className="max-w-[800px] mx-auto text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-8 space-y-3"
                >
                    <span className="font-inter text-primary font-bold text-sm lg:text-base tracking-widest uppercase block">
                        Featured Video
                    </span>
                    <h2 className="font-inter text-2xl md:text-3xl lg:text-4xl font-extrabold text-secondary leading-tight">
                        See Aindhin in Action
                    </h2>
                    <p className="font-inter text-gray-500 text-sm lg:text-base max-w-xl mx-auto">
                        Explore our learning ecosystem, meet industry instructors, and see how our hands-on certification programs accelerate your career.
                    </p>
                </motion.div>

                {/* Video Card Container */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative rounded-2xl overflow-hidden shadow-xl border-[4px] border-white bg-slate-900 aspect-video"
                >
                    <iframe
                        ref={iframeRef}
                        className="w-full h-full"
                        src="https://www.youtube.com/embed/2l_fuvvs2M0?enablejsapi=1&autoplay=1&mute=1&rel=0&controls=1&loop=1&playlist=2l_fuvvs2M0"
                        title="Aindhin Platform Introduction Video"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        onLoad={() => setIsIframeLoaded(true)}
                    ></iframe>
                </motion.div>
            </div>
        </section>
    );
};

export default HomeVideo;
