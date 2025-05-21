// Surah Service Tests
import { getSurah } from '../lib/quran-data';

// Mock the fetch function
global.fetch = jest.fn();

describe('Quran Data Service', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  test('getSurah should fetch a surah correctly', async () => {
    // Mock API responses
    const mockArabicData = {
      code: 200,
      data: {
        number: 1,
        name: 'الفاتحة',
        englishName: 'Al-Fatihah',
        englishNameTranslation: 'The Opener',
        revelationType: 'Meccan',
        numberOfAyahs: 7,
        ayahs: [
          { numberInSurah: 1, text: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ', number: 1 },
          { numberInSurah: 2, text: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ', number: 2 }
        ]
      }
    };

    const mockTranslationData = {
      code: 200,
      data: {
        ayahs: [
          { text: 'In the name of Allah, the Entirely Merciful, the Especially Merciful.' },
          { text: 'All praise is due to Allah, Lord of the worlds.' }
        ]
      }
    };

    const mockTransliterationData = {
      code: 200,
      data: {
        ayahs: [
          { text: 'Bismillaahir Rahmaanir Raheem' },
          { text: 'Alhamdu lillaahi Rabbil aalameen' }
        ]
      }
    };

    // Set up fetch to return the mock data
    global.fetch
      .mockImplementationOnce(() => Promise.resolve({
        json: () => Promise.resolve(mockArabicData)
      }))
      .mockImplementationOnce(() => Promise.resolve({
        json: () => Promise.resolve(mockTranslationData)
      }))
      .mockImplementationOnce(() => Promise.resolve({
        json: () => Promise.resolve(mockTransliterationData)
      }));

    // Call the function
    const result = await getSurah(1);

    // Test the results
    expect(fetch).toHaveBeenCalledTimes(3);
    expect(result.id).toBe(1);
    expect(result.name).toBe('الفاتحة');
    expect(result.englishName).toBe('Al-Fatihah');
    expect(result.ayahs.length).toBe(2);
    expect(result.ayahs[0].text).toBe('بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ');
    expect(result.ayahs[0].translation).toBe('In the name of Allah, the Entirely Merciful, the Especially Merciful.');
    expect(result.ayahs[0].transliteration).toBe('Bismillaahir Rahmaanir Raheem');
  });

  test('getSurah should handle errors gracefully', async () => {
    // Mock fetch to throw an error
    global.fetch.mockImplementationOnce(() => Promise.reject(new Error('Network error')));

    // Call the function and expect it to throw
    await expect(getSurah(1)).rejects.toThrow('Network error');
  });

  test('getSurah should handle API error responses', async () => {
    // Mock API error response
    const mockErrorData = {
      code: 404,
      data: null,
      status: 'Error: Surah not found'
    };

    // Set up fetch to return the error
    global.fetch.mockImplementationOnce(() => Promise.resolve({
      json: () => Promise.resolve(mockErrorData)
    }));

    // Call the function and expect it to throw
    await expect(getSurah(1)).rejects.toThrow('Failed to fetch surah data');
  });
});