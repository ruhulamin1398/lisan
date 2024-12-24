import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Research from "./components/Research"; 
import NotFound from "./components/NotFound";
import HomePage from "./components/page/HomePage";
import { Services ,Contact} from "./components";

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
                path: "/services",
                element: <Services />
            },{
                path: "/contact",
                element: <Contact />
            },
            {
                path: "*",
                element: <NotFound />,
            },
        ]
    },

]);
export default router;