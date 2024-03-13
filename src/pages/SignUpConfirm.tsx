import AuthSidebar from "../components/AuthSidebar";
import Button from "../components/Button";

function SignUpConfirm() {
  return (
    <section className="flex justify-between w-full items-center ">
      <AuthSidebar />
      <aside className="signin-side w-[70%] flex flex-col justify-between items-center gap-5">
        <div className="back-arrow">
          <img src="./src/assets/arrowcircleleft.png" alt="arrow circle" />
          <p>Back</p>
        </div>

        <h1 className="text-4xl font-medium ">Enter confirmation code</h1>
        <p className="text-[#626262]">
          We emailed you a code. Please input the code here for account
          verification
        </p>
        <form
          action=""
          className="form-welcome flex flex-col justify-center w-[50%] gap-3"
        >
          <div className="name-fields flex gap-10 justify-center items-center my-10">
            <input
              type="text"
              className="h-[80px] w-[106px] py-[10px] pr-[12px] pl-[16px] border borde-[#CED4DA] shadow-md rounded-lg flex justify-center items-center text-center font-bold text-3xl hover:shadow-xl focus:outline-blue"
            />
            <input
              type="text"
              className="h-[80px] w-[106px] py-[10px] pr-[12px] pl-[16px] border borde-[#CED4DA] shadow-md rounded-lg flex justify-center items-center text-center font-bold text-3xl hover:shadow-xl focus:outline-blue"
            />
            <input
              type="text"
              className="h-[80px] w-[106px] py-[10px] pr-[12px] pl-[16px] border borde-[#CED4DA] shadow-md rounded-lg flex justify-center items-center text-center font-bold text-3xl hover:shadow-xl focus:outline-blue"
            />
            <input
              type="text"
              className="h-[80px] w-[106px] py-[10px] pr-[12px] pl-[16px] border borde-[#CED4DA] shadow-md rounded-lg flex justify-center items-center text-center font-bold text-3xl hover:shadow-xl focus:outline-blue"
            />
          </div>

          <Button
            type="primary"
            name="Create account"
            onClick={() => console.log("sixsth")}
            width="w-full"
          />
        </form>
      </aside>
    </section>
  );
}

export default SignUpConfirm;
