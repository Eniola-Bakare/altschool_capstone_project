import EachPost from "./EachPost";

function AllPosts() {
  return (
    <div className="tab flex flex-col justify-between items-center ">
      <EachPost />
      <EachPost />
    </div>
  );
}

export default AllPosts;
