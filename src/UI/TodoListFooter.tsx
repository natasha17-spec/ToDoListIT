import React from 'react';
import '../App.css';


type StateType = {
    isHidden:boolean

}
type OwnPropsType = {
  changeFilter:(newFilterValue: string) => void
    filterValue:string
}

class TodoListFooter extends React.Component<OwnPropsType>{

    state:StateType = {
        isHidden: false
    };

    onAllFilterClick = () => { this.props.changeFilter("All"); };
    onCompletedFilterClick = () => { this.props.changeFilter("Completed"); };
    onActiveFilterClick = () => { this.props.changeFilter("Active"); };
    onShowFiltersClick = () => { this.setState({isHidden: true}) };
    onHideFiltersClick = () => { this.setState({isHidden: false}) };

    render = () => {

        let classForAll = this.props.filterValue === "All" ? "filter-active" : "todoList-footer_button";
        let classForCompleted = this.props.filterValue === "Completed" ? "filter-active" : "todoList-footer_button";
        let classForActive = this.props.filterValue === "Active" ? "filter-active" : "todoList-footer_button";

        return (
            <div className="todoList-footer">
                { !this.state.isHidden && <div className='container_footer'>
                     <button onClick={ this.onAllFilterClick } className={classForAll}>All</button>
                     <button onClick={ this.onCompletedFilterClick } className={classForCompleted}>Completed</button>
                     <button onClick={ this.onActiveFilterClick } className={classForActive}>Active</button>
                  </div>
                }
                { !this.state.isHidden && <span onClick={ this.onShowFiltersClick }>hide</span> }
                { this.state.isHidden && <span onClick={ this.onHideFiltersClick }>show</span> }
            </div>
        );
    }
}

export default TodoListFooter;

