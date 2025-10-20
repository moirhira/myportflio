

function Navbar() {
  return(
    <nav className="fixed top-0 left-0 w-full z-50 navbar-backdrop py-5">
      <div className="mx-auto w-11/12 max-w-1600 px-5 flex justify-center lg:justify-evenly">
        <div className="flex gap-4 md:gap-8 lg:gap-[200px] items-center nav-links">
          <a href="#home" className="px-3 transition-all ease-in-out duration-150  py-2 font-medium tracking-wider text-sm text-[color:var(--light-text)] hover:text-[color:var(--accent-text)]">
            HOME
          </a>
          <a href="#about" className="px-3 transition-all ease-in-out duration-150  py-2 font-medium tracking-wider text-sm hover:text-[color:var(--accent-text)]">ABOUT</a>
          <a href="#projects" className="px-3 transition-all ease-in-out duration-150 transition-alll py-2 font-medium tracking-wider text-sm hover:text-[color:var(--accent-text)]">PROJECTS</a>
          <a href="#contact" className="px-3  transition-all ease-in-out duration-150  py-2 font-medium tracking-wider text-sm hover:text-[color:var(--accent-text)]">CONTACT</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;