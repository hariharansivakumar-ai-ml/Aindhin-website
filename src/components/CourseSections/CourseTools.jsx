import React from 'react';

const CourseTools = ({ title, subtitle, tools }) => {
    return (
        <section className="fs-tools fs-section">
            <div className="fs-tools-inner">
                <h2>{title}</h2>
                {subtitle && <p>{subtitle}</p>}

                <div className="fs-tools-grid">
                    {tools.map((tool, idx) => (
                        <div className="fs-tools-card" key={idx}>
                            <img className="fs-tools-logo" src={tool.logo} alt={tool.name} />
                            <span>{tool.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CourseTools;
