import React from 'react';
import './App.css';
import TodoListHeader from "./TodoListHeader";
import TodoListFooter from "./TodoListFooter";
import TodoListTasks from "./TodoListTasks";


    class App extends React.Component{
        constructor(props) {//чтобы запушить новую таску, мы в контрукторе создаем метод setTimeout
            super(props);
            this.newTaskTitleRef = React.createRef()
        }
        newTaskID = 6;

/*1*/        state= {
               tasks: [
                   {id: 0,title: 'JS', isDone: true, priority: "-low"},
                   {id: 1,title: 'React', isDone: false, priority: "-low"},
                   {id: 2,title: 'DOM', isDone: true, priority: "-low"},
                   {id: 3,title: 'Redux', isDone: false, priority: "-low"},
                   {id: 4,title: 'HTML', isDone: true, priority: "-low"},
                   {id: 5,title: 'CSS', isDone: false, priority: "-low"},
               ],
               filterValue:'All' }; /*1*/

/*2*/        addTask = (newTitle) => {        //момент создания новой таски
            let newTask = {
                id: this.newTaskID,    //добавляем объект id
                title: newTitle,
                isDone: false,
                priority: ' -middle'
            };
            let newTasks = [...this.state.tasks, newTask];
            this.setState({
                tasks: newTasks
            })
        };

/*3*/        changeFilter = (newFilterValue) => {
            this.setState({
                filterValue: newFilterValue
            })
        };

/*4*/        changeStatus = (taskID, isDone) => {
            let newTasks = this.state.tasks.map(t => {
                if (t.id === taskID) {
                    return {...t, isDone: isDone};
                } else {
                    return t;
                }
            });
            this.setState({
                tasks: newTasks
            })
        };

/*5*/        changeTitle=(taskId, newTitle)=>{
            let newTasks = this.state.tasks.map(t=>{
                if (t.id === taskId) {
                    return {...t, title:newTitle}
                }else{
                    return t;
                }
            });
            this.setState({
                tasks:newTasks
            })
        };


        render = () => {

            return (
                <div className='App'>
                    <div className='center'>
                        <TodoListHeader addTask={this.addTask}/>
                        <TodoListTasks
                            changeStatus={this.changeStatus}
                            changeTitle={this.changeTitle}
                            tasks={this.state.tasks.filter (t => {
                                switch (this.state.filterValue) {
                                    case 'All':
                                        return true;
                                    case 'Active':
                                        return !t.isDone;
                                    case 'Completed':
                                        return t.isDone;
                                    default:
                                        return true
                                }})}/>


                        <TodoListFooter filterValue={this.state.filterValue} changeFilter={this.changeFilter} />
                    </div>
                </div>
            );
        }}

export default App;

