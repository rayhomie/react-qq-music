import React from "react";
import Hello from "./Hello";

interface TestProps {}

const Test: React.FC<TestProps> = (props) => {
  return <Hello compiler="TypeScript" framework="React" />;
};

export default Test;
