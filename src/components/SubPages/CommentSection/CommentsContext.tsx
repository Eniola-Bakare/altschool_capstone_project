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
  showComments: boolean;
  setShowComments: Dispatch<SetStateAction<boolean>>;
  currentPost: object;
  setCurrentPost: Dispatch<SetStateAction<object>>;
};

export default function CommentContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [showComments, setShowComments] = useState(false);
  const [currentPost, setCurrentPost] = useState({});
  console.log(showComments);

  console.log(children);
  const commentText = "ghghhghg";
  return (
    <CommentContext.Provider
      value={{
        commentText,
        showComments,
        setShowComments,
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
