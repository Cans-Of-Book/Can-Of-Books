import React, { Component } from "react";
import axios from "axios";
import { Button, Carousel, Image } from "react-bootstrap";
import { useAuth0, Profile } from '@auth0/auth0-react';
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

  async deleteBook(id) {
    try {
      await axios.delete(`${BACKEND_URL}/Books/${id}`);
      this.setState((prevState) => ({
        books: prevState.books.filter((book) => book._id !== id),
      }));
    } catch (error) {
      console.error("Error deleting book:", error);
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
    const { isAuthenticated } = useAuth0();

    if (this.state.books.length === 0) {
      return <p>No More Books.</p>;
    } else {
      return (
        <div>
          {isAuthenticated ? (
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
                      <h3>{book.Title}</h3>
                      <p>{book.Author}</p>
                      <p>{book.Description}</p>
                      <Button variant="danger" onClick={() => this.deleteBook(book._id)}>Delete Book</Button>
                      <Button variant="secondary" onClick={() => this.setState({ showUpdateForm: true, selectedBook: book._id, })}>
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
            </div>
          ) : (
            <p>Log In</p>
          )}
          <Routes>
            <Route path="/" element={<Books books={this.state.books} />} />
            <Route path="/about" element={<About />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
          
        </div>
      );
    }
  }
}

export default BestBooks;
