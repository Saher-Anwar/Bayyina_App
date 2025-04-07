// screens/ApiTestScreen.tsx
import React from 'react';
import { View, Button, Text, ActivityIndicator } from 'react-native';
import { fetchChapter } from '../api/quran'; // Your API function

export default function ApiTestScreen() {
  const [data, setData] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(false);

  const testApiCall = async () => {
    setLoading(true);
    try {
      const result = await fetchChapter(114);
      setData(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <Button title="Test API Call" onPress={testApiCall} />
      
      {loading && <ActivityIndicator size="large" style={{ margin: 20 }} />}
      
      {data && (
        <View style={{ marginTop: 20 }}>
          <Text>Chapter: {data.chapter}</Text>
          <Text>Verses:</Text>
          {data.verses.map((verse: string, index: number) => (
            <Text key={index}>{verse}</Text>
          ))}
        </View>
      )}
    </View>
  );
}