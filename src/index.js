import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as THREE from 'three';
import RendererStats from '@xailabs/three-renderer-stats';
import Stats from 'stats-js';

function animate() {}

requestAnimationFrame(animate);

export default class Threeact extends Component {
  componentDidMount() {
    const { onReady, onRenderFrame, showStats } = this.props;
    this.threeRootElement.style.position = 'relative';
    threeify(this.threeRootElement, { onReady, onRenderFrame, showStats });
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

const threeify = (container, { onReady, onRenderFrame, showStats }) => {
  const canvas = document.createElement('canvas');
  bindEventListeners();
  container.appendChild(canvas);

  const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
  renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
  renderer.setClearColor(0x000000);

  const scene = new THREE.Scene();

  const aspect = canvas.offsetWidth / canvas.offsetHeight;
  const camera = new THREE.PerspectiveCamera(70, aspect, 1, 10);
  camera.position.set(0, 0, 5);
  camera.lookAt(0, 0, 0);

  onReady && onReady({ canvas, container, renderer, scene, camera });

  renderFrame({ renderer, scene, camera });

  let rendererStats;
  let statses;

  if (showStats) {
    // RendererStats shows geometry counts
    rendererStats = new RendererStats();
    rendererStats.domElement.style.position = 'absolute';
    rendererStats.domElement.style.right = '10px';
    rendererStats.domElement.style.top = '10px';
    container.appendChild(rendererStats.domElement);

    // Stats shows FPS, memory, etc...
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

  return canvas;

  function bindEventListeners() {
    window.onresize = resizeCanvas;
    resizeCanvas();
  }

  function resizeCanvas() {
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  function renderFrame() {
    statses && statses.map(stats => stats.begin());

    onRenderFrame({ renderer, scene, camera });

    rendererStats && rendererStats.update(renderer);
    statses && statses.map(stats => stats.end());

    requestAnimationFrame(renderFrame);
  }
};

Threeact.propTypes = {
  onReady: PropTypes.func,
  onRenderFrame: PropTypes.func,
};

Threeact.defaultProps = {
  className: 'threeact',
};
