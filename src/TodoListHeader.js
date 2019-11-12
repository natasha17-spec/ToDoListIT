import React from 'react';
import './App.css';

class TodoListHeader extends React.Component {
    render = () => {
        return (
            <div className="App">
                <div className="todoList">
                    <div >
                        <h3 >What to Learn</h3>
                        <div >
                            <input type='text' placeholder='New task name '/>
                            <button>Add</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default TodoListHeader;

