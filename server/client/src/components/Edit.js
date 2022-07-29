import React, { useEffect, useState } from 'react';
import { Form, Button } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { useGetUserQuery, useUpdateUserMutation } from "../services/usersApi";
import { toast } from "react-toastify";
import { useParams } from 'react-router-dom';

const Edit = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const {data, error, isLoading} = useGetUserQuery(id);
    const [updateUser] = useUpdateUserMutation();
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
        });
    }

    const handleSubmit = async(e) => {
        try{
            e.preventDefault();
            await updateUser(userInput, id);
            navigate("/");
            toast.success("User updated successfully", {
                position: "top-center"
            });
        }catch(err){
            console.log(err);
        }             
    }

    useEffect(() => {
        if(error){
            toast.error("Something went wrong", {
                position: "top-center"
            });
        }
        if(data){
            setUserInput({...data});
        }
    }, [error, data])
  return (
    <div className="view">
        <div className="add">
            <NavLink to="/">
            <Button className="my-3">Go back to home</Button>
            </NavLink>
            <div className="form">
                <h1>Edit User</h1>
                <Form>
                    <Form.Group className="mb-3 w-100" controlId="formBasicEmail">
                        <Form.Control onChange={handleChange} name="name" value={userInput.name}  type="text" placeholder="Name"/>
                    </Form.Group>
                    <Form.Group className="mb-3 w-100" controlId="formBasicPassword">
                        <Form.Control onChange={handleChange} name="email" value={userInput.email} type="email" placeholder="Email" />
                    </Form.Group>
                    <Form.Group className="mb-3 w-100" controlId="formBasicPassword">
                        <Form.Control onChange={handleChange} name="phone" value={userInput.phone} type="text" placeholder="Phone" />
                    </Form.Group>
                    <Button onClick={handleSubmit} variant="primary" type="submit">
                        Update
                    </Button>
                </Form>
            </div>
        </div>
    </div>
  )
}

export default Edit;
