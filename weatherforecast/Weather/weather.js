import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StatusBar } from 'react-native';
import { styles } from './style';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const weatherOptions = {
  Rain: {
    iconName: 'weather-lightning-rainy',
    gradient: ['#70333E', '#221B30'],
    title: 'Дождь',
    subtitle: 'Не забудьте взять зонт!',
  },
  Snow: {
    iconName: 'snowflake',
    gradient: ['#17EBE0', '#4B1DF5'],
    title: 'Снег',
    subtitle: 'Оденьтесь потеплее и наслаждайтесь зимой!',
  },
  Thunderstorm: {
    iconName: 'thunderstorm',
    gradient: ['#4c669f', '#3b5998', '#192f6a'],
    title: 'Гроза',
    subtitle: 'Лучше остаться в помещении!',
  },
  Drizzle: {
    iconName: 'weather-partly-rainy',
    gradient: ['#4c669f', '#3b5998', '#192f6a'],
    title: 'Морось',
    subtitle: 'Слабый дождь, но возьмите зонт на всякий случай',
  },
  Mist: {
    iconName: 'weather-fog',
    gradient: ['#4c669f', '#3b5998', '#192f6a'],
    title: 'Туман',
    subtitle: 'Осторожно на дорогах!',
  },
  Smoke: {
    iconName: 'weather-fog',
    gradient: ['#4c669f', '#3b5998', '#192f6a'],
    title: 'Дым',
    subtitle: 'Лучше остаться в помещении и закрыть окна',
  },
  Haze: {
    iconName: 'weather-hazy',
    gradient: ['#4c669f', '#3b5998', '#192f6a'],
    title: 'Мгла',
    subtitle: 'Ограниченная видимость, будьте внимательны',
  },
  Clear: {
    iconName: 'weather-sunny',
    gradient: ['#4c669f', '#3b5998', '#192f6a'],
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
    gradient: ['#4c669f', '#3b5998', '#192f6a'],
    title: 'Облачно',
    subtitle: 'Хмурый день, но может быть теплым',
  },
};

export default function Weather({ temp, condition }) {
  const { iconName, gradient, title, subtitle } = weatherOptions[ condition] || {
    iconName: 'weather-cloudy',
    gradient: ['#4c669f', '#3b5998', '#192f6a'],
    title: 'Облачно',
    subtitle: 'Хмурый день, но может быть теплым',
  };

  return (
    <LinearGradient
      colors={gradient}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" />
      <View style={styles.halfContainer}>
        <MaterialCommunityIcons name={iconName} size={96} color="white" />
        <Text style={styles.temp}>{temp}°</Text>
      </View>
      <View style={{...styles.halfContainer, ...styles.textContainer}}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
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

