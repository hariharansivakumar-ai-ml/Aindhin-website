import React from 'react';

const CourseCareers = ({ title, subtitle, cards }) => {
    return (
        <section className="fs-more fs-section">
            <div className="fs-more-inner">
                <div className="fs-more-header">
                    <h2>{title}</h2>
                    {subtitle && <p>{subtitle}</p>}
                </div>

                <div className="fs-more-grid">
                    {cards.map((card, idx) => {
                        const Icon = card.icon;
                        return (
                            <div className="fs-more-card" key={idx}>
                                <div className="fs-more-top">
                                    <div className="fs-more-icon">
                                        {Icon && <Icon size={24} />}
                                    </div>
                                    <div>
                                        <h3 className="fs-more-title">{card.title}</h3>
                                        <p className="fs-more-text">{card.description}</p>
                                    </div>
                                </div>
                                {card.type === 'logos' && card.logos && (
                                    <div className="fs-tool-logos">
                                        {card.logos.map((logo, i) => (
                                            <img className="fs-tool-logo" src={logo.src} alt={logo.alt} key={i} />
                                        ))}
                                    </div>
                                )}
                                {card.type === 'tags' && card.tags && (
                                    <div className="fs-roles-image">
                                        {card.tags.map((tag, i) => (
                                            <span className="fs-role-tag" key={i}>{tag}</span>
                                        ))}
                                    </div>
                                )}
                                {card.type === 'journey' && card.steps && (
                                    <div className="fs-journey">
                                        {card.steps.map((step, i) => (
                                            <div className="fs-journey-step" key={i}>{step}</div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default CourseCareers;
