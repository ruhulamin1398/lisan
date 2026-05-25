"use client";

import useUser from "../hooks/useUser";
import { PulseLoader } from "react-spinners";

const Profile = () => {
  const { user, isUserLoading } = useUser();

  return (
    <div>
      {!isUserLoading ? (
        <div>
          <h1 className="text-black text-2xl">Welcome {user.displayName}</h1>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <div className="text-center">
          <PulseLoader size={40} color="#3498db" />
        </div>
      )}
    </div>
  );
};

export default Profile;
