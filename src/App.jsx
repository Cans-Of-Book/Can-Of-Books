import React, { Component } from "react";
import axios from "axios";
import { Form, Button, Carousel, Image } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Books from "./Books";
import { Route, Routes } from "react-router-dom";
import About from "./About";
import BookFormModal from "./BookFormModal";

const BACKEND_URL = import.meta.env.BACKEND_URL || "http://localhost:3001";

class BestBooks extends Component {
  state = {
    books: [],
    showAddForm: false,
    showUpdateForm: false,
    selectedBook: null,
  };

  async componentDidMount() {
    try {
      const response = await axios.get(`${BACKEND_URL}/books`);
      this.setState({ books: response.data });
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  }

  async updateBook(bookObj, id) {
    try {
      const response = await axios.put(`${BACKEND_URL}/Books/${id}`, bookObj);
      this.setState((prevState) => ({
        books: prevState.books.map((book) => {
          return book._id === id ? response.data : book;
        }),
        showUpdateForm: false,
      }));
    } catch (error) {
      console.error("Error updating book:", error);
    }
  }

  handleBookAdded = async (newBook) => {
    try {
      const response = await axios.post(`${BACKEND_URL}/books`, newBook);
      this.setState((prevState) => ({
        books: [...prevState.books, response.data],
        showAddForm: false,
      }));
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  render() {
    if (this.state.books.length === 0) {
      return <p>No More Books.</p>;
    } else {
      return (
        <div>
          <Carousel>
            {this.state.books.map((book, index) => (
              <Carousel.Item key={book._id}>
                <Image
                fluid
                  className="d-block w-100"
                  src={"https://placehold.co/600x400/EEE/31343C"}
                  alt={`Slide ${index + 1}`}
                />
                <Carousel.Caption>
                  <h3 style={{color: 'black'}}>{book.Title}</h3>
                  <p style={{color: 'black'}}>{book.Author}</p>
                  <p style={{color: 'black'}}>{book.Description}</p>
                  <Button variant="danger" onClick={() => {this.deleteBook(book._id)}} id='deleteBook'>Delete Book</Button> 
                  <Button variant="secondary" onClick={() => this.setState({ showUpdateForm: true, selectedBook:  book._id, })}>
                    Update Book
                  </Button>
                  <BookFormModal
                    id={this.state.selectedBook}
                    show={this.state.showUpdateForm}
                    onHide={() => this.setState({ showUpdateForm: false, selectedBook: null })}
                    onBookAdded={(updatedBook) => this.updateBook(updatedBook, this.state.selectedBook)}
                  />
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
          <Button variant="warning" onClick={() => this.setState({ showAddForm: true })}>
            Add Book
          </Button>
          <BookFormModal
            show={this.state.showAddForm}
            onHide={() => this.setState({ showAddForm: false })}
            onBookAdded={this.handleBookAdded}
          />
          <Routes>
            <Route path="/" element={<Books books={this.state.books} />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      );
    }
  }
}

export default BestBooks;