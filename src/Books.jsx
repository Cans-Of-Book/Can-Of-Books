import React, { Component } from 'react'

export default class Books extends Component {
    render() {
        if (this.props.books.length === 0)
         {
          return <p>Out of Books.</p>;
        }
        return(
          <div>Found Books</div>
        )
    };
}
