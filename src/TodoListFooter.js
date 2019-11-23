import React from 'react';
import './App.css';

class TodoListFooter extends React.Component {

    render = (props) => {

let classForAll = this.props.filterValue==='All'? "filter-active": 'button';
let classForCompleted = this.props.filterValue==='Completed'? "filter-active": 'button';
let classForActive = this.props.filterValue==='Active'? "filter-active": 'button';
        return(
            <div>
                <div>
                    <div>
                        <button onClick={()=>{this.props.changeFilter('All')}} className={classForAll} >All</button>
                        <button onClick={()=>{this.props.changeFilter('Completed')}} className={classForCompleted}>Completed</button>
                        <button onClick={()=>{this.props.changeFilter('Active')}} className={classForActive}>Active</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default TodoListFooter;

