import React, { useState, useContext } from "react";
import suffle from "shuffle-array";
import Link from "next/link";
import { useQuery } from "@apollo/client";
import {
  GET_CATEGORIES,
  GET_TYPES,
  GET_USERS,
  GET_USER,
  GET_FOLLOWS,
} from "../../graphql/query";
import CategoryLoader from "../../components/loaders/categoryLoader";
import { Card, Tag, Divider, Typography, Row, Col, Button, Avatar } from "antd";
import Follow from "../../components/common/follow";
import { useAuth } from "../../layouts/layoutAuth";
const { CheckableTag } = Tag;

const FilterNews = ({ handleChange, selectedTags }) => {
  const { isAuthenticated } = useAuth()
  const { loading: usersLoading, data: usersData } = useQuery(GET_USERS, {
    pollInterval: 1000,
  });
  const { loading: userLoading, data: user } = useQuery(GET_USER, {
    pollInterval: 1000,
    // context: { clientName: "private" },
  });
  const {
    data: follows,
    loading: follow_loading,
    refetch: follow_refetch,
  } = useQuery(GET_FOLLOWS, {
    pollInterval: 1000,
  });
  const { loading, data } = useQuery(GET_CATEGORIES);
  const { loading: loadingType, data: types } = useQuery(GET_TYPES);
  if (loading || loadingType || usersLoading || follow_loading || userLoading)
    return <CategoryLoader />;

  const tagsData = ["All"];
  data.get_cats.forEach((element) => {
    tagsData.push(element.name);
  });
  const typeData = [];
  types.get_types.forEach((element) => {
    typeData.push(element.name);
  });

  // //=================>funcion<===============
  // if (loggedIn) {
  //   var value = user.get_user.userId;
  //   var allUsers = usersData.get_users.map((x) => x);
  //   allUsers = allUsers.filter(function (item) {
  //     return item.userId !== value;
  //   });
  //   //=================>funcion<===============
  //   console.log(user.get_user.id);
  //   var value = user.get_user.id;
  //   var allUsers = usersData.get_users.map((x) => x);
  //   allUsers = allUsers.filter(function (item) {
  //     return item.id !== value;
  //   });

  //   function shuffleArray(inputArray) {
  //     inputArray.sort(() => Math.random() - 0.5);
  //   }
  //   shuffleArray(allUsers);
  // }
  // if (!loggedIn) {
  //   var allUsers = usersData.get_users.map((x) => x);
  //   function shuffleArray(inputArray) {
  //     inputArray.sort(() => Math.random() - 0.5);
  //   }

  //   shuffleArray(allUsers);
  // }

  const allUsers = usersData.get_users.map((x) => x);

  return (
    <React.Fragment>
      <Card className="card-article">
        <Typography.Title level={5}>Recommended Topics</Typography.Title>
        <Divider style={{ marginBottom: 20, marginTop: 16 }} />
        <div>
          <Typography.Title
            level={5}
            style={{ fontSize: 12, color: "#262e3c", fontWeight: "bold" }}
          >
            CATEGORY
          </Typography.Title>
        </div>
        <div style={{ marginTop: 12 }}>
          {tagsData.map((tag) => (
            <CheckableTag
              key={tag}
              checked={selectedTags.indexOf(tag) > -1}
              onChange={(checked) => handleChange(tag, checked)}
            >
              {tag}
            </CheckableTag>
          ))}
        </div>
        <div>
          <Typography.Title
            level={5}
            style={{ fontSize: 12, color: "#262e3c", fontWeight: "bold" }}
          >
            TYPE
          </Typography.Title>
        </div>
        <div style={{ marginTop: 12 }}>
          {typeData.map((types) => (
            <CheckableTag
              key={types}
              checked={selectedTags.indexOf(types) > -1}
              onChange={(checked) => handleChange(types, checked)}
            >
              {types}
            </CheckableTag>
          ))} 
        </div>
      </Card>

      <Card className="card-article">
        <Typography.Title level={5}>Suggestions For You</Typography.Title>
        <Divider style={{ marginBottom: 20, marginTop: 16 }} />
        {allUsers.slice(0, 5).map((res) => {
          return (
            <Row
              key={res.id}
              style={{ marginBottom: "12px" }}
              justify="space-between"
              align="middle"
            >
              <Col style={{ display: "flex" }} span={14}>
                <div style={{ marginRight: 8 }}>
                  <Avatar
                    size={{ xs: 24, sm: 32, md: 48, lg: 48, xl: 48, xxl: 48 }}
                    src={res.image}
                    // src="https://images2.minutemediacdn.com/image/fetch/w_736,h_485,c_fill,g_auto,f_auto/https%3A%2F%2Ftherealchamps.com%2Fwp-content%2Fuploads%2Fgetty-images%2F2018%2F08%2F137280542-850x560.jpeg"
                  />
                </div>
                <div>
                  <div
                    style={{
                      fontSize: 16,
                      color: "#262e3c",
                      fontWeight: "bold",
                    }}
                  >
                    {res.fullname.length <= 11
                      ? res.fullname
                      : res.fullname.substring(0, 11) + "..."}
                  </div>
                  {/* {res.title.length <= 70
                          ? res.title
                          : res.title.substring(0, 70) + " ..."} */}
                  <div
                    style={{
                      fontSize: 12,
                      color: "rgba(117, 117, 117, 1)",
                      fontWeight: "400",
                    }}
                  >
                    {res.bio.length <= 10
                      ? res.bio
                      : res.bio.substring(0, 10) + "..."}
                  </div>
                </div>
              </Col>
              <Col span={10}>
                {isAuthenticated && (
                  <Follow
                    articleUser={res}
                    user={user}
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
    </React.Fragment>
  );
};

export default FilterNews;
