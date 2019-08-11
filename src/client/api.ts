import Fetch from './fetch';
class Api extends Fetch {

  getTodoList() {
    return this.fetch('get', '/getlist')
  }

  addToDo(parmas: any) {
    return this.fetch('post', '/addTodo', parmas)
  }

  del(parmas: any) {
    return this.fetch('post', '/del', parmas)
  }

  flag(parmas: any) {
    return this.fetch('post', '/flag', parmas)
  }

  getType() {
    return this.fetch('get', '/getType')
  }
}

export default new Api()