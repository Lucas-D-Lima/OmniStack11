import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'

const AppStack = createStackNavigator()

import cases from './pages/cases'
import detalhes from './pages/detalhes'

export default function Routes(){
  return(
    <NavigationContainer>
      <AppStack.Navigator screenOpition={ {headerShowm: false}} >
        <AppStack.Screen name="Cases" componente={cases}/>
        <AppStack.Screen name="Detalhes" componente={detalhes}/>
      </AppStack.Navigator>
    </NavigationContainer>
  )
}