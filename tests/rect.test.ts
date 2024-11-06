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

    it('creates an instance', () => {
        expect(r).toBeInstanceOf(Rect);
    });
    
    it.each(boundaryData)('evaluates boundary', ({ x, y, expected }) => {
        expect(r.containts({ x, y })).toBe(expected);
    });
});