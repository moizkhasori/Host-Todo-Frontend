import React, { useEffect } from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { useDispatch } from "react-redux";

//Redux
import { fetchUserDetails } from "./Redux/User/userSlice";

//Pages
import IndexLogin from "./Pages/Login/IndexLogin";
import ProtectedRoute from "./Pages/ProtectedRoute";
import IndexSignup from "./Pages/Signup/IndexSignup";
import TodoMainPage from "./Pages/Todos/TodoMainPage";
import CreateAndEditTaskPage from "./Pages/Todos/CreateAndEditTaskPage";
import CreateTodoPage from "./Pages/Todos/CreateTodoPage";



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>

      <Route path="/" element={<ProtectedRoute />}>
        <Route index element={<TodoMainPage />} />
        <Route path="/createtask" element={<CreateAndEditTaskPage />} />
        <Route path="/task/:id" element={<CreateAndEditTaskPage />} />
        <Route path="/createtest" element={<CreateTodoPage />} />
      </Route>

      <Route path="/login" element={<IndexLogin />} />
      <Route path="/signup" element={<IndexSignup />} />
    </Route>
  )
);



function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserDetails());
  }, [dispatch]);

  return <RouterProvider router={router} />;
}

export default App;