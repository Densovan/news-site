import { Layout, Spin } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';

const Scroll = () => {
  return (
    <InfiniteScroll
      dataLength={news.get_all_news.length}
      next={async () => {
        await fetchMore({
          variables: {
            offset: news.get_all_news.length,
          },
          updateQuery: (prev, { fetchMoreResult }) => {
            if (!fetchMoreResult) return prev;

            if (fetchMoreResult.get_all_news.length < 6) {
              setHasMoreItems(false);
            }

            return Object.assign({}, prev, {
              get_all_news: [
                ...prev.get_all_news,
                ...fetchMoreResult.get_all_news,
              ],
            });
          },
        });
      }}
      hasMore={hasMoreItems}
      loader={
        <Layout.Content style={{ marginTop: '15px' }}>
          <center>
            <Spin></Spin>
          </center>
        </Layout.Content>
      }
      endMessage={null}
    ></InfiniteScroll>
  );
};

export default Scroll;