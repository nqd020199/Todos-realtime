<template>
  <div class="container is-fullhd mt-5 mx-3">
    <h1 class="title is-1 has-text-centered has-text-info">Todo</h1>
    <form @submit.prevent="addTodo">
      <div class="field is-grouped">
        <p class="control is-expanded">
          <input
            class="input"
            type="text"
            placeholder="Find a repository"
            v-model="newTodoContent" />
        </p>
        <p class="control">
          <button
            :disabled="!newTodoContent"
            type="submit"
            class="button is-info">
            Search
          </button>
        </p>
      </div>
    </form>
    <div
      v-for="todo in todos"
      :class="['card my-3 ', todo.done && 'has-background-info']"
      :key="todo.id">
      <div class="card-content">
        <div class="content content-item">
          <div :class="['title is-4 is-capitalized', todo.done && 'item-done']">
            {{ todo.content }}
            <br />
            <time class="title is-6 is-uppercase has-text-grey">{{
              todo.date
            }}</time>
          </div>
          <span>
            <div class="is-flex">
              <button
                @click="doneTodo(todo.id)"
                :class="[
                  'button is-primary mr-5',
                  todo.done && 'has-background-primary',
                ]">
                Done
              </button>
              <button
                @click="deletTodo(todo.id)"
                :class="[
                  'button is-danger',
                  todo.done && 'has-background-danger',
                ]">
                Delete
              </button>
            </div>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
//import
import { ref, onMounted } from "vue";
import {
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "@/firebase";
//todo
const todos = ref([]);

const collectionRef = collection(db, "todos");
const sortAllowDate = query(
  collectionRef,
  orderBy("valueSort", "desc"),
  limit(5)
);
//mounted
onMounted(async () => {
  onSnapshot(sortAllowDate, (querySnapshot) => {
    const cloneTodo = [];
    querySnapshot.forEach((doc) => {
      cloneTodo.push({
        id: doc.id,
        content: doc.data().content,
        done: doc.data().done,
        date: doc.data().date,
      });
    });
    todos.value = cloneTodo;
  });
});

//add Todo
const newTodoContent = ref("");
const addTodo = async () => {
  await addDoc(collectionRef, {
    content: newTodoContent.value,
    done: false,
    date: new Date().toUTCString(),
    valueSort: Date.now(),
  });
  newTodoContent.value = "";
};
const deletTodo = async (id) => {
  await deleteDoc(doc(collectionRef, id));
};
const doneTodo = (id) => {
  todos.value.forEach(async (todo) => {
    if (todo.id === id) {
      await updateDoc(doc(collectionRef, id), {
        ...todo,
        done: !todo.done,
        date: new Date().toUTCString(),
      });
    }
  });
  return todos;
};
</script>

<style>
@import "bulma/css/bulma.min.css";

.content-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.is-show {
  display: block;
}
.is-hide {
  display: none;
}

.item-done {
  text-decoration: line-through;
}
</style>
