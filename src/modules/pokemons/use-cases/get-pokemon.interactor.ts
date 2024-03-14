import { UseCase } from "@/kernel/contracts";
import { EntityPokemon } from "../entities/entityPokemon";
import { ResponseApi } from "@/kernel/types";
import { PokemonRepository } from "./ports/pokemon.repository";



export class GetPokemonInteractor implements UseCase<EntityPokemon, ResponseApi<EntityPokemon>>{

    constructor(private readonly pokemonRepository:PokemonRepository){}

    execute(payload: EntityPokemon): Promise<ResponseApi<EntityPokemon>> {
        return this.pokemonRepository.getPokemon(payload);
    }

}