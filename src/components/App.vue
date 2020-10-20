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
    </div>
</template> 

<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

export default {
    data: {
        students: [],
        surname: "Input name...",
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
        }
    }
}
</script>