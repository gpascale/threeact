import React from 'react';
import * as THREE from 'three';
import Threeact from 'threeact';

export default () => (
  <Threeact
    onReady={({ renderer, scene, camera }) => {
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
