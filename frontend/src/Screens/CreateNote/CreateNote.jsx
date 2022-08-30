import React, { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import MainScreen from "../../components/MainScreen";
import ReactMarkdown from "react-markdown"
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading";
import { noteCreateAction } from "../../redux/action/notesAction";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage";
const CreateNote = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const navigate = useNavigate()
const dispatch = useDispatch();
const noteCreate = useSelector((state) => state.noteCreate)
const {loading,error,note} = noteCreate;
//console.log(noteCreate);
  const resetHandler = () =>{
     setTitle("")
     setContent("")
     setCategory("")
  }
  const submitHandler = (e) => {
       e.preventDefault();
       if(!title || !content || !category) return
      
       dispatch(noteCreateAction(title,content,category))
        resetHandler();
      navigate("/mynotes")
  }
  return (
    <MainScreen title="Create Note">
      <Card>
        <Card.Header>Create a new Note</Card.Header>
        <Card.Body>
          <Form onSubmit={submitHandler}>
              {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
            </Form.Group>
            <Form.Control
              type="title"
              value={title}
              placeholder="Enter the title"
              onChange={(e) => setTitle(e.target.value)}
            ></Form.Control>
            <Form.Group controlId="content">Content</Form.Group>
            <Form.Control
              as="textarea"
              rows={4}
              type="content"
              value={content}
              placeholder="Enter the content"
              onChange={(e) => setContent(e.target.value)}
            ></Form.Control>{" "}
            {content && (
              <Card>
                <Card.Header>Note Preview</Card.Header>
                <Card.Body>
                  <ReactMarkdown>{content}</ReactMarkdown>
                </Card.Body>
              </Card>
            )}
            <Form.Group controlId="content">Category</Form.Group>
            <Form.Control
              type="content"
              value={category}
              placeholder="Enter the content"
              onChange={(e) => setCategory(e.target.value)}
            ></Form.Control>
            {loading && <Loading size={50} />}
            <Button variant="primary" type="submit">
              Create Note
            </Button>
            <Button
              variant="danger"
              className="mx-2 my-2"
              onClick={resetHandler}
            >
              Reset Fields
            </Button>
          </Form>
        </Card.Body>
        <Card.Footer className="text-muted">
          Creating on -{new Date().toLocaleDateString()}
        </Card.Footer>
      </Card>
    </MainScreen>
  );
};

export default CreateNote;
