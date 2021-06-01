import React, { lazy, Suspense, useState, useEffect } from "react";
import Header from "./Header";
// import News from "./News";
// import StoryWithComments from "./StoryWithComments";
import { Switch, Route } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StoryWithComments = lazy(() => import("./StoryWithComments.js"));
const News = lazy(() => import("./News.js"));

const App = () => {
  const [search, setSearch] = useState("");

  useEffect(() => {});

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
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default App;
