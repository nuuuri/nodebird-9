import Link from 'next/link';

interface PostCardContentProps {
  postData: string;
}

export default function PostCardContent({ postData }: PostCardContentProps) {
  return (
    <div>
      {postData.split(/(#[^\s#]+)/g).map((str, index) => {
        if (str.match(/(#[^\s#]+)/)) {
          return (
            <Link key={index} href={`/hashtag/${str.slice(1)}`}>
              <a>{str}</a>
            </Link>
          );
        }
        return str;
      })}
    </div>
  );
}
