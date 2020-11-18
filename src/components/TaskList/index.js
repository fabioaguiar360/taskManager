import React, { version } from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

export default function TaskList({data, deleteTask}){

    return(
        <Animatable.View
          style={styles.container}
          animation="bounceIn"
          useNativeDriver 
          >
            <TouchableOpacity onPress={ () => deleteTask(data) }>
                <Ionicons name="md-checkmark-circle" size={30} color={'#04BFBF'}/>
            </TouchableOpacity>
            <View>
              <Text style={styles.text}>{data.task}</Text>
            </View>
            
        </Animatable.View>
    )

}

const styles = StyleSheet.create({
  container: {
      flex:1,
      margin: 8,
      flexDirection: 'row',
      backgroundColor: '#FFF',
      color: '#000',
      alignItems: 'center',
      padding: 10,
      elevation: 1.5,
      borderRadius: 10,
      shadowColor: '#000',
      shadowOpacity: 0.2,
      textShadowOffset: {
          width: 1,
          height: 3
      }
  },
  text: {
    fontSize: 15,
    paddingLeft: 10
  }
});