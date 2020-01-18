import React from 'react';
import './App.css';
import AddNewItemForm from "./addNewItemForm";
import TodoListFooter from "./TodoListFooter";
import TodoListTasks from "./TodoListTasks";
import TodoListTitle from "./TodoListTitle";


    class TodoList extends React.Component{
            constructor(props) {//чтобы запушить новую таску, мы в контрукторе создаем метод setTimeout
                super(props);
                this.newTaskTitleRef = React.createRef()
            }

            nextTaskID=0;
            componentDidMount() {
                this.restoreState();
            }

            saveState = (key, value) => {
                let stateAsString = JSON.stringify(this.state);
                localStorage.setItem("our-state"+ this.props.id, stateAsString);
            };

            restoreState = () =>{
                let state = {
                    tasks: [],
                    filterValue: 'All'
                };
                let stateAsString = localStorage.getItem("our-state"+this.props.id);
                if (stateAsString != null) {
                    state = JSON.parse(stateAsString);
                }
                this.setState(state, () =>{
                    this.state.tasks.forEach((task)=>{
                        if(task.id >= this.nextTaskID){
                            this.nextTaskID = task.id + 1
                        }
                    })
                });
            };

/*1*/        state= {
               tasks: [
                   // {id: 0,title: 'JS', isDone: true, priority: "-low"},
                   // {id: 1,title: 'React', isDone: false, priority: "-low"},
                   // {id: 2,title: 'DOM', isDone: true, priority: "-low"},
                   // {id: 3,title: 'Redux', isDone: false, priority: "-low"},
                   // {id: 4,title: 'HTML', isDone: true, priority: "-low"},
                   // {id: 5,title: 'CSS', isDone: false, priority: "-low"},
               ],
               filterValue:'All' };

/*2*/        addTask = (newTitle) => {        //момент создания новой таски
            let newTask = {
                id: this.nextTaskID,    //добавляем объект id
                title: newTitle,
                isDone: false,
                priority: ' -middle'
            };
            this.nextTaskID++;
            let newTasks = [...this.state.tasks, newTask];
            this.setState({
                tasks: newTasks
            }, ()=>{this.saveState();})
           ;
        };

/*3*/        changeFilter = (newFilterValue) => {
            this.setState({
                filterValue: newFilterValue
            }, ()=>{this.saveState();})
        };

/*4*/        changeStatus = (taskID, isDone) => {
            this.changeTask(taskID, {isDone:isDone})
            };

/*5*/        changeTitle=(taskID, newTitle)=>{
             this.changeTask(taskID, {title:newTitle})
             };

/*6*/        changeTask=(taskID, obj)=>{
            let newTasks = this.state.tasks.map(t=>{
                if (t.id === taskID) {
                    return {...t,...obj}
                }else{
                    return t;
                }
            });
            this.setState({
                tasks:newTasks
            },()=>{this.saveState();})
        };



        render = () => {
            return (
                <div className='App'>
                    <div className='center'>
                        <TodoListTitle title ={this.props.title}/>
                        <AddNewItemForm addItem={this.addTask} />
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
                        <TodoListFooter filterValue={this.state.filterValue}
                                        changeFilter={this.changeFilter} />
                    </div>
                </div>
            );
        }}

export default TodoList;

