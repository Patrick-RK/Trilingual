import React, { useState } from 'react';
import { View } from 'react-native';
import Conversation from '../components/Conversation';
import { getChatGPTResponse } from '../services/chatgptService';
import styles from '../styles/styles';

const FirstRoute: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [submittedTexts, setSubmittedTexts] = useState<string[]>([]);

  const handleTextSubmit = async () => {
    if (inputValue.trim()) {
      const newMessages = [`You: ${inputValue}`, 'Wait...']; // Create new messages array
      const messageIndex = submittedTexts.length;

      // Update the submittedTexts array correctly using spread operator
      setSubmittedTexts([...submittedTexts, ...newMessages]);

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

export default FirstRoute;
