import { Card, Comment as CommentComponent, Typography, Space } from "antd";
import { FC } from "react";
const { Text } = Typography;
import { Comment } from "../../types/comment";

interface CommentContentProps {
  comment: Comment;
}

const CommentContent: FC<CommentContentProps> = (props) => {
  const { name, body, id } = props.comment;

  return (
    <Card bordered={false}>
      <CommentComponent
        content={
          <Text>
            <Text strong>{name}</Text> <Text>{body}</Text>
          </Text>
        }
        actions={[<span key={`comment-reply-${id}`}>Reply</span>]}
      />
    </Card>
  );
};

export default CommentContent;
