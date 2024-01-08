import React from 'react';
import { Helmet } from 'react-helmet';

const FAQ = () => {
    return (
        <div className='space-y-7'>
            <Helmet>
                <meta charSet="utf-8" />
                <title>FAQ</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
            
                    <h2 className='text-3xl font-bold text-center'>Some common questions</h2>
            <div tabIndex={0} className="collapse collapse-plus border border-base-300 bg-base-200">
                <div className="collapse-title text-xl font-medium">
                How do I make a reservation at BoBo Hotel?
                </div>
                <div className="collapse-content">
                    <p>You can make a reservation by visiting our website at [insert website URL], or by calling our reservation line at [insert reservation phone number]. You can also email us at [insert reservation email].</p>
                </div>
            </div>

            <div tabIndex={0} className="collapse collapse-plus border border-base-300 bg-base-200">
                <div className="collapse-title text-xl font-medium">
                What are the check-in and check-out times at BoBo Hotel?
                </div>
                <div className="collapse-content">
                    <p>Check-in time is at 3:00 PM, and check-out time is at 11:00 AM.</p>
                </div>
            </div>

            <div tabIndex={0} className="collapse collapse-plus border border-base-300 bg-base-200">
                <div className="collapse-title text-xl font-medium">
                Is early check-in or late check-out available?
                </div>
                <div className="collapse-content">
                    <p>Early check-in and late check-out requests are subject to availability and may incur an additional fee. Please contact the front desk for more information.</p>
                </div>
            </div>

            <div tabIndex={0} className="collapse collapse-plus border border-base-300 bg-base-200">
                <div className="collapse-title text-xl font-medium">
                Does BoBo Hotel offer parking facilities?
                </div>
                <div className="collapse-content">
                    <p>Yes, we have on-site parking available for guests. Please inquire about parking rates and availability at the front desk.</p>
                </div>
            </div>

            <div tabIndex={0} className="collapse collapse-plus border border-base-300 bg-base-200">
                <div className="collapse-title text-xl font-medium">
                Are pets allowed at BoBo Hotel?
                </div>
                <div className="collapse-content">
                    <p>We apologize, but BoBo Hotel is not pet-friendly.</p>
                </div>
            </div>


        </div>
    );
};

export default FAQ;