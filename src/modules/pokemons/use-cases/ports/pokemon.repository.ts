import { ResponseApi } from "@/kernel/types";
import { EntityPokemon } from "../../entities/entityPokemon";



export interface PokemonRepository {
    addPokemon(pokemon:EntityPokemon): Promise<ResponseApi<EntityPokemon>>;
    getPokemon(pokemon:EntityPokemon):Promise<ResponseApi<EntityPokemon>>;
    
    
}