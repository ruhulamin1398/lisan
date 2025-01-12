import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Research from "./components/Research"; 
import NotFound from "./components/NotFound";
import HomePage from "./components/page/HomePage";
import Projects from "./components/Projects";
import { Services ,Contact} from "./components";
import PostList from "./components/admin/PostList";
import Profile from "./components/Profile";
import Login from "./components/Login";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <HomePage />
            },
            {
                path: "/research",
                element: <Research />
            },{
                path: "/projects",
                element: <Projects />
            },
            {
                path: "/services",
                element: <Services />
            },{
                path: "/contact",
                element: <Contact />
            },{
                path: "/post",
                element: <PostList />
            },{
                path: "/login",
                element: <Login />
            },{
                path: "/profile",
                element: <Profile />
            },
            {
                path: "*",
                element: <NotFound />,
            },
        ]
    },

]);
export default router;