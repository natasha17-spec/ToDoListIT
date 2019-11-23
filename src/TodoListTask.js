import React from 'react';
import './App.css';

class TodoListTask extends React.Component {
    onIsDoneChanged =(e) => {
        this.props.changeStatus(this.props.task,e.currentTarget.checked);
    };
    render = () => {
        return (
            <div className="todoList-task">
                <input onChange={this.props.task.onIsDoneChanged}
                       type="checkbox"
                       checked={this.props.isDone}/>
                <span>{this.props.task.title}</span>
                <span>{this.props.task.priority}</span>
            </div>
        );
    }
}

export default TodoListTask;
