import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Searchbox from '../src/Searchbox'
import { trending } from '../src/api'

interface Props {
  gifs: any;
}

const Home: NextPage<Props> = ({ gifs }) => {

  console.log(gifs)
  return (
    <div className="container mx-auto bg-slate-100">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='justify-center align-center'>
        <h1 className='text-2xl font-bold'>ADVANCED JS STUDY GROUP APP</h1>
        <Searchbox />
      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const gifs = await trending();

  return {
    props: {
      gifs,
    },
  };
};

export default Home
