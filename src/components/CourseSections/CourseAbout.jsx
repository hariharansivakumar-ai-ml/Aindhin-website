import React from 'react';

const CourseAbout = ({ title = "About This Course", paragraphs }) => {
    return (
        <section className="fs-card">
            <h2>{title}</h2>
            <div className="fs-about-text">
                {paragraphs.map((p, idx) => (
                    <p key={idx} className={idx < paragraphs.length - 1 ? 'mb-4' : ''}>
                        {p}
                    </p>
                ))}
            </div>
        </section>
    );
};

export default CourseAbout;
