import { StatusBar } from 'expo-status-bar';
import { Alert } from 'react-native';
import * as Location from 'expo-location';
import Loading from './Loading/Loading';
import React from 'react';
import axios from 'axios';

const API_KEY = '14d05b7e1661f79403a692d0c8d858c7'

export default class extends React.Component {

  state =  {
    isLoading: true
  }

  getWeather = async(latitude,longitude) => {
     const {data} = axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`)
  }

  getLocation = async (latitude,longitude) => {
    try{
      const response =  await Location.requestPermissionsAsync();
      const {coords: {latitude, longitude}} = await Location.getCurrentPositionAsync();
      this.getWeather(latitude,longitude)
      this.setState({isLoading:false})  
    }catch(error){
      Alert.alert("Не могу определить где находиться ваше устройство  "); 
    }
  }

  componentDidMount(){
    this.getLocation();
  }

  render() { 
    const {isLoading} = this.state
    return (
       isLoading? <Loading/> : null
    );
  }
}