import React, { Component, PropTypes } from 'react'
import TodoItem from './TodoItem'
import Footer from './Footer'
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../constants/TodoFilters'

const TODO_FILTERS = {
  [SHOW_ALL]: () => true,
  [SHOW_ACTIVE]: todo => !todo.completed,
  [SHOW_COMPLETED]: todo => todo.completed
}

class MainSection extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = { filter: SHOW_ALL }
  }

  handleClearCompleted() {
    /**
     * 遍历数组，在每一项元素后面触发一个回调函数，通过判断，返回一个布尔值。
     * some()是只要有一个满足判断，就返回true，every()是只要有一项不满足判断，就返回false。
     *
     * 遍历任务数组，有一个任务的属性completed为true，就返回true。
     *
     * @type {boolean}
     */
    const atLeastOneCompleted = this.props.todos.some(todo => todo.completed)

    if (atLeastOneCompleted) {
      this.props.actions.clearCompleted()
    }

  }

  handleShow(filter) {
    this.setState({ filter })
  }

  renderToggleAll(completedCount) {
    const { todos, actions } = this.props
    if (todos.length > 0) {
      return (
        <input className="toggle-all"
               type="checkbox"
               checked={completedCount === todos.length}
               onChange={actions.completeAll} />
      )
    }
  }

  renderFooter(completedCount) {
    const { todos } = this.props
    const { filter } = this.state
    const activeCount = todos.length - completedCount

    if (todos.length) {
      return (
        <Footer completedCount={completedCount}
                activeCount={activeCount}
                filter={filter}
                onClearCompleted={this.handleClearCompleted.bind(this)}
                onShow={this.handleShow.bind(this)} />
      )
    }
  }

  render() {
    const { todos, actions } = this.props
    const { filter } = this.state

    const filteredTodos = todos.filter(TODO_FILTERS[filter])

    /**
     * 遍历数组，在每一项元素后面触发一个回调函数，经过计算返回一个累加的值。
     */
    const completedCount = todos.reduce((count, todo) =>
      todo.completed ? count + 1 : count,
      0
    )

      /**
       * todos是个数组，reduce()的第一个参数是个箭头语法，也就是个回调函数，
       *
       * 这个回调函数的第一个参数是上一个返回值（但是这里被初始化为0）,第二个参数是当前元素的值。
       *
       * reduce()的第二个参数是个初始化值（不必需），初始化了上一个元素的值（这里是count）

       遍历数组todos的第一个值的时候，count为0，todo是todos的第一项，返回值加一或者不变。

       （条件 ? 结果1 : 结果2三元运算）

       遍历数组todos的第二个值的时候，count为上一个返回值，todo是todos的第二项，返回值加一或者不变。

       遍历结束后，即可得到数组中，completed属性为true的个数，也就是已完成的任务的个数。
       */

    return (
      <section className="main">
        {this.renderToggleAll(completedCount)}
        <ul className="todo-list">
          {filteredTodos.map(todo =>
              /**
               * 展开actions的每一个属性到组件中，最后在props上可以获取到。
               * @param todo
               */
            <TodoItem key={todo.id} todo={todo} {...actions} />
          )}
        </ul>
        {this.renderFooter(completedCount)}
      </section>
    )
  }
}

MainSection.propTypes = {
  todos: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
}

export default MainSection
