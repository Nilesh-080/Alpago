import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { addUser, removeUser } from "../utils/userSlice";
import { User_logo } from "../utils/constants";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // navigate("/")
      })
      .catch((error) => {
        // An error happened.
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid: uid, email: email }));
        navigate("/browse");
        // window.location.reload();
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });
    //unsubscribe when the compoinent unmounts
    return () => unsubscribe();
  }, []);

  return (
    <div className="fixed flex flex-col md:flex-row justify-between  z-10 p-4 w-screen bg-gradient-to-r from-black">
      <p className="w-44 mx-auto md:mx-10 pt-2 text-white text-2xl font-bold">ALPAAGO</p>
      {user && <div className="flex">
            <div className="mr-2">
            <img className=" w-12 h-12 rounded-full" src={User_logo} alt="user logo" />
            </div>
            <div>
            <button onClick={handleSignOut} className="p-2 bg-red-200 rounded-full mr-4 ml-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-box-arrow-right" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/>
                <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
            </svg>
            </button>
            </div>
            
        </div>
      }
        
        
    </div>
  );
};

export default Header;