import Head from "next/head";
import { useSelector } from "react-redux";

import AppLayout from "../components/AppLayout";
import FollowList from "../components/FollowList";
import NicknameEditForm from "../components/NicknameEditForm";

import { RootState } from "@/store/reducers";

export default function Profile() {
  const { me } = useSelector((state: RootState) => state.user);

  return (
    <AppLayout>
      <Head>
        <title>프로필 | NodeBird</title>
      </Head>
      <NicknameEditForm />
      <FollowList header="팔로잉 목록" data={me.Followings} />
      <FollowList header="팔로워 목록" data={me.Followers} />
    </AppLayout>
  );
}
