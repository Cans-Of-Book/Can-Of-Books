import React, { Component } from "react";
import axios from "axios"; 
import 'bootstrap/dist/css/bootstrap.min.css';
const backendUrl=import.meta.env.BACKEND_URL || "http//localhost:3001";




class BestBooks extends Component {
  state = {
    books: [],
  };

  async componentDidMount() {
    try {
      const response = await axios.get("/books");   
            this.setState({ books: response.data });
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  }

  renderBooks() {
    if (this.state.books.length === 0) {
      return <p>Out of Books.</p>;
    }

};
}
export default BestBooks;

