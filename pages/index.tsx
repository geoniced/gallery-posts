import type { NextPage } from "next";
import Head from "next/head";
import { MainPage } from "../components";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Gallery</title>
      </Head>

      <MainPage />
    </>
  );
};

export default Home;
