import axios from 'axios';
import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export function ChatData() {
  const [data, setData] = useState<any>([]);
  const APIKey = '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';
  const endpointURL = "https://api.openai.com/v1/engines/text-davinci-002/completions";
  const [textInput, setTextInput] = useState('');

  const handleSend = async () => {
    const prompt = textInput;

    const response = await axios.post(endpointURL, {
      prompt: prompt,
      max_tokens: 1024,
      temperature: 0.5
    },
      {
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${APIKey}`,

        }
      });

    const text = response.data.choices[0].text;

    setData([...data, { type: 'user', 'text': textInput }, { type: 'bot', 'text': text }]);

    setTextInput('');
  }
  return (
    <View style={styles.container}>
      <FlatList data={data}
        keyExtractor={(item, index) => index.toString()}
        style={styles.body}
        renderItem={({ item }) => (
          <View style={styles.listItem} >
            <Text style={[styles.textItem, { color: item.type === 'user' ? 'green' : 'red' }]}>
              {item.type === "user" ? 'You' : 'Bot'}
            </Text>
            <Text style={styles.bot}>
              {item.text}
            </Text>
          </View>
        )} />
      <TextInput style={styles.input} value={textInput} onChangeText={text => setTextInput(text)}
        placeholder='Ask me anything!' placeholderTextColor={'#a8aaad'} />
      <TouchableOpacity style={styles.button} onPress={handleSend}>
        <Text style={styles.title}>Let's chat!</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 20
  },
  title: {
    color: '#fff',
    margin: 4
  },
  button: {
    backgroundColor: "#05b5af",
    margin: 10,
    padding: 5,
    borderRadius: 5
  },
  body: {
    backgroundColor: '#fffc9',
    width: '102%',
    margin: 10,
  },
  listItem: {
    flexDirection: 'row',
    padding: 10
  },
  textItem: {
    fontWeight: 'bold',
  },
  bot: {
    fontSize: 16,
    color: "#fff",
  },
  input: {
    borderColor: "#fff",
    borderWidth: 0.5,
    width: "90%",
    height: 60,
    borderRadius: 10,
    padding: 10,
    color: 'white'
  }
});
