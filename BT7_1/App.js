/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Alert,
} from 'react-native';

import StockButton from './StockButton';
import API from './API';

const App = () => {
  const [stockName, setStockName] = useState('MSFT');
  const [stockIndex, setStockIndex] = useState('0.00');
  const [stockChangeRaw, setStockChangeRaw] = useState('+0.00');
  const [stockChangePercent, setStockChangePercent] = useState('+0.00');
  const [style, setStyle] = useState(styles.red);

  const changeIndex = (stockName, stockCode) => {
    API(stockCode).then((data) => {
      setStockName(stockName);
      setStockIndex(data.stockIndex);
      setStockChangeRaw(data.stockChangeRaw);
      setStockChangePercent(data.stockChangePercent);
    });
  };

  useEffect(() => {
    setStyle(styles.red);
    if (stockChangeRaw[0] == '+') {
      setStyle(styles.green);
    }
  }, [stockChangeRaw]);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.stockName}>{stockName}</Text>
          <Text style={styles.stockIndex}>{stockIndex}</Text>
          <Text style={[styles.stockChange, style]}>
            {stockChangeRaw} ({stockChangePercent})
          </Text>
        </View>
        <View style={styles.footer}>
          <StockButton name="MSFT" code="MSFT" onPress={changeIndex} />
          <StockButton name="TCS" code="TCS" onPress={changeIndex} />
          <StockButton name="INFY" code="INFY" onPress={changeIndex} />
          <StockButton name="TTM" code="TTM" onPress={changeIndex} />
          <StockButton name="Apple" code="AAPL" onPress={changeIndex} />
          <StockButton name="Google" code="GOOG" onPress={changeIndex} />
          <StockButton name="FB" code="FB" onPress={changeIndex} />
          <StockButton name="BABA" code="BABA" onPress={changeIndex} />
          <StockButton
            name="IPC MEXICO"
            code="INDEXBMV:ME"
            onPress={changeIndex}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  stockName: {fontSize: 40},
  stockIndex: {fontSize: 80},
  stockChange: {fontSize: 30},
  container: {
    flex: 1,
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  red: {
    color: 'red',
  },
  green: {
    color: 'green',
  },
});

export default App;
