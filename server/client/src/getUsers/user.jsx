import React, { useEffect } from "react";
import "./user.css";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const User = () => {
  const [users, setUsers] = React.useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/users");
        const data = await response.json(); // ✅ convert response to JSON
        console.log(data);

        if (Array.isArray(data)) {
          setUsers(data);
        } else if (Array.isArray(data.users)) {
          setUsers(data.users);
        } else {
          setUsers([]); // fallback
        }
        // setUsers(data.users);
      } catch (error) {
        console.log("Error while fetching data", error);
      }
    };
    fetchData();
  }, []);

  const deleteUser = async (userid) => {
    await axios
      .delete(`http://localhost:8000/api/delete/users/${userid}`)
      .then((res) => {
        setUsers((prevUser) => prevUser.filter((user) => user._id !== userid));
        toast.success(res.data.message, { position: "top-center" });
      })
      .catch((error) => {
        toast.error("Error while deleting user", { position: "top-center" });
      });
  };
  return (
    <div className="userTable">
      <Link to="/add" type="button" className="btn btn-primary">
        Add User <i className="fa-solid fa-user-plus"></i>
      </Link>

      {users && users.length === 0 ? (
        <div className="noData">
          <h3>No users found</h3>
          <p>Please Add New User</p>
        </div>
      ) : (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">S.No.</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Address</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => {
              return (
                <tr>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.address}</td>
                  <td className="actionbuttons">
                    <Link
                      to={`/update/` + user._id}
                      type="button"
                      className="btn btn-info"
                    >
                      {" "}
                      <i className="fa-solid fa-pen-to-square"></i>
                    </Link>

                    <button
                      onClick={() => deleteUser(user._id)}
                      type="button"
                      className="btn btn-danger"
                    >
                      {" "}
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default User;
