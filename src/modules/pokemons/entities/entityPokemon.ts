import { Entity } from "@/kernel/types";

export type EntityPokemon =  Entity<number> &{
    id_pokemon:number,
    name:string,
    weight:number,
    height:number,
    pokemonclave:number
}