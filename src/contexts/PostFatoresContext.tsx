import React, {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  useContext,
} from "react";
import { FatoresInterface } from "../utils/models/FatoresInterface";

interface PostFatoresContextProps {
  postFatores: Array<FatoresInterface>;
  setPostFatores?: Dispatch<SetStateAction<any>>;
  flush?: () => void;
}

const defaultFatores = {
  postFatores: [],
};

const PostFatoresContext = createContext<PostFatoresContextProps>(
  defaultFatores
);

export function PostFatoresProvider({ children }) {
  const [postFatores, setPostFatores] = useState();

  const flush = () => {
    setPostFatores(defaultFatores.postFatores);
  };

  return (
    <PostFatoresContext.Provider
      value={{
        postFatores,
        setPostFatores,
        flush,
      }}
    >
      {children}
    </PostFatoresContext.Provider>
  );
}

export const useFlushPostFatores = () => {
  const { flush } = useContext(PostFatoresContext);
  return flush;
};

export const PostFatoresConsumer = PostFatoresContext.Consumer;

export default PostFatoresContext;
