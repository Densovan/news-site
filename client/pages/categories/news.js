import React from "react";
import Link from "next/link";
import { useQuery } from "@apollo/client";
import { GET_CATEGORIES } from "../../graphql/query";
import CategoryLoader from "../../components/loaders/categoryLoader";
const News = () => {
  const { loading, data } = useQuery(GET_CATEGORIES);
  if (loading) return <CategoryLoader />;
  return (
    <React.Fragment>
      <div className="news-cat">
        <h2 className="title-cat">Categories</h2>
        <div className="scroll-newscate">
          {data.get_cats.map((res) => {
            return (
              <Link href={`/newscategories/${res.id}`}>
                <div className="listnewsCate" style={{ padding: "12px" }}>
                  <span> {res.name}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </React.Fragment>
  );
};

export default News;
