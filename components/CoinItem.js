import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'

const CoinItem = ({ coin }) => {
  return (
    <View style={style.containerItem}>
      <View style={style.coinName}>
        <Image style={style.image} source={{ uri: coin.image }} />
        <View style={style.containerName}>
          <Text style={style.text}>{coin.name}</Text>
          <Text style={style.textSymbol}>{coin.symbol}</Text>
        </View>
      </View>
      <View>
        <Text style={style.currentPrice}>${coin.current_price}</Text>
        <Text style={[style.price24h, coin.price_change_percentage_24h > 0 ? style.priceUp : style.priceDown]}>{coin.price_change_percentage_24h}</Text>
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  containerItem: {
    backgroundColor: '#121212',
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  containerName: {
    marginLeft: 10,
  },
  image: {
    width: 30,
    height: 30,
  },
  coinName: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  currentPrice: {
    color: '#fff',
    textAlign: 'right'
  },
  price24h: {
    textAlign: 'right',
  },
  priceUp: {
    color: '#0f0',
  },
  priceDown: {
    color: '#f00'
  },
  text: {
    color: '#fff',
  },
  textSymbol: {
    color: '#777',
    textTransform: 'uppercase',
  }
})

export default CoinItem
