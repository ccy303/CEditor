const STATE = {
  Original_todoList: {},
  todolist: {},
  type: []
}
const todo = (state = STATE, action: any) => {
  switch (action.type) {
    case 'SET_TODO_LIST':
      let dataArr: any = {};
      state.type.forEach(val => {
        dataArr[val] = action.data.filter((data: any) => {
          return data.type === val
        })
      })
      return Object.assign({}, state, {
        todolist: dataArr,
        Original_todoList: { ...dataArr },
      })

    case 'SET_TYPE':
      return Object.assign({}, state, {
        type: [...action.data]
      })

    case 'UPDATE_TODOLIST':
      let obj: any = state.todolist;
      obj[action.key] = action.data;
      return Object.assign({}, state, {
        todolist: obj
      })

    default:
      return {
        ...state
      }
  }
}

export default todo