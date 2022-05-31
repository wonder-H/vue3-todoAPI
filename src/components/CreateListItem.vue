<template>
  <input :value="inputText" @input="inputText = $event.target.value" 
  placeholder="What are you going to do?" ref="input"/>
  <button @click="newItem"> + </button>
</template>

<script>


export default{
  data(){
    return {
      inputText: ''
    }
  },

  methods: {

    async newItem(){
      if(!this.inputText.trim()){
        this.$refs.input.focus()
        return
      }             
      this.$store.dispatch('createListItem', this.inputText)
    }

    
  }
 
 }


 </script>