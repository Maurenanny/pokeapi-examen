import { ResponseApi } from "@/kernel/types";
import { EntityPokemon } from "../entities/entityPokemon";
import { PokemonRepository } from "../use-cases/ports/pokemon.repository";
import axios, { AxiosResponse } from 'axios';

export class PokemonStorageGateway implements PokemonRepository {

   async addPokemon(pokemon: EntityPokemon): Promise<ResponseApi<EntityPokemon>> {
        const url = "http://localhost:8080/pokemon";
       
        try {
            //Ejecuta POST
            const response = await axios.post(url,pokemon);
            return {
                status: response.status,
                result: response.data,
            };
        } catch (error) {

            console.error("Error al realizar la solicitud:", error);
            return {
                status: 500,
                result: false,
            };
        }
    }

    async getPokemon(pokemon: EntityPokemon): Promise<ResponseApi<EntityPokemon>> {
        try {
            //Envios de Petición a Back
            const url = `http://localhost:8080/pokemon`;
            const response = await axios.post(url,pokemon);
            //Asignar Datos de respuesta
            return {
                status: response.status,
                entities: response.data,
                result: true
            };
        } catch (error) {
            // Manejo de Errores
            console.error("Error al realizar la solicitud:", error);
            return {
                status: 500,
                result: false,
            };
        }
    }


}