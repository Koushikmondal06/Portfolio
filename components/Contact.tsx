"use client";

const Contact = () => {
  return (
    <section
      id="contact"
      className="py-20 bg-gradient-to-b from-black to-slate-900 text-white"
      aria-labelledby="contact-title"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Section Header */}
        <h2
          id="contact-title"
          className="text-3xl sm:text-4xl font-bold mb-4"
        >
          Contact Me
        </h2>
        <div className="w-24 h-1 bg-emerald-500 mx-auto mb-6" />

        {/* Subtitle */}
        <p className="text-gray-400 text-lg mb-8">
          I'd love to hear from you! Feel free to reach out via email:
        </p>

        {/* Email Display */}
        <a
          href="mailto:your.email@example.com"
          className="text-emerald-400 hover:text-emerald-500 text-xl underline break-words"
          aria-label="Send email"
        >
          koushikmondal0069@gmail.com
        </a>
      </div>
    </section>
  );
};

export default Contact;
