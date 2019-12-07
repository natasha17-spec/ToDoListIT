import React from 'react';
import './App.css';

class TodoListTask extends React.Component {
    constructor(props) {  debugger;
        super(props);
        this.newTaskTitleRef = React.createRef();
    }

    onIsDoneChanged =(e) => {
        this.props.changeStatus(this.props.task.id,e.currentTarget.checked);
    };
    render = () => {
        let classForTask = this.props.task.isDone
            ? "todoList-task done" :"todoList-task";
        return (
            <div className={classForTask}>
                <input onChange={this.onIsDoneChanged}
                       type="checkbox"
                       checked={this.props.task.isDone}


                />
                <span>{this.props.task.id}</span>-
                <span>{this.props.task.title}</span>
                <span>{this.props.task.priority}</span>

            </div>
        );
    }
}

export default TodoListTask;
