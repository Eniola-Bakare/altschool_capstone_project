function PostAnlySummary() {
  return (
    <>
      <p className="font-bold text-2xl">Posts summary</p>

      <p className="text-base text-grey font-normal border-b-2 border-blue pb-2">
        May 2023 summary
      </p>
        <div className="impressions">
      <div className="post-summay-details flex gap-4  ">
          <div className="impression-figures flex flex-col items-start pb-4">
            <p className="font-semibold text-lg text-grey flex flex-col items-center gap-2">
              Posts <br />
              <span className="text-black">3</span>{" "}
            </p>
            <p className="font-semibold text-lg text-grey flex flex-col items-center gap-2">
              Profile visits <br />
              <span className="text-black">300</span>{" "}
            </p>
          </div>
          <div className="impression-figures flex flex-col items-start pb-6">
            <p className="font-semibold text-lg text-grey flex flex-col items-center gap-2">
              Posts Impressions <br />{" "}
              <span className="text-black">2.98k views</span>{" "}
            </p>
            <p className="font-semibold text-lg text-grey flex flex-col items-center gap-2">
              New followers <br /> <span className="text-black">300</span>{" "}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default PostAnlySummary;
