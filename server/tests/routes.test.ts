/** @jest-environment node */
import request from 'supertest';
import express from 'express';

jest.mock('../pg-storage', () => {
  const sampleProgress = { userId: 1, surahId: 1, lastReadAyah: 5, isCompleted: false };
  return {
    PgStorage: jest.fn().mockImplementation(() => ({
      createOrUpdateReadingProgress: jest.fn().mockResolvedValue(sampleProgress),
      getReadingProgressByUserId: jest.fn().mockResolvedValue([sampleProgress]),
      getHadithsByCollection: jest.fn().mockResolvedValue(new Array(100).fill({})),
      createHadith: jest.fn(),
    })),
  };
});

jest.mock('../achievement-service', () => {
  return {
    AchievementService: jest.fn().mockImplementation(() => ({
      onAyahRead: jest.fn().mockResolvedValue([]),
      onSurahCompleted: jest.fn().mockResolvedValue([]),
      onHadithRead: jest.fn().mockResolvedValue([]),
      onDuaLearned: jest.fn().mockResolvedValue([]),
    })),
  };
});

jest.mock('../auth', () => ({
  setupAuth: jest.fn(),
  isAuthenticated: (_req: any, _res: any, next: any) => next(),
}));

jest.mock('../openai-routes', () => ({
  getAIResponse: jest.fn(),
}));

jest.mock('../hadith-data', () => ({ BUKHARI_VOLUME_1: [] }));
jest.mock('../complete-hadith-data', () => ({
  COMPLETE_HADITH_COLLECTION: [],
  NAWAWI_FORTY_HADITH: [],
  MUSLIM_HADITH_SAMPLE: [],
}));

jest.mock('../complete-dua-collection', () => ({
  COMPLETE_DUA_COLLECTION: [
    { id: '1', category: 'Daily Routine', text: 'Sample Dua 1' },
    { id: '2', category: 'Prayer', text: 'Sample Dua 2' },
  ],
  DUA_CATEGORIES: ['Daily Routine', 'Prayer'],
  FEATURED_DUAS: ['1'],
}));

jest.mock('../db', () => ({
  handleDbError: (e: any) => e,
}));

import { registerRoutes } from '../routes';

describe('API routes', () => {
  let app: express.Express;

  beforeAll(async () => {
    app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    await registerRoutes(app);
  });

  describe('Reading Progress', () => {
    it('creates reading progress', async () => {
      const res = await request(app)
        .post('/api/reading-progress')
        .send({ userId: 1, surahId: 1, lastReadAyah: 5, isCompleted: false });
      expect(res.status).toBe(201);
      expect(res.body.progress).toEqual({ userId: 1, surahId: 1, lastReadAyah: 5, isCompleted: false });
    });

    it('retrieves reading progress for user', async () => {
      const res = await request(app).get('/api/reading-progress/1');
      expect(res.status).toBe(200);
      expect(res.body).toEqual([
        { userId: 1, surahId: 1, lastReadAyah: 5, isCompleted: false },
      ]);
    });
  });

  describe('Dua routes', () => {
    it('returns all duas', async () => {
      const res = await request(app).get('/api/duas');
      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(2);
    });

    it('filters duas by category', async () => {
      const res = await request(app).get('/api/duas').query({ category: 'prayer' });
      expect(res.status).toBe(200);
      expect(res.body).toEqual([
        { id: '2', category: 'Prayer', text: 'Sample Dua 2' },
      ]);
    });

    it('returns dua by id', async () => {
      const res = await request(app).get('/api/duas/1');
      expect(res.status).toBe(200);
      expect(res.body).toEqual({ id: '1', category: 'Daily Routine', text: 'Sample Dua 1' });
    });
  });
});
