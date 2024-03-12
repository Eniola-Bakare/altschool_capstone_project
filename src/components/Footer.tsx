function Footer() {
  return (
    <section className="bg-rgba footer-wrapper flex justify-center items-center gap-8 w-full h-[429px]">
      <div className="text-logo-links flex justify-between w-[90%]">
        <p className="logo-text text-blue font-bold text-5xl">CHATTER</p>

        <div className="footer-links flex justify-between w-[70%]">
          <ul>
            <li className="font-medium text-2xl pb-8">Explore</li>
            <li className="text-lg text-black pb-4">Community</li>
            <li className="text-lg text-black pb-4">Trending blogs</li>
            <li className="text-lg text-black pb-4">Chatter for teams</li>
          </ul>
          <ul>
            <li className="font-medium text-2xl pb-8">Support</li>
            <li className="text-lg text-black pb-4">Support docs</li>
            <li className="text-lg text-black pb-4">Join slack</li>
            <li className="text-lg text-black pb-4">Contact</li>
          </ul>
          <ul>
            <li className="font-medium text-2xl pb-8">Official blog</li>
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
