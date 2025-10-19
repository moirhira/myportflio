

function Contact() {
        return (
                <section id="contact" class="contact">
      <div class="container">
        <h2 class="gradient-heading">Contact</h2>
        <div class="contact-content">
          <div class="contact-info">
            <h3 class="gradient-heading">Drop me a message</h3>
            <p>
              Whether you have a question or just want to say hi, my inbox is
              always open. I'll get back to you as soon as possible!
            </p>
            <div class="contact-item">
              <div class="icon-box">
                <i class="fas fa-phone"></i>
              </div>
              <p>+212 684 236 247</p>
            </div>
            <div class="contact-item">
              <div class="icon-box">
                <i class="fas fa-envelope"></i>
              </div>
              <p>irhirallah.mohammed@gmail.com</p>
            </div>
            <div class="contact-item">
              <div class="icon-box">
                <i class="fas fa-map-marker-alt"></i>
              </div>
              <p>Rabat, Morocco</p>
            </div>
          </div>

          <form
            action="https://formspree.io/f/xrbylwqq"
            method="POST"
            class="contact-form"
          >
            <div class="form-group">
              <label for="name">Name</label>
              <input type="text" id="name" name="name" required />
            </div>
            <div class="form-group">
              <label for="email">Email</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div class="form-group">
              <label for="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                required
              ></textarea>
            </div>
            <button type="submit" class="btn-primary">Send message</button>
          </form>
        </div>
      </div>
    </section>
        );
}



export default Contact;