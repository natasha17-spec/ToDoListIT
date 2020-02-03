import React from 'react';
import './App.css';

class TodoListTitle extends React.Component {
   render = () => {
        return (
            <div className='container'>
                <h3 className="todoList-header__title">{this.props.title}</h3>
            <button onClick={this.props.deleteList}>Х</button>
            </div>
                );
    }
}

export default TodoListTitle;

