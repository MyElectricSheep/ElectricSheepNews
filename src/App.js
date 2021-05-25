import React, { lazy, Suspense } from "react";
import Header from "./Header";
// import News from "./News";
// import StoryWithComments from "./StoryWithComments";
import { Switch, Route } from "react-router-dom";

const StoryWithComments = lazy(() => import("./StoryWithComments.js"));
const News = lazy(() => import("./News.js"));

const App = () => {
  return (
    <div className="w-full md:w-5/6 mx-auto">
      <Header />
      <Suspense fallback={<></>}>
        <Switch>
          <Route path="/story/:id">
            <StoryWithComments />
          </Route>
          <Route path="/">
            <News />
          </Route>
        </Switch>
      </Suspense>
    </div>
  );
};

export default App;
