import React from "react";

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative py-28 overflow-hidden"
      style={{ background: "var(--section-alt)", transition: "background 0.3s ease" }}
    >
      <div className="bg-dots" />

      <div className="relative z-10 mx-auto w-11/12 max-w-1600 px-5">
        <div className="text-center mb-14">
          <p className="section-label">Get in touch</p>
          <h2 className="gradient-heading text-3xl sm:text-4xl mb-4">Let's Connect!</h2>
          <p className="max-w-lg mx-auto" style={{ color: "var(--muted-text)" }}>
            Whether you have a question, an opportunity, or just want to say hi —
            my inbox is always open. I'll get back to you as soon as possible!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Info */}
          <div className="flex flex-col gap-5">
            <h3 className="gradient-heading text-2xl mb-2">Drop me a message</h3>

            <div className="glass-card p-5 flex items-center gap-4">
              <div className="icon-box w-11 h-11 flex items-center justify-center" style={{ color: "var(--cyan)" }}>
                <i className="fas fa-phone" />
              </div>
              <div>
                <p className="text-xs mb-0.5" style={{ color: "var(--muted-text)" }}>Phone</p>
                <p className="text-sm" style={{ color: "var(--white-text)" }}>+212 684 236 247</p>
              </div>
            </div>

            <div className="glass-card p-5 flex items-center gap-4">
              <div className="icon-box w-11 h-11 flex items-center justify-center" style={{ color: "var(--cyan)" }}>
                <i className="fas fa-envelope" />
              </div>
              <div>
                <p className="text-xs mb-0.5" style={{ color: "var(--muted-text)" }}>Email</p>
                <p className="text-sm" style={{ color: "var(--white-text)" }}>irhirallah.mohammed@gmail.com</p>
              </div>
            </div>

            <div className="glass-card p-5 flex items-center gap-4">
              <div className="icon-box w-11 h-11 flex items-center justify-center" style={{ color: "var(--cyan)" }}>
                <i className="fas fa-map-marker-alt" />
              </div>
              <div>
                <p className="text-xs mb-0.5" style={{ color: "var(--muted-text)" }}>Location</p>
                <p className="text-sm" style={{ color: "var(--white-text)" }}>Rabat, Morocco</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form
            action="https://formspree.io/f/xrbylwqq"
            method="POST"
            className="glass-card p-7 flex flex-col gap-5"
          >
            <div>
              <label htmlFor="name" className="block mb-2 text-sm font-medium" style={{ color: "var(--light-text)" }}>
                Name
              </label>
              <input
                id="name"
                name="name"
                required
                className="w-full px-4 py-3 rounded-lg text-sm focus:outline-none transition-colors"
                style={{
                  background: "var(--input-bg)",
                  border: "1px solid var(--input-border)",
                  color: "var(--light-text)",
                }}
              />
            </div>

            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium" style={{ color: "var(--light-text)" }}>
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full px-4 py-3 rounded-lg text-sm focus:outline-none transition-colors"
                style={{
                  background: "var(--input-bg)",
                  border: "1px solid var(--input-border)",
                  color: "var(--light-text)",
                }}
              />
            </div>

            <div>
              <label htmlFor="message" className="block mb-2 text-sm font-medium" style={{ color: "var(--light-text)" }}>
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                className="w-full px-4 py-3 rounded-lg text-sm resize-none focus:outline-none transition-colors"
                style={{
                  background: "var(--input-bg)",
                  border: "1px solid var(--input-border)",
                  color: "var(--light-text)",
                }}
              />
            </div>

            <button type="submit" className="btn-primary self-start">
              <i className="fas fa-paper-plane" />
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}