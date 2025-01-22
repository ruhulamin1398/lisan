import { Outlet, useLocation } from "react-router-dom";
import { Navbar, Footer } from "./components";
import { PulseLoader } from "react-spinners"; // Import the spinner component
import { useState, useEffect } from "react";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [delayLoading, setDelayLoading] = useState(false); // For handling minimum delay
  const location = useLocation(); // Get current location

  useEffect(() => {
    // Set loading when location changes (i.e., when route changes)
    setLoading(true);
    setDelayLoading(true); // Show loader immediately

    // Minimum delay for showing the loader
    const timeout = setTimeout(() => {
      setDelayLoading(false);
    }, 1000);

    // Hide the loader after the minimum delay and when route fully loads
    return () => {
      clearTimeout(timeout);
      setLoading(false);
    };
  }, [location]);

  return (
    <div className="min-h-screen   font-glacial">
      <div className=" ">
        <Navbar />

        {/* Show spinner while loading */}
        {loading && delayLoading ? (
          <div className="flex justify-center items-center min-h-screen">
            <PulseLoader color="#36D7B7" size={40} />
          </div>
        ) : (
          <Outlet />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default App;
