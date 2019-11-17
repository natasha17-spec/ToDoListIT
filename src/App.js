import React from 'react';
import './App.css';
import TodoListHeader from "./TodoListHeader";
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";
debugger;

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
    filterValue: 'ALL'
};
    addTask = (newTitle)=>{
            let newTask = {
            title: newTitle,
            isDone: false,
            priority: "  -low"
        };

       
        let newTasks = [...this.state.tasks, newTask];
        this.setState({
            tasks: newTasks
        });
    };

    changeFilter = (newFilterValue) => {
        this.setState({
            filterValue:newFilterValue
        })
    }

    changeStatus = (task, isDone)=>{
        let newTasks= this.state.tasks.map(t => {
            if(t !==task){
                return t;
            } else {
                return {...t, isDone: isDone}
            }
            });
     
   this.setState({tasks:newTasks
})
    }
    

    render = () => {
        return (
            <div className="App">
                   
                        <div className="todoList">
                          <TodoListHeader addTask={this.addTask}/>
                        <TodoListTasks 
                        changeStatus={this.changeStatus}
                        tasks={this.state.tasks.filter (t => {
                            if (this.state.filterValue==='All') {
                                return true;
                            }
                            if (this.state.filterValue==='Active') {
                                return !t.isDone;
                            }
                            if (this.state.filterValue==='Completed') {
                                return t.isDone;
                                }})} />
                        <TodoListFooter changeFilter={this.changeFilter} filterValue={this.state.filterValue}/>
                    </div>
                    </div>

        );
    }
}

export default App;

