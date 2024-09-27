import type { AppProps } from "next/app";
import Head from "next/head";

import "antd/dist/antd.css";
import wrapper from "../store/configureStore";

const App = wrapper.withRedux(function ({ Component }: AppProps) {
  return (
    <>
      <Head>
        <title>NodeBird</title>
      </Head>
      <Component />
    </>
  );
});

export default App;
