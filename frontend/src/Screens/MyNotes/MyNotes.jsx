import axios from "axios";

import React, { useEffect, useState } from "react";
import { Accordion, Badge, Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import MainScreen from "../../components/MainScreen";
import { deleteNoteAction, listNotes } from "../../redux/action/notesAction";

export const MyNotes = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const noteList = useSelector((state) => state.noteList);
  console.log("noteList",noteList);
  const {notes,loading,error} = noteList
  const  userLogin = useSelector((state) => state.userLogin);
  const {userInfo} = userLogin
   const noteDelete = useSelector((state) => state.noteDelete);
   const {loading:loadingDelete,error:errorDelete,success:successDelete} = noteDelete;


  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
       dispatch(deleteNoteAction(id))
    }
  };
   useEffect(() => {
     dispatch(listNotes())
     if(!userInfo){
        navigate("/")
     }
   }, [dispatch,userInfo,successDelete]);
  
  
  //console.log(notes);
 
  return (
    <MainScreen title={`Welcome back ${userInfo.name}...`}>
      <Link to="/createnote">
        <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
          Create New Note
        </Button>
      </Link>
      {errorDelete && <ErrorMessage>{errorDelete}</ErrorMessage>}
      {loadingDelete && <Loading></Loading>}
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {loading && <Loading />}
      {notes?.reverse().map((note) => (
        <Accordion key={note._key}>
          <Card style={{ margin: 10 }}>
            <Card.Header style={{ display: "flex" }}>
              <span
                style={{
                  color: "black",
                  textDecoration: "none",
                  flex: 1,
                  cursor: "pointer",
                  alignSelf: "center",
                  fontSize: 18,
                  border: 0,
                }}
              >
                <Accordion.Header>{note.title}</Accordion.Header>
              </span>

              <div>
                <Button href={`/note/${note._id}`}>Edit</Button>
                <Button
                  variant="danger"
                  onClick={() => deleteHandler(note._id)}
                >
                  Delete
                </Button>
              </div>
            </Card.Header>
            <Accordion.Body>
              <Card.Body>
                <h4>
                  <Badge variant="success">Category - {note.category}</Badge>
                </h4>
                <blockquote className="blockquote mb-0">
                  <p>{note.content}</p>
                  <footer className="blockquote-footer">
                    Created On {note.createdAt}
                  </footer>
                </blockquote>
              </Card.Body>
            </Accordion.Body>
          </Card>
        </Accordion>
      ))}
    </MainScreen>
  );
};


 
//  <Accordion >
//           <Accordion.Item eventKey="0">
//             <Accordion.Header>
              
//             </Accordion.Header>
//             <Accordion.Body>
//              {note.content}
//             </Accordion.Body>
//           </Accordion.Item>
//         </Accordion>