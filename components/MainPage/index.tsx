import { Col, Layout, PageHeader, Row } from "antd";
import { FC } from "react";
import { useGetPostsQuery } from "../../redux/api";
import styles from "./MainPage.module.css";
import { LoadingOutlined } from "@ant-design/icons";
import Post from "../PostCard";

const { Content } = Layout;

const MainPage: FC = () => {
  const { data, isLoading, isSuccess } = useGetPostsQuery();

  return (
    <Layout>
      <PageHeader className={styles.header} title={`Галерея`} />
      <Content>
        <Row justify="space-between" align="middle">
          {isLoading ? (
            <>
              <Col className={styles.col} span={24}>
                <LoadingOutlined />
              </Col>
            </>
          ) : (
            isSuccess &&
            data && (
              <>
                {data.map((post) => (
                  <Col className={styles.col} key={post.id} span={8}>
                    <Post to={`post/${post.id}`} src={post.url} />
                  </Col>
                ))}
              </>
            )
          )}
        </Row>
      </Content>
    </Layout>
  );
};

export default MainPage;
