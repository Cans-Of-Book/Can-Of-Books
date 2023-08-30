import React, { Component } from 'react';

export default class Books extends Component {
  render() {
    let bookComponents = this.props.books.map((book) => (
      <div key={book.id}>
        {book.Title}
      </div>
    ));

    if (this.props.books.length === 0) {
      return <p>Out of Books.</p>;
    }

    return (
      <div>
        <div>Found Books</div>
        {bookComponents}
      </div>
    );
  }
}
