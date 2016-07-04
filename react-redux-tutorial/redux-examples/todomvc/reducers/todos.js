import { ADD_TODO, DELETE_TODO, EDIT_TODO, COMPLETE_TODO, COMPLETE_ALL, CLEAR_COMPLETED } from '../constants/ActionTypes'

const initialState = [
  {
    text: 'Use Redux',
    completed: false,
    id: 0
  }
]

export default function todos(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO:
      return [
        {
          id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
          completed: false,
          text: action.text
        }, 
        ...state
        /**
         * ...展开属性
         *
         * 展开state数组的每一项到当前的数组
         * 
         */
      ]

      /**
       * 遍历数组，在每一项元素后面触发一个回调函数，通过判断，保留或移除当前项，最后返回一个新数组。

         顾名思义就是过滤。

       state是个任务数组，filter()里面只有一个参数，就是个箭头函数，该函数只有一个参数是todo，
       也就是数组的每一项元素，箭头后面那个判断语句，如果返回true则保留当前项，反之移除当前项。

       该代码段的作用是，过滤掉任务数组中，id与指定id相同的任务。返回一个新的任务数组。
       */
    case DELETE_TODO:
      return state.filter(todo =>
        todo.id !== action.id
      )

      /**
       * 遍历数组，在每一项元素后面触发一个回调函数，通过计算，返回一个新的当前项，最后返回一个新数组。
       *
       * 箭头后面的值是个三元运算符，也就是return的新元素。如果id匹配，则通过Object.assign()合并一个新的属性，
       * 也就是给todo添加或者重写一个text属性，属性值为action.text。
         Object.assign()第一个参数是target，就是目标，第二个第三个以及后面的参数都是source，也就是拷贝的源，
         是不是很像jquery插件中的extend？

          这个代码的作用是给数组中指定的任务更新text属性。
       */
    case EDIT_TODO:
      return state.map(todo =>
        todo.id === action.id ?
          Object.assign({}, todo, { text: action.text }) :
          todo
      )

    case COMPLETE_TODO:
      return state.map(todo =>
        todo.id === action.id ?
          Object.assign({}, todo, { completed: !todo.completed }) :
          todo
      )

    case COMPLETE_ALL:
      /**
       * 遍历任务数组，每一项任务的completed属性均为true时候，返回true。
       * @type {boolean}
         */
      const areAllMarked = state.every(todo => todo.completed)

      return state.map(todo => Object.assign({}, todo, {
        completed: !areAllMarked
      }))

    case CLEAR_COMPLETED:
      return state.filter(todo => todo.completed === false)

    default:
      return state
  }
}
