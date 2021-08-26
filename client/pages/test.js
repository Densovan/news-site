import React from "react";
import shuffle from "shuffle-array";

const test = () => {
  const array = [1, 2, 3, 4, 5];
  const hello = shuffle(array);
  console.log(hello);
  return (
    <div>
      <h1>hello</h1>
    </div>
  );
};

export default test;
