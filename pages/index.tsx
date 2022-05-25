import type {GetServerSideProps, GetStaticProps, NextPage} from "next";

import Head from "next/head";
import {useEffect, useState} from "react";
import Masonry from "react-masonry-css";

import {trending} from "../src/api";
import Card from "../src/Card";
import {useAppSelector} from "../src/redux/hooks";
import Searchbox from "../src/Searchbox";

//import useLocalStorage from "../src/useLocalStorage";
interface Props {
  trendingGifs: any;
}

const Home: NextPage<Props> = ({trendingGifs}) => {
  /*   const [searchGifs, setSearchGifs] = useState<any[]>([]); */

  const searchGifs = useAppSelector((state) => state.images);

  //const [user, setUser] = useLocalStorage("gifUser", "");

  //console.log(trendingGifs);

  const breakpoints = {
    default: 4,
    900: 3,
    700: 2,
    500: 1,
  };

  return (
    <div className="container text-center justify-center">
      <Head>
        <title>Create Next App</title>
        <meta content="Generated by create next app" name="description" />
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <main className="justify-center align-center ">
        <h1 className="text-3xl font-bold text-slate-400 my-10">ADVANCED JS STUDY GROUP</h1>
        <Searchbox />
        <div className="">
          <h4 className="text-xl text-left pl-2 mb-4 font-bold text-slate-400">📈 Trending</h4>
          <Masonry
            breakpointCols={breakpoints}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {searchGifs.length
              ? searchGifs.map((item: any) => <Card key={item.id} gif={item} />)
              : trendingGifs.map((item: any) => <Card key={item.id} gif={item} />)}
          </Masonry>
        </div>
      </main>
    </div>
  );
};

/* export const getServerSideProps: GetServerSideProps = async () => {
  const trendingGifs = await trending;
  const props = {trendingGifs};

  return {props};
}; */

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
