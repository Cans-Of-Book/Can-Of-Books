// import React, { Component } from 'react'

// export default class Books extends Component {
//     render() {
//       let bookComponents = this.props.books.map((book) => (
//         <div key={books_id}>
//           {book.Title}
//         </div>
//       ))
//         if (this.props.books.length === 0)
//          {
//           return <p>Out of Books.</p>;
//         }
//         return(
//           <div>Found Books</div>
//           {bookComponents}
//         )
//     };
// }


import React, { Component } from 'react';

export default class Books extends Component {
  render() {
    let bookComponents = this.props.books.map((book) => (
      <div key={book.id}>  {/* Assuming book object has an 'id' property */}
        {book.Title}  {/* Make sure the data structure actually uses 'Title' with an uppercase 'T' */}
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
