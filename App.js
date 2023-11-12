import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  StatusBar,
  ActivityIndicator,
  Button,
} from 'react-native'
import CoinItem from './components/CoinItem'

const App = () => {
  const [coins, setCoins] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [refreshing, setRefreshing] = useState(false)

  const reloadScreen = async () => {
    setLoading(true)
    setError(null)
    await loadData()
    setLoading(false)
  }

  const loadData = async () => {
    try {
      const resp = await fetch(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd'
      )
      const data = await resp.json()
      setCoins(data)
    } catch (error) {
      setError('Error fetching. Comeback later', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  useEffect(() => {
    if (refreshing) {
      loadData()
      setRefreshing(false)
    }
  }, [refreshing])

  if (loading) {
    return (
      <View style={style.containerLoading}>
        <Text style={style.titleLoading}>EdgEckoin</Text>
        <ActivityIndicator color={'#fff'} size={50} />
      </View>
    )
  }

  if (error) {
    return (
      <View style={style.containerLoading}>
        <Text style={style.titleLoading}>EdgEckoin</Text>
        <Text style={style.error}>{error}</Text>
        <Button title="Reload" onPress={reloadScreen} />
      </View>
    )
  }

  return (
    <View style={style.container}>
      <StatusBar backgroundColor={'#141414'} />
      <View>
        <Text style={style.title}>Cripto EdgEckoin</Text>
        <TextInput
          onChangeText={(text) => setSearch(text.toLowerCase())}
          style={style.searchInput}
          placeholder="Search"
          placeholderTextColor={'#fff'}
        />
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        refreshing={refreshing}
        onRefresh={() => setRefreshing(true)}
        style={style.list}
        data={coins.filter(
          (coin) =>
            coin.name.toLowerCase().includes(search) ||
            coin.symbol.toLowerCase().includes(search)
        )}
        renderItem={({ item }) => {
          return <CoinItem coin={item} />
        }}
        ListEmptyComponent={() => (
          <View style={style.container}>
            <Text style={{ color: '#fff', marginTop: '50%' }}>
              No data found
            </Text>
          </View>
        )}
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
  containerLoading: {
    backgroundColor: '#141414',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  title: {
    color: '#fff',
    marginTop: 15,
    fontSize: 20,
    textTransform: 'uppercase',
  },
  titleLoading: {
    color: '#fff',
    marginBottom: 30,
    fontSize: 40,
    textTransform: 'uppercase',
  },
  list: {
    width: '90%',
  },
  searchInput: {
    height: 50,
    color: '#fff',
    borderBottomColor: '#4657CE',
    borderBottomWidth: 1,
    textAlign: 'center',
  },
  error: {
    color: '#f00',
  },
})

export default App
