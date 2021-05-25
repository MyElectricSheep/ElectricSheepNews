import React from "react";
import Header from "./Header";
import News from "./News";
import StoryWithComments from "./StoryWithComments";
import { Switch, Route } from "react-router-dom";

const App = () => {
  return (
    <div className="w-full md:w-5/6 mx-auto">
      <Header />
      <Switch>
        <Route path="/story/:id">
          <StoryWithComments />
        </Route>
        <Route path="/">
          <News />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
