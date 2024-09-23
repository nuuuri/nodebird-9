import type { AppProps } from "next/app";
import Head from "next/head";
import "antd/dist/antd.css";
import wrapper from "../store/configureStore";

export default wrapper.withRedux(function App({ Component }: AppProps) {
  return (
    <>
      <Head>
        <title>NodeBird</title>
      </Head>
      <Component />
    </>
  );
});
