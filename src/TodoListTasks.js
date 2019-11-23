import React from 'react';
import './App.css';
import TodoListTask from "./TodoListTask";

class TodoListTasks extends React.Component {

    render = () => {

            let taskElements = this.props.tasks.map( t=> <TodoListTask
                task={t} changeStatus={this.props.changeStatus}
            />);
        return (
            <div className="todoList-task">
                {taskElements}
            </div>
        );
    }
}


    export default TodoListTasks;
