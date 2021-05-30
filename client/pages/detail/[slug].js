import React from "react";
import { useRouter } from "next/router";
import TopNavbar from "../../components/Layouts/topNavbar";
import MainNavbar from "../../components/Layouts/mainNavbar";
import Footer from "../../components/Layouts/footer";
import { GET_NEWS_BY_SLUG } from "../../graphql/query";
import { useQuery } from "@apollo/client";
import Output from "editorjs-react-renderer";
import moment from "moment";

const SinglePage = () => {
  const router = useRouter();
  const { slug } = router.query;
  const { loading, data } = useQuery(GET_NEWS_BY_SLUG, {
    variables: { slug },
  });
  if (loading) return "laoding....";
  console.log(data);
  const { title } = data.get_news_by_slug;
  return (
    <React.Fragment>
      <TopNavbar />
      <MainNavbar />
      <div className="container">
        <h1>Hello world</h1>
        <h1>{title}</h1>
      </div>
    </React.Fragment>
  );
};

export default SinglePage;
