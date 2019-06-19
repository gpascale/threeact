# threeact

> Threeact is a dead simple React component for hosting a THREE.js scene. Threeact
> is not for creating actual scenes using React components, a la react-webgl. It simply
> takes care of some of the boilerplate around creating your canvas and THREE.js scene
> and wrapping it in a React component.

[![NPM](https://img.shields.io/npm/v/threeact.svg)](https://www.npmjs.com/package/threeact) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save threeact
```

## Usage

```jsx
import React from 'react';
import * as THREE from 'three';
import Threeact from 'threeact';

const Example = () => (
  <Threeact
    onReady={({ scene }) => {
      // Set up your scene, add geometry, etc...
      this.cube = new THREE.Mesh(
        new THREE.CubeGeometry(2, 2, 2),
        new THREE.MeshNormalMaterial()
      );
      scene.add(this.cube);
    }}
    beforeRenderFrame={({ renderer, scene, camera }) => {
      // make any updates before each frame is rendered
      this.cube.rotation.x += 0.02;
      this.cube.rotation.y -= 0.01;
      this.cube.rotation.z += 0.03;
    }}
    afterRenderFrame={({ renderer, scene, camera }) => {
      // make any updates after each frame is rendered
    }}
    showStats={true /* optionally show diagnostic and perf overlays */}
  />
);
```

## License

MIT © [gpascale](https://github.com/gpascale)
