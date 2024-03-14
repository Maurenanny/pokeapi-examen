<template>
  <div
    :class="{ modal: true, 'bd-example-modal-lg': true, show: showModal }"
    tabindex="-1"
    role="dialog"
  ></div>

  <div class="p-4">
    <div class="sectionunit">
      <h2 style="float: left; margin: 8px 4px">Datos de POKEMON DE LA BASE</h2>
    </div>
    <table
      responsive
      style="width: 100%"
      class="table table-hover overflow: scroll;"
    >
      <thead class="table-dark">
        <tr>
          <th scope="col" style="width: 200px">NOMBRE</th>
          <th scope="col" style="width: 200px">weight</th>
          <th scope="col" style="width: 200px">HEIGHT</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(poke, index) in pokemons" :key="index">
          <td>{{ poke.name }}</td>
          <td>{{ poke.height }}</td>
          <td>{{ poke.weight }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
//Agregar Dependencias
import Vue from "vue";
import { defineComponent } from "vue";
import axios from "axios";
import { GmapMap, GmapMarker } from "@fawmi/vue-google-maps";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";
import { EntityPokemon } from "../../entities/entityPokemon";
import { PokemonController } from "../pokemon.controller";

export default defineComponent({
  //Definir Variables de Uso
  data() {
    return {
      pokemons: [],
      pokemonsevolutions: [],
      nombrepokemon: "",
      pokemon: {
        name: "",
        height: 0,
        weight: 0,
        pokemonclave: 0,
      } as EntityPokemon,
      showModal: false,
    };
  },
  mounted() {
    //Ejecutar Cuando se cargue la Vista
    this.fetchData();
  },
  methods: {
    openAdd() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    async fetchData() {
      //Estructura de Peticion
      const url = "http://localhost:8080/pokemon";

      try {
        const response = await axios.get(url);
        //Asignar Datos
        this.pokemons = response.data;
        console.log("datos BD", response);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    },
  },
  setup() {},
});
</script>

<style scoped>
/* Estilos específicos del componente si es necesario */
.modal {
  display: none;
}
.show {
  display: block;
}

.sectionunit {
  margin-bottom: 3%;
}

/* Estilos opcionales para la tabla */
.table {
  width: 100%;
  border-collapse: collapse;
}

.table th,
.table td {
  border: 1px solid #ccc;
  padding: 8px;
}

.table th {
  background-color: #f2f2f2;
}
</style>