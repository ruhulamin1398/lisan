"use client";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { PulseLoader } from "react-spinners";
import { API_URL } from "../../utils/constants";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    identifier: "", // username or email
    password: "",
  });

  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    validateField(name, value);
  };

  // Validate form fields
  const validateField = (name, value) => {
    let errorMsg = "";

    if (name === "identifier" && !value) {
      errorMsg = "Username or email is required.";
    }

    if (name === "password" && !value) {
      errorMsg = "Password is required.";
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMsg,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const isValid = validateAllFields();
    if (!isValid) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setIsLoading(false);
        localStorage.setItem("token", data.token);
        setFormData({
          identifier: "",
          password: "",
        });
        router.replace("/admin");
      } else {
        setIsLoading(false);
        setMessage(`Error: ${data.error || "Failed to log in"}`);
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error logging in:", error);
      setMessage("Error: Could not connect to the server.");
    }
  };

  // Validate all form fields
  const validateAllFields = () => {
    let valid = true;
    Object.keys(formData).forEach((field) => {
      validateField(field, formData[field]);
      if (errors[field]) valid = false;
    });
    return valid;
  };

  useEffect(() => {
    if (message) {
      if (message.startsWith("Error")) {
        toast.error(message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        toast.success(message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
      setMessage("");
    }
  }, [message]);

  return (
    <div className="w-[200px] md:w-[500px] bg-white shadow-md mt-10 p-4 md:p-8 rounded-lg">
      <div className="bg-deep-dark p-2 md:pt-4 rounded-t-lg">
        <h2 className="text-lg md:text-2xl font-bold text-[#2a303d] text-center">
          User Login
        </h2>
      </div>
      <div className="p-3 md:p-3">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="identifier"
              className="block text-gray-900 font-medium mb-2 text-sm md:text-base"
            >
              Username or Email
            </label>
            <input
              type="text"
              id="identifier"
              name="identifier"
              value={formData.identifier}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 text-gray-900"
            />
            {errors["identifier"] && (
              <p className="text-red-500 text-sm mt-1">
                {errors["identifier"]}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-900 font-medium mb-2 text-sm md:text-base"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 text-gray-900"
            />
            {errors["password"] && (
              <p className="text-red-500 text-sm mt-1">{errors["password"]}</p>
            )}
          </div>

          {isLoading ? (
            <div className="text-center">
              <PulseLoader size={40} color="#3498db" />
            </div>
          ) : (
            <button
              type="submit"
              className="w-full bg-[#2a303d] text-white py-2 px-4 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
            >
              Login
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
