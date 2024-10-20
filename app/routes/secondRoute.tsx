import React, { useState } from 'react';
import { View } from 'react-native';
import Conversation from '../components/Conversation';
import { getChatGPTResponse } from '../services/chatgptService';
import styles from '../styles/styles';

const ThirdRoute: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [submittedTexts, setSubmittedTexts] = useState<string[]>([]);

  const handleTextSubmit = async () => {
    if (inputValue.trim()) {
      const newMessages = [`You: ${inputValue}`, 'Wait...'];
      const messageIndex = submittedTexts.length;

      setSubmittedTexts([...newMessages, ...submittedTexts]);
      setInputValue('');

      try {
        const response = await getChatGPTResponse(inputValue);
        setSubmittedTexts((prevTexts) => {
          const updatedTexts = [...prevTexts];
          updatedTexts[messageIndex + 1] = `ChatGPT: ${response}`;
          return updatedTexts;
        });
      } catch (error) {
        console.error('Error fetching response from ChatGPT:', error);
        setSubmittedTexts((prevTexts) => {
          const updatedTexts = [...prevTexts];
          updatedTexts[messageIndex + 1] = 'Error fetching response';
          return updatedTexts;
        });
      }
    }
  };

  return (
    <View style={styles.scene}>
      <Conversation
        submittedTexts={submittedTexts}
        inputValue={inputValue}
        setInputValue={setInputValue}
        handleTextSubmit={handleTextSubmit}
      />
    </View>
  );
};

export default ThirdRoute;
