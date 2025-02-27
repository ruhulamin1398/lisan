import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { API_URL } from "../utils/constants";

export default function useUser() {
  const [user, setUser] = useState([]);
  const [authToken, setAuthToken] = useState('');
  const [isUserLoading, setIsUserLoading] = useState(true);

  const navigate = useNavigate();


  useEffect(() => {
    const token = localStorage.getItem('token'); // Get token from localStorage
    setAuthToken(token); // Set the token in state

    if (!token) {
      navigate('/login'); // Redirect to login if no token
      return;
    }

    // Send a request to the backend with the token in the Authorization header
    axios.get(`${API_URL}/users/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log(response)

        if (response.status === 401) {
          localStorage.removeItem("token"); // Remove invalid token
          navigate("/login"); // Redirect to login
        } else if (response.status === 200) {
          setUser(response.data.user); // Set the user data
          setAuthToken(response.data.token); // Set the token in state
        }
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);

        localStorage.removeItem("token"); // Remove invalid token
        navigate("/login"); // Redirect to login on error
      })
      .finally(() => {
        setIsUserLoading(false); // Stop loading once the API call is complete
      });
  }, [navigate]);

  return { user, authToken, setAuthToken, setUser, isUserLoading }

}
