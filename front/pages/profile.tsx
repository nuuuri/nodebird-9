import Head from "next/head";
import AppLayout from "../components/AppLayout";

export default function Profile() {
  return (
    <AppLayout>
      <Head>
        <title>프로필 | NodeBird</title>
      </Head>
      <div>내 프로필</div>
    </AppLayout>
  );
}
