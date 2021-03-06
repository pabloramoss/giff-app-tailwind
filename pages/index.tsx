import type {GetStaticProps, NextPage} from "next";

import Head from "next/head";

import {trending} from "../src/api";
import MasonryComponent from "../src/components/masonry";
import {useAppSelector} from "../src/redux/hooks";
import Searchbox from "../src/components/searchBox";
import {IGif} from "../src/types";

interface Props {
  trendingGifs: IGif[];
}

const Home: NextPage<Props> = ({trendingGifs}) => {
  const searchGifs = useAppSelector((state) => state.images.images);
  const wordSearch = useAppSelector((state) => state.images.wordSearch);

  return (
    <div className="container text-center justify-center">
      <Head>
        <title>Create Next App</title>
        <meta content="Generated by create next app" name="description" />
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <main className="justify-center align-center">
        <h1 className="text-3xl font-bold text-slate-400 my-10">ADVANCED JS STUDY GROUP</h1>
        <Searchbox />
        <div className="">
          <h4 className="text-xl text-left pl-2 mb-4 font-bold text-slate-400">
            {wordSearch ? `🔎 ${wordSearch}` : "📈 Trending"}
          </h4>
          {searchGifs.length ? (
            <MasonryComponent currentGifs={searchGifs} isHidden={false} />
          ) : (
            <MasonryComponent isHidden currentGifs={trendingGifs} />
          )}
        </div>
      </main>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const trendingGifs = await trending();

  return {
    props: {
      trendingGifs,
    },
    revalidate: 3600 * 24,
  };
};

export default Home;
