import React, { Component } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import axios from "axios";
const backendUrl = import.meta.env.BACKEND_URL || "http://localhost:3001";


class BookFormModal extends Component {
  state = {
    Title: "",
    Author: "",
    Description: "",
    URL: "",
  };

  componentDidUpdate(prevProps) {
    if (this.props.book !== prevProps.book) {
      this.setState({
        Title: this.props.book.Title,
        Author: this.props.book.Author,
        Description:  this.props.book.Description,
        URL: this.props.book.URL,
      });
  }
}


  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    
    const newBook = {
      Title: this.state.Title,
      Author: this.state.Author,
      Description: this.state.Description,
      URL: this.state.URL,
      
    };
    console.log(newBook)
    this.props.onBookAdded(newBook,this.props.id); 
  }

  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Add Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control id="title"
                type="text"
                name="title"
                value={this.state.Title}
                onChange={this.handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="author">
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="text"
                name="author"
                value={this.state.Author}
                onChange={this.handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={this.state.Description}
                onChange={this.handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="URL">
              <Form.Label>URL</Form.Label>
              <Form.Control
                type="text"
                name="URL"
                value={this.state.URL}
                onChange={this.handleInputChange}
              />
            </Form.Group>
            <Button variant="success" type="submit">
              Save Book
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}

export default BookFormModal;

