// Fetches word details
export const fetchWordDetails = async (word: string) => {
    const response = await fetch(`http://localhost:5000/word-info?word=${encodeURIComponent(word)}`);
    return await response.json();
  };
  