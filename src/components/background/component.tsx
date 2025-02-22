import { Mesh, MirroredRepeatWrapping, NearestFilter, OrthographicCamera, PlaneGeometry, Scene, ShaderMaterial, TextureLoader, Vector3, WebGLRenderer } from "three";
import fragmentShader from "./shader.glsl?raw";

import { Props } from ".";
import { classNames } from "../../helper";

const uniforms = {
  iTime: { value: 0 },
  iResolution: { value: new Vector3() },
  iMouse: { value: new Vector3() }, // Controls the droplet size
};

const initThree = (canvas: HTMLCanvasElement | null) => {
  if (canvas === null) return;

  const renderer = new WebGLRenderer({ antialias: true, canvas });
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

  scene.add(new Mesh(plane, material));

  // Canvas resizer
  function resizeRendererToDisplaySize() {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  // Render loop
  function render(time: number) {
    resizeRendererToDisplaySize();

    uniforms.iResolution.value.set(canvas!.width, canvas!.height, 1);
    uniforms.iTime.value = time / 1000;
    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
};

const BackgroundComponent: React.FC<Props> = ({ className }) => {
  const rootClass = classNames({
    "c-background": true,
    [`${className}`]: Boolean(className),
  });

  return (
    <div className={rootClass}>
      <style jsx>{`
        .c-background {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          bottom: 0;
          overflow: hidden;
          z-index: 0;
        }

        canvas, .c-background {
          width: 100%;
          height: 100%;
          opacity: 0.6;
          filter: blur(1px);
        }
      `}</style>
      <canvas ref={(ref) => initThree(ref)} />
    </div>
  );
};

export default BackgroundComponent;