import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { PokemonType } from "./types/pokemon";

export default function Index() {
  const [pokemmons, setPokemons] = useState<PokemonType[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon/?limit=10",
      );
      const data = await response.json();
      // console.log(data);

      const detaildPokemons = await Promise.all(
        data.results.map(async (pokemon: PokemonType) => {
          const res = await fetch(pokemon.image);
          const dto = await res.json();
          return {
            name: pokemon.name,
            img: dto.sprites.front_default, //main sprite
          };
        }),
      );
      console.log(detaildPokemons);

      setPokemons(detaildPokemons);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  }
  return (
    <ScrollView>
      {pokemmons.map((pokemon) => (
        <View key={pokemon?.name}>
          <Text>{pokemon?.name}</Text>
          <Text>{pokemon?.image}</Text>
        </View>
      ))}
    </ScrollView>
  );
}
