import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

const CommentContext = createContext<CommentProps | undefined>(undefined);

type CommentProps = {
  commentText: string;
  setCommentText: Dispatch<SetStateAction<string>>;
  showComments: string;
  setShowComments: Dispatch<SetStateAction<string>>;
  currentPostID: string;
  setCurrentPostID: Dispatch<SetStateAction<string>>;
  earlierComments: object;
  setEarlierComments: Dispatch<SetStateAction<object>>;
  currentPost: object;
  setCurrentPost: Dispatch<SetStateAction<object>>;
};

export default function CommentContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [showComments, setShowComments] = useState("allPosts");
  const [currentPostID, setCurrentPostID] = useState("");
  const [currentPost, setCurrentPost] = useState({});
  const [commentText, setCommentText] = useState("");
  const [earlierComments, setEarlierComments] = useState([]);

  return (
    <CommentContext.Provider
      value={{
        commentText,
        setCommentText,
        showComments,
        setShowComments,
        currentPostID,
        setCurrentPostID,
        earlierComments,
        setEarlierComments,
        currentPost,
        setCurrentPost,
      }}
    >
      {children}
    </CommentContext.Provider>
  );
}

const useCommentContext = () => {
  const commentContext = useContext(CommentContext);

  if (commentContext === undefined) {
    throw new Error("The context has been used outside the provider");
  }

  return commentContext;
};

export { CommentContextProvider, useCommentContext };
