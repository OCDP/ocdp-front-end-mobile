import React, {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { FatoresInterface } from "../utils/models/FatoresInterface";

interface PostFatoresContextProps {
  postFatores: Array<FatoresInterface>;
  setPostFatores?: Dispatch<SetStateAction<any>>;
}

const defaultFatores = {
  postFatores: [],
};

const PostFatoresContext = createContext<PostFatoresContextProps>(
  defaultFatores
);

export function PostFatoresProvider({ children }) {
  const [postFatores, setPostFatores] = useState();

  return (
    <PostFatoresContext.Provider
      value={{
        postFatores,
        setPostFatores,
      }}
    >
      {children}
    </PostFatoresContext.Provider>
  );
}

export const PostFatoresConsumer = PostFatoresContext.Consumer;

export default PostFatoresContext;
