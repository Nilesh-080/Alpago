import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { ref, onValue, remove } from "firebase/database";
import fireDB from "../utils/formfirebase";
import { toast } from "react-toastify";

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const usersRef = ref(fireDB, "contacts");
                onValue(usersRef, (snapshot) => {
                    const data = snapshot.val();
                    if (data) {
                        const userList = Object.keys(data).map(key => ({
                            id: key,
                            ...data[key]
                        }));
                        setUsers(userList);
                    } else {
                        setUsers([]);
                    }
                });
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();

        return () => {
            setUsers([]);
        };
    }, []);

    const onDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                const userRef = ref(fireDB, `contacts/${id}`);
                await remove(userRef);
                toast.success("User Deleted Successfully");
            } catch (error) {
                console.error("Error deleting user:", error);
                toast.error(error.message);
            }
        }
    }

    return (
        <div className="w-8/12 mx-auto py-8">
            <h1 className="text-2xl font-bold mb-4 font-serif flex justify-center py-6">Active User Logs</h1>
            <table className="w-full border-collapse border border-gray-300 shadow-2xl">
                <thead className="bg-green-200">
                    <tr>
                        <th className="px-4 py-3 border border-gray-300">No.</th>
                        <th className="px-4 py-3 border border-gray-300">Name</th>
                        <th className="px-4 py-3 border border-gray-300">Date Added</th>
                        <th className="px-4 py-3 border border-gray-300">Status</th>
                        <th className="px-4 py-3 border border-gray-300">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={user.id} className={index % 2 === 0 ? "bg-gray-100" : "bg-gray-50"}>
                            <td className="px-4 py-3 border border-gray-300 font-semibold">{index + 1}</td>
                            <td className="px-4 py-3 border border-gray-300 font-semibold">{user.name}</td>
                            <td className="px-4 py-3 border border-gray-300 font-semibold">{user.date}</td>
                            <td className="px-4 py-3 border border-gray-300 font-semibold">{user.status === "active" ? "🟢 Active" : "🔴 Inactive"}</td>
                            <td className="flex gap-4 px-4 py-3 border border-gray-300">
                                <Link to={"/update/"+user.id}>
                                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">Edit</button>
                                </Link>
                                <button onClick={()=> onDelete(user.id)} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link to="/add" className="block w-full my-20 mb-48 text-center">
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:bg-indigo-700">Add New User</button>
            </Link>
        </div>
    );
};

export default UserList;
