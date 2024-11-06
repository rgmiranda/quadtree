import { describe, expect, it } from 'vitest';
import { Point, QuadTree, Rect } from '../src';

describe(QuadTree.name, () => {
    
    it('creates an instance', () => {
        const boundary = new Rect(0, 0, 16, 16);
        const k = 1;
        const q = new QuadTree(k, boundary);

        expect(q).toBeInstanceOf(QuadTree);
    });

    it('adds a point', () => {
        const boundary = new Rect(0, 0, 16, 16);
        const k = 1;
        const p: Point = { x: 4, y: 4 };
        const q = new QuadTree(k, boundary);

        expect(q).toBeInstanceOf(QuadTree);

        q.addPoint(p);
        expect(q.getPoints().length).toBe(1);
        expect(q.getQuadrants()).toBe(undefined);
    });

    it('adds points subdividing', () => {
        const boundary = new Rect(0, 0, 16, 16);
        const k = 1;
        const ps: Point[] = 
        [
            { x: 4, y: 4 },
            { x: 6, y: 6 },
            { x: 12, y: 4 },
            { x: 12, y: 12 },
            { x: 4, y: 12 },
        ];
        const q = new QuadTree(k, boundary);
        
        expect(q).toBeInstanceOf(QuadTree);
        
        ps.forEach(p => q.addPoint(p));

        expect(q.getPoints().length).toBe(1);
        expect(q.getQuadrants()).not.toBe(undefined);
        expect(q.getQuadrants()![0].getPoints().length).toBe(1);
        expect(q.getQuadrants()![1].getPoints().length).toBe(1);
        expect(q.getQuadrants()![2].getPoints().length).toBe(1);
        expect(q.getQuadrants()![3].getPoints().length).toBe(1);
    });
});