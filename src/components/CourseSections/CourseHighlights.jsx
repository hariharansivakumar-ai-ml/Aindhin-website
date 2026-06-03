import React from 'react';

const CourseHighlights = ({ title, subtitle, cards, dashboard }) => {
    return (
        <section className="fs-highlights fs-section">
            <div className="fs-highlights-inner">
                <div>
                    <div className="fs-highlights-heading">
                        <h2>{title}</h2>
                        {subtitle && <p>{subtitle}</p>}
                    </div>

                    <div className="fs-highlight-grid">
                        {cards.map((card, idx) => {
                            const Icon = card.icon;
                            return (
                                <div className="fs-highlight-card" key={idx}>
                                    <div className="fs-highlight-icon">
                                        {Icon && <Icon size={24} />}
                                    </div>
                                    <h3>{card.title}</h3>
                                    <p>{card.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {dashboard && (
                    <div className="fs-highlights-visual">
                        <div className="fs-dashboard">
                            <div className="fs-dashboard-header">
                                <span>{dashboard.title}</span>
                                <div className="fs-dashboard-dots">
                                    <span></span><span></span><span></span>
                                </div>
                            </div>
                            <div className="fs-dashboard-graph">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <div className="fs-dashboard-bar" key={i}></div>
                                ))}
                            </div>
                            <div className="fs-dashboard-tags">
                                {dashboard.tags.map((tag, idx) => (
                                    <span key={idx}>{tag}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default CourseHighlights;
