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
        nextTaskId=0;
        componentDidMount() {
            this.restoreState();
        }

        saveState = () =>{
          let stateAsString = JSON.stringify(this.state);
          localStorage.setItem('our-state',stateAsString);

        };
        restoreState = () => {
          let state = {
              tasks: [],
            filterValue: 'All'
          };
         let stateAsString= localStorage.getItem('our-state');
            if (stateAsString !=null){
                state= JSON.parse(stateAsString);
            }
            this.setState(state, () =>{
                this.state.tasks.forEach((task)=>{
                    if(task.id >= this.nextTaskId){
                        this.nextTaskId = task.id + 1
                    }
                })
            });
        };
           state= {
               tasks: [
                   // {id: 1,title: 'JS', isDone: true, priority: "high"},
                   // {id: 2,title: 'React', isDone: false, priority: "low"},
                   // {id: 3,title: 'DOM', isDone: true, priority: "middle"},
                   // {id: 4,title: 'Redux', isDone: false, priority: "low"},
                   // {id: 5,title: 'HTML', isDone: true, priority: "high"},
                   // {id: 6,title: 'CSS', isDone: false, priority: "low"},
               ],
               filterValue:'All'
             };
        addTask=(newTitle)=>{
            let newTask={
                id:this.nextTaskId,
                title:newTitle,
                isDone: false,
                priority: ' -middle'
            };
            this.nextTaskId++;
            let newTasks =[...this.state.tasks, newTask];
            this.setState({
                tasks: newTasks
            },()=> {this.saveState();});
        };
        changeTask = (taskId, obj) =>{
            let newTasks=this.state.tasks.map(t=> {
                if (t.id !== taskId) {
                    return t;
                } else {
                    return {...t, ...obj};
                }
            });
            this.setState({
                tasks: newTasks
            })
        };

        changeStatus=(taskId,isDone)=>{
            this.changeTask(taskId, {isDone: isDone});
            // let newTasks=this.state.tasks.map(t=> {
            //     if (t.id != taskId) {
            //         return t;
            //     } else {
            //         return {...t, isDone: isDone};
            //     }
            // });
            // this.setState({
            //     tasks: newTasks
            // })
        };
        changeTitle=(taskId,title)=>{
            // let newTasks=this.state.tasks.map(t=> {
            //     if (t.id != taskId) {
            //         return t;
            //     } else {
            //         return {...t, title: newTitle};
            //     }
            // });
            // this.setState({
            //     tasks: newTasks
            // })
            this.changeTask(taskId, {title: title})
        };

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
                            changeTitle ={this.changeTitle}
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

