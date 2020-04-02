import React from 'react';
import './App.css';
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";
import TodoListTitle from "./TodoListTitle";
import AddNewItemForm from "./AddNewItemForm";
import {connect} from "react-redux";
import {
    changeTaskTC,
    createTaskTC,
    deleteTaskTC,
    deleteTodolistTC,
    setTaskTC,
} from "./reducer";



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
            this.props.setTasks(this.props.id);

        // api.getTask(this.props.id)
        //     .then(res => {
        //         let allTasks = res.data.items;                           // items - это таски сервака
        //         this.props.setTasks(res.data.items, this.props.id);
        //     });
    }; //ok


    state = {
        filterValue: "All"
    };

    addTask = (newTask) => {
        this.props.createTask(newTask,this.props.id)
    }

    changeFilter = (newFilterValue) => {
        this.setState( {
            filterValue: newFilterValue
        }, () => { this.saveState(); });
    }

    changeTask = (taskId, obj) => {
        debugger

        this.props.updateTask(taskId, obj,this.props.id)


        // api.updateTask(taskId, this.props.id, task)
        //     .then(res => {
        //         this.props.updateTask(taskId, obj, this.props.id)
        //     })
        } //ok

    changeStatus = (taskId, status) => {
        this.changeTask(taskId, {status: status});
    }

    changeTitle = (taskId, title) => {
        this.changeTask(taskId, {title: title});
    }

    deleteTodolist = () => {
       this.props.deleteTodolist(this.props.id)
    } //ok

    deleteTask = (taskId) => {
       this.props.deleteTask(taskId, this.props.id)
    }

    render = () => {
        let {tasks = []} = this.props;
        return (
                <div className="todoList">
                    <div className="todoList-header">
                            <TodoListTitle title={this.props.title} onDelete={this.deleteTodolist} />
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
        setTasks(todolistId) {
            dispatch(setTaskTC(todolistId));
        },
        updateTask(taskId, obj, todolistId) {
            debugger
            dispatch(changeTaskTC(taskId, obj, todolistId));
        },
        deleteTodolist: (todolistId) => {
            dispatch(deleteTodolistTC(todolistId))
        },
        deleteTask: (taskId, todolistId) => {
            dispatch(deleteTaskTC(todolistId, taskId))
        },
        createTask: (newTask, todolistId) => {
            debugger
            dispatch(createTaskTC(newTask, todolistId))
        },
    }
};

const ConnectedTodolist = connect(null, mapDispatchToProps)(TodoList);

export default ConnectedTodolist;

