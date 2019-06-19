import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as THREE from 'three';
import RendererStats from '@xailabs/three-renderer-stats';
import Stats from 'stats-js';

function animate() {}

requestAnimationFrame(animate);

export default class Threeact extends Component {
  componentDidMount() {
    const {
      onReady,
      beforeRenderFrame,
      afterRenderFrame,
      showStats
    } = this.props;
    this.threeRootElement.style.position = 'relative';
    threeify(this.threeRootElement, {
      onReady,
      beforeRenderFrame,
      afterRenderFrame,
      showStats
    });
  }

  render() {
    return (
      <div
        className={this.props.className}
        ref={element => (this.threeRootElement = element)}
      />
    );
  }
}

const threeify = (
  container,
  { onReady, beforeRenderFrame, afterRenderFrame, showStats }
) => {
  // Create the canvas
  const canvas = document.createElement('canvas');
  container.appendChild(canvas);
  window.onresize = resizeCanvas;
  resizeCanvas(); // resize once to make the canvas fill its container

  const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
  const scene = new THREE.Scene();
  const aspect = canvas.offsetWidth / canvas.offsetHeight;
  const camera = new THREE.PerspectiveCamera(70, aspect, 1, 10);
  let rendererStats;
  let statses;

  renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
  renderer.setClearColor(0x000000);
  camera.position.set(0, 0, 5);
  camera.lookAt(0, 0, 0);

  if (showStats) {
    addStatsOverlays();
  }

  onReady && onReady({ canvas, container, renderer, scene, camera });

  // Start the render loop just before returning
  renderFrame({ renderer, scene, camera });

  return canvas;

  function addStatsOverlays() {
    // RendererStats shows geometry counts
    rendererStats = new RendererStats();
    rendererStats.domElement.style.position = 'absolute';
    rendererStats.domElement.style.right = '10px';
    rendererStats.domElement.style.top = '10px';
    container.appendChild(rendererStats.domElement);

    // Stats (stats.js) shows FPS, memory, etc...
    const statsContainer = document.createElement('div');
    statsContainer.style.position = 'absolute';
    statsContainer.style.left = '10px';
    statsContainer.style.top = '10px';
    statses = [0, 1, 2].map(id => {
      var stats = new Stats();
      stats.showPanel(id);
      stats.dom.style.position = 'static';
      stats.dom.style.marginBottom = '5px';
      statsContainer.appendChild(stats.dom);
      return stats;
    });
    container.appendChild(statsContainer);
  }

  function bindEventListeners() {}

  function resizeCanvas() {
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  function renderFrame() {
    if (showStats) {
      statses && statses.map(stats => stats.begin());
    }

    beforeRenderFrame && beforeRenderFrame({ renderer, scene, camera });
    renderer.render(scene, camera);
    afterRenderFrame && afterRenderFrame({ renderer, scene, camera });

    if (showStats) {
      rendererStats && rendererStats.update(renderer);
      statses && statses.map(stats => stats.end());
    }

    requestAnimationFrame(renderFrame);
  }
};

Threeact.propTypes = {
  onReady: PropTypes.func,
  beforeRenderFrame: PropTypes.func,
  afterRenderFrame: PropTypes.func,
  showStats: PropTypes.bool
};

Threeact.defaultProps = {
  className: 'threeact'
};
