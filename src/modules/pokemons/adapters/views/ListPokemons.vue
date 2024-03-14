<template>
  <div :class="{ modal: true, 'bd-example-modal-lg': true, show: showModal }" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content" id="DocumentPrint">
        <div class="modal-header" style="background: #1e1e1e; color: white">
          <h5 class="modal-title" id="TitleModalAdd">Pokedex</h5>
          <button type="button" class="close" @click="closeModal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body col-md-12" id="BodyModalAdd">
          <form @submit.prevent="submitForm">
            <div class="mb-4 m-4">
              <label for="idgps">NOMBRE:</label>
              <input v-model="pokemon.name" type="text" id="idgps" required />

              <label for="brand">HEIGHT:</label>
              <input v-model="pokemon.height" type="number" id="brand" required />
            </div>
            <br />
            <div class="mb-3">
              <label for="model">weight:</label>
              <input v-model="pokemon.weight" type="number" id="model" required />

              <label for="plate">clave pokemon:</label>
              <input v-model="pokemon.id_pokemon" type="text" id="plate" required />
            </div>
            <button style="float: right; margin: 8px 4px" class="btn btn-outline-success" type="submit">
              Guardar Datos
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>

  <div class="input-group mb-3">
    <input type="text" class="form-control" v-model="nombrePokemon" placeholder="Buscar Pokémon por nombre" />
    <button class="btn btn-primary" @click="buscarPokemon">Buscar</button>
  </div>

  <div class="p-4">
    <div class="sectionunit">
      <h2 style="float: left; margin: 8px 4px">Datos de POKEMON</h2>
      <button style="float: right; margin: 8px 4px" type="button" class="btn btn-outline-dark" @click="openAdd">
        Guardar Datos
      </button>
    </div>
    <br />
    <br />

    <table responsive style="width: 100%" class="table table-hover overflow: scroll;">
      <thead class="table-dark">
        <tr>
          <th scope="col" style="width: 200px">NOMBRE</th>
          <th scope="col" style="width: 200px">weight</th>
          <th scope="col" style="width: 200px">HEIGHT</th>
          <th scope="col" style="width: 200px">ID POKEMON</th>
        </tr>
      </thead>
      <tbody>
        <td>
          {{ pokemon.name }}
        </td>
        <td>
          {{ pokemon.weight }}
        </td>
        <td>
          {{ pokemon.height }}
        </td>
        <td>
          {{ pokemon.id_pokemon }}
        </td>
      </tbody>
    </table>

    <div>
      <h2>Evoluciones</h2>
      <table class="table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              {{evolves_from_species.name}}
            </td>
            <td>
              {{evolves_from_species.url}}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
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
      evolves_from_species: {
        name: "",
        url: ""
      },
      pokemons: [],
      pokemonsevolutions: [],
      nombrePokemon: "",
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
    //Función de Registro de Datos
    async submitForm() {
      const controller = new PokemonController();
      //Envio de Petición
      const resp = await controller.AddPokemon(this.pokemon);
      if (resp.result) {
        this.showModal = false;
        Swal.fire({
          title: "¡Registro Éxitoso!",
          text: "Se ha Guardado en la Base de datos",
          icon: "success",
          confirmButtonText: "OK",
        });
      } else {
        Swal.fire({
          title: "¡Atención!",
          text: "Error al guardar",
          icon: "warning",
          confirmButtonText: "OK",
        });
      }
    },
    openAdd() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    async fetchData() {
      //Estructura de Peticion
      const url = "https://pokeapi.co/api/v2/pokemon/pikachu";

      try {
        const response = await axios.get(url);
        //Asignar Datos
        this.pokemons = response.data;
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    },
    async buscarPokemon() {
      //Estructura de Peticion
      const url = "https://pokeapi.co/api/v2/pokemon/" + this.nombrePokemon;
      console.log("variable de nombrepokemon", this.nombrePokemon)

      try {
        const response = await axios.get(url);
        //Asignar Datos
        this.pokemons = response.data;
        console.log(response.data.height)
        console.log(response.data.weight)

        this.pokemon.height = response.data.height;
        this.pokemon.weight = response.data.weight;
        this.pokemon.name = response.data.name;
        this.pokemon.id_pokemon = response.data.id;

        console.log(this.pokemons);
        //OBTENER EVOLUCION
        const urlevolution = response.data.species.url;
        const responseevolution = await axios.get(urlevolution);
        //Asignar Datos

        //OBTENER DATOS COMPLETOS DE LA EVOLUCION
        const urlevolutionall = responseevolution.data.evolution_chain.url;
        const responseevolutionall = await axios.get(urlevolutionall);
          this.evolves_from_species.name = responseevolutionall.data.chain.evolves_to[0].evolves_to[0].species.name;
          this.evolves_from_species.url = responseevolutionall.data.chain.evolves_to[0].evolves_to[0].species.url;
       
        console.log(responseevolutionall.data);
        console.log(responseevolutionall.data.chain.evolves_to[0].evolves_to[0].species.name);
        console.log(responseevolutionall.data.chain.evolves_to[0].evolves_to[0].species.url);

        //Asignar Datos
        //  this.pokemonsevolutions = responseevolution.data;
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    },
  },
  setup() { },
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
  border: 1px solid #000000;
  padding: 8px;
}

.table th {
  background-color: #f2f2f2;
}
</style>