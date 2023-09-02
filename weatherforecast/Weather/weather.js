import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { styles } from './style';
import * as Location from 'expo-location';

const weatherOptions = {
  Rain: {
    iconName: 'weather-lightning-rainy',
    gradient: ['#7F7FD5', '#86A8E7', '#91EAE4'],
    title: 'Дождь',
    subtitle: 'Не забудьте взять зонт!',
  },
  Snow: {
    iconName: 'snowflake',
    gradient: ['#BBD2C5', '#536976', '#292E49'],
    title: 'Снег',
    subtitle: 'Оденьтесь потеплее и наслаждайтесь зимой!',
  },
  Thunderstorm: {
    iconName: 'thunderstorm',
    gradient: ['#6A9113', '#141517'],
    title: 'Гроза',
    subtitle: 'Лучше остаться в помещении!',
  },
  Drizzle: {
    iconName: 'weather-partly-rainy',
    gradient: ['#2c3e50', '#3498db'],
    title: 'Морось',
    subtitle: 'Слабый дождь, но возьмите зонт на всякий случай',
  },
  Mist: {
    iconName: 'weather-fog',
    gradient: ['#3E5151', '#DECBA4'],
    title: 'Туман',
    subtitle: 'Осторожно на дорогах!',
  },
  Smoke: {
    iconName: 'weather-fog',
    gradient: ['#283048', '#859398'],
    title: 'Дым',
    subtitle: 'Лучше остаться в помещении и закрыть окна',
  },
  Haze: {
    iconName: 'weather-hazy',
    gradient: ['#3E5151', '#DECBA4'],
    title: 'Мгла',
    subtitle: 'Ограниченная видимость, будьте внимательны',
  },
  Clear: {
    iconName: 'weather-sunny',
    gradient: ['#FF7300', '#FEF253'],
    title: 'Ясно',
    subtitle: 'Прекрасный день для прогулки!',
  },
  Dust: {
    iconName: 'weather-windy',
    gradient: ['#4c669f', '#3b5998', '#192f6a'],
    title: 'Пыль',
    subtitle: 'Лучше остаться в помещении и закрыть окна',
  },
  Clouds: {
    iconName: 'weather-cloudy',
    gradient: ['#757F9A', '#D7DDE8'],
    title: 'Облачно',
    subtitle: 'Хмурый день, но может быть теплым',
  },
};

export default function Weather({ temp: initialTemp, condition: initialCondition }) {
  const [temp, setTemp] = useState(initialTemp);
  const [condition, setCondition] = useState(initialCondition);
  const [city, setCity] = useState('');

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = async () => {
    try {
      await Location.requestPermissionsAsync();
      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync();

      const location = await Location.reverseGeocodeAsync({ latitude, longitude });
      const city = location[0].city || '';
      setCity(city);
    } catch (error) {
      console.error('Помилка отримання місцезнаходження:', error);
    }
  };

  const { iconName, gradient, title, subtitle } = weatherOptions[condition] || {
    iconName: 'weather-cloudy',
    gradient: ['#4c669f', '#3b5998', '#192f6a'],
    title: 'Облачно',
    subtitle: 'Хмурый день, но может быть теплым',
  };

  return (
    <LinearGradient colors={gradient} style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.halfContainer}>
        <MaterialCommunityIcons name={iconName} size={96} color="white" />
        <Text style={styles.temp}>{temp}°</Text>
      </View>
      <View style={{ ...styles.halfContainer, ...styles.textContainer }}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
        <Text style={styles.city}>{city}</Text>
      </View>
    </LinearGradient>
  );
}

Weather.propTypes = {
  temp: PropTypes.number.isRequired,
  condition: PropTypes.oneOf([
    'Thunderstorm',
    'Drizzle',
    'Rain',
    'Snow',
    'Mist',
    'Smoke',
    'Haze',
    'Dust',
    'Clear',
    'Clouds',
  ]).isRequired,
};
