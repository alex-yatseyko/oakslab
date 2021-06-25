/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableWithoutFeedbackComponent,
  TouchableHighlight,
  useColorScheme,
  View,
} from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';

import { useHttp } from './hooks/http.hook'

import { Header } from './components/Header'
import { Checkbox } from './components/Checkbox'

import { Check } from './assets/Check'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Section: React.FC<{
  title: string,
  index: number,
  data: Array<string>,
  progress: Array<string>,
  ready: Function,
}> = ({ children, title, index, data, progress, ready }) => {
  const isDarkMode = useColorScheme() === 'dark';

  const [sectionDone, setSectionDone] = React.useState<boolean>(false)
  const [done, setDone] = React.useState<Array<string>>([])
  const [loading, setLoading] = React.useState<Boolean>(true)

  const storeData = async (title: string, value: string[]) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem(`${title}`, jsonValue)
    } catch (e) {
      // saving error
      console.log('Saving error', e)
    }
  }

  const getData = async (title: string) => {
    try {
      const value = await AsyncStorage.getItem(`${title}`)
      if(value !== null) {
        const jsonValue = JSON.parse(value)
        setDone(jsonValue)
      }
    } catch(e) {
      // error reading value
    }
  }

  React.useEffect(() => {
    getData(title)
    setLoading(false)
  }, [])


  React.useEffect(() => {
    storeData(title, done)

    if (done.length === data.length) {
      setSectionDone(true)
      ready(title)
    } else {
      setSectionDone(false)
    }
  }, [done])

  return (
    <View style={styles.sectionContainer}>
      {progress.length < index ? <View style={{ flex: 1, backgroundColor: 'transparent', width: '100%', height: '100%', position: 'absolute', zIndex: 999 }} /> : null}
      <View style={[styles.row, { justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }]}>
        <View style={[styles.row]}>
          <View style={styles.numberWrapper}>
            <Text style={styles.numberText}>{index + 1}</Text>
          </View>
          <Text
            style={[
              styles.sectionTitle,
              {
                color: isDarkMode ? Colors.white : Colors.black,
              },
            ]}>
            {title}
          </Text>
        </View>
        <Check style={{ fill: sectionDone ? '#030104' : Colors.white }} width={40} height={40} />
      </View>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
        {!loading ? data.map((i, index) => {
          return (
            <View key={index} style={styles.row}>
              <Checkbox
                checkedProp={done.includes(i)}
                title={i}
                handleClick={() => {
                  if (done.includes(i)) {
                    setDone(prev => prev.filter(item => item !== i))
                  } else {
                    setDone(prev => [...prev, i])
                  }
                }} />
            </View>
          )
        }):null}
      </Text>
    </View>
  );
};

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const [progress, setProgress] = React.useState<Array<string>>([])
  // const [progress, setProgress] = React.useState<Set>(new Set())
  const [fact, setFact] = React.useState()

  const { error, request } = useHttp()

  const getFact = async (error: null | string) => {
    try {
      const data = await request('https://uselessfacts.jsph.pl/random.json', 'GET')
      setFact(data.text)
    } catch (e) {
      console.error(e, error)
    }
  }
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1
  };

  const data: Object = {
    foundation: ['Setup virtual office', 'Set mission & vision', 'Select business name', 'Buy domains'],
    discovery: ['Create roadmap', 'Competitor analysis'],
    delivery: ['Release marketing website', 'Release MVP']
  }

  React.useEffect(() => {
    if (progress.length === Object.keys(data).length) {
      Alert.alert(fact)
    }
  }, [progress])

  React.useEffect(() => {
    getFact(error)
  }, [])

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}
        contentContainerStyle={{ margin: 40, padding: 20, backgroundColor: Colors.white, paddingVertical: 50 }}
      >
        <Header title="My startup progress" />
        {/* <TouchableHighlight onPress={() => clearAllData()}><Text>Clean</Text></TouchableHighlight> */}
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          {Object.keys(data).map((s, index) => {
            return (
              <View key={index}>
                <Section
                  title={s}
                  index={index}
                  data={Object.entries(data)[index][1]}
                  ready={(title: string) => {
                    if(progress.includes(title)) {
                      setProgress(prev => prev.filter(item => item !== title))
                    } else {
                      setProgress(prev => [...prev, title])
                    }
                  }}
                  progress={progress}
                />
              </View>
            )
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginLeft: 15,
    textTransform: 'capitalize',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  numberWrapper: {
    backgroundColor: Colors.black,
    borderRadius: 100,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  numberText: {
    color: Colors.white,
    fontSize: 24,
  }
});

export default App;
