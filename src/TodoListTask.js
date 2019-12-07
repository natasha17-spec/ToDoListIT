import React from 'react';
import './App.css';

class TodoListTask extends React.Component {
            constructor(props) {  debugger;
                super(props);
                this.newTaskTitleRef = React.createRef();
            }
/*1*/       state={
                editMode:false
            };
/*2*/           activeEditMode = ()=>{
                this.setState({editMode:true})
            };
/*3*/            deactiveEditMode = ()=>{
                this.setState({editMode:false})
            };

/*4*/            onIsDoneChanged =(e) => {
                this.props.changeStatus(this.props.task.id,e.currentTarget.checked);
            };
/*5*/            onTitleChanged =(e) => {
                this.props.changeTitle(this.props.task.id,e.currentTarget.value);
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
                    ? <input value={this.props.task.title}
                             autoFocus={true}
                             onBlur={this.deactiveEditMode}
                             onChange={this.onTitleChanged}
                     />

                    : <span onClick={this.activeEditMode}>
                        {this.props.task.id}-
                        {this.props.task.title}
                        -priority:{this.props.task.priority}
                     </span>}
            </div>
        );
    }
}

export default TodoListTask;
