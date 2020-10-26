<template>
    <div>
        <p>NAME: {{student.name}} </p>
        <p>GROUP: {{student.group}} </p>
        <p>MARK: {{student.mark}} </p>
        <p>Quantities students:{{studentsCount}}</p>
        <img v-bind:src="student.photo">
    </div>
</template>

<script>
import Vue from 'vue'

export default {
    props: {
           id: '',
       },
    data: function(){
        return{
            student: {},
        };
    },
    computed:{
        studentsCount () {
            return this.$store.getters.getCount
        }
    },
    mounted: function(){
        Vue.axios.get("http://46.101.212.195:3000/students/" + this.id).then((response) => {
            console.log(response.data)
            this.student = response.data;
            this.$store.commit('setCount', this.students.length);
        })
    },
}
</script>