import React from 'react';
import './App.css';
import TodoList from "./TodoList";
import AddNewItemForm from "./AddNewItemForm";
import {connect} from "react-redux";
import {addTodolist, getTodolists} from "./reducer";
import {TodoType} from "./types/entities";
import {AppStateType} from "./store";
import Preloader from "./Common/Preloader";

type OwnPropsType = {
    id: string
    isFetching: boolean
}


type MapStateToPropsType = {
    todolists: TodoType[],
    isFetching: boolean,
    disabled: boolean
}
type MapDispatchToPropsType = {
    getTodolists: () => void
    addTodolist: (title: string) => void
}
type PropsType = OwnPropsType & MapStateToPropsType & MapDispatchToPropsType

class App extends React.Component<PropsType> {


    componentDidMount() {
        this.restoreState();
    }

    restoreState = (): void => {
        this.props.getTodolists()
    };

    addTodoList = (title: string): void => {
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

            <>
                {
                    this.props.isFetching ? <Preloader/> :
                        <div>
                            <div>
                                <AddNewItemForm disabled={this.props.disabled} addItem={this.addTodoList}

                                />
                            </div>
                            <div className="App">
                                {todolists}
                            </div>
                        </div>
                }
            </>

        );
    }
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        todolists: state.todolist.todolists,
        isFetching: state.todolist.isFetching,
        disabled: state.todolist.disabled
    }
};


export default connect(mapStateToProps, {getTodolists, addTodolist})
(App);
