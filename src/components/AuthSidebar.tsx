function AuthSidebar() {
  return (
    <aside
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('./src/assets/authSidebar.png')",
      }}
      className="bg-cover w-[35%] h-screen bg-center flex justify-center items-center "
    >
      <div className="auth-side-text w-[90%]">
        <h1 className="text-5xl font-bold text-white leading-[72px] text-center">
          Chatter
        </h1>
        <p className="text-white text-xl font-medium leading-[30px]">
          Unleash the Power of Words, Connect with Like-minded Readers and
          Writers
        </p>
      </div>
    </aside>
  );
}

export default AuthSidebar;
