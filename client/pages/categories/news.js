import React, { useState  } from "react";
import Link from "next/link";
import { useQuery } from "@apollo/client";
import { GET_CATEGORIES } from "../../graphql/query";
import CategoryLoader from "../../components/loaders/categoryLoader";
import { Card, Tag, Divider, Typography } from 'antd';

const { CheckableTag } = Tag;

const News = () => {

  const [state, setState] = useState({
    selectedTags: ['Books']
  })
  const { loading, data } = useQuery(GET_CATEGORIES);
  if (loading) return <CategoryLoader />;
  const handleChange = (tag, checked) => {
    const { selectedTags } = state;
    const nextSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter(t => t !== tag);
    console.log('You are interested in: ', nextSelectedTags);
    setState({ selectedTags: nextSelectedTags });
  }
  const tagsData = [];
  data.get_cats.forEach(element => {
    tagsData.push(element.name);
  });
  return (
    <React.Fragment>
      {/* <div className="news-cat">
        <h2 className="title-cat">Categories</h2>
        <div className="scroll-newscate">
          {data.get_cats.map((res, index) => {
            return (
              <Link key={index} href={`/newscategories/${res.id}`}>
                <div className="listnewsCate" style={{ padding: "12px" }}>
                  <span> {res.name}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div> */}
      <Card className="card-article">
        <Typography.Title level={5}>RECOMMENDED TOPICS</Typography.Title>
        <Divider style={{ marginBottom: 20, marginTop: 16 }}/>
        {tagsData.map(tag => (
          <CheckableTag
            key={tag}
            checked={state.selectedTags.indexOf(tag) > -1}
            onChange={checked => handleChange(tag, checked)}
          >
            {tag}
          </CheckableTag>
        ))}
      </Card>
      
    </React.Fragment>
  );
};

export default News;
