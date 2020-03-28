import React from 'react'
import {View, Image, Text, TouchableOpacity, Linking} from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useNavigation, useRoutes } from '@react-navigation/native'
import * as MailComposer from 'expo-mail-composer'
import Intl from 'intl'

import styles from './styles'

import logoImg from '../../assets/logo.png'

export default function Detalhes(){
  const route = useRoutes()
  const navigation = useNavigation()
  const mensagem = `Ola, ${cases.name}, estou entrando em contato posis gostaria de ajudar no caso "${cases.title}" com o valor de ${Intl.NumberFormat('pt-BR', {style: 'currency', currency:'BRL'}).format(cases.value)}`

  const cases = route.params.cases
  function navBack(){
    navigation.goBack()
  }
  function sendMail(){
    MailComposer.composeAsync({
      subject: `Heroi do caso : ${cases.title}`,
      recepients: [cases.email],
      body: mensagem
    })
  }
  function sendWPP(){
    Linking.openURL(`whatsapp://send?phone=${cases.whatsapp}&text=${mensagem}`)
  }

  return(
    <View style={styles.container}>
    <View style={styles.header}> 
        <Image source={logoImg}/>
        <Text style={styles.headerText}>
          Total de <Text style={styles.headerTextBold}>0 casos</Text>.
        </Text>
        <TouchableOpacity onPress={navBack}>
          <Feather name='arrow-left' size={28} color='#e02041'/>
        </TouchableOpacity>
      </View>
      <View style={styles.cases}>
      <Text style={[styles.casesProperyt, {marginTop:0}]}>ONG:</Text>
        <Text style={styles.casesValue}>{cases.name} ONG de {cases.name}/{cases.uf}</Text>

        <Text style={styles.casesProperyt}>Caso:</Text>
        <Text style={styles.casesValue}>{cases.title}</Text>

        <Text style={styles.casesProperyt}>Valor:</Text>
        <Text style={styles.casesValue}>{Intl.NumberFormat('pt-BR', {style: 'currency', currency:'BRL'}).format(cases.value)} </Text>
      </View>

      <View style={styles.contat}>
        <Text style={styles.heroTitle}>Salve o dia</Text>
        <Text style={styles.heroTitle}>Seja o heroi desse caso</Text>

        <Text style={styles.description}>Entre em contato</Text>
        <View style={styles.actions}>
         <TouchableOpacity style={styles.action} onPress={sendWPP}> 
          <Text style={styles.actionText}> Whatsapp </Text>
         </TouchableOpacity>
         <TouchableOpacity style={styles.action} onPress={sendMail}> 
          <Text style={styles.actionText}> E-Mail </Text>
         </TouchableOpacity>
      </View>
      </View>
    </View>
  )
}