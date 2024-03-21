import { Link } from "react-router-dom";
import Button from "../components/Button";
import Footer from "../components/Footer";
import Header from "../components/Header";

// type LandingPageProps = {}
function LandingPage() {
  return (
    <div className="w-full flex flex-col items-center ">
      <Header />
      <section
        className="w-full hero-section bg-cover bg-left-top h-[90vh] flex flex-col justify-center px-8 lg:px-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)),url('heroImage.png')",
        }}
      >
        <div className="hero-text w-ful md:w-[85%] lg:w-full self-center  flex flex-col gap-10">
          <h1 className=" text-[32px] md:text-5xl lg:text-5xl font-bold text-white leading-[40px] md:leading-[72px]">
            Welcome to Chatter: A Haven for Text-
            <span className="md:hidden lg:visible">
              <br />
            </span>
            Based Content
          </h1>
          <p className="text-white text-lg md:text-2xl font-medium md:w-[75%] md:leading-[36px]">
            Unleash the Power of Words, Connect with Like-minded Readers and
            Writers
          </p>
          <Link to="/signup">
            <Button
              name="Get started"
              type="primary"
              onClick={() => console.log("third -- get started")}
            />
          </Link>
        </div>
      </section>

      <section
        className="about-sec flex flex-col lg:flex-row md:px-12 py-12 lg:px-10 lg:py-8 xl:py-16 xl:px-20 justify-between items-center  gap-6 md:gap-16 lg:gap-0"
        id="about"
      >
        <div className="about-text w-[90%] md:w-full lg:w-[58%] 2xl:w-[50%] flex flex-col gap-4 md:gap-8 text-black">
          <h1 className="text-5xl font-bold text-center md:text-left ">
            About Chatter
          </h1>
          <p className=" text-lg text-justify md:text-left ">
            Chatter is a multi-functional platform where authors and readers can
            have access to their own content. It aims to be a traditional
            bookworm’s heaven and a blog to get access to more text based
            content. Our vision is to foster an inclusive and vibrant community
            where diversity is celebrated. We encourage open-mindedness and
            respect for all individuals, regardless of their backgrounds or
            beliefs. By promoting dialogue and understanding, we strive{" "}
          </p>
        </div>
        <div className="about-image w-[90%] lg:w-[35%] 2xl:w-[35%]">
          <img
            src="aboutImage.png"
            alt="a group of people on a stair way"
            className="w-[100%]"
          />
        </div>
      </section>

      <section className="why-sec md:px-12 py-12 lg:px-10 lg:py-8 xl:py-16 xl:px-20 flex flex-col items-center gap-8 lg:w-[80%] 2xl:w-[75%]">
        <h1 className="w-[80%] md:w-full text-4xl md:text-5xl font-bold text-center md:text-left ">
          Why you should join chatter
        </h1>
        <p className="w-[95%] xl:w-[85%] 2xl:w-[70%] text-justify md:text-left ">
          Our goal is to make writers and readers see our platform as their next
          heaven for blogging, ensuring ease in interactions, connecting with
          like-minded peers, have access to favorite content based on interests
          and able to communicate your great ideas with people
        </p>
      </section>

      <section className="card-sec sm:pb-20 flex flex-col items-center lg:items-start gap-7 lg:flex-row lg:gap-7 xl:gap-12 py-12 lg:py-0">
        <div className="each-card w-[90%] md:w-[650px] lg:w-[306px] h-[324px] py-4 px-5 rounded-lg border border-boderGrey flex flex-col justify-center items-center md:items-start gap-3">
          <img src="iconOne.png" alt="anlytic icon" />
          <header className="text-2xl font-medium leading-[36px]">
            Analytics
          </header>
          <p className="text-lg text-center md:text-start text-grey w-[85%] lg:w-full">
            Analytics to track the number of views, likes and comment and also
            analyze the performance of your articles over a period of time
          </p>
        </div>
        <div className="each-card w-[90%] md:w-[650px] lg:w-[306px] h-[324px] py-4 px-5 rounded-lg border border-boderGrey flex flex-col justify-center items-center md:items-start gap-3">
          <img src="iconTwo.png" alt="anlytic icon" />
          <header className="text-2xl font-medium leading-[36px]">
            Social interactions
          </header>
          <p className="text-lg text-center md:text-start text-grey w-[85%] lg:w-full">
            Users on the platform can interact with posts they like, comment and
            engage in discussions
          </p>
        </div>
        <div className="each-card w-[90%] md:w-[650px] lg:w-[306px] h-[324px] py-4 px-5 rounded-lg border border-boderGrey flex flex-col justify-center items-center md:items-start gap-3">
          <img src="iconThree.png" alt="anlytic icon" />
          <header className="text-2xl font-medium leading-[36px]">
            Content creation
          </header>
          <p className="text-lg text-center md:text-start text-grey w-[85%] lg:w-full">
            Write nice and appealing with our in-built markdown, a rich text
            editor
          </p>
        </div>
      </section>

      <section className="testimony bg-rgba flex flex-col md:flex-row items-center justify-center px-4 md:px-0 py-12 md:py-0 w-full md:h-[492px] gap-8 md:gap-0">
        <div className="review-image w-[45%] md:w-[25%] xl:w-[40%]">
          <img src="reviewImage.png" alt="a man" className="rounded-full " />
        </div>
        <div className="testimonial-text justify-center md:w-[65%] lg:w-[60%] md:py-4 md:px-8 lg:py-8 lg:px-10 xl:py-16 xl:px-20 flex flex-col gap-9 ">
          <p className="text-lg leading-7 text-center md:text-left text-black">
            "Chatter has become an integral part of my online experience. As a
            user of this incredible blogging platform, I have discovered a
            vibrant community of individuals who are passionate about sharing
            their ideas and engaging in thoughtful discussions.”
          </p>

          <p className="font-medium text-center md:text-center text-2xl md:text-4xl">
            Adebobola Muhydeen,
            <br />
            <span className="font font-normal text-lg md:text-center md:text-2xl">
              Software developer at Apple
            </span>
          </p>
          <span className="flex justify-center md:justify-start">
            <Link to="/signup">
              <Button
                type="primary"
                name="Join chatter"
                onClick={() => console.log("join chatter")}
              />
            </Link>
          </span>
        </div>
      </section>

      <section className="profiles w-full bg-white flex items-center justify-center md:h-[492px]">
        <div className="profile-text flex flex-col items-center md:flex-row w-full md:w-[85%] px-4 md:px-0 py-12 md:py-0 xl:w-[70%] gap-10 lg:gap-20">
          <div className="all-three-profiles flex w-[70%] lg:w-[55%] lg:gap-8 items-center">
            <div className="two-profiles flex flex-col gap-14 justify-between items-center ">
              <img
                src="profileOne.png"
                className="rounded-full"
                alt="a woman"
              />
              <img src="profileTwo.png" className="rounded-full" alt="a man" />
            </div>
            <div className="oneProfile">
              <img
                src="profileThree.png"
                className="rounded-full"
                alt="a man"
              />
            </div>
          </div>

          <div className="profiles-text flex flex-col text-center md:text-left gap-6 justify-center">
            <h1 className="text-black text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-[30px] md:leading-[72px]">
              Write, read and connect <br /> with great minds on chatter{" "}
            </h1>
            <p className="lg:text-xl xl:text-lg">
              Share people your great ideas, and also read write-ups based on
              your interests connect with people of same interests and goals
            </p>
            <Link to="/signup">
              <Button
                name="Get started"
                type="primary"
                onClick={() => console.log("get started 2")}
              />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default LandingPage;
