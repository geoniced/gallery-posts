import {
  Button,
  Card,
  Comment as CommentComponent,
  Divider,
  Form,
  FormInstance,
  Input,
} from "antd";
import Image from "next/image";
import React, {
  ChangeEventHandler,
  FC,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
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

  const commentRef = useRef<HTMLFormElement>(null);

  const [userComments, setUserComments] = useState<Comment[]>([]);
  const [commentText, setCommentText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const { width } = useWindowSize();

  const onCommentChange = (evt: any) => {
    setCommentText(evt.target.value);
  };

  const onReplyComment = useCallback((userName: UserName) => {
    setCommentText(
      (prev) =>
        prev.trim().split(" ").concat(`@${userName}`).join(" ").trim() + " "
    );
    commentRef.current &&
      commentRef.current.resizableTextArea.textArea.scrollIntoView();
  }, []);

  const onSubmit = () => {
    const newId =
      [...comments, ...userComments].reduce(
        (maxId, comment) => (comment.id > maxId ? comment.id : maxId),
        0
      ) + 1;
    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
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
        <CommentContent
          key={comment.id}
          comment={comment}
          onReply={onReplyComment}
        />
      ))}

      <Divider>Оставьте свой комментарий</Divider>

      <Card bordered={false}>
        <CommentComponent
          content={
            <Form>
              <Form.Item>
                <TextArea
                  rows={1}
                  ref={commentRef as any}
                  value={commentText}
                  onChange={onCommentChange}
                  autoSize
                />
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
