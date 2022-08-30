import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import MainScreen from "../../components/MainScreen";
import { register } from "../../redux/action/userAction";

const RegisterPage = () => {
 const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [pic, setPic] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [picMessage, setPicMessage] = useState(null);
  const dispatch = useDispatch()
  const userRegister = useSelector((state) => state.userRegister)
  const {loading,error,userInfo} = userRegister
  console.log(userRegister);
  useEffect(() => {
    if(userInfo){
        navigate("/mynotes")
    }
  },[userInfo])

  const submitHandler = async (e) => {
    e.preventDefault();
    if(password !== confirmPassword){
      setMessage('Password do not match')
    }
    else{
      dispatch(register(name,email,password,pic))
    }
   
  };
  return (
    <MainScreen title="Register">
      <div className="loginContainer">
        {error && <ErrorMessage variant="danger">{"User exist"}</ErrorMessage>}
        {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
        {loading && <Loading />}
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label> Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder=" Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Profile Picture</Form.Label>
            <Form.Control
              //  onChange={(e) => setPic(e.target.files[0])}
              id="custom-file"
              type="file"
              Label="upload profile Picture"
              placeholder="Confirm password"
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </MainScreen>
  );
};

export default RegisterPage;
