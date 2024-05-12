import { useRoutes } from "react-router-dom";
import SideMenu from "../layouts/SideMenu";
import Page1 from "../pages/Page1";
import Page2 from "../pages/Page2";
import Page3 from "../pages/Page3";
import Login from "../pages/Login";
import Page4 from "../pages/Page4";
import Page5 from "../pages/Page5";
import Page6 from "../pages/Page6";
import AddStudent from "../pages/AddStudent";
import Profile from "../pages/Profile";
import Signup from "../pages/Signup";
import EmailVerifiy from "../pages/EmailVerifiy";
import EmailSent from "../pages/EmailSent";

function Router() {
  const routes = [
    {
      path: "/",
      element: <SideMenu />,
      children: [
        {
          path: "/",
          element: <Page1 />,
        },
        {
          path: "page-2",
          element: <Page2 />,
        },
        {
          path: "page-3",
          element: <Page3 />,
        },
        {
          path: "page-4",
          element: <Page4 />,
        },
        {
          path: "page-5",
          element: <Page5 />,
        },
        {
          path: "page-6",
          element: <Page6 />,
        },
        {
          path: "Student/add",
          element: <AddStudent />,
        },
        {
          path: "Student/update",
          element: <AddStudent />,
        },
        {
          path: "Student/profile",
          element: <Profile />,
        },
      ],

    },
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "signup",
      element: <Signup />,
    },
    {
      path: "email-verification",
      element: <EmailVerifiy />,
    },
    {
      path: "email-sent",
      element: <EmailSent />,
    },
  ];

  return useRoutes(routes);
}

export default Router;
