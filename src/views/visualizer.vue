<template>
  <div class="py-12 px-20 md:px-20 lg:px-56 space-y-10">
    <div class="flex flex-col text-4xl font-bold space-y-2 text-white items-center justify-center">
      <h1>Visualizador de Datos</h1>
      <h2 class="text-lg">Usted está viendo los datos del sensor</h2>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 justify-center gap-4">
      <div v-for="sensor in sensores" class="flex items-center justify-center">
        <CardContainer  :name-section="sensor.nameSensor"
                        :data-section="sensor.dataSensor"
                        :icon-name="sensor.nameIcon"
                        :text-info="sensor.info"
        />
      </div>
    </div>
  </div>
</template>
<script setup>

import CardContainer from "../components/component-data/cardDatacontainer.vue";
import mqtt from "mqtt";
import {ref} from 'vue'

const mqttClient = mqtt.connect("wss://1b4862a17ac4449284786a17829bceed.s1.eu.hivemq.cloud:8884/mqtt",
    {username: 'Sensores', password: 'Sensor123'})



mqttClient.on("error", (error) => {
  console.log(error);
  mqttClient.end();
});

mqttClient.on("connect", () => {
  console.log("MQTT client has connected.");
  mqttClient.subscribe(`contenedor1`, { qos: 0 });
});

mqttClient.on("close", () => {
  "MQTT client has been disconnected. Attempting to reconnect...";
  mqttClient.reconnect();
});

mqttClient.on("message", async function (topic, message) {
  //console.log(message.toString());
  //console.log(message.toString());
  let value = message.toString(); 

 
  
  // Verifica si el tópico corresponde al sensor esperado
  if (topic === "contenedor1") {
    pulsos.value = parseFloat(value); // Convierte el valor a número si es posible
    console.log(`pulsos actualizada: ${pulsos.value}°C`);
  } 
  if (topic === "contenedor2") {
    spo2.value = parseFloat(value); // Convierte el valor a número si es posible
    console.log(`spo2 actualizada: ${spo2.value}%`);
  } 
  if (topic === "contenedor3") {
    temp.value = parseFloat(value); // Convierte el valor a número si es posible
    console.log(`Humedad actualizada: ${temp.value}%`);
  } 

});
let pulsos = ref(0)
let spo2 = ref(0)
let temp = ref(0)


const sensores = [
  {
    id:1,
    nameSensor:'Frecuencia Cardiaca',
    dataSensor:pulsos,
    nameIcon:"fa-heartbeat",
    info: 'Frecuencia Cardiaca'
  },
  {
    id:2,
    nameSensor:'Nivel de Oxigeno(%)',
    dataSensor:spo2,
    nameIcon:"fa-tint",
    info: 'Nivel de oxigeno en la sangre'
  },
  {
    id:3,
    nameSensor:'Temperatura(C°)',
    dataSensor:temp,
    nameIcon:"fa-temperature-low",
    info: 'Sensor de temperatura'
  }

];
mqttClient.on("connect", () => {
  console.log("MQTT client connected");
  mqttClient.subscribe("contenedor1"); // Suscripción para temperatura
  mqttClient.subscribe("contenedor2");
  mqttClient.subscribe("contenedor3"); // Suscripción para humedad
});

</script>