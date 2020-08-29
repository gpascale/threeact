import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { WebGLRenderer, Scene, PerspectiveCamera } from 'three';
import RendererStats from '@xailabs/three-renderer-stats';
import Stats from 'stats-js';

function animate() {}

requestAnimationFrame(animate);

export type OnReadyArgs = {
  canvas: HTMLCanvasElement;
  container: HTMLElement;
  renderer: WebGLRenderer;
  scene: Scene;
  camera: PerspectiveCamera;
};

export type RenderCallbackArgs = {
  renderer: WebGLRenderer;
  scene: Scene;
  camera: PerspectiveCamera;
};

export type ThreeactProps = {
  onReady: (args: OnReadyArgs) => any;
  beforeRenderFrame: (args: RenderCallbackArgs) => any;
  afterRenderFrame: (args: RenderCallbackArgs) => any;
  showStats?: boolean;
  className?: string;
};

const Threeact = (props: ThreeactProps) => {
  const threeRootElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { onReady, beforeRenderFrame, afterRenderFrame, showStats } = props;
    console.log(`threeRootElement.current:`, threeRootElement.current);
    if (threeRootElement.current) {
      // let el = threeRootElement.current as MutableRefObject<HTMLElement>;
      threeRootElement.current.style.position = 'relative';
      threeify(threeRootElement.current, {
        onReady,
        beforeRenderFrame,
        afterRenderFrame,
        showStats
      });
    }
  });
  return <div className={props.className} ref={threeRootElement} />;
};

const threeify = (
  container: HTMLElement,
  args: {
    onReady: (args: OnReadyArgs) => any;
    beforeRenderFrame: (args: RenderCallbackArgs) => any;
    afterRenderFrame: (args: RenderCallbackArgs) => any;
    showStats?: boolean;
  }
) => {
  const { onReady, beforeRenderFrame, afterRenderFrame, showStats } = args;

  // Create the canvas
  const canvas = document.createElement('canvas');
  container.appendChild(canvas);
  window.onresize = resizeCanvas;
  resizeCanvas(); // resize once to make the canvas fill its container

  const renderer = new WebGLRenderer({ antialias: true, canvas });
  const scene = new Scene();
  const aspect = canvas.offsetWidth / canvas.offsetHeight;
  const camera = new PerspectiveCamera(70, aspect, 1, 10);
  let rendererStats: any;
  let statses: any;

  renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
  renderer.setClearColor(0x000000);
  camera.position.set(0, 0, 5);
  camera.lookAt(0, 0, 0);

  if (showStats) {
    addStatsOverlays();
  }

  onReady && onReady({ canvas, container, renderer, scene, camera });

  // Start the render loop just before returning
  renderFrame();

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
      statses && statses.map((stats: any) => stats.begin());
    }

    const shouldRender =
      !beforeRenderFrame ||
      beforeRenderFrame({ renderer, scene, camera }) !== false;

    if (shouldRender) {
      renderer.render(scene, camera);
      afterRenderFrame && afterRenderFrame({ renderer, scene, camera });
    }

    if (showStats) {
      rendererStats && rendererStats.update(renderer);
      statses && statses.map((stats: any) => stats.end());
    }

    requestAnimationFrame(renderFrame);
  }
};

Threeact.defaultProps = {
  className: 'threeact'
};

export default Threeact;
