import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import MainScreen from "../../components/MainScreen";
import { updateProfile } from "../../redux/action/userAction";
import './ProfileScreen.css'

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [picMessage, setPicMessage] = useState("");
  const [pic, setPic] = useState();
  const navigate = useNavigate()
  const  dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin)
  const {userInfo} = userLogin
  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading,error,success } = userUpdate;
  //console.log(userInfo)

  useEffect(() => {
      if(!userInfo){
          navigate('/')
      }
      else{
          setName(userInfo.name);
          setEmail(userInfo.email);
          setPic(userInfo.pic)
      }
  }, [navigate,userInfo]);

  const submitHandler = (e) => {
   e.preventDefault();
   if(password === confirmPassword) 
   dispatch(updateProfile({name,email,password,pic}))
   navigate("/mynotes")
  }
  return (
    <MainScreen title="Edit Profile">
      <div>
        <Row className="profileContainer">
          <Col md={6}>
            <Form onSubmit={submitHandler}>
                {loading && <Loading/>}
                {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                {success && <ErrorMessage variant="success">Updated Successfully</ErrorMessage>}
              <Form.Group controlId="name">Name</Form.Group>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
              <Form.Group controlId="email">Email</Form.Group>
              <Form.Control
                type="text"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
              <Form.Group controlId="password">Password</Form.Group>
              <Form.Control
                type="text"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
              <Form.Group controlId="confirmpassword">
                Confirm password
              </Form.Group>
              <Form.Control
                type="text"
                placeholder="Enter confirmpassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Form.Control>
              <Form.Group controlId="pic">picture</Form.Group>
              <Form.Control
                id="custom-file"
                type="image/png"
                value={pic}
                label="Upload Profile Picture"
                custom
                onChange={(e) => setPic(e.target.value)}
              ></Form.Control>
              <Button type="submit" variant="primary" className="my-2">Update</Button>
            </Form>
          </Col>
          <Col
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img src={userInfo.pic} alt={name} className="profilePic" />
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
};

export default ProfileScreen;
