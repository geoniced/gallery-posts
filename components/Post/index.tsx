import {
  Button,
  Card,
  Comment as CommentComponent,
  Divider,
  Form,
  Input,
} from "antd";
import Image from "next/image";
import React, { ChangeEventHandler, FC, useMemo, useState } from "react";
import { useWindowSize } from "react-use";
import { CommentContent } from "..";
import { Comment } from "../../types/comment";
import { Post } from "../../types/post";

const { TextArea } = Input;
interface PostProps {
  data: { post: Post; comments: Comment[] };
}

const Post: FC<PostProps> = (props) => {
  const { post, comments } = props.data;
  const { url, title } = post;

  const [userComments, setUserComments] = useState<Comment[]>([]);
  const [commentText, setCommentText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const { width } = useWindowSize();

  const onCommentChange = (evt: any) => {
    setCommentText(evt.target.value);
  };

  const onSubmit = () => {
    const newId =
      [...comments, ...userComments].reduce(
        (maxId, comment) => (comment.id > maxId ? comment.id : maxId),
        0
      ) + 1;
    setSubmitting(true);
    setUserComments((prev) => [
      ...prev,
      {
        postId: post.id,
        id: newId,
        name: "Вы",
        email: "user@example.com",
        body: commentText.trim(),
      },
    ]);

    setTimeout(() => {
      setSubmitting(false);
      setCommentText("");
    }, 1000);
  };

  const totalComments = useMemo(
    () => [...comments, ...userComments],
    [comments, userComments]
  );

  return (
    <>
      <Card
        bordered={false}
        cover={<Image src={url} alt={title} width={width} height={width} />}
      >
        {title}
      </Card>

      <Divider>Комментарии</Divider>

      {totalComments.map((comment) => (
        <CommentContent key={comment.id} comment={comment} />
      ))}

      <Divider>Оставьте свой комментарий</Divider>

      <Card bordered={false}>
        <CommentComponent
          content={
            <Form>
              <Form.Item>
                <TextArea value={commentText} onChange={onCommentChange} />
              </Form.Item>
              <Form.Item>
                <Button
                  htmlType="submit"
                  loading={submitting}
                  disabled={commentText.trim().length === 0}
                  onClick={onSubmit}
                  type="primary"
                >
                  Отправить
                </Button>
              </Form.Item>
            </Form>
          }
        />
      </Card>
    </>
  );
};

export default Post;
