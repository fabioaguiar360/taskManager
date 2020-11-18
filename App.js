import React, {useState, useCallback, useEffect} from 'react';
import { StyleSheet, Text, View, SafeAreaView, 
         TextInput, StatusBar,  TouchableOpacity,
         FlatList, InteractionManager, Modal       } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import TaskList from './src/components/TaskList';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AnimateBtn = Animatable.createAnimatableComponent(TouchableOpacity);

export default function App() {
  const [task, setTask] = useState([]);
  const [open, setOpen] = useState(false);
  const [inputTask, setImputTask] = useState('');

  const deleteTask = useCallback((data) => {
    const res = task.filter(r => r.key !== data.key);
    setTask(res);
  });

  useEffect(()=>{
    
    async function loadTask(){
      
      const taskSotrage = await AsyncStorage.getItem('@task');
  
      if(taskSotrage){
        setTask(JSON.parse(taskSotrage));
      }
    }

    loadTask();
  }, []);
  // see if it works prop
  useEffect(()=>{
    async function saveTask(){
      await AsuncStorage.setItem('@task', JSON.stringify(task));
    }

    saveTask();
  }, [task]);
 

  function addTask(){
    if (inputTask === '') {
      alert('Você não digitou nenhuma nova tarefa!');
      return;
    };
   
    const newTask = {key: inputTask, task: inputTask};
    
    setTask([...task,newTask]);
    setOpen(false);
    setImputTask('');

  };




  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View>
        <Text style={styles.title}>TAREFAS DA JORNADA</Text>
      </View>

      <FlatList
        marginHorizontal={10}
        showsHorizontalScrollIndicator={false}
        data={task}
        keyExtractor={(item) => String(item.key)}
        renderItem={({item}) => <TaskList data={item} deleteTask={deleteTask}/>}
      />

      <Modal  animationType='slide' transparent={false} visible={open}>
        <SafeAreaView style={styles.modal}>
          <Animatable.View animation="fadeInUp" useNativeDriver style={styles.modalTitle}>
            <TouchableOpacity onPress={ () => setOpen(false)}>
              <Ionicons name="md-arrow-back" size={40} color="#FFF"/>
            </TouchableOpacity>
            <Text style={styles.title}>NOVA TAREFA</Text>
          </Animatable.View>
          <Animatable.View animation="fadeInUp" useNativeDriver >
            <TextInput
              multiline={true} 
              placeholderTextColor="#747474" 
              autoCorrect={false} 
              placeholder='Adicione aqui a nova tarefa' 
              style={styles.taskInput}
              value={inputTask}
              onChangeText={(newTask) => setImputTask(newTask)}
              /> 
          </Animatable.View>
          <View>
            <TouchableOpacity style={styles.taskButton} onPress={addTask}>
              <Text style={styles.textTaskButton}>Adicionar tarefa</Text> 
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>

      <AnimateBtn
        animation='bounceInUp'
        duration={1500}
        useNativeDriver
        style={styles.roundButton}
        onPress={ () => setOpen(true)}
        >
        <Ionicons style={styles.textRoundButton} name='ios-add' size={40} color='#fff'></Ionicons>
      </AnimateBtn>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // General styles
  container: {
    flex: 1,
    backgroundColor: '#025959',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    margin: 20,
    fontSize: 25,
    color: "#FFF",
    alignContent: "center"
  },
  button: {
    backgroundColor: '#456173'
  },
  // Initial body styles
  roundButton: {
    position: 'absolute',
    backgroundColor: '#A0A603',
    width: 70,
    height: 70,
    borderRadius: 40,
    alignItems: 'center',
    alignContent: 'center',
    right: 25,
    bottom: 25,
    paddingTop: 15,
    elevation: 2,
    zIndex: 9,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 3,
      width: 1 
    }
  },
  textRoundButton: {
    color: '#FFF',
  },

  //Modal task styles
  modal: {
    flex: 1,
    backgroundColor: '#025959'
  },
  modalTitle: {
    flexDirection: 'row',
    marginLeft: 10,
    fontSize: 25,
    alignItems: 'center',
  },
  taskButton:{
    margin: 8,
    flexDirection: 'row',
    backgroundColor: '#A0A603',
    borderRadius: 5,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 3,
      width: 1 
    }
  },
  input: {
    backgroundColor: '#0CF2DB'
  },
  taskInput: {
    margin: 8,
    fontSize: 15,
    height: 150,
    textAlignVertical: 'top',
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
  textTaskButton: {
    fontSize: 25,
    color: '#000'
  }
});
