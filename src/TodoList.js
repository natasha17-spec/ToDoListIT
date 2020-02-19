import React from 'react';
import './App.css';
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";
import TodoListTitle from "./TodoListTitle";
import AddNewItemForm from "./AddNewItemForm";
import {connect} from "react-redux";
import {addTaskAC, deleteTaskAC, deleteTodolistAC, setTasksAC, updateTaskAC, updateTodolistTitleAC} from "./reducer";
import axios from "axios";
import {api} from "./api";


class TodoList extends React.Component {

    constructor(props) {
        super(props);
        this.newTasksTitileRef = React.createRef();
    }

    componentDidMount() {
        this.restoreState();
    }

    saveState = () => {
        // переводим объект в строку
        let stateAsString = JSON.stringify(this.state);
        // сохраняем нашу строку в localStorage под ключом "our-state"
        localStorage.setItem("our-state-" + this.props.id, stateAsString);
    }

    restoreState = () => {
        api.getTasks(this.props.id)
            .then(res => {
                let allTasks = res.data.items;                           // items - это таски сервака
                this.props.setTasks(allTasks, this.props.id);
            });
    }


    state = {
        filterValue: "All"
    };

    addTask = (newText) => {
        api.createTask(newText, this.props.id).then(res => {
            let newTask = res.data.data.item;
            this.props.addTask(newTask, this.props.id);
        });
    }

    changeFilter = (newFilterValue) => {
        this.setState( {
            filterValue: newFilterValue
        }, () => { this.saveState(); });
    }

    changeTask = (taskId, obj) => {

        this.props.tasks.forEach(t => {
            if (t.id === taskId) {
                api.updateTask({...t, ...obj})
                    .then(res => {
                        this.props.updateTask(taskId, obj, this.props.id);
                    });
            }
        })
    }

    changeStatus = (taskId, status) => {
        this.changeTask(taskId, {status: status});
    }

    changeTitle = (taskId, title) => {
        this.changeTask(taskId, {title: title});
    }

    deleteTodolist = () => {
        api.deleteTodolist(this.props.id)
            .then(res => {
                // раз попали в then, значит
                this.props.deleteTodolist(this.props.id);
            });
    }

    deleteTask = (taskId) => {
        api.deleteTask(taskId)
            .then(res => {
                // раз попали в then, значит
                this.props.deleteTask(taskId, this.props.id);
            });
    }

    updateTitle = (title) => {
        api.updateTodolistTitle(title, this.props.id)
            .then(res => {
                this.props.updateTodolistTitle(title, this.props.id);
            });
    }

    render = () => {
        let {tasks = []} = this.props;
        return (
                <div className="todoList">
                    <div className="todoList-header">
                            <TodoListTitle title={this.props.title} onDelete={this.deleteTodolist} updateTitle={this.updateTitle} />
                            <AddNewItemForm addItem={this.addTask} />

                    </div>

                    <TodoListTasks changeStatus={this.changeStatus }
                                   changeTitle={this.changeTitle }
                                   deleteTask={this.deleteTask}
                                   /*tasks={this.props.tasks.filter(t => {*/
                                   tasks={tasks.filter(t => {
                        if (this.state.filterValue === "All") {
                            return true;
                        }
                        if (this.state.filterValue === "Active") {
                            return t.isDone === false;
                        }
                        if (this.state.filterValue === "Completed") {
                            return t.isDone === true;
                        }
                    })}/>
                    <TodoListFooter changeFilter={this.changeFilter} filterValue={this.state.filterValue} />
                </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addTask(newTask, todolistId) {
            dispatch(addTaskAC(newTask, todolistId));
        },
        setTasks(tasks, todolistId) {
            dispatch(setTasksAC(tasks, todolistId));
        },
        updateTask(taskId, obj, todolistId) {
            const action =  updateTaskAC(taskId, obj, todolistId);
            dispatch(action);
        },
        deleteTodolist: (todolistId) => {
            const action = deleteTodolistAC(todolistId);
            dispatch(action)
        },
        deleteTask: (taskId, todolistId) => {
            const action = deleteTaskAC(todolistId, taskId);
            dispatch(action)
        },
        updateTodolistTitle: (title, todolistId) => {
            const action = updateTodolistTitleAC(todolistId, title);
            dispatch(action)
        }
    }
}

const ConnectedTodolist = connect(null, mapDispatchToProps)(TodoList);

export default ConnectedTodolist;

