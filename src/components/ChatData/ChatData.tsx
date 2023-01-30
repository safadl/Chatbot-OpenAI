import axios from 'axios';
import React, { useState } from 'react';
import {
  FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, Keyboard, Image
} from 'react-native';
import { ChatItem } from '../chatItem';
import Ionicons from '@expo/vector-icons/Ionicons';

export function ChatData() {
  const [data, setData] = useState<any>([]);
  const APIKey = process.env.API_KEY;
  const endpointURL = "https://api.openai.com/v1/engines/text-davinci-003/completions";
  const [textInput, setTextInput] = useState('');
  const [loading, setLoader] = useState(false);
  const handleSend = async () => {
    const prompt = textInput;
    setLoader(true)
    const response = await axios.post(endpointURL, {
      prompt: prompt,
      max_tokens: 1024,
      temperature: 0,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    },
      {
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${APIKey}`,

        }
      })
    Keyboard.dismiss()
    setLoader(false)
    const text = response.data.choices[0].text;
    setData([...data, { type: 'user', 'text': textInput }, { type: 'bot', 'text': text }]);
    console.log('text :', text)
    setTextInput('');

  }
  return (
    <KeyboardAvoidingView behavior="padding" style={styles.keyboard}>

      <View style={styles.container}>

        <FlatList data={data}
          keyExtractor={(item, index) => index.toString()}
          style={styles.body}
          renderItem={({ item }) => (
            <ChatItem item={item} />
          )} />
        {loading ?
          <View style={styles.imageBckg}><Image
            source={require("../../../assets/images/loader.gif")}
            style={styles.loader}
          />
          </View> : null}
        <TextInput style={[styles.input, {}]} value={textInput} onChangeText={text => setTextInput(text)}
          placeholder='Ask me anything...' placeholderTextColor={'#a8aaad'} />

        <TouchableOpacity style={styles.button} onPress={handleSend}>
                <Ionicons name='send' size={16} color="#05b5af" />

          <Text style={styles.title}>Send</Text>
        </TouchableOpacity>

      </View>
    </KeyboardAvoidingView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 20
  },
  keyboard: {
    flex: 1,
  },
  title: {
    color: '#202123',
    margin: 4,
    fontSize:15,
    marginLeft:10,
    marginRight:10
  },
  button: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    margin: 10,
    padding: 5,
    borderRadius: 5,
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
  
    
  },
  body: {
    backgroundColor: '#fffc9',
    width: '102%',
    margin: 10,
  },
  input: {
    borderColor: "#fff",
    borderWidth: 0.5,
    width: "90%",
    height: 60,
    borderRadius: 10,
    padding: 10,
    color: 'white',
  },
  loader: {
    width: 100,
    height: 100
  },
  imageBckg: {
    backgroundColor: 'transparent'
  }
});
