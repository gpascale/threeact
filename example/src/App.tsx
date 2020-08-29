import React, { useRef } from 'react';
import * as THREE from 'three';
import Threeact from 'threeact';

const App = () => {
  const cube = useRef<THREE.Mesh>();

  return (
    <Threeact
      onReady={({ renderer, scene, camera }) => {
        // Set up your scene, add geometry, etc...
        cube.current = new THREE.Mesh(
          new THREE.BoxGeometry(2, 2, 2),
          new THREE.MeshNormalMaterial()
        );
        scene.add(cube.current);
      }}
      beforeRenderFrame={({ renderer, scene, camera }) => {
        // make any updates before each frame is rendered
        if (cube.current) {
          cube.current.rotation.x += 0.02;
          cube.current.rotation.y -= 0.01;
          cube.current.rotation.z += 0.03;
        }
        return true;
      }}
      afterRenderFrame={({ renderer, scene, camera }) => {
        // make any updates after each frame is rendered
      }}
      showStats={true /* optionally show diagnostic and perf overlays */}
    />
  );
};

export default App;
