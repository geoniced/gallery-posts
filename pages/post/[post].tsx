import type { NextPage } from "next";
import Head from "next/head";
import { PostPage } from "../../components";

const Post: NextPage = () => {
  return (
    <>
      <Head>
        <title>Post</title>
      </Head>
      <PostPage />
    </>
  );
};

export default Post;
