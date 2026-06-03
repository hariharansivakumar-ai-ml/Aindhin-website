import React from 'react';

const CourseCompanies = ({ title, subtitle, logos }) => {
    return (
        <section className="fs-companies fs-section">
            <div className="fs-companies-inner">
                <h2>{title}</h2>
                {subtitle && <p>{subtitle}</p>}
                <div className="fs-logo-row">
                    {logos.map((logo, idx) => (
                        <div className="fs-logo-card" key={idx}>
                            <img src={logo.src} alt={logo.alt} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CourseCompanies;
