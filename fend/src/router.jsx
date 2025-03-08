import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Research from "./components/Research";
import NotFound from "./components/NotFound";
import HomePage from "./components/page/HomePage";
import Projects from "./components/Projects";
import { Services, Contact } from "./components";
import PostList from "./components/admin/PostList";
import Profile from "./components/Profile";
import Login from "./components/auth/Login";
import AdminLayout from "./components/admin/AdminLayout";
import CreatePost from "./components/admin/CreatePost";
import PrivateRoute from "./components/auth/PrivateRoute";
import CreateCategory from "./components/admin/CreateCategory";
import Experience from "./components/Experience";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "",
                element: <HomePage />
            },
            {
                path: "research",
                element: <Research />
            },
            {
                path: "projects",
                element: <Projects />
            },
            {
                path: "services",
                element: <Services />
            },
            {
                path: "experience",
                element: <Experience />
            },
            {
                path: "contact",
                element: <Contact />
            },
            // {
            //     path: "post",
            //     element: <PostList />
            // },

            {
                path: "login",
                element: <Login />
            },
            {
                path: "*",
                element: <NotFound />,
            },
        ]
    },
    {
        path: "/admin",
        element: < PrivateRoute> <AdminLayout /> </PrivateRoute>,
        children: [
            {
                path: "",
                element: <Profile />
            },
            {
                path: "blogs/create",
                element: <CreatePost />
            },
            {
                path: "posts",
                element: <PostList />
            },

            {
                path: "category/create",
                element: <CreateCategory />
            }

        ]
    },
]);

export default router;