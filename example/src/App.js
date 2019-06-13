import React from 'react';
import * as THREE from 'three';

import Threeact from 'threeact';

export default () => (
  <Threeact
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
    onRenderFrame={() => {
      this.renderer.render(this.scene, this.camera);

      // rotate the cube
      this.cube.rotation.x += 0.02;
      this.cube.rotation.y -= 0.01;
      this.cube.rotation.z += 0.03;
    }}
    showStats={true}
  />
);
