import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: { // исправлено: conteiner -> container
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  halfContainer: { // исправлено: helfConteiner -> halfContainer
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  temp: {
    fontSize: 42,
    color: 'white',
  },
  title:{
    color: 'white',
    fontSize: 44,
    fontWeight: '300',
    marginBottom: 10
  },
  subtitle:{
    color: 'white',
    fontWeight: "600",
    fontSize:24
  },
  textConainer:{
    paddingHorizontal: 20,
    alignItems: 'flex-start'
  }
});
