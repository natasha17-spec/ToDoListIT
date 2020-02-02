import React from 'react';
import './App.css';
import TodoList from "./TodoList";
import AddNewItemForm from "./AddNewItemForm";
import {connect} from "react-redux";

class App extends React.Component {

    nextTodoListId = 0;

    addTodoList = (title) => {

        let newTodoList = {
            id: this.nextTodoListId,
            title: title
        };
        this.props.addTodolist(newTodoList);
        this.nextTodoListId++;
    };


    render = () => {
        const todolists = this.props
            .todolists
            .map(tl => <TodoList id={tl.id} title={tl.title}/>)

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
            const action = {
                type: "ADD-TODOLIST",
                newTodolist: newTodolist
            };
            dispatch(action)
        }
    }
};

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);
export default ConnectedApp;


