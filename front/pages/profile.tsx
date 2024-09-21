import Head from "next/head";
import AppLayout from "../components/AppLayout";
import NicknameEditForm from "../components/NicknameEditForm";
import FollowList from "../components/FollowList";

export default function Profile() {
  const followingList = [
    { nickname: "누리11" },
    { nickname: "누리22" },
    { nickname: "누리33" },
  ];
  const followerList = [
    { nickname: "누리11" },
    { nickname: "누리22" },
    { nickname: "누리33" },
  ];

  return (
    <AppLayout>
      <Head>
        <title>프로필 | NodeBird</title>
      </Head>
      <NicknameEditForm />
      <FollowList header="팔로잉 목록" data={followingList} />
      <FollowList header="팔로워 목록" data={followerList} />
    </AppLayout>
  );
}
