import React, { FC } from "react";
import { Image } from "antd";
import Link from "next/link";

interface PostProps {
  to: string;
  src: string;
  height: number;
}

const PostCard: FC<PostProps> = (props) => {
  const { to, src, height } = props;
  return (
    <Link href={to} passHref>
      <Image
        style={{ cursor: "pointer" }}
        preview={false}
        src={src}
        alt={"image"}
        height={height}
      />
    </Link>
  );
};

export default PostCard;
