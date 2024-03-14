import { Link } from "react-router-dom";
import Button from "../components/Button";
import Footer from "../components/Footer";
import Header from "../components/Header";

// type LandingPageProps = {}
function LandingPage() {
  return (
    <div className="flex flex-col items-center">
      <Header />
      <section
        className="w-full hero-section bg-cover bg-left-top h-screen flex flex-col justify-center"
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
        className="about-sec flex py-16 px-20 justify-between"
        id="about"
      >
        <div className="about-text w-[50%] flex flex-col gap-8 text-black">
          <h1 className="text-5xl font-bold ">About Chatter</h1>
          <p className="text-lg">
            Chatter is a multi-functional platform where authors and readers can
            have access to their own content. It aims to be a traditional
            bookworm’s heaven and a blog to get access to more text based
            content. Our vision is to foster an inclusive and vibrant community
            where diversity is celebrated. We encourage open-mindedness and
            respect for all individuals, regardless of their backgrounds or
            beliefs. By promoting dialogue and understanding, we strive{" "}
          </p>
        </div>
        <div className="about-image w-[35%]">
          <img
            src="./src/assets/aboutImage.png"
            alt="a group of people on a stair way"
            className="w-[100%]"
          />
        </div>
      </section>

      <section className="why-sec py-16 px-20 flex flex-col items-center gap-8 w-[75%]">
        <h1 className="text-5xl font-bold ">Why you should join chatter</h1>
        <p className="w-[70%]">
          Our goal is to make writers and readers see our platform as their next
          heaven for blogging, ensuring ease in interactions, connecting with
          like-minded peers, have access to favorite content based on interests
          and able to communicate your great ideas with people
        </p>
      </section>

      <section className="card-sec pb-20 flex gap-12">
        <div className="each-card w-[306px] h-[324px] py-4 px-5 rounded-lg border border-boderGrey flex flex-col justify-center  items-start gap-3">
          <img src="./src/assets/iconOne.png" alt="anlytic icon" />
          <header className="text-2xl font-medium leading-[36px]">
            Analytics
          </header>
          <p className="text-lg text-grey">
            Analytics to track the number of views, likes and comment and also
            analyze the performance of your articles over a period of time
          </p>
        </div>
        <div className="each-card w-[306px] h-[324px] py-4 px-5 rounded-lg border border-boderGrey flex flex-col justify-center  items-start gap-3">
          <img src="./src/assets/iconTwo.png" alt="anlytic icon" />
          <header className="text-2xl font-medium leading-[36px]">
            Social interactions
          </header>
          <p className="text-lg text-grey">
            Users on the platform can interact with posts they like, comment and
            engage in discussions
          </p>
        </div>
        <div className="each-card w-[306px] h-[324px] py-4 px-5 rounded-lg border border-boderGrey flex flex-col justify-center  items-start gap-3">
          <img src="./src/assets/iconThree.png" alt="anlytic icon" />
          <header className="text-2xl font-medium leading-[36px]">
            Content creation
          </header>
          <p className="text-lg text-grey">
            Write nice and appealing with our in-built markdown, a rich text
            editor
          </p>
        </div>
      </section>

      <section className="testimony bg-rgba flex items-center justify-center w-full h-[492px]">
        <div className="review-image">
          <img
            src="./src/assets/reviewImage.png"
            alt="a man"
            className="rounded-full w-[70%]"
          />
        </div>
        <div className="testimonial-text justify-center w-[60%] py-16 px-20 flex flex-col gap-9 ">
          <p className="text-lg leading-7 text-black">
            "Chatter has become an integral part of my online experience. As a
            user of this incredible blogging platform, I have discovered a
            vibrant community of individuals who are passionate about sharing
            their ideas and engaging in thoughtful discussions.”
          </p>

          <p className="font-medium text-4xl">
            Adebobola Muhydeen,{" "}
            <span className="font font-normal text-2xl">
              Software developer at Apple
            </span>
          </p>
          <Link to="/signup">
            <Button
              type="primary"
              name="Join chatter"
              onClick={() => console.log("join chatter")}
            />
          </Link>
        </div>
      </section>

      <section className="profiles w-full bg-white flex items-center justify-center h-[492px]">
        <div className="profile-text flex w-[70%] gap-20">
          <div className="all-three-profiles flex gap-8 items-center">
            <div className="two-profiles flex flex-col gap-14 justify-between items-center ">
              <img
                src="./src/assets/profileOne.png"
                className="rounded-full"
                alt="a woman"
              />
              <img
                src="./src/assets/profileTwo.png"
                className="rounded-full"
                alt="a man"
              />
            </div>
            <div className="oneProfile">
              <img
                src="./src/assets/profileThree.png"
                className="rounded-full"
                alt="a man"
              />
            </div>
          </div>

          <div className="profiles-text flex flex-col gap-6">
            <h1 className="text-black text-5xl font-bold leading-[72px]">
              Write, read and connect <br /> with great minds on chatter{" "}
            </h1>
            <p className="text-lg">
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
