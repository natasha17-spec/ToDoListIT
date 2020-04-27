import React from 'react';
import './App.css';
import TodoListTask from "./TodoListTask";
import {TaskType} from "./types/entities";


type OwnPropsType = {
    changeStatus: (taskId: string, status: number) => void
    changeTitle: (taskId: string, title: string) => void
    deleteTask: (taskId: string) => void
    tasks: TaskType[]
    disabled: boolean

}

class TodoListTasks extends React.Component <OwnPropsType> {
    render = () => {
        let tasksElements = this.props.tasks.map((task: TaskType) => {
            return <TodoListTask
                disabled={this.props.disabled}
                task={task}
                key={task.id}
                changeStatus={this.props.changeStatus}
                changeTitle={this.props.changeTitle}
                deleteTask={this.props.deleteTask}
            />
        });

        return (
            <div className="todoList-tasks">
                {tasksElements}
            </div>
        );
    }
}

export default TodoListTasks;

