import Button from "../components/Button";
import Header from "../components/Header";

// type LandingPageProps = {}
function LandingPage() {
  return (
    <>
      {/* <div className="w-full  bg-yellow-800/10 flex justify-center"> */}
      {/* </div> */}
      <Header />
      <section
        className="bg-cover bg-center h-[746px] flex flex-col justify-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)),url('./src/assets/heroImage.png')",
        }}
      >
        <div className="hero-text self-center  flex flex-col gap-10">
          <h1 className="text-5xl font-bold text-white leading-[72px]">
            Welcome to Chatter: A Haven for Text-
            <br />
            Based Content
          </h1>
          <p className="text-white text-2xl font-medium w-[75%] leading-[36px]">
            Unleash the Power of Words, Connect with Like-minded Readers 
            and Writers
          </p>
          <Button
            name="Get started"
            type="primary"
            onClick={() => console.log("third -- get started")}
          />
        </div>
      </section>
    </>
  );
}

export default LandingPage;
