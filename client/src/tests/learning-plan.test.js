// Learning Plan Tests
import { learningPlans } from '../lib/learning-plans';

describe('Learning Plans Content', () => {
  test('all learning plans should have required properties', () => {
    learningPlans.forEach(plan => {
      // Test plan structure
      expect(plan).toHaveProperty('id');
      expect(plan).toHaveProperty('title');
      expect(plan).toHaveProperty('description');
      expect(plan).toHaveProperty('icon');
      expect(plan).toHaveProperty('lessons');
      
      // Test that lessons array is not empty
      expect(plan.lessons.length).toBeGreaterThan(0);
      
      // Test each lesson
      plan.lessons.forEach(lesson => {
        expect(lesson).toHaveProperty('id');
        expect(lesson).toHaveProperty('title');
        expect(lesson).toHaveProperty('duration');
        expect(lesson).toHaveProperty('sections');
        
        // Test that sections array is not empty
        expect(lesson.sections.length).toBeGreaterThan(0);
        
        // Test each section
        lesson.sections.forEach(section => {
          expect(section).toHaveProperty('title');
          expect(section).toHaveProperty('content');
          expect(typeof section.content).toBe('string');
          expect(section.content.length).toBeGreaterThan(0);
        });
      });
    });
  });

  test('lesson durations should be in correct format', () => {
    const durationRegex = /^\d+ min$/;
    
    learningPlans.forEach(plan => {
      plan.lessons.forEach(lesson => {
        expect(lesson.duration).toMatch(durationRegex);
      });
    });
  });

  test('learning plans should have unique IDs', () => {
    const ids = learningPlans.map(plan => plan.id);
    const uniqueIds = [...new Set(ids)];
    expect(ids.length).toBe(uniqueIds.length);
  });

  test('videos should have valid YouTube embed URLs', () => {
    const youtubeRegex = /^https:\/\/www\.youtube\.com\/embed\/[a-zA-Z0-9_-]{11}$/;
    
    learningPlans.forEach(plan => {
      plan.lessons.forEach(lesson => {
        lesson.sections.forEach(section => {
          if (section.videoUrl) {
            expect(section.videoUrl).toMatch(youtubeRegex);
          }
        });
      });
    });
  });
});