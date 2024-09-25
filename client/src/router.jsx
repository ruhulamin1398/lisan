import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Research from "./components/Research";
import { Hero, Welcome } from "./components";
import NotFound from "./components/NotFound";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Hero />
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