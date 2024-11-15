import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Mypage from "./pages/Mypage";
import Login from "./pages/Login";
import Join from "./pages/Join";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {},
    {
      path: "/join",
      element: <Join />,
    },
    {
      path: "/hobby",
      element: <Mypage />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
