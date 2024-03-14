import { ResponseApi } from "@/kernel/types";
import { EntityPokemon } from "../entities/entityPokemon";
import { AddPokemonInteractor } from "../use-cases/add-pokemon.interactor";
import { GetPokemonInteractor } from "../use-cases/get-pokemon.interactor";
import { PokemonRepository } from "../use-cases/ports/pokemon.repository";
import { PokemonStorageGateway } from "./pokemon-storage.gateway";



export class PokemonController {

    async AddPokemon(pokemon: EntityPokemon) {
        try {

            const repository: PokemonRepository = new PokemonStorageGateway();
            const addPokemonInteractor: AddPokemonInteractor = new AddPokemonInteractor(repository);
            return await addPokemonInteractor.execute(pokemon);

        } catch (error) {
            console.log(error);
            return {
                status: 400,
                result: false
            }
        }
    }


    async getPokemons(pokemon: EntityPokemon) {

        const pokemonRepository: PokemonRepository = new PokemonStorageGateway();
        const pokemonInteractor: GetPokemonInteractor = new GetPokemonInteractor(pokemonRepository);

        try {

            const resp: ResponseApi<EntityPokemon> = await pokemonInteractor.execute(pokemon);
            return resp;
        } catch (error) {

            console.log(error);
            const resp: ResponseApi<EntityPokemon> = {
                status: 400,
                result: false
            };
            return resp;
        }
    }

}

