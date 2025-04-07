// Fetches Qur'an pages and verses
import axios from 'axios';
import { BASE_API_URL } from '../utils/constants';

export const fetchChapter = async (chapterNumber: number) => {
  try {
    const response = await axios.get(`${BASE_API_URL}/get_chapter`, {
      params: {
        chapter: chapterNumber,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching chapter:', error);
    throw error;
  }
};

// Usage
fetchChapter(114).then(data => console.log(data));
