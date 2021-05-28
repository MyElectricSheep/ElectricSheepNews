import React, { lazy, Suspense, useState } from "react";
import Header from "./Header";
// import News from "./News";
// import StoryWithComments from "./StoryWithComments";
import { Switch, Route } from "react-router-dom";

const StoryWithComments = lazy(() => import("./StoryWithComments.js"));
const News = lazy(() => import("./News.js"));

const App = () => {
  const [search, setSearch] = useState("");

  return (
    <div className="w-full md:w-5/6 mx-auto">
      <Header setSearch={setSearch} />
      <Suspense fallback={<></>}>
        <Switch>
          <Route path="/story/:id">
            <StoryWithComments />
          </Route>
          <Route path="/">
            <News search={search} setSearch={setSearch} />
          </Route>
        </Switch>
      </Suspense>
    </div>
  );
};

export default App;
