import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, StyleSheet, TextInput, StatusBar } from 'react-native'
import CoinItem from './components/CoinItem'

const App = () => {

  const [coins, setCoins] = useState([])

  const loadData = async () => {
    const resp = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd')
    const data = await resp.json();

    setCoins(data)
  }

  useEffect( () => {
    loadData();
  }, []);

  return (
    <View style={style.container}>
      <StatusBar backgroundColor={'#141414'} />
      <View>
        <Text style={style.title}>Cripto EdgEckoin</Text>
        <TextInput
         style={style.searchInput} 
         placeholder='Search'
         placeholderTextColor={'#fff'}
        />
      </View>
      <FlatList 
        showsVerticalScrollIndicator={false}
        style={style.list}
        data={coins}
        renderItem={({item}) => {
          return <CoinItem coin={item} />
        }}
      />
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    backgroundColor: '#141414',
    alignItems: 'center',
    flex: 1,
  },
  title: {
    color: '#fff',
    marginTop: 5,
    fontSize: 20,
    textTransform: 'uppercase'
  },
  list: {
    width: '90%'
  },
  searchInput: {
    height: 50,
    color: '#fff',
    borderBottomColor: '#4657CE',
    borderBottomWidth: 1,
    textAlign: 'center'
  }
})

export default App