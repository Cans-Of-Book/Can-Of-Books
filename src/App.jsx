import React, { Component } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Books from "./Books";
import { Route, Routes } from "react-router-dom";
import About from "./About";
const backendUrl = import.meta.env.BACKEND_URL || "http://localhost:3001";

class BestBooks extends Component {
  state = {
    books: [],
  };

  async componentDidMount() {
    try {
      const response = await axios.get(backendUrl + "/books");
      this.setState({ books: response.data });
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  }
  renderBooks() {
    if (this.state.books.length === 0) {
      return <p>No More Books.</p>;
    } else {
      return (
        <div>
          <div>
            {this.state.books.map((book, index) => (
              <div key={index}>
                  <h3>{book.title}</h3>
                  <p>{book.author}</p>
                  <p>{book.description}</p>
                </div>
              ))}
          </div>
        </div>
      );
    }
  }

  render() {
    return (
      // add nave bar here 
      <Routes>
        <Route path="/" element={<Books books={this.state.books}/>} />
        <Route path="/about" element={<About />} />
        <h1>This page is about three books that are a great read.</h1>
      </Routes>
    );
  }
}
export default BestBooks;
