// import { OrbitControls } from "https://unpkg.com/three@0.123.0/examples/jsm/controls/OrbitControls.js";
import * as THREE from "../modules/three/build/three.module.js";
import { OrbitControls } from "../modules/three/examples/jsm/controls/OrbitControls.js";
import { FBXLoader } from "../modules/three/examples/jsm/loaders/FBXLoader.js";
import { createPlaneStencilGroup } from "./utils3d.js";

var container = document.querySelector(".canvas-3d"),
  w = container.clientWidth,
  h = container.clientHeight,
  scene = new THREE.Scene(),
  camera = new THREE.PerspectiveCamera(75, w / h, 0.001, 1000),
  controls = new OrbitControls(camera, container),
  renderConfig = { antialias: true, alpha: true },
  renderer = new THREE.WebGLRenderer(renderConfig);
controls.target = new THREE.Vector3(0, 0, 0.75);
controls.panSpeed = 5.4;
camera.position.set(-155, 16, -150);
render.localClippingEnabled = true;
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(w, h);
scene.add(new THREE.AmbientLight(0xdddddd));
scene.add(new THREE.DirectionalLight(0xdcdcdc, 0.5));
container.appendChild(renderer.domElement);

//Resize events
window.addEventListener("resize", function () {
  w = container.clientWidth;
  h = container.clientHeight;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
});
//Render
function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
  controls.update();
}




//Clipping
let planes, planeObjects, planeHelpers, object;
planes = [
  new THREE.Plane(new THREE.Vector3(-1, 0, 0), 0),
  new THREE.Plane(new THREE.Vector3(0, -1, 0), 0),
  new THREE.Plane(new THREE.Vector3(0, 0, -1), 0),
];
planeHelpers = planes.map((p) => new THREE.PlaneHelper(p, 200, 0xffffff));
planeHelpers.forEach((ph) => {
  ph.visible = true;
  scene.add(ph);
});
// Set up clip plane rendering
planeObjects = [];
const planeGeom = new THREE.PlaneBufferGeometry(200, 200);


//Load fbx
const loader = new FBXLoader();
loader.load("../3dmodels/maia/maia.fbx", (model) => {
  model.scale.multiplyScalar(0.1);
  console.log("model", model);

  model.traverse(mesh => {
    const geometry = mesh.geometry;
    for (let i = 0; i < 3; i++) {
      let plane = planes[i];
      let stencilGroup = createPlaneStencilGroup(geometry, plane, i + 1);
      let poGroup = new THREE.Group();

      // plane is clipped by the other clipping planes
      const planeMat =
        new THREE.MeshStandardMaterial({

          color: 0xE91E63,
          metalness: 0.1,
          roughness: 0.75,
          clippingPlanes: planes.filter(p => p !== plane),

          stencilWrite: true,
          stencilRef: 0,
          stencilFunc: THREE.NotEqualStencilFunc,
          stencilFail: THREE.ReplaceStencilOp,
          stencilZFail: THREE.ReplaceStencilOp,
          stencilZPass: THREE.ReplaceStencilOp,

        });
      const po = new THREE.Mesh(planeGeom, planeMat);
      po.onAfterRender = function (renderer) {

        renderer.clearStencil();

      };

      po.renderOrder = i + 1.1;

      object.add(stencilGroup);
      poGroup.add(po);
      planeObjects.push(po);
      scene.add(poGroup);
    }
    const material = new THREE.MeshStandardMaterial({

      color: 0xFFC107,
      metalness: 0.1,
      roughness: 0.75,
      clippingPlanes: planes,
      clipShadows: true,
      shadowSide: THREE.DoubleSide,
    });
    const clippedColorFront = new THREE.Mesh( geometry, material );
            clippedColorFront.castShadow = true;
            clippedColorFront.renderOrder = 6;
            object.add( clippedColorFront );
  });
 
  scene.add(model);

});


object = new THREE.Group();
scene.add(object);
for (let i = 0; i < 3; i++) {

}





// draw some geometries
// var geometry = new THREE.TorusGeometry(10, 3, 16, 100);
// var material = new THREE.MeshNormalMaterial({ color: 0xffff00 });
// var torus = new THREE.Mesh(geometry, material);
// scene.add(torus);
const helper = new THREE.AxesHelper(5);
scene.add(helper);
render();
