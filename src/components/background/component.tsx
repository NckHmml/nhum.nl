import { RefObject, useRef } from "react";
import { Mesh, MirroredRepeatWrapping, NearestFilter, OrthographicCamera, PlaneGeometry, Scene, ShaderMaterial, TextureLoader, Vector3, WebGLRenderer } from "three";

import { Props } from ".";
import fragmentShader from "./shader.glsl?raw";

import { classNames } from "~/helper";

const uniforms = {
  iTime: { value: 0 },
  iResolution: { value: new Vector3() },
  iScale: { value: new Vector3(100, 0, 0) }, // Controls the droplet size
};
const FPS = 30; // FPS Limitation, else it would only be limited by requestAnimationFrame

const initThree = (rendererRef: RefObject<WebGLRenderer | null>, canvas: HTMLCanvasElement | null) => {
  if (canvas === null) return;

  let renderer = rendererRef.current;
  if (renderer !== null) {
    renderer.dispose();
    console.log("Disposing old Three.js renderer");
  } else {
    const pixelRatio = window.devicePixelRatio;
    let AA = true;
    if (pixelRatio > 1) {
      AA = false;
    }

    renderer = new WebGLRenderer({ antialias: AA, canvas });
    rendererRef.current = renderer;
  }

  renderer.autoClearColor = false;

  const loader = new TextureLoader();
  const camera = new OrthographicCamera(-1, 1, 1, -1, -1, 1);
  const scene = new Scene();
  const plane = new PlaneGeometry(2, 2);

  // Load background image
  const texture = loader.load("assets/background.jpeg");
  texture.minFilter = NearestFilter;
  texture.magFilter = NearestFilter;
  texture.wrapS = MirroredRepeatWrapping;
  texture.wrapT = MirroredRepeatWrapping;
  Object.assign(uniforms, { iChannel0: { value: texture } });

  // Create shader material
  const material = new ShaderMaterial({ fragmentShader, uniforms });
  const mesh = new Mesh(plane, material);
  scene.add(mesh);

  // Canvas resizer
  function resizeRendererToDisplaySize() {
    if (renderer === null) return;
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
      uniforms.iResolution.value.set(canvas!.width, canvas!.height, 1);
    }
    return needResize;
  }

  // Render loop
  let delta = 0;
  let lastRender = 0;
  uniforms.iResolution.value.set(canvas!.width, canvas!.height, 1);

  function render(time: number) {
    if (renderer === null) return;

    delta = time - lastRender;

    // Once per FPS
    if (delta > (1000 / FPS)) {
      delta = 0;
      lastRender = time;

      resizeRendererToDisplaySize();
      // Time in ms -> time in seconds
      uniforms.iTime.value = time / 1e3;
      renderer.render(scene, camera);
    }

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
};

const BackgroundComponent: React.FC<Props> = ({ className }) => {
  const renderer = useRef<WebGLRenderer>(null);
  const rootClass = classNames({
    "c-background": true,
    [`${className}`]: Boolean(className),
  });

  return (
    <div className={rootClass}>
      <style jsx>{`
        .c-background {
          position: fixed;
          top: 0;
          bottom: 0;
          overflow: hidden;
          z-index: 0;
        }

        .c-background > div {
          width: 100vw;
          height: 100vh;
          display: flex;
          align-items: center;

          /* Make the quality look better than it really is */
          filter: blur(2px);
          opacity: 0.6;
        }

        canvas {
          margin: 0 auto;
          /* Show at half resolution */
          width: 50vw;
          height: 50vh;
          transform: scale(2); 
        }
      `}</style>
      <div>
        <canvas ref={(ref) => initThree(renderer, ref)} />
      </div>
    </div>
  );
};

export default BackgroundComponent;