<template>
    <div>
        <p>Населений пункт:</p>
        <select v-on:change="getWarehouses" v-model="city">
            <option v-for="citty in cities" v-bind:key="citty.CityID" v-bind:value="citty.Description">{{citty.Description}}</option>
        </select>
        <br>
        <p>Відділення міста:</p>
        <select>
            <option v-for="warehous in warehouses" v-bind:key="warehous.SiteKey" v-bind:value="warehous.Description">{{warehous.Description}}</option>
        </select>
    </div>
</template>

<script>
import Vue from 'vue'

export default {
    data: function(){
        return{
            cities: [],
            warehouses: [],
            city: '',
        };
    },
    mounted:function(){
        Vue.axios.post("https://api.novaposhta.ua/v2.0/json/",
        {
            "modelName": "Address",
            "calledMethod": "getCities",
            "apiKey": "9a557481f95094531372a9d1b55222c8"  
        }).then((response) =>{
            this.cities = response.data.data;
        })
        //обращаемся к модулю адрес и объекту города
    },
    methods:{
        getWarehouses: function(){
            Vue.axios.post("https://api.novaposhta.ua/v2.0/json/",
            {
                "modelName": "AddressGeneral",
                "calledMethod": "getWarehouses",
                "methodProperties": 
                    {
                        "CityName": this.city
                    },
                "apiKey": "9a557481f95094531372a9d1b55222c8"
            }).then((response) => {
                this.warehouses = response.data.data;
            })
        }
    }
}
</script>