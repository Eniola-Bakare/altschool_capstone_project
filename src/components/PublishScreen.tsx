import Button from "./Button";

function PublishScreen() {
  return (
    <section className="w-[90%] h-[85%] border border-borderGrey rounded-lg flex flex-col py-14 px-16 gap-16">
      <div className="buttn-div self-end">
        <Button
          type="primary"
          name="Publish"
          onClick={() => console.log("seventh")}
        />
      </div>

      <div className="input-div flex items-center gap-2">
        {/* <img src="./src/assets/publishIcon.png" alt="plus icon" />

        <div className="input-Text flex flex-col gap-2">
          <input
            type="text"
            placeholder="Title"
            className="focus:outline-0 px-3 text-5xl font-semibold opacity-50"
          />
          <input
            type="text"
            placeholder="Write a post..................."
            className="focus:outline-0 px-3 text-3xl font-normal opacity-50"
          />
        </div> */}

        <div className="h-[120px] close-div pr-3 border-r border-b-grey flex justify-center items-center ">
          <div className="">
            <img
              src="./src/assets/closeIcon.png"
              alt="close icon"
              className=""
            />
          </div>
        </div>

        <div className="attachment-icons flex pl-3 gap-3">
          <img src="./src/assets/imgIcon.png" alt="an image icon" />
          <img src="./src/assets/vidIcon.png" alt="a video icon" />
        </div>
      </div>
    </section>
  );
}

export default PublishScreen;
