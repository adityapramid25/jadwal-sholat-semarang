// FIX: Add imports for GoogleGenAI and the Haiku type.
import { GoogleGenAI, Type } from '@google/genai';
import { PrayerData, Haiku } from '../types';

const API_BASE_URL = 'https://api.aladhan.com/v1';

export const getPrayerTimes = async (city: string, country: string): Promise<PrayerData> => {
  try {
    // Using method 4: University of Islamic Sciences, Karachi.
    const response = await fetch(`${API_BASE_URL}/timingsByCity?city=${city}&country=${country}&method=4`);
    
    if (!response.ok) {
      let errorMsg = 'Failed to fetch prayer times.';
      try {
        const errorData = await response.json();
        errorMsg = errorData.data || errorMsg;
      } catch (e) {
        // Response might not be JSON, stick with the default message.
      }
      throw new Error(errorMsg);
    }

    const data = await response.json();
    
    if (data.code === 200 && data.status === "OK") {
      return data.data as PrayerData;
    } else {
      throw new Error(data.data || 'Invalid data received from API.');
    }

  } catch (error) {
    console.error("Error fetching prayer times:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to fetch prayer times: ${error.message}`);
    }
    throw new Error("An unknown error occurred while fetching prayer times.");
  }
};

// FIX: Implement the generateHaiku function using the Gemini API to resolve the missing export error.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateHaiku = async (topic: string): Promise<Haiku> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Generate a haiku about: ${topic}`,
      config: {
        systemInstruction: 'You are a haiku poet. You will be given a topic and you must generate a creative haiku with a title. The haiku must strictly follow the 5-7-5 syllable structure. The response must be in JSON format.',
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: {
              type: Type.STRING,
              description: 'The title of the haiku, related to the topic.'
            },
            haiku: {
              type: Type.ARRAY,
              description: 'An array of three strings, representing the three lines of the haiku.',
              items: {
                type: Type.STRING
              }
            }
          }
        }
      }
    });

    const jsonText = response.text.trim();
    const parsed = JSON.parse(jsonText);

    // Basic validation
    if (parsed && parsed.title && Array.isArray(parsed.haiku) && parsed.haiku.length === 3) {
      return parsed as Haiku;
    } else {
      console.error('Invalid data structure received from Gemini:', parsed);
      throw new Error('Received invalid haiku format from the AI.');
    }
  } catch (error) {
    console.error("Error generating haiku:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to generate haiku: ${error.message}`);
    }
    throw new Error("An unknown error occurred while generating the haiku.");
  }
};
