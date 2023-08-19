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
