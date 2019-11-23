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

           state= {
               tasks: [
                   {title: 'JS', isDone: true, priority: "-low"},
                   {title: 'React', isDone: false, priority: "-low"},
                   {title: 'DOM', isDone: true, priority: "-low"},
                   {title: 'Redux', isDone: false, priority: "-low"},
                   {title: 'HTML', isDone: true, priority: "-low"},
                   {title: 'CSS', isDone: false, priority: "-low"},
               ],
               filterValue:'All'
             };
        addTask=(newTitle)=>{
            let newTask={
                title:newTitle,
                isDone: false,
                priority: ' -middle'
            };
            let newTasks =[...this.state.tasks, newTask];
            this.setState({
                tasks: newTasks
            })
        };
        changeStatus=(task,isDone)=>{
            let newTasks=this.state.tasks.map(t=>{
                if(t !==task){
                    return t;
                } else {
                    return {...t, isDone:isDone}}})};

        changeFilter = (newFilterValue) => {
            this.setState({
                filterValue:newFilterValue
            })
        };

        render = () => {
            return (
                <div className='App'>
                    <div className='center'>
                        <TodoListHeader addTask={this.addTask}/>
                        <TodoListTasks
                            changeStatus={this.changeStatus}
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

