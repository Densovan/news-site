import React from "react";
import News from "../pages/news/index";
import { useAuth } from "../layouts/layoutAuth";

const Index = () => {
  const { user } = useAuth();
  return (
    <div>
      <News />
    </div>
  );
};

export default Index;
