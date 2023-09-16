import React from 'react';

const ContactPage = () => {
    return(
      <div  className="py-8 px-4">
        <h1 className="text-3xl font-semibold mb-4">Contact Us</h1>
        <p className="text-gray-600 mb-6">
        Have questions, suggestions, or feedback? We'd love to hear from you! Feel free to get in touch
        with us using the contact details provided below.

          
          socialMedia:
          platform: 'Twitter',
          link: 'https://twitter.com/moviescoop'

          platform: 'Facebook',
          link: 'https://www.facebook.com/moviescoop'

          platform: 'Instagram',
          link: 'https://www.instagram.com/moviescoop'
        </p>

        <style jsx>{`
        .py-8 {
          padding-top: 2rem;
          padding-bottom: 2rem;
        }
        .text-3xl {
          font-size: 1.875rem;
        }
        /* Add more custom styles as needed */
      `}</style>
    </div>
  );
};

export default ContactPage;