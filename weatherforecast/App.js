import { Alert } from 'react-native';
import * as Location from 'expo-location';
import Loading from './Loading/Loading';
import Weather from './Weather/weather';
import React from 'react';
import axios from 'axios';

const API_KEY = '14d05b7e1661f79403a692d0c8d858c7';

export default class App extends React.Component {
  state = {
    isLoading: true,
  };

  getWeather = async (latitude, longitude) => {
    try {
      const { data: { main: { temp }, weather } } = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
      );
      this.setState({
        isLoading: false,
        temp: temp,
        condition: weather[0].main, // Замість condation -> condition
      });
    } catch (error) {
      Alert.alert('Помилка під час отримання даних погоди');
      this.setState({ isLoading: false });
    }
  };

  getLocation = async () => {
    try {
      await Location.requestPermissionsAsync();
      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync();
      this.getWeather(latitude, longitude);
    } catch (error) {
      Alert.alert('Не вдалося визначити ваше розташування');
      this.setState({ isLoading: false });
    }
  };

  componentDidMount() {
    this.getLocation();
  }

  render() {
    const { isLoading, temp, condition } = this.state;
    return isLoading ? <Loading /> : <Weather temp={Math.round(temp)} condition={condition} />;
  }
}
