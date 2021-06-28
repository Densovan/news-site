import React from "react";
import Link from "next/link";
import { useQuery } from "@apollo/client";
import { GET_CATEGORIES } from "../../graphql/query";
import ContentLoader from "react-content-loader";
import CategoryLoader from "../../components/loaders/categoryLoader";
const Feature = () => {
  const { loading, data } = useQuery(GET_CATEGORIES);
  if (loading) return <CategoryLoader />;
  console.log(data);
  return (
    <React.Fragment>
      <div className="news-cat">
        <h2 className="title-cat">Categories</h2>
        <div className="scroll-newscate">
          {data.get_cats.map((res) => {
            return (
              <Link href={`/featurecategories/${res.id}`}>
                <div className="listnewsCate" style={{ padding: "12px" }}>
                  <span> {res.name}</span>
                </div>
              </Link>
            );
          })}
        </div>
        {/* <ContentLoader
          width={300}
          height={400}
          viewBox="0 0 450 400"
          backgroundColor="#f0f0f0"
          foregroundColor="#dedede"
          // {...props}
        >
          <rect x="43" y="304" rx="4" ry="4" width="271" height="9" />
          <rect x="44" y="323" rx="3" ry="3" width="119" height="6" />
          <rect x="42" y="77" rx="10" ry="10" width="388" height="217" />
        </ContentLoader> */}
      </div>
    </React.Fragment>
  );
};

export default Feature;
