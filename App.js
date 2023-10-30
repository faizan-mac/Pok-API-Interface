import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, ScrollView, View, FlatList, Image, Button, TextInput, LogBox } from 'react-native';
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid'

export default function App() {
  const [data, setData] = useState([]);
  const [text, setText] = useState("")

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, [])

  const getPokemon = async function () {
    let response
    if (text == "") { response = await fetch("https://pokeapi.co/api/v2/pokemon/1") }
    else { response = await fetch("https://pokeapi.co/api/v2/pokemon/" + text.toLowerCase()) }

    let json = await response.json()
    data.push({
      image: json.sprites.front_default,
      name: json.name,
      id: uuidv4()
    })
    setData(data)
    setText("")
  }

  return (
    <ScrollView>
      <View style={styles.container}>

        <Image source={{ uri: "https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png" }}
          style={{ height: 103, width: 257, margin: 25 }} />

        <Text style={{ fontSize: 16 }}>Enter an ID (1 - 1017) or Pokemon name</Text>

        <View style={styles.row}>
          <Button onPress={getPokemon} title="Fetch" color="royalblue"></Button>
          <View style={styles.space} />
          <Button onPress={() => { setData([]), setText("") }} title="Clear" color="grey"></Button>
        </View>

        <TextInput style={{ borderWidth: 1, width: 160 }}
          value={text}
          onChangeText={(current_text) => setText(current_text)} />

        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Image source={{ uri: item.image }}
            style={{ height: 120, width: 120 }} />} />

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  }, row: {
    flexDirection: "row",
    padding: 20,
  }, space: {
    width: 15,
  },
});
