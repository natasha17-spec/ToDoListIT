import React from 'react';
import './App.css';
import TodoListTask from "./TodoListTask";

class TodoListTasks extends React.Component {
    render = () => {

        let taskElements = this.props.tasks.map( t=> <TodoListTask
            title={t.title} isDone={t.isDone} priority={t.priority}
        />);

        return (
                    <div className="todoList-task">
                        {taskElements}
                {/*    <input type="checkbox" checked={true}/>*/}
                {/*    <span>CSS</span>*/}
                {/*</div>*/}
                {/*<div className="todoList-task">*/}
                {/*    <input type="checkbox" checked={false}/>*/}
                {/*    <span>JS</span>*/}
                {/*</div>*/}
                {/*<div className="todoList-task">*/}
                {/*    <input type="checkbox" checked={false}/>*/}
                {/*    <span>ReactJS</span>*/}
                {/*</div>*/}
                {/*<div className="todoList-task">*/}
                {/*    <input type="checkbox" checked={true}/>*/}
                {/*    <span>Patterns</span>*/}
                </div>
        );
    }
}

export default TodoListTasks;

