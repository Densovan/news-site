import { Card, Typography, Row, Col, Divider, Avatar } from 'antd';
import { useQuery } from '@apollo/client';
import { GET_USERS, GET_FOLLOWS } from '../../graphql/query';
import CategoryLoader from '../loaders/categoryLoader';
import Link from 'next/dist/client/link';
import Follow from '../common/follow';

const Suggestion = ({ user, isAuthenticated }) => {
  const { data, loading:loadingUsers } = useQuery(GET_USERS);
  const {
    data: follows,
    loading: follow_loading,
    refetch: follow_refetch,
  } = useQuery(GET_FOLLOWS);
  if (loadingUsers || follow_loading) return <CategoryLoader/>

  const users = data.get_users.map((x) => x);
  return (
    <Card className="cardItem">
      <Typography.Title level={5}>Suggestions For You</Typography.Title>
      <Divider style={{ marginBottom: 20, marginTop: 16 }} />
      {users.slice(0, 5).map((res) => {
        return (
          <Row
            key={res.id}
            style={{ marginBottom: '12px' }}
            justify="space-between"
            align="middle"
          >
            <Col style={{ display: 'flex' }} span={14}>
              <div style={{ marginRight: 8 }}>
                <Avatar
                  size={{ xs: 24, sm: 32, md: 48, lg: 48, xl: 48, xxl: 48 }}
                  src={res.image}
                />
              </div>
              <div>
                <div
                  style={{
                    fontSize: 16,
                    color: '#262e3c',
                    fontWeight: 'bold',
                  }}
                >
                  {res.fullname.length <= 11
                    ? res.fullname
                    : res.fullname.substring(0, 11) + '...'}
                </div>
                {/* {res.title.length <= 70
                          ? res.title
                          : res.title.substring(0, 70) + " ..."} */}
                <div
                  style={{
                    fontSize: 12,
                    color: 'rgba(117, 117, 117, 1)',
                    fontWeight: '400',
                  }}
                >
                  {res.bio.length <= 10
                    ? res.bio
                    : res.bio.substring(0, 10) + '...'}
                </div>
              </div>
            </Col>
            <Col span={10}>
              {isAuthenticated && (
                <Follow
                  articleUser={res}
                  user={user.user}
                  follows={follows}
                  refetch={follow_refetch}
                />
              )}
              {!isAuthenticated && (
                <Link href="/signin">
                  <button className="btn-follow">Follow</button>
                </Link>
              )}
            </Col>
          </Row>
        );
      })}
    </Card>
  );
};

export default Suggestion;
