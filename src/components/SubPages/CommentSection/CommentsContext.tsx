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
  showComments: boolean;
  setShowComments: Dispatch<SetStateAction<boolean>>;
  currentPostID: object;
  setCurrentPostID: Dispatch<SetStateAction<object>>;
};

export default function CommentContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [showComments, setShowComments] = useState(false);
  const [currentPostID, setCurrentPostID] = useState('');
  const [commentText, setCommentText] = useState("");

  return (
    <CommentContext.Provider
      value={{
        commentText,
        setCommentText,
        showComments,
        setShowComments,
        currentPostID,
        setCurrentPostID,
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
