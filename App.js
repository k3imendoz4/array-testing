/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  SafeAreaView,
  Alert,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

const data = [
  {
    id: 1,
    name: 'mis datos',
    items: [
      {id: 1, name: 'elemento1'},
      {id: 2, name: 'elemento2'},
    ],
  },
];

const Section = ({children, title}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App = () => {
  const [person, setPerson] = useState(data);
  const [newElements, setNewElements] = useState([]);
  const isDarkMode = useColorScheme() === 'dark';

  const copyElements = () => {
    if (person.length >= 2)
      return Alert.alert(
        'Error copiando',
        'Solo se permiten 2 elementos en el array',
      );
    const newPerson = [...person, ...data].map((p, idx) => ({
      ...p,
      id: idx + 1,
    }));
    setPerson([...newPerson]);
  };

  function addElements() {
    if (person.length < 2)
      return Alert.alert(
        'Error agregando',
        'Debes agregar primero elementos, has clic sobre el boton "Copiar elemento" ',
      );
    if (newElements.length > 0)
      return Alert.alert(
        'Error agregando',
        'Ya agregaste un nuevo item, no puedes agregar mas',
      );
    let newItems = person.find(p => p.id === 2)?.items;
    newItems = [
      ...newItems,
      {
        id: 3,
        name: 'elemento3',
      },
    ];
    const elements = person.map(p => {
      if (p.id !== 2) return p;
      p.items = [...newItems];
      return p;
    });

    setNewElements([...elements]);
  }

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="1. Copiar el primer elemento y agregarlo como uno nuevo al final">
            {person.length > 1 && JSON.stringify(person)}
          </Section>
          <View style={{paddingVertical: 20, paddingHorizontal: 20}}>
            <Button title="Copiar elemento" onPress={() => copyElements()} />
          </View>
        </View>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="2. Añadir un elemento a los items del elemento 2">
            {newElements.length > 0 && JSON.stringify(newElements)}
          </Section>
          <View style={{paddingVertical: 20, paddingHorizontal: 20}}>
            <Button title="Añadir elemento" onPress={addElements} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 10,
  },
  sectionTitle: {
    fontSize: 12,
    textAlign: 'auto',
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
