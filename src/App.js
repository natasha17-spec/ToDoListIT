import React from 'react';
import './App.css';
import TodoListHeader from "./TodoListHeader";
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";

class App extends React.Component {
    constructor(props) {//чтобы запушить новую таску, мы в контрукторе создаем метод setTimeout
        super(props);
        this.newTaskTitleRef = React.createRef()
         }

   state = {// весь массив укутываем в стейт, для того, чтобы потом в него запушить новую таску
    tasks: [
        {title: 'JS', isDone: true, priority: "-high"},
        {title: 'CSS', isDone: false, priority: '-middle'},
        {title: 'ReactJS', isDone: true, priority: '-high'},
        {title: 'Patterns', isDone: false, priority: '-low'},
        {title: 'DOM', isDone: true, priority: '-high'},
        {title: 'React', isDone: false, priority: '-high'},
    ],
    filterValue: "Completed"
};

    onAddTaskClick = ()=>{
        let newText = this.newTaskTitleRef.current.value;
        let newTask = {
            title: newText,
            isDone: false,
            priority: "  low"
        };
        

        dfgdf
        this.newTaskTitleRef.current.value = "";

        let newTasks = [...this.state.tasks, newTask];
        this.setState({
            tasks: newTasks
        });
    };
    render = () => {
        return (
            <div className="App">
                    {/*<div className="todoList-header">*/}
                        <div className="todoList">
                        {/*<TodoListHeader/>*/}
                            <div>
                                <h3 >What to Learn</h3>
                                <div >
                                    <input ref={this.newTaskTitleRef} type='text' placeholder='New task name '/>
                                    <button onClick={ this.onAddTaskClick}>Add</button>
                                </div>
                            </div>
                        </div>
                        <TodoListTasks tasks={this.state.tasks} />
                        <TodoListFooter filterValue={this.state.filterValue}/>
                    </div>
        );
    }
}

export default App;

