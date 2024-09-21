import type { AppProps } from "next/app";
import Head from "next/head";
import "antd/dist/antd.css";

export default function App({ Component }: AppProps) {
  return (
    <>
      <Head>
        <title>NodeBird</title>
      </Head>
      <Component />
    </>
  );
}
