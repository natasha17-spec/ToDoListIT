import React from 'react';
import './App.css';


class TodoListTitle extends  React.Component {
        render = () => {
         return (
             <h3>{this.props.title}</h3>
        );
    }
}

export default TodoListTitle;

