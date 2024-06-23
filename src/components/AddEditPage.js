import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from 'react-router-dom';
import { ref, push, onValue, set } from "firebase/database";
import fireDB from "../utils/formfirebase";

const initialState = {
  name: "",
  date: "",
  status: "",
};

const AddEditPage = () => {
  const [state, setState] = useState(initialState);
  const [users, setUsers] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const usersRef = ref(fireDB, "contacts");
          onValue(usersRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
              setUsers(data);
            } else {
              setUsers({});
            }
          });
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    }
  }, [id]);

  useEffect(() => {
    if (id && users[id]) {
      setState(users[id]);
    } else {
      setState(initialState);
    }
  }, [id, users]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, date, status } = state;
    if (!name || !date || !status) {
      toast.error("Please provide value in each field");
    } else {
        if(!id){
            try {
                await push(ref(fireDB, "contacts"), state);
                toast.success("User Added Successfully!!");
                setTimeout(() => navigate("/browse"), 500);
              } catch (error) {
                toast.error(error.message);
              }
        } else{
            try {
                await set(ref(fireDB, `contacts/${id}`), state);
                toast.success("User Updated Successfully!!");
                setTimeout(() => navigate("/browse"), 500);
              } catch (error) {
                toast.error(error.message);
              }
        }
      
    }
  }

  return (
    <div>
      <form
        className="w-full absolute p-10 bg-blue-100 md:w-3/12  my-40 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80"
        onSubmit={handleSubmit}
      >
        <label htmlFor="name" className="text-black font-bold">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Name"
          value={state.name || ""}
          className="p-3 my-2 bg-gray-600 w-full rounded-lg"
          onChange={handleChange}
        />
        <label htmlFor="date" className="text-black font-bold">Date</label>
        <input
          type="date"
          id="date"
          name="date"
          placeholder="Date"
          value={state.date || ""}
          className="p-3 my-2 bg-gray-600 w-full rounded-lg"
          onChange={handleChange}
        />
        <label htmlFor="status" className="text-black font-bold">Status</label>
        <input
          type="text"
          id="status"
          name="status"
          placeholder="Status"
          value={state.status || ""}
          className="p-3 my-2 bg-gray-600 w-full rounded-lg"
          onChange={handleChange}
        />

        <button type="submit" className="py-3 p-4 my-8 w-full bg-green-600 rounded-lg">
          {
            id ? "Update" : "Save"
          }
        </button>
      </form>
    </div>
  );
};

export default AddEditPage;
