import {api} from "./api";
import {TaskType, TodoType} from "./types/entities";
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

type InitialStateType={
    todolists: TodoType[]
}

const initialState:InitialStateType = {
    todolists: []
};

const todolistReducer = (state:InitialStateType = initialState, action:AppActionType) => {
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
        default:
            return state
    }
};

export default todolistReducer;

// Action creators
const updateTaskSuccess = (taskId: string, obj:any, todolistId:string):UpdateTaskSuccessActionType => ({type: UPDATE_TASK_SUCCESS, taskId, obj, todolistId});
const deleteTodoSuccess = (todolistId:string):DeleteTodoSuccessActionType => ({type: DELETE_TODOLIST_SUCCESS, todolistId});
const deleteTaskSuccess = (todolistId:string, taskId:string):DeleteTaskSuccessActionType => ({type: DELETE_TASK_SUCCESS, todolistId, taskId});
const updateTodolistTitleSuccess = (todolistId:string, title:string):UpdateTodolistTitleSuccessActionType => ({type: UPDATE_TODOLIST_TITLE_SUCCESS, todolistId, title});
const addTaskSuccess = (newTask:TaskType, todolistId:string):AddTaskSuccessActionType => ({type: ADD_TASK_SUCCESS, newTask, todolistId});
const getTasksSuccess = (tasks:TaskType[], todolistId:string):GetTasksSuccessActionType => ({type: SET_TASKS_SUCCESS, tasks, todolistId});
const addTodolistSuccess = (newTodolist:TodoType):AddTodolistSuccessActionType => ({type: ADD_TODOLIST_SUCCESS, newTodolist: newTodolist});
const getTodolistsSuccess = (todolists:TodoType[]):GetTodolistsSuccess => ({type: SET_TODOLISTS_SUCCESS, todolists: todolists});

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
    todolistId:string
    title:string
}
type DeleteTaskSuccessActionType = {
    type: typeof DELETE_TASK_SUCCESS
    todolistId: string
    taskId:string
}
type AddTaskSuccessActionType = {
    type: typeof ADD_TASK_SUCCESS
    newTask:TaskType
    todolistId:string
}
type GetTasksSuccessActionType = {
    type: typeof SET_TASKS_SUCCESS
    tasks:TaskType[]
    todolistId: string
}
type AddTodolistSuccessActionType = {
    type: typeof ADD_TODOLIST_SUCCESS
    newTodolist:TodoType
}
type GetTodolistsSuccess = {
    type: typeof SET_TODOLISTS_SUCCESS
    todolists:TodoType[]
}

//TodoActionType //one reducer
type TodoActionType =
    UpdateTaskSuccessActionType
    |DeleteTodoSuccessActionType
    |UpdateTodolistTitleSuccessActionType
    |DeleteTaskSuccessActionType
    |AddTaskSuccessActionType
    |GetTasksSuccessActionType
    |AddTodolistSuccessActionType
    |GetTodolistsSuccess

//Общий

type AppActionType = TodoActionType


// Thunk creator
// export const getTodolists = () => (dispatch) => {
//     api.getTodolists()
//         .then(res => {
//             dispatch(getTodolistsSuccess(res.data));
//         })
// };

// export const addTodolist = (title:string) => (dispatch:any) => {
//     api.createTodolist(title)
//         .then(res => {
//             let todolist = res.data.data.item;
//             dispatch(addTodolistSuccess(todolist))
//         });
// };

// export const getTasks = (todoId:string) => (dispatch:any) => {
//     api.getTasks(todoId)
//         .then(res => {
//             let allTasks = res.data.items;
//             dispatch(getTasksSuccess(allTasks, todoId))
//         });
// };
//
// export const addTask = (title:string, todoId:string) => (dispatch:any) => {
//     api.createTask(title, todoId)
//         .then(res => {
//             let newTask = res.data.data.item;
//             dispatch(addTaskSuccess(newTask, todoId))
//         });
// };
//
// export const changeTask = (taskId:string, todoId:string, task:TaskType, obj:any) => (dispatch:any) => {
//     api.updateTask(taskId, todoId, task)
//         .then(res => {
//             dispatch(updateTaskSuccess(taskId, obj, todoId))
//         })
// };
//
// export const deleteTodo = (todoId:string) => (dispatch:any) => {
//     api.deleteTodolist(todoId)
//         .then(res => {
//             dispatch(deleteTodoSuccess(todoId))
//         });
// };
//
// export const deleteTask = (taskId:string, todoId:string) => (dispatch:any) => {
//     api.deleteTask(taskId, todoId)
//         .then(res => {
//             dispatch(deleteTaskSuccess(todoId, taskId))
//         });
// };
//
// export const updateTitle = (title:string, todoId:string) => (dispatch:any) => {
//     api.updateTodolistTitle(title, todoId)
//         .then(res => {
//             dispatch(updateTodolistTitleSuccess(todoId, title))
//         });
// };
//типизация thunk
//2 вариант
// ThunkAction
// 1 параметр - описываем, что возвращает thunk
// 2 параметр - state всего приложения
// 3 параметр - экстра аргументы
// 4 параметр - все action всего App

// ThunkDispatch
// 1 параметр - state всего приложения
// 2 параметр - экстра аргументы
// 3 параметр - все action всего App


type ThunkType = ThunkAction<void, AppStateType, unknown, TodoActionType>
type ThunkDispatchType=ThunkDispatch<AppStateType, unknown, TodoActionType>


export const getTodolists = (): ThunkType =>(dispatch: ThunkDispatchType) => {
        {
            api.getTodolists()
                .then(res => {
                    dispatch(getTodolistsSuccess(res.data));
                })
        }
    }



export const addTodolist = (title:string):ThunkType=> (dispatch:ThunkDispatchType) => {
    api.createTodolist(title)
        .then(res => {
            let todolist = res.data.data.item;
            dispatch(addTodolistSuccess(todolist))
        });
};

export const getTasks = (todoId:string):ThunkType=> (dispatch:ThunkDispatchType) => {
    api.getTasks(todoId)
        .then(res => {
            let allTasks = res.data.items;
            dispatch(getTasksSuccess(allTasks, todoId))
        });
};

export const addTask = (title:string, todoId:string):ThunkType=> (dispatch:ThunkDispatchType) => {
    api.createTask(title, todoId)
        .then(res => {
            let newTask = res.data.data.item;
            dispatch(addTaskSuccess(newTask, todoId))
        });
};

export const changeTask = (taskId:string, todoId:string, task:TaskType, obj:any):ThunkType=> (dispatch:ThunkDispatchType) => {
    api.updateTask(taskId, todoId, task)
        .then(res => {
            dispatch(updateTaskSuccess(taskId, obj, todoId))
        })
};

export const deleteTodo = (todoId:string):ThunkType=> (dispatch:ThunkDispatchType) => {
    api.deleteTodolist(todoId)
        .then(res => {
            dispatch(deleteTodoSuccess(todoId))
        });
};

export const deleteTask = (taskId:string, todoId:string):ThunkType=> (dispatch:ThunkDispatchType) => {
    api.deleteTask(taskId, todoId)
        .then(res => {
            dispatch(deleteTaskSuccess(todoId, taskId))
        });
};

export const updateTitle = (title:string, todoId:string):ThunkType=> (dispatch:ThunkDispatchType) => {
    api.updateTodolistTitle(title, todoId)
        .then(res => {
            dispatch(updateTodolistTitleSuccess(todoId, title))
        });
};






