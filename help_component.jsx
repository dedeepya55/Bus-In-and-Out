import React, { useState } from 'react';
import '../css_files/help.css';

const HelpComponent = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const faqData = [
        { question: 'How can I view the arrival and departure time graphs?', answer: 'Click "Dashboard" on the home page, enter the bus details (like the bus number), and you will be redirected to the dashboard displaying the arrival and departure time graphs.' },
        { question: 'Can I view past bus arrival and departure data?', answer: 'Yes, you can see past bus arrival and departure times by selecting a different date on the calendar for the specific bus shown on the dashboard.' },
        { question: 'How often is the bus schedule updated?', answer: 'The bus schedule is updated regularly to ensure the information is accurate and reflects any changes in arrival and departure times.' },
        { question: 'Can I download or print the bus information?', answer: 'Yes, you can download or print the bus information directly from the dashboard.' },
        { question: 'Is real-time bus tracking available?', answer: 'No, only information about the buses is available, not real-time tracking.' },
        { question: 'Who can update the bus information on the dashboard?', answer: 'Only authorized personnel have access to update the bus information on the dashboard.' },
    ];

    return (
        <div className='component6'>
            <div className="faq-container">
                <h1>Frequently Asked Questions</h1>
                <div className="faq">
                    {faqData.map((item, index) => (
                        <div key={index} className="faq-item">
                            <button
                                className={`faq-question ${openIndex === index ? 'active' : ''}`}
                                onClick={() => toggleFAQ(index)}
                            >
                                {item.question}
                                <span className="faq-icon">{openIndex === index ? '>' : '+'}</span>
                            </button>
                            <div className="faq-answer" style={{ maxHeight: openIndex === index ? '200px' : '0' }}>
                                <p>{item.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HelpComponent;
