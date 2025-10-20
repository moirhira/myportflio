import React from "react";

export default function About() {
  return (
    <section id="about" className="about bg-[color:var(--darker-bg)] text-center py-25 pt-10 pb-10 min-h-[calc(90vh)]">
      <div className="mx-auto w-11/12 max-w-1600 px-5">
        <h2 className="gradient-heading text-3xl mb-6">About</h2>
        <p className="mx-auto max-w-3xl mb-8 leading-relaxed opacity-90 tracking-wide  leading-8">
          I'm a software engineering student at 1337 UM6P with a Bac+2 in full-stack development (React &amp;
          Laravel). Over the past 3 years, I've built web applications with clean code, strong UI/UX, and
          efficient functionality—delivering freelance projects that solved real client needs. While I've
          specialized more in frontend development, I'm now diving into DevOps—learning containerization,
          automation, and cloud deployment. My goal is to grow into a well-rounded engineer who can both craft
          seamless user experiences and ensure scalable, reliable infrastructure behind the scenes.
        </p>

        <h3 className="gradient-heading text-2xl mb-6 pt-20">Skills</h3>

        <div className="social-icons flex flex-wrap justify-center gap-4 max-w-[350px] mx-auto">
          <i className="fa-brands fa-html5 w-10 h-10 flex items-center justify-center rounded-full bg-[rgba(255,255,255,0.06)]"></i>
          <i className="fa-brands fa-css3-alt w-10 h-10 flex items-center justify-center rounded-full bg-[rgba(255,255,255,0.06)]"></i>
          <i className="fa-brands fa-js w-10 h-10 flex items-center justify-center rounded-full bg-[rgba(255,255,255,0.06)]"></i>
          <i className="fa-brands fa-node w-10 h-10 flex items-center justify-center rounded-full bg-[rgba(255,255,255,0.06)]"></i>
          <i className="fa-brands fa-react w-10 h-10 flex items-center justify-center rounded-full bg-[rgba(255,255,255,0.06)]"></i>
          <i className="fa-brands fa-git w-10 h-10 flex items-center justify-center rounded-full bg-[rgba(255,255,255,0.06)]"></i>
          <i className="fa-brands fa-docker w-10 h-10 flex items-center justify-center rounded-full bg-[rgba(255,255,255,0.06)]"></i>
          <i className="fa-brands fa-linux w-10 h-10 flex items-center justify-center rounded-full bg-[rgba(255,255,255,0.06)]"></i>
        </div>
      </div>
    </section>
  );
}