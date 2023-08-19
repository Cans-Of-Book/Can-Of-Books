import React, { Component } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Books from "./Books";
import { Route, Routes } from "react-router-dom";
import About from "./About";
import { Carousel } from "bootstrap";
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
              <Carousel>
              <Carousel.Item key={index}>
                <img className="d-block w-100"
                src="https://www.google.com/books/edition/The_Color_Purple/1W8-c_m-noEC?hl=en&gbpv=1&dq=the%20color%20purple&pg=PP1&printsec=frontcover"
                alt="Slide 1"/>
                <img className="d-block w-100"
                src="https://www.google.com/books/edition/The_Silence_of_the_Lambs/zm9vEAAAQBAJ?hl=en&gbpv=1&dq=silence%20of%20the%20lambs&pg=PP1&printsec=frontcover"
                alt="Slide 2"/>
                <img className="d-block w-100"
                src="https://www.google.com/books/edition/Maybe_You_Never_Cry_Again/5ANCSjFRhf8C?hl=en&gbpv=1&pg=PP1&printsec=frontcover"
                alt="Slide 3"/>
                <Carousel.Caption>
                  <h3>{book.title}</h3>
                  <p>{book.author}</p>
                  <p>{book.description}</p>
                  </Carousel.Caption>
                  </Carousel.Item>
                  </Carousel>
                
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
 