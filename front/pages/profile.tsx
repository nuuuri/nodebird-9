import Head from "next/head";
import AppLayout from "../components/AppLayout";

export default function Profile() {
  return (
    <AppLayout>
      <Head>
        <title>NodeBird</title>
      </Head>
      <div>내 프로필</div>
    </AppLayout>
  );
}
