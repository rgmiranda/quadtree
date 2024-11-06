import { Point } from "./point";

export class Rect {
    constructor(
        public readonly x: number,
        public readonly y: number,
        public readonly w: number,
        public readonly h: number,
    ) {    
    }

    containts(p: Point): boolean {
        return p.x >= this.x
            && p.x <= this.x + this.w
            && p.y >= this.y
            && p.y <= this.y + this.h;
    }
}