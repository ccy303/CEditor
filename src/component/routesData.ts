import ToDoList from "./toDoList/toDoList";
import AddToDo from './addToDo/addTodo'
export const routes = [
  {
    title: '我的代办',
    path: '/',
    component: ToDoList
  }, {
    title: '添加代办',
    path: '/addTodo',
    component: AddToDo
  }, {
    title: '其他',
    path: '/other',
    component: 'Other',
    routes: [
      {
        title: '其他1',
        path: '/other/otherOne',
        component: 'OtherOne'
      }, {
        title: '其他2',
        path: '/other/otherTwo',
        component: 'OtherTwo',
      }, {
        title: '其他2',
        path: '/other/otherThree',
        component: 'OtherThree',
      }
    ]
  }
]