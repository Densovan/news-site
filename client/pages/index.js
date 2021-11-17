import React from "react";
import News from "../pages/news/index";
import { useAuth } from "../layouts/layoutAuth";
import Header from '../components/Globals/Header';

const Index = () => {
  const { user } = useAuth();
  return (
    <div>
      {/* <Header/> */}
      <News />
    </div>
  );
};

export default Index;
