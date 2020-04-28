import React, {ChangeEvent} from 'react';
import '../App.css';
import {TaskType} from "../Types/entities";



type StateType = {
    editMode: boolean
    title:string

}
type OwnPropsType = {
    task: TaskType
    disabled:boolean
}

type MapDispatchToPropsType = {
    changeStatus:(id:string, status:number)=>void
    changeTitle:(id:string, title:string)=>void
    deleteTask:(id:string)=>void

}
type PropsType = OwnPropsType & MapDispatchToPropsType


class TodoListTask extends React.Component<PropsType> {

    state:StateType = {
        editMode: false,
        title: this.props.task.title
    };

    onIsDoneChanged = (e:ChangeEvent<HTMLInputElement>) => {
        let status = e.currentTarget.checked ? 2 : 0;
        this.props.changeStatus(this.props.task.id, status);
    };

    onTitleChanged = (e:ChangeEvent<HTMLInputElement>) => {
        this.setState({title: e.currentTarget.value});
    };

    activateEditMode = () => {
        this.setState({editMode: true});
    };

    deactivateEditMode= () => {
        this.props.changeTitle(this.props.task.id, this.state.title);
        this.setState({editMode: false});
    };
    onDeleteTask = () => {
        this.props.deleteTask(this.props.task.id);
    };
    render = () => {
        let containerCssClass = this.props.task.status ? "todoList-task done" : "todoList-task";
        let priotityTitle = "";
        switch (this.props.task.priority) {
            case 0: priotityTitle = "Low"; break;
            case 1: priotityTitle = "Middle"; break;
            case 2: priotityTitle = "High"; break;
            case 3: priotityTitle = "Urgently"; break;
            case 4: priotityTitle = "Later"; break;
        }
        return (
                <div className={containerCssClass}>
                    <input type="checkbox" checked={this.props.task.status === 2}
                           onChange={this.onIsDoneChanged}/>
                    { this.state.editMode
                        ? <input onBlur={this.deactivateEditMode} onChange={this.onTitleChanged} autoFocus={true}
                                 value={this.state.title} />
                        : <span onClick={this.activateEditMode}>{this.props.task.title}</span>
                    }, priority: {priotityTitle}
                    <div>
                        <button disabled={this.props.disabled} className='todolist_task_button' onClick={this.onDeleteTask}>Х</button>
                    </div>
                </div>
        );
    }
}

export default TodoListTask;

