<template>
    <div>
        <input type="text" v-model="surname">
        <table>
            <tr>
                <th>Name</th>
                <th>Grope</th>
                <th>Mark</th>
                <th>Practical Work</th>
                <th>Delete</th>
            </tr>
            <tr v-for="stud in students" v-bind:key="stud._id">
                <td v-bind:class="stud.name.includes(surname) ? 'pink' : 'black'">{{stud.name}}</td>
                <td>{{stud.group}}</td>
                <td>{{stud.mark}}</td>
                <td><input type="checkbox" v-model="stud.isDonePr"></td>
                <td><button v-on:click="deleteStud(index)">Delete</button></td>

            </tr>
        </table>
        <input type="text" v-model="student.name" placeholder="Name">
        <select v-model="student.group">
            <option value="17 2/9">17 2/9</option>
            <option value="17 1/9">17 1/9</option>
        </select>
        <select name="Mark" v-model="student.mark">
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
        </select>
        <input type="checkbox" v-model="student.check">Pract. Work
        <button v-on:click="pushStudent">Add</button>
    </div>
</template> 

<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

export default {
    data () {
        return {
          students: [],
          surname: "Please, input your name",
          student:{name:"",group:"",mark:"",isDonePr: false}
        }
    },
    mounted: function() {
        console.log(this);
        axios.get("http://46.101.212.195:3000/students").then((response) => {
            console.log(response.data)
            this.students = response.data;
        })
    },
    methods:{
        deleteStud: function(index) {
            this.students.splice(index, 1);
        },
        pushStudent: function(){
            Vue.axios.post("http://46.101.212.195:3000/students",this.student)
            .then((response) => {
                console.log(response.data)
            })
            }  
        }
    }
</script>