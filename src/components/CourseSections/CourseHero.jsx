import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const CourseHero = ({ badge, title, subtitle, meta, bgImage, enrollLink }) => {
    return (
        <section
            className="fs-hero fs-section"
            style={{
                background: `linear-gradient(120deg,rgba(15,23,42,.96),rgba(37,99,235,.7)), url(${bgImage}) center/cover no-repeat`
            }}
        >
            <div className="flex flex-col md:flex-row justify-between items-start max-w-[1200px] mx-auto w-full gap-8">
                <div className="fs-hero-content">
                    <span className="fs-badge">{badge}</span>
                    <h1 className="fs-hero-title" dangerouslySetInnerHTML={{ __html: title }}></h1>
                    <p className="fs-hero-sub" dangerouslySetInnerHTML={{ __html: subtitle }}></p>
                    <div className="fs-hero-meta">
                        {meta.map((m, i) => (
                            <span key={i}>{m}</span>
                        ))}
                    </div>
                </div>
                {enrollLink && (
                    <div className="flex-shrink-0 w-full md:w-auto mt-6 md:mt-12">
                        <a 
                            href={enrollLink} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-full shadow-[0_10px_30px_rgba(37,99,235,0.4)] hover:shadow-[0_20px_40px_rgba(37,99,235,0.6)] hover:-translate-y-1 transition-all duration-300 font-inter text-lg w-full md:w-auto animate-color-blink"
                        >
                            Enroll Now <ArrowUpRight className="w-5 h-5" />
                        </a>
                    </div>
                )}
            </div>
        </section>
    );
};

export default CourseHero;
