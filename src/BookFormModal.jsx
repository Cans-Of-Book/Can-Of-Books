import React, { Component } from "react";
import { Modal, Form, Button } from "react-bootstrap";

class BookFormModal extends Component {
  state = {
    title: "",
    author: "",
    description: "",
    URL: "",
    
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    
    const newBook = {
      title: this.state.title,
      author: this.state.author,
      description: this.state.description,
      URL: this.state.URL,
      
    };

    
    try {
      const response = await axios.post(backendUrl + "/books", newBook);
      
      this.props.onBookAdded(response.data);
      
      this.setState({
        title: "",
        author: "",
        description: "",
        URL: "",
        
      });
    } catch (error) {
      console.error("Error adding new book:", error);
      
    }
  };

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
              <Form.Control
                type="text"
                name="title"
                value={this.state.title}
                onChange={this.handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="author">
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="text"
                name="author"
                value={this.state.author}
                onChange={this.handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={this.state.description}
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
            <Button variant="primary" type="submit">
              Save Book
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}

export default BookFormModal;
