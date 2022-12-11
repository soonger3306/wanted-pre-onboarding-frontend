import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Todo from "../pages/Todo";
import Login from "../pages/Login";
import Sign from "../pages/Sign";
function Router() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/todo" element={<Todo />} />
          <Route path="/" element={<Login />} />
          <Route path="/sign" element={<Sign />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Router;
