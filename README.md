# QuadTree

[Quadtree](https://en.wikipedia.org/wiki/Quadtree) Lib for Typescript/Javascript

## Installation

```bash
npm install @rgsoft/quadtree
```

## Usage

The constructor of the `QuadTree` class expects to parameters:

- `k: number`: The capacity of each layer
- `boundary: Rect`: An instance of the `Rect` class that sets the initial boundary

```js
const { QuadTree, Rect } = require('@rgsoft/quadtree');
const k = 1;

const q = new QuadTree(k, new Rect(0, 0, 160, 160));
```

### Adding Points

The `addPoint` method will insert a point into the structure, subdividing in four
quadrants if necesary.

```js
q.addPoint({ x: 50, y: 50 })
```

It expects any parameter that implements the `Point` interface.

```ts
export interface Point {
    x: number;
    y: number;
}
```

### Querying Points

The `query` method searches for point in a given **area**. This area can be a
`Rect` or a `Circle`.

```js
let area = new Rect(30, 30, 25, 25);
let points = q.query(area);

area = new Circle(30, 30, 20);
points = q.query(area);
```
