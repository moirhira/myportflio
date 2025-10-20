import React from "react";

export default function About() {
  const icons = [
    {
      id: 0,
      name: "fa-html5"
    },
    {
      id: 1,
      name: "fa-css3-alt"
    },
    {
      id: 2,
      name: "fa-js"
    },

    {
      id: 3,
      name: "fa-node"
    },
    {
      id: 4,
      name: "fa-react"
    },
    {
      id: 5,
      name: "fa-git"
    },
    {
      id: 6,
      name: "fa-docker"
    },
    {
      id: 7,
      name: "fa-linux"
    },
  ]
  return (
    <section id="about" className="about bg-[color:var(--darker-bg)] text-center py-36">
      <div className="mx-auto w-11/12 max-w-1600 px-5">
        <h2 className="gradient-heading text-3xl mb-6">About</h2>
        <p className="mx-auto max-w-3xl mb-8 opacity-90 leading-8 tracking-wide ">
          I'm a software engineering student at 1337 UM6P with a Bac+2 in full-stack development (React &amp;
          Laravel). Over the past 3 years, I've built web applications with clean code, strong UI/UX, and
          efficient functionality—delivering freelance projects that solved real client needs. While I've
          specialized more in frontend development, I'm now diving into DevOps—learning containerization,
          automation, and cloud deployment. My goal is to grow into a well-rounded engineer who can both craft
          seamless user experiences and ensure scalable, reliable infrastructure behind the scenes.
        </p>

        <h3 className="gradient-heading text-2xl mb-6 pt-20">Skills</h3>

        <div className="social-icons flex flex-wrap justify-center gap-4 max-w-[350px] mx-auto">
          {icons.map((icon) => {
            return (
              <i icon={icon.id} className={`fa-brands ${icon.name} w-10 h-10 flex items-center justify-center rounded-full bg-[rgba(255,255,255,0.06)]`}></i>
            )
          })}
        </div>
      </div>
    </section>
  );
}