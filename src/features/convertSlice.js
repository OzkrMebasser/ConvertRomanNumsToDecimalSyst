import { createSlice } from '@reduxjs/toolkit'

class HashTable {
  constructor(size) {
    this.data = new Array(size);
  }

  _hash(key) {
    let hash = 0;

    if (key) {
      for (let i = 0; i < key.length; ++i) {
        hash = (hash + key.charCodeAt(i) + i) % this.data.length;
      }
      return hash;
    }
  }

  set(key, value) {
    const index = this._hash(key);
    this.data[index] = [key, value];
  }

  toDecimal(romanNumber) {
    const roman = romanNumber.toUpperCase()
    let decimalNumber = 0;

    for (let i = 0; i < roman.length; i++) {
      const currentIndex = this._hash(roman[i]);
      const nextIndex = this._hash(roman[i + 1]);
      const currentValue = this.data[currentIndex][1];
      const nextValue = nextIndex ? this.data[nextIndex][1] : undefined;

      if (nextValue === undefined) {
        decimalNumber += currentValue;
        continue;
      }
      if (currentValue >= nextValue) {
        decimalNumber += currentValue;
        continue;
      }
      decimalNumber -= currentValue;
    }
    return decimalNumber;
  }

  toRoman = (decimal) => {
    const data = {
      M: 1000,
      CM: 900,
      D: 500,
      CD: 400,
      C: 100,
      XC: 90,
      L: 50,
      XL: 40,
      X: 10,
      IX: 9,
      V: 5,
      IV: 4,
      I: 1,
    };
    let roman = '';

    for (let key in data) {
      roman += key.repeat(Math.floor(decimal / data[key]));
      decimal %= data[key];
    }

    return roman;
  };
}

const myHashTable = new HashTable(100);
myHashTable.set("M", 1000);
myHashTable.set("CM", 900);
myHashTable.set("D", 500);
myHashTable.set("CD", 400);
myHashTable.set("C", 100);
myHashTable.set("XC", 90);
myHashTable.set("L", 50);
myHashTable.set("XL", 40);
myHashTable.set("X", 10);
myHashTable.set("IX", 9);
myHashTable.set("V", 5);
myHashTable.set("IV", 4);
myHashTable.set("I", 1);

export const convertSlice = createSlice({
  name: 'convert',
  initialState: {
    value: '',
  },
  reducers: {
    romanToDecimal: (state, actions) => {
      state.value = myHashTable.toDecimal(actions.payload);
    },
    decimalToRoman: (state, actions) => {
      state.value = myHashTable.toRoman(actions.payload);
    }
  },
})

export const { romanToDecimal, decimalToRoman } = convertSlice.actions

export default convertSlice.reducer





























