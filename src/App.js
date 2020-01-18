import React from 'react';
import './App.css';
import TodoList from "./TodoList";
import AddNewItemForm from "./addNewItemForm";


class App extends React.Component {
    componentDidMount() {
        this.restoreState();
    }
    nextTodoListID=0;
    state = {
        todoLists:[
            {id:1, title:'What to lear'},
            {id:2, title:'Weak Tasks'},
            {id:3, title:'Year Tasks'}
        ]
    };
    addTodoList = (title) => {
        let newTodoList = {
            id: this.nextTodoListID,
            title: title
        };
        this.nextTodoListID++;
        this.setState({todoLists: [...this.state.todoLists, newTodoList]}, () => this.saveState)
    };
    saveState = () => {
        let stateAsString = JSON.stringify(this.state);
        localStorage.setItem("todoList-state", stateAsString)
    };
    restoreState = () => {
        let state = this.state;
        let stateAsString = localStorage.getItem('todoList-state');
        if (stateAsString != null) {
            state = JSON.parse(stateAsString)
        }
        this.setState(state, () => {
            this.state.todoLists.forEach(tl => {
                if (tl.id >= this.nextTodoListID) {
                    this.nextTodoListID++
                }
            })
        })
    };
    render = () => {
        let todoLists = this.state.todoLists.map(tl => <TodoList id={tl.id} title={tl.title}/>);
        return (
            <>
                <div>
                    <AddNewItemForm addItem={this.addTodoList} />
                </div>

                <div className='App'>
                    {todoLists}
                </div>
            </>
        );
    }
}

export default App;

