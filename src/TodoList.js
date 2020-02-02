import React from 'react';
import './App.css';
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";
import TodoListTitle from "./TodoListTitle";
import AddNewItemForm from "./AddNewItemForm";
import {connect} from "react-redux";

class TodoList extends React.Component {



    nextTaskId = 0;

    state = {
        // tasks: [],
        filterValue: "All"
    };

    addTask = (newText) => {
        debugger;
        let newTask = {
            id: this.nextTaskId,
            title: newText,
            isDone: false,
            priority: "low"
        };
        this.nextTaskId++;
        this.props.addTask(this.props.id, newTask)
        // let newTasks = [...this.state.tasks, newTask];
        // this.setState( {
        //     tasks: newTasks
        // }, () => { this.saveState(); });

    }

    changeFilter = (newFilterValue) => {
        this.setState( {
            filterValue: newFilterValue
        }, () => { this.saveState(); });
    }

    changeTask = (taskId, obj) => {
        debugger
        let newTasks = this.state.tasks.map(t => {
            if (t.id != taskId) {
                return t;
            }
            else {
                return {...t, ...obj};
            }
        });

        this.setState({
            tasks: newTasks
        }, () => { this.saveState(); });
    }
    changeStatus = (taskId, isDone) => {
        this.changeTask(taskId, {isDone: isDone});
    }
    changeTitle = (taskId, title) => {
        this.changeTask(taskId, {title: title});
    }

    render = () => {

        return (

                <div className="todoList">
                    <div className="todoList-header">
                            <TodoListTitle title={this.props.title}/>
                            <AddNewItemForm addItem={this.addTask} />
                    </div>

                    <TodoListTasks changeStatus={this.changeStatus }
                                   changeTitle={this.changeTitle }
                                   tasks={this.props.tasks.filter(t => {
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


const mapDispatchToProps = (dispatch)=>{
    return{
        addTask: (todoId,newTask)=>{
            const action ={
            type:"ADD_TASK",
                todoId:todoId,
                newTask
        };
        dispatch(action)
        }
    }
};
let connectedTodolist = connect(null,mapDispatchToProps)(TodoList)

export default connectedTodolist;

