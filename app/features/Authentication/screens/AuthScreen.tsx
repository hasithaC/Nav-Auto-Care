import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import * as RootNavigation from '../../../navigation/RootNavigation';

const AuthScreen = () => {
  return (
    <View>
      <Text onPress={()=>{
         RootNavigation.replace('ExploreScreen');
      }}>AuthScreen</Text>
    </View>
  )
}

export default AuthScreen

const styles = StyleSheet.create({})