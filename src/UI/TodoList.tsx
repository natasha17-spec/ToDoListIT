import React from 'react';
import '../App.css';
import {connect} from "react-redux";
import TodoListTitle from "./TodoListTitle";
import AddNewItemForm from "./AddNewItemForm";
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";
import {addTask, changeTask, deleteTask, deleteTodo, getTasks, updateTitle} from "../BLL/reducer";
import {TaskType, TodoType} from "../Types/entities";
import {AppStateType} from "../BLL/store";


type StateType = {
    filterValue: string
}
type OwnPropsType = {
    id: string
    title: string
    tasks: TaskType[]

}
type MapStateToPropsType = {
    disabled: boolean,
    todolists: TodoType[]
}

type MapDispatchToPropsType = {
    getTasks: (id: string) => void
    addTask: (newText: string, id: string) => void
    changeTask: (taskId: string, id: string, task: TaskType, obj: any) => void
    deleteTodo: (id: string) => void
    deleteTask: (taskId: string, id: string) => void
    updateTitle: (title: string, id: string) => void


}
type PropsType = OwnPropsType & MapDispatchToPropsType & MapStateToPropsType

class TodoList extends React.Component<PropsType> {

    state: StateType = {
        filterValue: "All"

    };

    componentDidMount() {
        this.restoreState();
    }

    restoreState = () => {
        this.props.getTasks(this.props.id)
    };

    addTask = (newText: string) => {
        this.props.addTask(newText, this.props.id)
    };

    changeFilter = (newFilterValue: string) => {
        this.setState({
            filterValue: newFilterValue
        });
    };

    changeTask = (taskId: string, obj: any) => {
        let changedTask = this.props.tasks.find((task: TaskType) => {
            return task.id === taskId
        });
        let task = {...changedTask, ...obj};

        this.props.changeTask(taskId, this.props.id, task, obj);
    };

    changeStatus = (taskId: string, status: number) => {
        this.changeTask(taskId, {status});
    };

    changeTitle = (taskId: string, title: string) => {
        this.changeTask(taskId, {title});
    };

    deleteTodolist = () => {
        this.props.deleteTodo(this.props.id)
    };

    deleteTask = (taskId: string) => {
        this.props.deleteTask(taskId, this.props.id);
    };

    updateTitle = (title: string) => {
        this.props.updateTitle(title, this.props.id)
    };

    render = () => {
        let {tasks = []} = this.props;
        return (
            <div className="todoList">
                <div className="todoList-header">
                    <div className="wrapper">
                        <TodoListTitle title={this.props.title} updateTitle={this.updateTitle}/>
                        <button className='todolist_delete_button' onClick={this.deleteTodolist}>X</button>
                    </div>
                    <AddNewItemForm disabled={this.props.disabled} addItem={this.addTask}/>
                </div>

                <TodoListTasks
                    disabled={this.props.disabled}
                    changeStatus={this.changeStatus}
                    changeTitle={this.changeTitle}
                    deleteTask={this.deleteTask}
                    tasks={tasks.filter((t: TaskType) => {
                        if (this.state.filterValue === "All") {
                            return true;
                        }
                        if (this.state.filterValue === "Active") {
                            return t.status === 0;
                        }
                        if (this.state.filterValue === "Completed") {
                            return t.status === 2;
                        }
                    })}/>
                <TodoListFooter changeFilter={this.changeFilter} filterValue={this.state.filterValue}/>
            </div>
        );
    }
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        todolists: state.todolist.todolists,
        disabled: state.todolist.disabled
    }
};



export default connect(mapStateToProps, {getTasks, addTask, changeTask, deleteTodo, deleteTask, updateTitle})(TodoList);

