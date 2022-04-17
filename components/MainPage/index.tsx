import { Card, Col, Layout, PageHeader, Row, Grid } from "antd";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import { useGetPostsQuery } from "../../redux/api";
import styles from "./MainPage.module.css";
import { LoadingOutlined } from "@ant-design/icons";
import PostCard from "../PostCard";
import { useIntersection, useWindowScroll, useWindowSize } from "react-use";
import { Post } from "../../types/post";
import React from "react";

const { Content } = Layout;
const { useBreakpoint } = Grid;

const COLUMNS = 3;

const MainPage: FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [shownDataPage, setShownDataPage] = useState(1);
  const intersectionRef = useRef(null);

  const { data, isLoading, isSuccess } = useGetPostsQuery(shownDataPage);

  const { width } = useWindowSize();

  const intersection = useIntersection(intersectionRef, {
    root: null,
    rootMargin: "0px",
    threshold: 1,
  });

  useEffect(() => {
    if (intersection?.isIntersecting && !isLoading) {
      setShownDataPage((prevDataPage) => prevDataPage + 1);
    }
  }, [intersection]);

  useEffect(() => {
    if (data && isSuccess) {
      setPosts((prev) => [...prev, ...data]);
    }
  }, [data]);

  return (
    <Layout>
      <PageHeader className={styles.header} title={`Галерея`} />
      <Content>
        <Row justify="center" align="middle">
          {isLoading ? (
            <>
              <Col className={styles.col} span={24}>
                <LoadingOutlined />
              </Col>
            </>
          ) : (
            isSuccess &&
            posts && (
              <>
                {posts.map((post) => (
                  <Col key={post.id} className={styles.col} span={8}>
                    <PostCard
                      to={`post/${post.id}`}
                      src={post.url}
                      height={Math.round(width / COLUMNS)}
                    />
                  </Col>
                ))}
              </>
            )
          )}
        </Row>
        <Row justify="space-between" align="middle" ref={intersectionRef}>
          <Col className={styles.col} span={24}>
            <Card bordered={false}>
              <LoadingOutlined />
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default MainPage;
