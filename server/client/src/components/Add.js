import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate, NavLink } from "react-router-dom";
import { useAddUserMutation } from "../services/usersApi";
import { toast } from "react-toastify";

const Add = () => {
    const navigate = useNavigate();
    const [addUser, {isLoading}] = useAddUserMutation();
    const [userInput, setUserInput] = useState({
        name: "", 
        email: "", 
        phone: ""
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setUserInput({
            ...userInput, 
            [name]: value
        })
    }

    const handleClick = async(e) => {
        const {name, email, phone} = userInput;
        try{
            e.preventDefault();
            if(!name || !email || !phone){
                toast.error("please fill all the fields", {
                    position: "top-center",
                });
            }else{
                await addUser(userInput);
                toast.success("User added successfully", {
                    position: "top-center",
                });
                navigate("/");
            }
        }catch(err){
            console.log(err);
        }       
    }
  return (
    <div className="add">
        <NavLink to="/">
        <Button className="my-3">Go back to home</Button>
        </NavLink>
      <div className="form">
        <h1>Add User</h1>
        <Form>
            <Form.Group className="mb-3 w-100" controlId="formBasicEmail">
                <Form.Control onChange={handleChange} name="name" value={userInput.name} type="text" placeholder="Name" disabled={isLoading} />
            </Form.Group>
            <Form.Group className="mb-3 w-100" controlId="formBasicPassword">
                <Form.Control onChange={handleChange} name="email" value={userInput.email} type="email" placeholder="Email" disabled={isLoading} />
            </Form.Group>
            <Form.Group className="mb-3 w-100" controlId="formBasicPassword">
                <Form.Control onChange={handleChange} name="phone" value={userInput.phone} type="text" placeholder="Phone" disabled={isLoading} />
            </Form.Group>
            <Button onClick={handleClick} variant="primary" type="submit">
                Add User
            </Button>
        </Form>
      </div>
    </div>
  )
}

export default Add;
