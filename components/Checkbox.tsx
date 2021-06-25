import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

import { Check } from '../assets/Check'
import { Colors } from 'react-native/Libraries/NewAppScreen';

export const Checkbox: React.FC<{ title: string, handleClick: Function, checkedProp: Boolean }> = ({ title, handleClick, checkedProp }) => {
  const [checked, setChecked] = React.useState(checkedProp)

  React.useEffect(() => {
    setChecked(checkedProp)
  }), []

  return (
    <View style={styles.checkboxWrapper}>
      <TouchableOpacity style={styles.checkboxBtn}
        onPress={() => {
          setChecked(prev => !prev)
          handleClick()
        }
        }
      >
        <View style={[styles.checkbox, { backgroundColor: checked ? '#434eac' : Colors.light }]}>
          {checked ?
            <Check style={{ fill: Colors.white }} width={15} height={15} /> : null}
        </View>
      </TouchableOpacity>
      <Text style={styles.checkboxTitle}>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  checkboxBtn: {
    width: 20,
    height: 20,
  },
  checkboxTitle: {
    paddingLeft: 9,
    fontWeight: '600',
    fontSize: 16
  },
  checkboxWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8
  }
})