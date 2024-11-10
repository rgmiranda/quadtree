import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Point, QuadTree, Rect } from '../src';
import { setupJestCanvasMock } from 'jest-canvas-mock'

describe(QuadTree.name, () => {

    let canvas: HTMLCanvasElement;
    let context: CanvasRenderingContext2D;

    beforeEach(() => {
        vi.resetAllMocks();
        setupJestCanvasMock();

        canvas = document.createElement('canvas');
        canvas.width = 120;
        canvas.height = 120;
        context = canvas.getContext('2d') as CanvasRenderingContext2D;
    });
    
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
        const pts: Point[] = 
        [
            { x: 4, y: 4 },
            { x: 6, y: 6 },
            { x: 12, y: 4 },
            { x: 12, y: 12 },
            { x: 4, y: 12 },
        ];
        const q = new QuadTree(k, boundary);
        
        expect(q).toBeInstanceOf(QuadTree);
        
        pts.forEach(p => q.addPoint(p));

        expect(q.getPoints().length).toBe(1);
        expect(q.getQuadrants()).not.toBe(undefined);
        expect(q.getQuadrants()![0].getPoints().length).toBe(1);
        expect(q.getQuadrants()![1].getPoints().length).toBe(1);
        expect(q.getQuadrants()![2].getPoints().length).toBe(1);
        expect(q.getQuadrants()![3].getPoints().length).toBe(1);
    });

    it('draws quadtree', () => {
        const boundary = new Rect(0, 0, 120, 120);
        const k = 1;
        const pts: Point[] = 
        [
            { x: 40, y: 40 },
            { x: 50, y: 50 },
            { x: 120, y: 40 },
            { x: 120, y: 120 },
            { x: 40, y: 120 },
        ];
        const q = new QuadTree(k, boundary);
        
        expect(q).toBeInstanceOf(QuadTree);
        
        pts.forEach(p => q.addPoint(p));

        q.draw(context);

        expect(context.arc).toHaveBeenCalledTimes(5);
        expect(context.rect).toHaveBeenCalledTimes(4);
    });

    it('queries points in an area', () => {
        const boundary = new Rect(0, 0, 120, 120);
        const area = new Rect(30, 30, 25, 25);
        const k = 1;
        const pts: Point[] = 
        [
            { x: 40, y: 40 },
            { x: 50, y: 50 },
            { x: 120, y: 40 },
            { x: 120, y: 120 },
            { x: 40, y: 120 },
        ];
        const q = new QuadTree(k, boundary);
        
        expect(q).toBeInstanceOf(QuadTree);
        
        pts.forEach(p => q.addPoint(p));
        const result = q.query(area);

        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBe(2);

    });
});