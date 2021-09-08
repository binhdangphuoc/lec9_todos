<template>
  <section class="todoapp">
      <header class="header">
         
          <h1>Todos app</h1>
          <button
            :class="{ clickAll: count == countCompleted && count > 0}"
            @click="selectAll()"
            ></button>
          <input 
            class="new-todo"
            placeholder="What need to be done?"
            
            v-model="newTodo"
            @keypress.enter="addTodo"
          />
      </header>
      <section class="main" v-show="listTodos.length > 0">
          <ul class="todo-list">
              <li
                v-for="todo in filterTodo"
                :key="todo.id"
                >
                <div class="view">
                    <input 
                        class="check"
                        type="checkbox"
                        :checked="todo.completed"
                        @change="changeToCompleted(todo, $event)"
                    />
                    <label
                        :class="{completed: todo.completed,}"
                    >{{ todo.title }}</label>
                    <button class="destroy" @click="removeTodo(todo)">X</button>
                </div>
                
              </li>
          </ul>
      </section>
      <footer class="footer" v-show="listTodos.length > 0">
          <span class="count">
              <strong>{{ countLeft }}</strong>
              {{ countLeft | formatItem }} left
          </span>
          <ul class="select-show">
              <li>
                  <a href="#" 
                    @click.prevent="selectShow = 'all'"
                    :class="{ show : selectShow == 'all' }"
                  >
                    all
                  </a>
              </li>
              <li>
                  <a href="#" 
                    @click.prevent="selectShow = 'active'"
                    :class="{ show : selectShow == 'active' }"
                  >
                    Active
                  </a>
              </li>
              <li>
                  <a href="#" 
                    @click.prevent="selectShow = 'completed'"
                    :class="{ show : selectShow == 'completed' }"
                  >
                    Completed
                  </a>
              </li>
          </ul>
          <a href="#"
            class="del-completed"
            v-show="countCompleted > 0"
            @click.prevent="deleteCompleted()"
          >
            Delete completed
          </a>
          <a 
            class="del-completed"
            v-show="countCompleted == 0"
            ></a>
      </footer>
  </section>
  
</template>

<script>
const filters = {
    all: (listTodos) => {
        return listTodos
    },
    active: (listTodos) => {
        return listTodos.filter((todo) => {
            return !todo.completed
        })
    },
    completed: (listTodos) => {
        return listTodos.filter((todo) => {
            return todo.completed
        })
    }
}
export default {
    name: 'Todos',
    data() {
        return {
            newTodo: "",
            selectShow: "all",
        }
    },
    filters:{
        formatItem: function(n) {
            return n <= 1? "item" : "items"
        }
    },
    computed:{
        listTodos() {
            return this.$store.state.listTodos;
        },
        count() {
            return this.$store.state.listTodos.length;
        },
        countLeft() {
            return filters['active'](this.listTodos).length
        },
        countCompleted() {
            return filters['completed'](this.listTodos).length
        },
        filterTodo() {
            console.log("filter selectShow")
            return filters[this.selectShow](this.listTodos)
        }
    },
    methods:{
        // setNewTodo(e) {
        //     this.newTodo = e.target.value;
        //     console.log("setNewTodo = ",this.newTodo)
        // },
        addTodo(){
            console.log("method addTodo: ", this.newTodo)
            this.$store.dispatch("addTodo", this.newTodo)
            this.newTodo = ""
        },
        removeTodo(todo) {
            console.log("remove todo: ",todo)
            this.$store.dispatch("removeTodo",todo)
        },
        changeToCompleted(todo, e) {
            console.log("change completed: ", e.target.checked)
            this.$store.dispatch("changeToCompleted", {
                todo: todo,
                payload: {
                    completed: e.target.checked
                }
            })
        },
        selectAll() {
            if(this.countLeft > 0) {
                this.$store.dispatch("selectAll", true)
            }else{
                this.$store.dispatch("selectAll", false)
            }
        },
        deleteCompleted() {
            console.log("delete completed")
            this.$store.dispatch("deleteCompleted")
        }
    }
}
</script>

<style scoped>
.todoapp {
    font-family: Arial, Helvetica, sans-serif;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    width: 500px;
    margin: 0 auto;
    background-color: rgba(139, 80, 80, 0.3);
}
a{
    text-decoration: none;
}
li{
    list-style: none;
}
.header {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
}
.header h1 {
    width: 100%;
    color: rgba(230, 53, 53, 0.5);
    font-size: 3rem;
    text-align: center;
}
.header button {
    width: 20px;
    height: 20px;
    background: none;
    cursor: pointer;
    margin-right: 10px;
    border-top: 20px solid rgba(139, 80, 80, 0.3);
    border-left: 20px solid rgba(0, 0, 0, 0);
    border-right: 20px solid rgba(0, 0, 0, 0);
    border-bottom: 10px solid rgba(0, 0, 0, 0);  
}
.header button.clickAll {
    border-top: 20px solid rgba(139, 80, 80, 0.7);
    border-left: 20px solid rgba(0, 0, 0, 0);
    border-right: 20px solid rgba(0, 0, 0, 0);
    border-bottom: 10px solid rgba(0, 0, 0, 0);  
}
.header input{
    width: calc(100% - 100px);
    height: 50px;
    font-size: 25px;
    color: rgba(0, 0, 0, 0.5);
    font-weight: 800;
}
.header input:focus{
    outline: none;
}
.header input::-webkit-input-placeholder{
    color: rgba(0, 0, 0, 0.2);
    font-weight: 800;
}
.main {
    padding: 0px;
}
.main ul {
    padding: 0;
    margin: 0;
}
.main ul li {
    min-height: 50px;
    border-bottom: 1px solid black;
}
.main ul li div {
    min-height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.main ul li div label {
    word-break: break-all;
    height: auto;
    width: 100%;
    margin-left: 10px;
    text-align: left;
    font-size: 25px;
}
.main .completed {
    text-decoration: line-through;
    color: rgba(0, 0, 0, 0.5);
}
.main ul li div button {
    background: none;
    border: none;
    color: red;
    font-size: 20px;
    font-weight: 600;
    opacity: 0;
    transition: 0.5s ease-in;
    cursor: pointer;
}
.main ul li:hover button{
    opacity: 1;
}
.footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.footer span {
    width: 100px;
    text-align: center;
}
.footer .del-completed {
    width: 150px;
    text-align: center;
}
.footer .select-show {
    width: auto;
    text-align: center;
    display: flex;
    justify-content: center;
}
.footer .select-show li a{
    margin: 0 5px;
    padding: 0 5px;
}
.footer .select-show li .show {
    border: 1px solid red;
}
</style>