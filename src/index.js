import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'



new Vue({
    el:"#Day4",
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
})