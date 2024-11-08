import { Point } from "./point";
import { Rect } from "./rect";

export class QuadTree {
    private readonly points: Point[] = [];
    private quadrants?: [QuadTree, QuadTree, QuadTree, QuadTree];

    constructor(public readonly k: number, public readonly boundary: Rect) {
    }

    addPoint(p: Point): void {
        if (!this.boundary.containts(p)) {
            throw new Error(`Point ${JSON.stringify(p)} outside boundary`)
        }
        if (this.points.length >= this.k) {
            this.subdivide();
            for (let i = 0; i < this.quadrants!.length; i++) {
                if (this.quadrants![i].boundary.containts(p)) {
                    this.quadrants![i].addPoint(p);
                }
            }
        } else {
            this.points.push(p);
        }
    }

    getPoints(): Point[] {
        return [ ...this.points ];
    }

    getQuadrants(): [QuadTree, QuadTree, QuadTree, QuadTree] | undefined {
        if (this.quadrants) {
            return [ ...this.quadrants ];
        } else {
            return undefined;
        }
    }

    subdivide(): void {
        if (this.quadrants) {
            return;
        }
        const {x, y, w, h} = this.boundary;
        this.quadrants = [
            new QuadTree(this.k, new Rect(x, y, w * 0.5, h * 0.5)),
            new QuadTree(this.k, new Rect(x + w * 0.5, y, w * 0.5, h * 0.5)),
            new QuadTree(this.k, new Rect(x + w * 0.5, y + h * 0.5, w * 0.5, h * 0.5)),
            new QuadTree(this.k, new Rect(x, y + h * 0.5, w * 0.5, h * 0.5)),
        ];
    }

    draw(ctx: CanvasRenderingContext2D): void {

        this.points.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
        });

        if (this.quadrants) {
            this.quadrants.forEach(q => q.draw(ctx));
        } else {
            ctx.beginPath();
            ctx.rect(this.boundary.x, this.boundary.y, this.boundary.w, this.boundary.h);
            ctx.stroke();
        }
    }

    query(area: Rect) : Point[] {
        let found: Point[] = [];
        if (!this.boundary.intersects(area)) {
            return found;
        }

        this.points.forEach(p => {
            if (area.containts(p)) {
                found.push(p);
            }
        });

        if (this.quadrants) {
            this.quadrants.forEach(q => {
                found = found.concat(q.query(area));
            });
        }

        return found;
    }
}