import {api} from "../DAL/api";
import {TaskType, TodoType} from "../Types/entities";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AppStateType} from "./store";


const ADD_TODOLIST_SUCCESS = "TodoList/Reducer/ADD_TODOLIST_SUCCESS";
const DELETE_TODOLIST_SUCCESS = "TodoList/Reducer/DELETE_TODOLIST_SUCCESS";
const DELETE_TASK_SUCCESS = "TodoList/Reducer/DELETE_TASK_SUCCESS";
const UPDATE_TODOLIST_TITLE_SUCCESS = "TodoList/Reducer/UPDATE_TODOLIST_TITLE_SUCCESS";
const ADD_TASK_SUCCESS = "TodoList/Reducer/ADD_TASK_SUCCESS";
const SET_TASKS_SUCCESS = "TodoList/Reducer/SET_TASKS_SUCCESS";
const UPDATE_TASK_SUCCESS = "TodoList/Reducer/UPDATE_TASK_SUCCESS";
const SET_TODOLISTS_SUCCESS = "TodoList/Reducer/SET_TODOLISTS_SUCCESS";
const TOGGLE_IS_FETCHING = "TodoList/Reducer/TOGGLE_IS_FETCHING";
const DISABLED = "TodoList/Reducer/DISABLED";

type InitialStateType = {
    todolists: TodoType[],
    isFetching: boolean,
    disabled: boolean
}

const initialState: InitialStateType = {
    todolists: [],
    isFetching: false,
    disabled: false
};

const todolistReducer = (state: InitialStateType = initialState, action: AppActionType) => {
    switch (action.type) {
        case SET_TASKS_SUCCESS:
            return {
                ...state,
                todolists: state.todolists.map(tl => {
                    if (tl.id !== action.todolistId) {
                        return tl;
                    } else {
                        return {...tl, tasks: action.tasks}
                    }
                })
            };
        case SET_TODOLISTS_SUCCESS:
            return {
                ...state,
                todolists: action.todolists.map(tl => ({...tl, tasks: []}))
            };
        case ADD_TODOLIST_SUCCESS:
            return {
                ...state,
                todolists: [action.newTodolist, ...state.todolists]
            };
        case DELETE_TODOLIST_SUCCESS:
            return {
                ...state,
                todolists: state.todolists.filter(tl => tl.id !== action.todolistId)
            };
        case UPDATE_TODOLIST_TITLE_SUCCESS:
            return {
                ...state,
                todolists: state.todolists.map(tl => {
                    if (tl.id !== action.todolistId) return tl;
                    else return {...tl, title: action.title}
                })
            };
        case DELETE_TASK_SUCCESS:
            return {
                ...state,
                todolists: state.todolists.map(tl => {
                    if (tl.id === action.todolistId) {
                        return {
                            ...tl,
                            tasks: tl.tasks.filter(t => t.id !== action.taskId)
                        }
                    } else {
                        return tl
                    }
                })
            };
        case ADD_TASK_SUCCESS:
            return {
                ...state,
                todolists: state.todolists.map(tl => {
                    if (tl.id === action.todolistId) {
                        return {...tl, tasks: [action.newTask, ...tl.tasks]}
                    } else {
                        return tl
                    }
                })
            };
        case UPDATE_TASK_SUCCESS:
            return {
                ...state,
                todolists: state.todolists.map(tl => {
                    if (tl.id === action.todolistId) {
                        return {
                            ...tl,
                            tasks: tl.tasks.map(t => {
                                if (t.id !== action.taskId) {
                                    return t;
                                } else {
                                    return {...t, ...action.obj};
                                }
                            })
                        }
                    } else {
                        return tl
                    }
                })
            };
        case TOGGLE_IS_FETCHING:
            return {...state, isFetching: action.isFetching};
        case DISABLED:
            return {
                ...state, disabled: action.disabled
            };

        default:
            return state
    }
};

export default todolistReducer;

// Action creators
const updateTaskSuccess = (taskId: string, obj: any, todolistId: string): UpdateTaskSuccessActionType => ({
    type: UPDATE_TASK_SUCCESS,
    taskId,
    obj,
    todolistId
});
const deleteTodoSuccess = (todolistId: string): DeleteTodoSuccessActionType => ({
    type: DELETE_TODOLIST_SUCCESS,
    todolistId
});
const deleteTaskSuccess = (todolistId: string, taskId: string): DeleteTaskSuccessActionType => ({
    type: DELETE_TASK_SUCCESS,
    todolistId,
    taskId
});
const updateTodolistTitleSuccess = (todolistId: string, title: string): UpdateTodolistTitleSuccessActionType => ({
    type: UPDATE_TODOLIST_TITLE_SUCCESS,
    todolistId,
    title
});
const addTaskSuccess = (newTask: TaskType, todolistId: string): AddTaskSuccessActionType => ({
    type: ADD_TASK_SUCCESS,
    newTask,
    todolistId
});
const setTasksSuccess = (tasks: TaskType[], todolistId: string): SetTasksSuccessActionType => ({
    type: SET_TASKS_SUCCESS,
    tasks,
    todolistId
});
const addTodolistSuccess = (newTodolist: TodoType): AddTodolistSuccessActionType => ({
    type: ADD_TODOLIST_SUCCESS,
    newTodolist: newTodolist
});
const setTodolistsSuccess = (todolists: TodoType[]): SetTodolistsSuccess => ({
    type: SET_TODOLISTS_SUCCESS,
    todolists: todolists
});
const toogleIsFetching = (isFetching: boolean): ToogleIsFetching => ({type: TOGGLE_IS_FETCHING, isFetching});
const disabled = (disabled: boolean): Disabled => ({type: DISABLED, disabled});

// Action creators type
type UpdateTaskSuccessActionType = {
    type: typeof UPDATE_TASK_SUCCESS
    taskId: string
    obj: any
    todolistId: string
}
type DeleteTodoSuccessActionType = {
    type: typeof DELETE_TODOLIST_SUCCESS
    todolistId: string
}
type UpdateTodolistTitleSuccessActionType = {
    type: typeof UPDATE_TODOLIST_TITLE_SUCCESS
    todolistId: string
    title: string
}
type DeleteTaskSuccessActionType = {
    type: typeof DELETE_TASK_SUCCESS
    todolistId: string
    taskId: string
}
type AddTaskSuccessActionType = {
    type: typeof ADD_TASK_SUCCESS
    newTask: TaskType
    todolistId: string
}
type SetTasksSuccessActionType = {
    type: typeof SET_TASKS_SUCCESS
    tasks: TaskType[]
    todolistId: string
}
type AddTodolistSuccessActionType = {
    type: typeof ADD_TODOLIST_SUCCESS
    newTodolist: TodoType
}
type SetTodolistsSuccess = {
    type: typeof SET_TODOLISTS_SUCCESS
    todolists: TodoType[]
}
type ToogleIsFetching = {
    type: typeof TOGGLE_IS_FETCHING
    isFetching: boolean
}
type Disabled = {
    type: typeof DISABLED
    disabled: boolean
}

//TodoActionType //one reducer
type TodoActionType =
    UpdateTaskSuccessActionType
    | DeleteTodoSuccessActionType
    | UpdateTodolistTitleSuccessActionType
    | DeleteTaskSuccessActionType
    | AddTaskSuccessActionType
    | SetTasksSuccessActionType
    | AddTodolistSuccessActionType
    | SetTodolistsSuccess
    | ToogleIsFetching
    | Disabled


//Общий

type AppActionType = TodoActionType
type ThunkType = ThunkAction<void, AppStateType, unknown, TodoActionType>
type ThunkDispatchType = ThunkDispatch<AppStateType, unknown, TodoActionType>


export const getTodolists = (): ThunkType => (dispatch: ThunkDispatchType) => {
    dispatch(toogleIsFetching(true));
    {
        api.getTodolists()
            .then(res => {
                dispatch(setTodolistsSuccess(res.data));
                dispatch(toogleIsFetching(false));
            })
    }
};

export const getTasks = (todoId: string): ThunkType => (dispatch: ThunkDispatchType) => {
    api.getTasks(todoId)
        .then(res => {
            let allTasks = res.data.items;
            dispatch(setTasksSuccess(allTasks, todoId));
        });
};

export const addTodolist = (title: string): ThunkType => (dispatch: ThunkDispatchType) => {
    dispatch(disabled(true));
    api.createTodolist(title)
        .then(res => {
            let todolist = res.data.data.item;
            dispatch(addTodolistSuccess(todolist))
            dispatch(disabled(false));
        });
};

export const addTask = (title: string, todoId: string): ThunkType => (dispatch: ThunkDispatchType) => {
    dispatch(disabled(true));
    api.createTask(title, todoId)
        .then(res => {
            let newTask = res.data.data.item;
            dispatch(addTaskSuccess(newTask, todoId))
            dispatch(disabled(false));
        });
};

export const changeTask = (taskId: string, todoId: string, task: TaskType, obj: any): ThunkType => (dispatch: ThunkDispatchType) => {
    api.updateTask(taskId, todoId, task)
        .then(res => {
            dispatch(updateTaskSuccess(taskId, obj, todoId))
        })
};

export const deleteTodo = (todoId: string): ThunkType => (dispatch: ThunkDispatchType) => {
    api.deleteTodolist(todoId)
        .then(res => {
            dispatch(deleteTodoSuccess(todoId))
        });
};

export const deleteTask = (taskId: string, todoId: string): ThunkType => (dispatch: ThunkDispatchType) => {
    api.deleteTask(taskId, todoId)
        .then(res => {
            dispatch(deleteTaskSuccess(todoId, taskId))
        });
};

export const updateTitle = (title: string, todoId: string): ThunkType => (dispatch: ThunkDispatchType) => {
    api.updateTodolistTitle(title, todoId)
        .then(res => {
            dispatch(updateTodolistTitleSuccess(todoId, title))
        });
};






