import EachPost from "./EachPost";

function AllPosts() {
  return (
    <div className="all-posts tab flex flex-col justify-between items-center h-screen overflow-y-auto">
      <EachPost />
      <EachPost />
      <EachPost />
    </div>
  );
}

export default AllPosts;
