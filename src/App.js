import React from 'react';
import './App.css';
import TodoList from "./TodoList";
import AddNewItemForm from "./AddNewItemForm";


    class App extends React.Component{
//есть объект с массивом и это массив однотипных объектов, которые будут описывать наши тутулисты,
        //у них будет свойство id  и свойство title
        state= {
            todoLists:[
                {id:1, title:'What to learn'},
                {id:2, title:'Week tasks'},
                {id:3, title:'Year tasks'}
            ]
        };

        nextTodoListId = 0;

        componentDidMount() {
            this.restoreState();
        }

        saveState = () =>{
            let stateAsString = JSON.stringify(this.state);
            localStorage.setItem('todoLists',stateAsString);
        };

    restoreState = () => {
        let state = {
            todoLists: [],
        };
        let stateAsString = localStorage.getItem('todoLists');
        if (stateAsString != null) {
            state = JSON.parse(stateAsString);
        }
        this.setState(state, () => {
            this.state.todoLists.forEach((task) => {
                if (task.id >= this.nextTodoListId) {
                    this.nextTodoListId = task.id + 1
                }
            })
        });
    };


        addTodolist = (title)=>{
            let newTodoList = {
                id:this.nextTodoListId,
                title: title
            };
            this.nextTodoListId++;
          let newTodoLists=[...this.state.todoLists, newTodoList];
            this.setState({
                todoLists:newTodoLists
            }, ()=>{this.saveState()});

        };


        render = () => {

            const todoLists = this.state.todoLists.map(
                tl=><TodoList id= {tl.id} title={tl.title}/> );

            return (
                <div>
                    <div className='add_todo'>
                        <AddNewItemForm addItem = {this.addTodolist}/>
                        {/*<input type='text'/>*/}
                        {/*<button onClick={this.addTodolist}>ADD</button>*/}
                    </div>
                    <div className='App'>
                        {todoLists}
                        {/*<TodoList id={1}/>*/}
                        {/*<TodoList id={2}/>*/}
                        {/*<TodoList id={3}/>*/}
                    </div>
                </div>
            );
        }

    }

export default App;

