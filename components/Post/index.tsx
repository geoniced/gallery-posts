import { Card } from "antd";
import Image from "next/image";
import React, { FC } from "react";
import { CommentContent } from "..";
import { Comment } from "../../types/comment";
import { Post } from "../../types/post";

interface PostProps {
  data: { post: Post; comments: Comment[] };
}

const Post: FC<PostProps> = (props) => {
  const { post, comments } = props.data;
  const { url, title } = post;

  return (
    <>
      <Card
        bordered={false}
        cover={<Image src={url} alt={title} width={600} height={600} />}
      >
        {title}
      </Card>

      {comments.map((comment) => (
        <CommentContent key={comment.id} comment={comment} />
      ))}
    </>
  );
};

export default Post;
