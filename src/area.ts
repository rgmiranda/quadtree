import { Point } from "./point";

export interface Area {
    containts(p: Point): boolean;
    intersects(area: Area): boolean;
}