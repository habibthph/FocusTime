import React, {useState} from 'react';
import { View, StyleSheet,Text, Platform, Vibration } from 'react-native';
 import {ProgressBar} from "react-native-paper";
// import {RoundedButton} from "../../components/RoundedButton"
import { spacing} from '../../utils/sizes';
import {colors} from '../../utils/colors';
import {CountDown} from '../../components/CountDown';
import {RoundedButton} from '../../components/RoundedButton'
import {Timing} from './Timing'
import {useKeepAwake} from 'expo-keep-awake';

const DEFAULT_TIME = 0.1;
export const Timer = ({focusSubject, onTimerEnd, clearSubject}) => {

  useKeepAwake();

  const interval = React.useRef(null);
  const [minutes, setMinutes] = useState(DEFAULT_TIME);
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);

  const onProgress = (progress) =>
  {
    setProgress(progress);
  };

const vibrate = () => {
  if(Platform.OS === 'ios')
  {
    const interval = setInterval(()=> Vibration.vibrate(), 1000);
    setTimeout(() => clearInterval(interval), 10000);
  }
  else
  {
    Vibration.vibrate('10s');
  }
};
  const onEnd = () =>
  {
    vibrate();
    setMinutes(DEFAULT_TIME);
    setProgress(1);
    setIsStarted(false);
    onTimerEnd();
  };
  
  const changeTime = (min) =>
  {
    setMinutes(min);
    setProgress(1);
    setIsStarted(false);
  };
  
  return(
  <View style={styles.container}>
    <View style={styles.countdown}>
    <CountDown minutes={minutes} isPaused={!isStarted} onProgress={onProgress} onEnd={onEnd} />
    </View>
    <View style={{paddingTop: spacing.xxl}}>
      <Text style={styles.title}>Focusing on:</Text>
      <Text style={styles.task}>{focusSubject}</Text>
   </View>
   <View style={{paddingTop:spacing.sm}}>
    <ProgressBar 
    progress={progress}
    color='#5e84e2'
    style={{height:10}} />
   </View>
   <View style={styles.buttonWrapper}>
    <Timing style={styles.buttonWrapper} onchangeTime={changeTime} />
   </View>
   <View style={styles.buttonWrapper}>
   {isStarted ? 
   (<RoundedButton title="Pause" onPress={() => setIsStarted(false)} />) 
   : (<RoundedButton title="Start" onPress={() => setIsStarted(true)} />)
   }
   </View>
      <View style={styles.clearSubject}>
    <RoundedButton size={50} title="-" onPress={() => clearSubject()} />
   </View>
  </View> 
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title:
  {
    color: colors.white,
    textAlign: 'center',
  },
    task:
  {
    color: colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  countdown:
  {
    flex: 0.5,
    alignItems:"center",
    justifyContent: "center",

  },
  buttonWrapper:{
    flex:0.3,
    flexDirection:'row',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearSubject:{
    paddingBottom:25,
    paddingLeft:25,
  }
});
