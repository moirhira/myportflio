import React from "react";

export default function Contact() {
  return (
    <section id="contact" className="contact bg-[color:var(--darker-bg)] text-center py-32">
      <div className="mx-auto w-11/12 max-w-1600 px-5">
        <h2 className="gradient-heading text-3xl mb-6">Contact</h2>

        <div className="contact-content flex flex-col md:flex-row gap-12 mt-8">
          <div className="contact-info flex-1 flex flex-col gap-6 items-start text-left">
            <h3 className="gradient-heading text-2xl">Drop me a message</h3>
            <p className="max-w-lg">
              Whether you have a question or just want to say hi, my inbox is always open. I'll get back to you
              as soon as possible!
            </p>

            <div className="contact-item flex items-center gap-4">
              <div className="icon-box w-10 h-10 flex items-center justify-center">
                <i className="fas fa-phone"></i>
              </div>
              <p>+212 684 236 247</p>
            </div>

            <div className="contact-item flex items-center gap-4">
              <div className="icon-box w-10 h-10 flex items-center justify-center">
                <i className="fas fa-envelope"></i>
              </div>
              <p>irhirallah.mohammed@gmail.com</p>
            </div>

            <div className="contact-item flex items-center gap-4">
              <div className="icon-box w-10 h-10 flex items-center justify-center">
                <i className="fas fa-map-marker-alt"></i>
              </div>
              <p>Rabat, Morocco</p>
            </div>
          </div>

          <form
            action="https://formspree.io/f/xrbylwqq"
            method="POST"
            className="contact-form flex-1 text-left"
          >
            <div className="form-group mb-4">
              <label htmlFor="name" className="block mb-2 font-medium text-sm">Name</label>
              <input
                id="name"
                name="name"
                required
                className="w-full px-4 py-3 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded text-[color:var(--light-text)]"
              />
            </div>

            <div className="form-group mb-4">
              <label htmlFor="email" className="block mb-2 font-medium text-sm">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full px-4 py-3 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded text-[color:var(--light-text)]"
              />
            </div>

            <div className="form-group mb-4">
              <label htmlFor="message" className="block mb-2 font-medium text-sm">Message</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                className="w-full px-4 py-3 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded text-[color:var(--light-text)] resize-none"
              />
            </div>

            <button type="submit" className="btn-primary">Send message</button>
          </form>
        </div>
      </div>
    </section>
  );
}