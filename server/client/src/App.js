import './App.css';
import User from "./getUsers/user";
import AddUser from "./addUser/AddUser";
import UpdateUser from "./updateuser/UpdateUser";
import {createBrowserRouter,RouterProvider} from "react-router-dom";

function App() {
  const route = createBrowserRouter([
    {
      path:"/",
      element:<User />,
    },

    {
      path:"/add",
      element:<AddUser />,
    },
    {
      path:"/update/:id",
      element:<UpdateUser />,
    },
  ])
  return (
    <div className="App">
      <RouterProvider router={route}></RouterProvider>
    </div>
  );
}

export default App;