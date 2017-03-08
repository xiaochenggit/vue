<template>
  <div id="app">
    <h1 v-text="title"></h1>
    <h1>子组件的名称 : {{ sonName }}</h1>
    <input type="text" v-model="newItem" @keyup.enter="addNewItem">
    <ul class="list-group container">
      <li v-for="(item,$index) in items" :class="['list-group-item',{finish : item.isFinish}]" @click="reIsFinish(item)"> 
        {{item.label}} 
        <button @click="delet($index)" class="btn btn-danger">删除</button>
      </li>
    </ul>
    <!-- 父组件与子组件通信 -->
    <Hello :myName="Name" @saySonName="saySonName"></Hello>
  </div>
</template>

<script>
import Store from "./router/store.js";
import Hello from "./components/Hello.vue";
export default {
  name: 'app',
  data : function (argument) {
    return {
      Name : "肖成",
      title : "<p>this is a todo list1</p>",
      items : Store.fetch(),
      newItem : "",
      sonName : "",
    }
  },
  components : {Hello},
  watch : {
    items : {
      handler : function(items){
        Store.save(items);
        console.log("已经储存");
      },
      deep : true
    }
  },
  methods : {
    reIsFinish : function(item){
        item.isFinish = !item.isFinish ;
    },
    addNewItem : function(){
      this.items.push({
        label : this.newItem,
        isFinish : false
      });
      this.newItem = "";
      window.localStorage.setItem("items",this.items);
    },
    saySonName : function(name){
      this.sonName = name ;
    },
    delet : function(index){
      this.items.splice(index, 1);
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.finish{
  text-decoration: underline;
}
</style>
