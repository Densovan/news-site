import { Card, Typography, Tag, Divider } from 'antd';
import { useQuery } from '@apollo/client';
import { GET_TYPES, GET_CATEGORIES } from '../../graphql/query';
import CategoryLoader from '../loaders/categoryLoader';

const { CheckableTag } = Tag;

const Filter = ({ handleChange, selectedTags }) => {
  console.log(selectedTags);
  const { loading: loadingCategory, data: categories } =
    useQuery(GET_CATEGORIES);
  const { loading: loadingType, data: types } = useQuery(GET_TYPES);

  if (loadingCategory || loadingType) return <CategoryLoader />;

  const tagsData = ['All'];
  categories.get_cats.forEach((element) => {
    tagsData.push(element.name);
  });
  const typeData = [];
  types.get_types.forEach((element) => {
    typeData.push(element.name);
  });
  return (
    <Card className="card-article">
      <Typography.Title level={5}>Recommended Topics</Typography.Title>
      <Divider style={{ marginBottom: 20, marginTop: 16 }} />
      <div>
        <Typography.Title
          level={5}
          style={{ fontSize: 12, color: '#262e3c', fontWeight: 'bold' }}
        >
          CATEGORY
        </Typography.Title>
      </div>
      <div style={{ marginTop: 12 }}>
        {tagsData.map((tag) => (
          <CheckableTag
            key={tag}
            checked={selectedTags!=null && selectedTags.indexOf(tag) > -1}
            onChange={(checked) => handleChange(tag, checked)}
          >
            {tag}
          </CheckableTag>
        ))}
      </div>
      <div>
        <Typography.Title
          level={5}
          style={{ fontSize: 12, color: '#262e3c', fontWeight: 'bold' }}
        >
          TYPE
        </Typography.Title>
      </div>
      <div style={{ marginTop: 12 }}>
        {typeData.map((types) => (
          <CheckableTag
            key={types}
            checked={selectedTags!=null && selectedTags.indexOf(types) > -1}
            onChange={(checked) => handleChange(types, checked)}
          >
            {types}
          </CheckableTag>
        ))}
      </div>
    </Card>
  );
};

export default Filter;
