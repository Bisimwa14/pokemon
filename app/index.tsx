import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { PokemonType } from "../types/pokemon";

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
        data.results.map(async (pokemon: any) => {
          const res = await fetch(pokemon.url);
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
  console.log("pokemmons", pokemmons);
  return (
    <ScrollView>
      {pokemmons.map((pokemon) => (
        <View key={pokemon?.name} style={styles.wrapper}>
          <Text style={styles.name}>{pokemon?.name}</Text>
          <Text>{pokemon?.img}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});
