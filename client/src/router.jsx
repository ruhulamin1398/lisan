import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Research from "./components/Research"; 
import NotFound from "./components/NotFound";
import HomePage from "./components/page/HomePage";

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
            },
            {
                path: "*",
                element: <NotFound />,
            },
        ]
    },

]);
export default router;