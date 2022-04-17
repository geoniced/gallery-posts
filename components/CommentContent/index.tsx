import { Card, Comment as CommentComponent, Typography, Space } from "antd";
import { FC } from "react";
const { Text } = Typography;
import { Comment } from "../../types/comment";

interface CommentContentProps {
  comment: Comment;
  onReply: (name: UserName) => void;
}

const CommentContent: FC<CommentContentProps> = ({ comment, onReply }) => {
  const { name, body, id } = comment;

  return (
    <Card bordered={false}>
      <CommentComponent
        content={
          <Text>
            <Text strong>{name}</Text> <Text>{body}</Text>
          </Text>
        }
        actions={[
          <Text
            key={`comment-reply-${id}`}
            onClick={() => {
              onReply(name);
            }}
          >
            Ответить
          </Text>,
        ]}
      />
    </Card>
  );
};

export default CommentContent;
