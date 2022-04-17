import React from "react";
import { useRouter } from "next/router";
import { useGetPostCommentsQuery, useGetPostQuery } from "../../redux/api";
import { Card, Col, Layout, PageHeader, Row, Typography } from "antd";
import styles from "./PostPage.module.css";
import { LoadingOutlined } from "@ant-design/icons";
import { Post } from "..";

const { Content } = Layout;

const PostPage = () => {
  const router = useRouter();
  const { post } = router.query;

  const {
    data: postData,
    isLoading,
    isSuccess,
  } = useGetPostQuery(post as string);

  const {
    data: commentData,
    isLoading: isCommentsLoading,
    isSuccess: isCommentsSuccess,
  } = useGetPostCommentsQuery(post as string);

  return (
    <Layout className={styles.layout}>
      <PageHeader
        title={`Пост`}
        className={styles.header}
        onBack={() => {
          router.back();
        }}
      />
      <Content>
        <Row justify="center">
          {isLoading ? (
            <Col span={24} className={styles.col}>
              <Card bordered={false}>
                <LoadingOutlined />
              </Card>
            </Col>
          ) : (
            isSuccess &&
            postData && (
              <Col span={24}>
                <Post data={{ post: postData, comments: commentData || [] }} />
              </Col>
            )
          )}
        </Row>
      </Content>
    </Layout>
  );
};

export default PostPage;
