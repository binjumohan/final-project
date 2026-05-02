import React, { useEffect, useState } from "react";
import API from "../../services/api";
import { useAuth } from "../../hooks/AuthProvider";
import { useNavigate } from "react-router-dom";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  //  Protect page
  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/");
    }
  }, [user, navigate]);

  //  Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await API.get("/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-8 pt-24">
      <h1 className="text-3xl font-bold text-yellow-400 mb-6">
         Manage Users
      </h1>

      <div className="overflow-x-auto">
        <table className="w-full border border-yellow-500 rounded-lg overflow-hidden">
          <thead className="bg-yellow-500 text-black">
            <tr>
              <th className="p-3 text-left">Username</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">Role</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr
                key={u._id}
                className="border-b border-yellow-700 hover:bg-yellow-900/30"
              >
                <td className="p-3">{u.username}</td>
                <td className="p-3">{u.email}</td>
                <td className="p-3">{u.phone}</td>
                <td className="p-3">
                  {u.role === "admin" ? "👑 Admin" : "👤 User"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {users.length === 0 && (
          <p className="text-center mt-6 text-gray-400">
            No users found
          </p>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;