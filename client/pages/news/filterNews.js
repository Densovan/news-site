import React, { useState  } from "react";
import Link from "next/link";
import { useQuery } from "@apollo/client";
import { GET_CATEGORIES } from "../../graphql/query";
import CategoryLoader from "../../components/loaders/categoryLoader";
import { Card, Tag, Divider, Typography } from 'antd';

const { CheckableTag } = Tag;

const FilterNews = ({ news }) => {

  const [state, setState] = useState({
    selectedTags: ['Coins']
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
  
  const filterNews = [];
  news.get_all_news_by_type_news.forEach(element => {
    if (element.categories.name === "Market") {
        filterNews.push(element)
    }
  });
  console.log(filterNews);
  return (
    <React.Fragment>
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

export default FilterNews;
