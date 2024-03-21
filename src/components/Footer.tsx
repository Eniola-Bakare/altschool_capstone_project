function Footer() {
  return (
    <section className="bg-rgba footer-wrapper flex justify-center items-center gap-8 w-full lg:h-[429px]">
      <div className="text-logo-links flex flex-col py-10 gap-6 lg:gap-0 lg:py-0 lg:flow-row justify-between w-[90%] ">
        <p className="logo-text text-blue font-bold text-5xl text-center md:text-left">CHATTER</p>

        <div className="footer-links flex flex-col text-center md:text-left lg:flex-row justify-between md:w-full lg:w-[70%]">
          <ul>
            <li className="font-medium text-3xl md:text-2xl pb-8">Explore</li>
            <li className="text-lg text-black pb-4">Community</li>
            <li className="text-lg text-black pb-4">Trending blogs</li>
            <li className="text-lg text-black pb-4">Chatter for teams</li>
          </ul>
          <ul>
            <li className="font-medium text-3xl md:text-2xl pb-8">Support</li>
            <li className="text-lg text-black pb-4">Support docs</li>
            <li className="text-lg text-black pb-4">Join slack</li>
            <li className="text-lg text-black pb-4">Contact</li>
          </ul>
          <ul>
            <li className="font-medium text-3xl md:text-2xl pb-8">
              Official blog
            </li>
            <li className="text-lg text-black pb-4">Official blog</li>
            <li className="text-lg text-black pb-4">Trending blogs</li>
            <li className="text-lg text-black pb-4">Engineering blog</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Footer;
