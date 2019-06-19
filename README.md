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
import React, { Component } from 'react';
import Threeact from 'threeact';

class Example extends Component {
  render() {
    return (
      <Threeact
        // Set up your scene. add a camera, geometry, etc...
        onReady={({ renderer, scene, canvas }) => {
          this.scene = scene;
          this.renderer = renderer;

          const aspect = canvas.offsetWidth / canvas.offsetHeight;
          this.camera = new THREE.PerspectiveCamera(70, aspect, 1, 10);
          this.camera.position.set(0, 3.5, 5);
          this.camera.lookAt(this.scene.position);

          this.cube = new THREE.Mesh(
            new THREE.CubeGeometry(2, 2, 2),
            new THREE.MeshNormalMaterial()
          );
          this.scene.add(this.cube);
        }}
        // Update and render your scene
        onRenderFrame={() => {
          this.cube.rotation.x += 0.02;
          this.cube.rotation.y -= 0.01;
          this.cube.rotation.z += 0.03;

          this.renderer.render(this.scene, this.camera);
        }}
        // Optionally show webgl/THREE diagnostic and perf overlays
        showStats={true}
      />
    );
  }
}
```

## License

MIT © [gpascale](https://github.com/gpascale)
