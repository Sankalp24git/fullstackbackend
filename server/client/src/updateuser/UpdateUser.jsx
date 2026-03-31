import React,{useEffect} from 'react'
import "./updateUser.css";
import { Link, useNavigate,useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const UpdateUser = () => {
    const users = {
        name:"",
        email:"",
        address:"",
    };
    const [user,setUser] = React.useState(users);
    const navigate = useNavigate();
    const {id} = useParams();

    const inputHandler = (e) =>{
        const {name,value} = e.target;
        console.log(name,value);
        setUser({...user,[name]:value});
    }

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/users/${id}`)
        .then((res)=>{
            setUser(res.data);
        })
        .catch((err)=>{
            console.log(err);
        });
    },[id]);

    const submitForm = async (e) =>{
        e.preventDefault();
        await axios.put(`http://localhost:8000/api/update/users/${id}`,user)
        .then((res)=>{
            // console.log("User created successfully");
            toast.success(res.data.message,{position:"top-center"});
            navigate("/");
        })
        .catch((err)=>{
            console.log(err);
            // toast.error("Error creating user",{position:"top-center"});
        })

    }
  return (
   <div className="addUser">
    <Link to="/" type="button" className="btn btn-secondary">
        <i className="fa-solid fa-arrow-left"></i>
    </Link>
     <h1>Update User</h1>
     <form className="addUserForm" onSubmit={submitForm}>
        <div className="inputGroup">
            <label htmlFor="name">Name</label>
            <input type="text" value={user.name} onChange={inputHandler} name="name" id="name" placeholder="Enter Your Name" autoComplete="off"/>
        </div>
        <div className="inputGroup">
            <label htmlFor="email">Email</label>
            <input type="text" value={user.email} onChange={inputHandler} name="email" id="email" placeholder="Enter Your Email" autoComplete="off"/>
        </div>
        <div className="inputGroup">
            <label htmlFor="address">Address</label>
            <input type="text" value={user.address} onChange={inputHandler} name="address" id="address" placeholder="Enter Your Address" autoComplete="off"/>
        </div>
        <div className="inputGroup">
            <button type="submit" className="btn btn-success">Submit</button>
        </div>
     </form>
   </div>
  )
}

export default UpdateUser
