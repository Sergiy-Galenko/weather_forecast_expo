import React from "react";
import { View, Text, StatusBar} from 'react-native'
import {styles}  from './style';


export default function Loading(){
    return (
    <View style = {styles.container}>
        <StatusBar barStyle="dark-content"/>
        <Text style = {styles.text}>Получение погоды...</Text>
    </View>) 
}