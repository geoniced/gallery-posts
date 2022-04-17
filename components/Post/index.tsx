import { Card, Divider } from "antd";
import Image from "next/image";
import React, { FC } from "react";
import { useWindowSize } from "react-use";
import { CommentContent } from "..";
import { Comment } from "../../types/comment";
import { Post } from "../../types/post";

interface PostProps {
  data: { post: Post; comments: Comment[] };
}

const Post: FC<PostProps> = (props) => {
  const { post, comments } = props.data;
  const { url, title } = post;

  const { width } = useWindowSize();

  return (
    <>
      <Card
        bordered={false}
        cover={<Image src={url} alt={title} width={width} height={width} />}
      >
        {title}
      </Card>

      <Divider>Комментарии</Divider>

      {comments.map((comment) => (
        <CommentContent key={comment.id} comment={comment} />
      ))}
    </>
  );
};

export default Post;
