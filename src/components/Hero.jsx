import React from "react";

export default function Hero() {
  return (
    <section
      id="home"
      className="hero bg-gradient-to-b from-[color:var(--dark-bg)] to-[color:var(--darker-bg)]"
    >
      <div className="mx-auto w-11/12 max-w-1600 px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-[calc(100vh-80px)]">
          <div className="order-1 lg:order-2 flex items-center justify-center lg:justify-end">
            <div className="relative">
              <img
                src="/media/mypic.png"
                alt="Mohamed"
                loading="lazy"
                className="w-[300px] sm:w-[260px] md:w-[310px] lg:w-[400px] xl:w-[430px] rounded-lg object-cover object-top lg:object-center"
              />
            </div>
          </div>

          <div className="order-2 lg:order-1 mx-auto lg:mx-0 w-full max-w-xl lg:text-left text-center">
            <h1 className="text-[3.5rem] leading-tight font-semibold mb-5 md:text-[3.5rem] sm:text-3xl">
              Hi, I'm Mohamed
            </h1>

            <h2 className="gradient-heading text-2xl md:text-[1.8rem] mb-5">
              Full-Stack Developer exploring the DevOps world
            </h2>

            <p className=" mb-6 opacity-90 leading-8 text-xl">
              Passionate about creating smooth user experiences on the frontend,
              and now focused on mastering DevOps tools and practices to deliver
              scalable, reliable systems.
            </p>

            <a
              href="media/myresume.pdf"
              target="_blank"
              rel="noreferrer"
              className="btn-primary inline-flex items-center gap-2"
            >
              <i className="fas fa-external-link-alt" />
              My Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}