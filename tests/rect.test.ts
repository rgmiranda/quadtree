import { beforeAll, describe, expect, it } from "vitest";
import { Rect } from "../src";

describe(Rect.name, () => {

    let r: Rect;

    beforeAll(() => {
        r = new Rect(0, 0, 12, 12);
    })

    const boundaryData = [
        { x: 5, y: 5, expected: true },
        { x: 0, y: 0, expected: true },
        { x: 10, y: 10, expected: true },
        { x: 12.1, y: 10, expected: false },
        { x: -0.001, y: 0, expected: false },
    ];

    const intersectionData = [
        {
            rect: new Rect(0, 0, 12, 12),
            expected: true
        },
        {
            rect: new Rect(0, 0, 6, 6),
            expected: true
        },
        {
            rect: new Rect(2, 2, 6, 6),
            expected: true
        },
        {
            rect: new Rect(6, 6, 12, 12),
            expected: true
        },
        {
            rect: new Rect(-12, -12, 6, 6),
            expected: false
        },
        {
            rect: new Rect(-12, -12, 12, 12),
            expected: false
        },
        {
            rect: new Rect(12, 12, 1, 1),
            expected: false
        },
    ];

    it('creates an instance', () => {
        expect(r).toBeInstanceOf(Rect);
    });
    
    it.each(boundaryData)('evaluates boundary', ({ x, y, expected }) => {
        expect(r.containts({ x, y })).toBe(expected);
    });
    
    it.each(intersectionData)('evaluates intersection', ({ rect, expected }) => {
        expect(r.intersects(rect)).toBe(expected);
        expect(rect.intersects(r)).toBe(expected);
    });
});