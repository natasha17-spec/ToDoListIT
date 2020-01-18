import React from 'react';
import './App.css';

class TodoListTask extends React.Component {
    constructor(props) {
        super(props);
        this.newTaskTitleRef = React.createRef();
    }

    onIsDoneChanged = (e) => {
        this.props.changeStatus(this.props.task.id, e.currentTarget.checked);
    };
    onTitleChanged = (e) => {
        this.props.changeTitle(this.props.task.id, e.currentTarget.value)
    };

    state = {
        editMode: false
    };
    activeEditMode = () => {
        this.setState({editMode: true})
    };
    deActiveEditMode = () => {
        this.setState({editMode: false})
    };

    render = () => {

        let classForTask = this.props.task.isDone
            ? "todoList-task done" : "todoList-task";

        return (
            <div className={classForTask}>
                <input onChange={this.onIsDoneChanged}
                       type="checkbox"
                       checked={this.props.task.isDone}/>
                {this.state.editMode
                    ? <input autoFocus={true}
                             value={this.props.task.title}
                             onBlur={this.deActiveEditMode}
                             onChange={this.onTitleChanged}/>

          : <span onClick={this.activeEditMode}>{this.props.task.id}-{this.props.task.title}-</span>
          }priority:{this.props.task.priority}
            </div>
        );
    };
}

export default TodoListTask;
