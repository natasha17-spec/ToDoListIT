import React from 'react';
import './App.css';
import TodoList from "./UI/TodoList";
import AddNewItemForm from "./UI/AddNewItemForm";
import {connect} from "react-redux";
import {addTodolist, getTodolists} from "./BLL/reducer";
import {TodoType} from "./Types/entities";
import {AppStateType} from "./BLL/store";
import Preloader from "./Common/Preloader";


type MapStateToPropsType = {
    todolists: TodoType[],
    isFetching: boolean,
    disabled: boolean
}
type MapDispatchToPropsType = {
    getTodolists: () => void
    addTodolist: (title: string) => void
}
type PropsType =  MapStateToPropsType & MapDispatchToPropsType

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
