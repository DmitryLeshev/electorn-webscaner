import React from "react";

import { Routing } from "pages";
import { withProviders } from "./providers";
import { Layout } from "./layouts";

import "features/login";

import "./index.scss";

const App = () => {
  return (
    <Layout>
      <Routing />
    </Layout>
  );
};

export default withProviders(App);
