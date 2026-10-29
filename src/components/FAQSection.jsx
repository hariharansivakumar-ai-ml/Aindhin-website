import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const FAQSection = ({ faqs, title = "Frequently Asked Questions", subtitle = "Find answers to some of the most common questions." }) => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFaq = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    // Generate JSON-LD Schema string
    const generateSchema = () => {
        const schema = {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map((faq) => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": faq.answer
                }
            }))
        };
        return JSON.stringify(schema);
    };

    return (
        <section className="py-20 bg-gray-50/50">
            <div className="max-w-[1000px] mx-auto px-6 lg:px-12">

                {/* Header */}
                <div className="text-center mb-16">
                    <span className="font-poppins text-primary font-bold text-xs uppercase tracking-widest bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-100 inline-block mb-3">
                        FAQS
                    </span>
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-secondary font-poppins mb-4 tracking-tight leading-tight">
                        {typeof title === 'string' && title.includes(' ') ? (
                            (() => {
                                const words = title.trim().split(/\s+/);
                                const last = words.slice(-1).join('');
                                const rest = words.slice(0, -1).join(' ');
                                return (
                                    <>
                                        <span>{rest} </span>
                                        <span className="text-primary">{last}</span>
                                    </>
                                );
                            })()
                        ) : title}
                    </h2>
                    <p className="text-gray-500 text-sm md:text-base font-poppins max-w-2xl mx-auto">
                        {subtitle}
                    </p>
                </div>

                {/* FAQ List */}
                <div className="space-y-4">
                    {faqs.map((faq, index) => {
                        const isOpen = openIndex === index;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                className={`border ${isOpen ? 'border-primary/30 shadow-md shadow-primary/5 bg-white' : 'border-gray-100 bg-white hover:border-gray-200 hover:shadow-sm'} rounded-2xl overflow-hidden transition-all duration-300`}
                            >
                                <button
                                    onClick={() => toggleFaq(index)}
                                    className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                                >
                                    <span className="text-lg font-bold text-gray-800 pr-8">{faq.question}</span>
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors duration-300 ${isOpen ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200'}`}>
                                        <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`} />
                                    </div>
                                </button>

                                <AnimatePresence>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                                        >
                                            <div className="px-6 pb-6 pt-0">
                                                <div className="w-full h-px bg-gray-100 mb-6" />
                                                <p className="text-gray-600 leading-relaxed font-inter">
                                                    {faq.answer}
                                                </p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </div>

            </div>

            {/* Semantic JSON-LD for Search Engines - vital for SEO */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: generateSchema() }}
            />
        </section>
    );
};

export default FAQSection;
