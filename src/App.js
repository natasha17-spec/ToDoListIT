import React from 'react';
import './App.css';
import TodoList from "./TodoList";
import AddNewItemForm from "./AddNewItemForm";
import {connect} from "react-redux";
import {ADD_TODOLIST, addTask, addTodolist, Deletelist, DeleteTask} from "./reducer";

class App extends React.Component {

    nextTodoListId = 1;

    addTodoList = (title) => {

        let newTodoList = {
            id: this.nextTodoListId,
            title: title,
            tasks:[]
        };
        this.props.addTodolist(newTodoList);
        this.nextTodoListId++;
    };


    render = () => {
        const todolists = this.props
            .todolists
            .map(tl => {
                return <TodoList id={tl.id} title={tl.title} tasks={tl.tasks}/>
            });

        return (
            <>
                <div>
                   <AddNewItemForm addItem={this.addTodoList}/>
                </div>
                <div className="App">
                    {todolists}
                </div>
            </>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        todolists: state.todolists
    }
};


const mapDispatchToProps = (dispatch) => {
    return {
        addTodolist: (newTodolist) => {
            dispatch(addTodolist(newTodolist))

        }
    }
};

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);
export default ConnectedApp;


