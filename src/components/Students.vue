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
                <template v-if="stud._id==EditId">
                    <td><input v-model="stud.name" value="stud.name"></td>
                    <td>
                        <select v-model="stud.group">
                            <option value="17 2/9">17 2/9</option>
                            <option value="17 1/9">17 1/9</option>
                        </select>
                    </td>
                    <td>
                        <select name="Mark" v-model="stud.mark">
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </td>
                    <td><input type="checkbox" v-model="stud.isDonePr"></td>
                    <td></td>
                    <td><button v-on:click="SaveEdit(EditId)">Save</button></td>
                </template>
                <template v-else>
                    <td v-bind:class="stud.name.includes(surname) ? 'pink' : 'black'"><router-link v-bind:to="'/student-info/'+stud._id">{{stud.name}}</router-link></td>
                    <td>{{stud.group}}</td>
                    <td>{{stud.mark}}</td>
                    <td><input type="checkbox" v-model="stud.isDonePr"></td>
                    <td><button v-on:click="deleteStud(stud._id)">Delete</button></td>
                    <td><button v-on:click="FoudId(stud._id)">Update</button></td>
                </template>
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
        <input type="checkbox" v-model="student.isDonePr">Pract. Work
        <button v-on:click="pushStudent">Add</button>

        <div>
            <h2>Currency Converter</h2>

            <span>Enter: </span>
            <input type="text" v-model="amount"><br>

            <span>Convert from: </span>
            <select v-model="ccyToSell">
                <option value="UAN">UAN</option>
                <option value="EUR">EUR</option>
                <option value="USD">USD</option>
                <option value="RUB">RUB</option>
            </select>

            <span>Convert to:</span>
            <select v-model="ccyToBuy">
                <option value="UAN">UAN</option>
                <option value="EUR">EUR</option>
                <option value="USD">USD</option>
                <option value="RUB">RUB</option>
            </select>
            <button v-on:click="convertCurrency">Convert</button>
            <h4>{{amount}} {{ccyToSell}} equals {{convertAmount}} {{ccyToBuy}}</h4>
        </div>
    </div>
</template> 

<script>
import Vue from 'vue'

export default {
    data () {
        return {
          students: [],
          surname: "Please, input your name",
          student:{name:"",group:"",mark:"", isDonePr: false},
          EditId: 0,
          DataExchange: [],
          amount: 0,
          ccyToSell: '',
          ccyToBuy: '',
          convertAmount: 0
        }
    },
    mounted: function() {
        console.log(this);
        Vue.axios.get("http://46.101.212.195:3000/students").then((response) => {
            console.log(response.data)
            this.students = response.data;
        })
    },
    methods:{
        deleteStud: function(id) {
            Vue.axios.delete("http://46.101.212.195:3000/students/" + id)
        },
        pushStudent: function(){
            Vue.axios.post("http://46.101.212.195:3000/students",this.student)
            .then((response) => {
                console.log(response.data)
            })
        },
        FoudId: function(id){
            this.EditId = id;
        },
        SaveEdit: function(id){
            let EditStudent = this.students.find((element) => {
                return element._id == id;
            });

            Vue.axios.put("http://46.101.212.195:3000/students/" + id, {
                name: EditStudent.name,
                group: EditStudent.group,
                mark: EditStudent.mark,
                isDonePr: false
            })
            .then((response) => {
                console.log(response.data)
            })
            this.EditId = 0;
        },
        convertCurrency:function(){
            var action, ccy;

            if(this.ccyToBuy == 'UAN') {
                ccy = this.ccyToSell;
                action = 'buy'
            }
            else if(this.ccyToSell == 'UAN') {
                ccy = this.ccyToBuy;
                action = 'sell'
            }
            else alert('Choose UAN')

            Vue.axios.get("https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11").then((response) => {
                console.log(response.data);
                this.DataExchange = response.data;
                let rightDataExchange = this.DataExchange.find((element) => {
                    return element.ccy == ccy;
                })

                console.log(rightDataExchange)
                if(action == 'buy')
                    this.convertAmount = this.amount * rightDataExchange.buy
                else if(action == 'sell')
                    this.convertAmount = this.amount / rightDataExchange.sale
            })
        }
    }
}
</script>