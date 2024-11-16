import {
  Text,
  View,
  TextInput,
  Pressable,
  StyleSheet,
  FlatList,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useContext,useEffect } from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useFonts, Inter_500Medium } from "@expo-google-fonts/inter";
import Octicons from "@expo/vector-icons/Octicons";
import { data } from "@/data/todos";
import { ThemeContext } from "@/context/ThemeContext";
import  Animated,{LinearTransition} from "react-native-reanimated";
import AsyncStorage from "@react-native-async-storage/async-storage"
import { StatusBar } from "react-native";

export default function Index() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const { colorScheme, setColorScheme, theme } = useContext(ThemeContext);
  const router = useRouter()
  const [loaded, error] = useFonts({
    Inter_500Medium,
  });

  useEffect(() => {
    const fetchData = async()=> {
      try {
        
        const jsonvalue = await AsyncStorage.getItem("TodoApp")
        const storageTodos = jsonvalue != null ? JSON.parse(jsonvalue):null

        if(storageTodos && storageTodos.length)
        {
          setTodos(storageTodos.sort((a,b)=>b.id-a.id))
        }
        else {
          setTodos(data.sort((a, b) => b.id - a.id))
        }
      } catch (error) {
        console.log(error);
        
      }
    }
    fetchData()
  }, [data])

  useEffect(() => {
    const storeData = async () => {

      try {

        const jsonvalue = JSON.stringify(todos)
        await AsyncStorage.setItem("TodoApp",jsonvalue)


      } catch (e) {

        console.error(e);
        
        
      }
    }

    storeData()
  
   
  }, [todos])
  
  

  if (!loaded && !error) {
    return null;
  }

  const styles = createStyles(theme,colorScheme)  
  const addTodo = () => {
    if (text.trim()) {
      //todo that is added first will have higher id so we just +1 from it if no id then it will be initially 1
      const newId = todos.length > 0 ? todos[0].id + 1 : 1;
      setTodos([{ id: newId, title: text, completed: false }, ...todos]);
      //after to do addeed we clear the text
      setText("");
    }
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const removeTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  //using useRouter to handle route change in todos accessing route params
  const handlePress = (id) => {
    router.push(`/todos/${id}`)
  }

  const renderItem = ({ item }) => (
    <View style={styles.todoItem}>
      <Pressable 
      onPress={()=> handlePress(item.id)}
      onLongPress={() => toggleTodo(item.id)}>
      <Text
        style={[styles.todoText, item.completed && styles.completedText]}
        
      >
        {item.title}
      </Text>
      </Pressable>
      <Pressable onPress={() => removeTodo(item.id)}>
        <MaterialCommunityIcons
          name="delete-circle"
          size={36}
          color="red"
          selectable={undefined}
        />
      </Pressable>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a new todo"
          placeholderTextColor="gray"
          value={text}
          maxLength={30}
          onChangeText={setText}
        />
        <Pressable onPress={addTodo} style={styles.addButton}>
          <Text style={styles.addButtonText}>Add</Text>
        </Pressable>
        <Pressable
          onPress={() =>
            setColorScheme(colorScheme === "light" ? "dark" : "light")
          }
          style={{ marginLeft: 10 }}
        >
          <Octicons
            name={colorScheme === "dark" ? "moon" : "sun"}
            size={36}
            color={theme.text}
            selectable={undefined}
            style={{ width: 36 }}
          />
        </Pressable>
      </View>
      <Animated.FlatList
        data={todos}
        renderItem={renderItem}
        keyExtractor={(todo) => todo.id}
        contentContainerStyle={{ flexGrow: 1 }}
        itemLayoutAnimation={LinearTransition}
        keyboardDismissMode="on-drag"

      />
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"}/>
    </SafeAreaView>
  );
}

function createStyles(theme,colorScheme){
  return StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:theme.background,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    padding: 10,
    width: "100%",
    maxWidth: 1024,
    marginHorizontal: "auto",
    pointerEvents: "auto",
  },
  input: {
    flex: 1,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    fontSize: 18,
    minWidth: 0,
    color: theme.text,
    fontFamily: "Inter_500Medium",
  },
  addButton: {
    backgroundColor: theme.button,
    borderRadius: 5,
    padding: 10,
  },
  addButtonText: {
    fontSize: 18,
    color: colorScheme === "dark" ? "black" : "white",
  },
  todoItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 4,
    padding: 10,
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    width: "100%",
    maxWidth: 1024,
    marginHorizontal: "auto",
    pointerEvents: "auto",
  },
  todoText: {
    flex: 1,
    fontSize: 18,
    fontFamily: "Inter_500Medium",
    color: theme.text,
  },
  completedText: {
    textDecorationLine: "line-through",
    color: "gray",
  },
})};
