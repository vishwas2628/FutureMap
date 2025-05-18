import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const FutureContext = createContext();

const FutureContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(""); // Store user's first name
  const navigate = useNavigate();

  // Function to fetch user data and set userId and userName
  // const fetchUserDetails = async (token) => {
  //   try {
  //     const response = await axios.get(`${backendUrl}/api/user/me`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     colsole.log(response)
  //     if (response.data.success) {
  //       setUserId(response.data.user._id);
  //       setUserName(response.data.user.firstname); // Set user's first name
  //     } else {
  //       toast.error("Failed to fetch user details.");
  //     }
  //   } catch (error) {
  //     toast.error(error.response?.data?.message || "Error fetching user details.");
  //   }
  // };

  // Logout function
  const handleLogout = () => {
    setToken(null);
    setUserId(null);
    setUserName("");
    localStorage.removeItem("token");
    navigate("/login");
    toast.success("Logged out successfully.");
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!token && storedToken) {
      setToken(storedToken);
    }

    // if (token) {
    //   fetchUserDetails(token);
    // }
  }, [token]);

  const value = {
    navigate,
    backendUrl,
    token,
    setToken,
    userId,
    userName,
    handleLogout, // Provide logout function in context
  };

  return (
    <FutureContext.Provider value={value}>{props.children}</FutureContext.Provider>
  );
};

export default FutureContextProvider;