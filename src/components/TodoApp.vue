<script>
let id = 0;

function todoSelector(item) {
  return {
    id: item.id,
    text: item.title,
    done: false
  }
}

const DEFAULT_PAGE_SIZE = 150;
const PAGE_LOAD = 50;

export default {
  data() {
    return {
      newTodo: "",
      hideCompleted: false,
      todos: [
        { id: id++, text: "todo item 1", done: false },
        { id: id++, text: "todo item 2", done: false },
        { id: id++, text: "todo item 3", done: false },
      ],
      total: 0,
      pageSize: DEFAULT_PAGE_SIZE,
      allLoaded: true,
    };
  },
  methods: {
    addTodo() {
      this.todos.push({ id: id++, text: this.newTodo, done: false });
      this.newTodo = "";
    },
    loadMore() {
      this.pageSize += PAGE_LOAD;
      this.genTodos();
    },
    removeTodo(id) {
      this.todos = this.todos.filter((item) => item.id !== id);
    },
    async genTodos() {
      const rspTodos = await fetch('https://jsonplaceholder.typicode.com/todos')
        .then(rsp => rsp.json())
      this.total = rspTodos.length;
      this.todos = rspTodos.filter(item => item.id <= this.pageSize).map(todoSelector);
    }
  },
  computed: {
    filterTodos() {
      return this.hideCompleted
        ? this.todos.filter((item) => !item.done)
        : this.todos;
    },
  },
  watch: {
    todos(newTodos) {
      this.allLoaded = newTodos.length < this.total;
      console.log("todos", newTodos.length, this.total)
    },
    // total(newTotal) {
    //   this.allLoaded = this.todos.length <= newTotal;
    //   console.log("total", this.todos.length >= newTotal)
    // }
  },
  created() {
    this.genTodos();
  }
};
</script>

<template>
  <div class="todo-app">
    <form @submit.prevent="addTodo">
      <div class="input-group mb-3">
        <input v-model="newTodo" className="form-control"/>
        <button className="btn btn-dark btn-sm" type="button">Add</button>
      </div>
    </form>
    <input type="checkbox" id="hide-complete" v-model="hideCompleted" className="form-check-input"/>
    <label for="hide-complete" className="label">hide completed</label>
    <ul v-if="filterTodos.length">
      <li v-for="todo in filterTodos" :key="todo.id">
        <input type="checkbox" v-model="todo.done" className="form-check-input" title="mark as done" />
        <span :class="{ done: todo.done }" className="todo-content">{{ todo.text }}</span>
        <button className="btn btn-sm" @click="removeTodo(todo.id)">x</button>
      </li>
    </ul>
    <div className="text-center">
      <div v-if="todos.length < total">
        <div>{{ pageSize }} / {{ total }}</div>
        <button className="btn btn-outline-dark btn-sm" @click="loadMore()">Load More</button>
      </div>
      <div v-if="!allLoaded">--- No more new content ---</div>
    </div>

    <div v-if="!filterTodos.length">No content</div>
  </div>
</template>

<style>
.todo-app {
  width: 800px;
  text-align: left;
  margin: 20px auto;
}

.todo-app ul {
  list-style: none;
  padding: 16px;
}

.done {
  text-decoration: line-through;
}

.text-center {
  text-align: center;
}

.todo-content, .label {
  margin: 0 8px;
}
</style>
