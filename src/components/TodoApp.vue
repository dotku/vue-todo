<script>
let id = 0;

function todoSelector(item) {
  return {
    id: item.id,
    text: item.title,
    done: false
  }
}

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
    };
  },
  methods: {
    addTodo() {
      this.todos.push({ id: id++, text: this.newTodo, done: false });
      this.newTodo = "";
    },
    removeTodo(id) {
      this.todos = this.todos.filter((item) => item.id !== id);
    },
    async genTodos() {
      const rspTodos = await fetch('https://jsonplaceholder.typicode.com/todos')
        .then(rsp => rsp.json())
      this.todos = rspTodos.filter(item => item.id < 10).map(todoSelector);
    }
  },
  computed: {
    filterTodos() {
      return this.hideCompleted
        ? this.todos.filter((item) => !item.done)
        : this.todos;
    },
  },
  created() {
    this.genTodos();
  }
};
</script>
<template>
  <div class="todo-app">
    <form @submit.prevent="addTodo">
      <input v-model="newTodo" />
      <button>Add</button>
    </form>
    <input type="checkbox" id="hide-complete" v-model="hideCompleted" /><label for="hide-complete">hide completed</label>
    <ul v-if="filterTodos.length">
      <li v-for="todo in filterTodos" :key="todo.id">
        <input type="checkbox" v-model="todo.done" />
        <span :class="{ done: todo.done }" class="todo-content">{{ todo.text }}</span>
        <button @click="removeTodo(todo.id)">x</button>
      </li>
    </ul>
    <div v-if="!filterTodos.length">No content</div>
  </div>
</template>

<style>
.todo-app {
  width: 800px;
  text-align: left;
  margin: 20px auto;
}

.done {
  text-decoration: line-through;
}

.todo-content {
  margin: 0 8px;
}
</style>
