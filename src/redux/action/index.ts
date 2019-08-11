export const setToDoList = (data: any) => {
  return (dispath: any) => {
    dispath({
      type: 'SET_TODO_LIST',
      data: data
    })
    return Promise.resolve(200)
  }
}

export const setType = (data: any) => {
  return (dispatch: any) => {
    dispatch({
      type: 'SET_TYPE',
      data: data
    })
    return Promise.resolve(200)
  }
}

export const updataTodoList = (data: any, type: string) => {
  return (dispatch: any) => {
    dispatch({
      type: 'UPDATE_TODOLIST',
      data: data,
      key: type
    })
  }
}