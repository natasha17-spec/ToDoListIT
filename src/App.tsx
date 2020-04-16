import React from 'react';
import './App.css';
import TodoList from "./TodoList";
import AddNewItemForm from "./AddNewItemForm";
import {connect} from "react-redux";
import {addTodolist, getTodolists} from "./reducer";
import {TodoType} from "./types/entities";
import {AppStateType} from "./store";

type StateType= {
    id:string
}
type OwnPropsType= {
    id:string
}


type MapStateToPropsType = {
    todolists:TodoType[]
}
type MapDispatchToPropsType = {
    getTodolists:()=>void
    addTodolist:(title:string)=>void
}
type PropsType = OwnPropsType & MapStateToPropsType & MapDispatchToPropsType

class App extends React.Component<PropsType, StateType> {


    componentDidMount() {
        this.restoreState();
    }

    restoreState = ():void => {
        this.props.getTodolists()
    };

    addTodoList = (title:string):void => {
        this.props.addTodolist(title)
    };

    render = () => {
        const todolists = this.props.todolists.map((tl: TodoType) => {
            return <TodoList key={tl.id}
                             id={tl.id}
                             title={tl.title}
                             tasks={tl.tasks}/>
        });

        return (
            <div>
                <div>
                    <AddNewItemForm addItem={this.addTodoList}/>
                </div>
                <div className="App">
                    {todolists}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state:AppStateType):MapStateToPropsType => {
    return {
        todolists:state.todolist.todolists
    }
};



export default connect (mapStateToProps,{getTodolists,addTodolist})
(App);
