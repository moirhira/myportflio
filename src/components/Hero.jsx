





function Hero() {
  return (
    <section id="home" className="hero min-h-screen flex items-center py-[150px] md:py-[100px] bg-gradient-to-b from-[color:var(--dark-bg)] to-[color:var(--darker-bg)]">
      <div className="mx-auto w-11/12 max-w-1600 px-5">
        <div className="flex gap-8 items-center justify-between flex-col-reverse md:flex-row text-center md:text-left hero-content">
          <div className="flex-1 hero-text">
            <h1 className="text-[3.5rem] font-semibold mb-3 md:text-[3.5rem] sm:text-3xl">Hi, I'm Mohamed</h1>
            <h2 className="gradient-heading text-2xl md:text-[1.8rem] mb-5">Full-Stack Developer exploring the DevOps world</h2>
            <p className="mb-6 opacity-90">
              Passionate about creating smooth user experiences on the frontend, and now focused on mastering DevOps tools and practices to deliver scalable, reliable systems.
            </p>

            <a href="media/Mohamed_Irhirallah_Resume.pdf" download target="_blank" rel="noreferrer" className="btn-primary inline-flex items-center gap-2">
              <i className="fas fa-external-link-alt"></i>
              My Resume
            </a>
          </div>

          <div className="flex-1 hero-image text-right mb-8 md:mb-0">
            <img src="/media/mypic.png" alt="Mohamed" className="w-full max-w-[420px] rounded-lg shadow-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}


export default Hero;
