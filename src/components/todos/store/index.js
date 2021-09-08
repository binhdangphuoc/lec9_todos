import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

function randomId(){
    return Math.random().toString()
}

export default new Vuex.Store({
    state:{
        listTodos: [],
    },
    mutations:{
        ADD_TODO(state, newTodo) {
            console.log("enter ADD_TODO")
            state.listTodos.push(newTodo)
        },
        REMOVE_TODO(state,todo) {
            state.listTodos.splice(state.listTodos.indexOf(todo),1)
        },
        CHANGE_TO_COMPLETED(state, {todo, payload}) {
            const todos = state.listTodos
            todos.splice(
                todos.indexOf(todo),
                1,
                Object.assign({}, todo, {...payload})
            )
        },
        SELECT_ALL(state, val) {
            for( let i in state.listTodos) {
                state.listTodos[i].completed = val
            }
        },
        DELETE_COMPLETED(state) {
            let i=0;
            while(i < state.listTodos.length) {
                if(state.listTodos[i].completed == true) {
                    state.listTodos.splice(i,1)
                }else{
                    i++
                }
            }           
        }
    },
    actions:{
        addTodo({ commit }, newTodo) {
            if(!newTodo) return;
            const todo = {
                id: randomId(),
                title: newTodo,
                completed: false
            }
            console.log("action addTodo: ",todo)
            commit("ADD_TODO", todo);
        },
        removeTodo({ commit }, todo) {
            if(!todo) return;
            commit("REMOVE_TODO", todo);
        },
        changeToCompleted({ commit }, {todo, payload}) {
            commit("CHANGE_TO_COMPLETED", {todo, payload})
        },
        selectAll({ commit }, val) {
            commit("SELECT_ALL", val)
        },
        deleteCompleted({ commit }) {
            commit("DELETE_COMPLETED")
        }
    },
    
});