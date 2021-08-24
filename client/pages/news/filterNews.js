import React, { useState } from "react";
import Link from "next/link";
import { useQuery } from "@apollo/client";
import { GET_CATEGORIES, GET_TYPES } from "../../graphql/query";
import CategoryLoader from "../../components/loaders/categoryLoader";
import { Card, Tag, Divider, Typography, Row, Col, Button, Avatar } from "antd";

const { CheckableTag } = Tag;

const FilterNews = ({ handleChange, selectedTags }) => {
  const { loading, data } = useQuery(GET_CATEGORIES);
  const { loading: loadingType, data: types } = useQuery(GET_TYPES);
  if (loading || loadingType) return <CategoryLoader />;

  const tagsData = ["All"];
  data.get_cats.forEach((element) => {
    tagsData.push(element.name);
  });
  const typeData = [];
  types.get_types.forEach((element) => {
    typeData.push(element.name);
  });

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
        <Row justify="space-between" align="middle">
          <Col style={{ display: "flex" }} span={14}>
            <div style={{ marginRight: 8 }}>
              <Avatar
                size={{ xs: 24, sm: 32, md: 48, lg: 48, xl: 48, xxl: 48 }}
                src="https://images2.minutemediacdn.com/image/fetch/w_736,h_485,c_fill,g_auto,f_auto/https%3A%2F%2Ftherealchamps.com%2Fwp-content%2Fuploads%2Fgetty-images%2F2018%2F08%2F137280542-850x560.jpeg"
              />
            </div>
            <div>
              <div
                style={{ fontSize: 16, color: "#262e3c", fontWeight: "bold" }}
              >
                Vann Soklay
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
                Staff writer, The New Yorker
              </div>
            </div>
          </Col>
          <Col span={10}>
            <button className="btn-follow">Follow</button>
          </Col>
        </Row>
      </Card>
    </React.Fragment>
  );
};

export default FilterNews;
