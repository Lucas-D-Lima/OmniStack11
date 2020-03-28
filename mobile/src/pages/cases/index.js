import React, {useState, useEffect} from 'react'
import {View, Image, Text, TouchableOpacity, FlatList} from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useNaigation } from '@react-navigation/native'

import logoImg from '../../assets/logo.png'
import Intl from 'intl'

import api from '../../servises/api'

import styles from './styles'

export default function Cases(){
  const [cases, setCases] = useState([])
  const navigation = useNaigation()
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [total, setTotal] = useState(0)

  function NavigateToDetelhes(cases){
    navigation.navigate('Detalhes', {cases})
  }

  async function loadCases(){
    if(loading){
      return
    }
    if(total > 0 && cases.length === total){
      return
    }
    setLoading(true)
    const response = await api.get('cases', {
      params:{page}
    })
    setLoading(false)
    setCases([...cases, ...response.data])
    setPage(page+1)
    setTotal(response.headers['x-total-count'])
  }

  useEffect(()=>{
    loadCases()
  })

  return(
    <View style={styles.container} >
      <View style={styles.header}> 
        <Image source={logoImg}/>
        <Text style={styles.headerText}>
          Total de <Text style={styles.headerTextBold}>{total} casos</Text>.
        </Text>
        <Text style={styles.title}> Seja Bem-vindo </Text>
        <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia</Text>
      </View>

      <FlatList style={styles.casesList}
      keyExtractor={cases => String(cases.id)}
      showsVerticalScrollIndicator={false}
      onEndReached={loadCases}
      onEndReachedThreshold={0.2}
      data={[cases]}
      renderItem={({ item: cases })=>(
        <View style={styles.cases}>
          <Text style={styles.casesProperyt}>ONG:</Text>
          <Text style={styles.casesValue}>{cases.name}</Text>

          <Text style={styles.casesProperyt}>Caso:</Text>
          <Text style={styles.casesValue}>{cases.title}</Text>

          <Text style={styles.casesProperyt}>Valor:</Text>
          <Text style={styles.casesValue}>{Intl.NumberFormat('pt-BR', {style: 'currency', currency:'BRL'}).format(cases.value)}</Text>

          <TouchableOpacity 
          style={styles.detalhesButton} 
          onPress={()=> NavigateToDetelhes(cases) }>
          <Text style={styles.detalhesButtonText}>Ver mai detalhes</Text>
          <Feather name='arrow-right' size={16} color="#e02041"/>
           </TouchableOpacity>
        </View>
      )}
      />
    </View>
  )
}