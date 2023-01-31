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

  const [hasData, setHasData] = useState(false);


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

    setData([...data, { type: 'user', 'text': textInput }, { type: 'bot', 'text': text.trim() }]);
    if (data)
      setHasData(true)

    console.log('text :', text)
    setTextInput('');

  }
  return (
    <KeyboardAvoidingView behavior="padding" style={styles.keyboard}>

      <View style={styles.container}>
        {hasData ?
          <FlatList data={data}
            keyExtractor={(item, index) => index.toString()}
            style={styles.body}
            renderItem={({ item }) => (
              <ChatItem item={item} />
            )} />
          : <View style={styles.labelContainer}>
            <Image style={styles.imgStyle} source={require('../../../assets/images/magnifying-glass.png')} />
            <Text style={styles.label}>No conversations yet!</Text>
          </View>
        }
        <View style={styles.inputContainer}>
          <TextInput style={[styles.input, {}]} value={textInput} onChangeText={text => setTextInput(text)}
            placeholder='Ask me anything...' placeholderTextColor={'#a8aaad'} />
          <TouchableOpacity style={styles.button} onPress={handleSend}>
            {loading ?
              <View style={styles.imageBckg}>
                <Image
                  source={require("../../../assets/images/simple_loading.gif")}
                  style={styles.loader}
                />
              </View>
              : <Ionicons name='send' size={20} color="#6986fe" />}
          </TouchableOpacity>
        </View>
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
    fontSize: 15,
    marginLeft: 10,
    marginRight: 10
  },
  button: {
    backgroundColor: 'transparent',
    padding: 5,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 5,
    alignSelf: 'center',
  },
  body: {
    backgroundColor: '#fffc9',
    width: '102%',
    margin: 10,
  },
  input: {
    borderColor: "#fff",
    borderWidth: 0.3,
    width: "90%",
    height: 60,
    borderRadius: 10,
    padding: 10,
    color: 'white',
  },
  loader: {
    width: 40,
    height: 40,
    resizeMode: 'contain'
  },
  imageBckg: {
    backgroundColor: 'transparent'
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom:16
  },
  labelContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems:'center'
  },
  label:{
    color:'#d7d7d9'
  },
  imgStyle:{
    width:230,
    height:230
  }
});
