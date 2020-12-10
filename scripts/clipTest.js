// import { OrbitControls } from "https://unpkg.com/three@0.123.0/examples/jsm/controls/OrbitControls.js";
import * as THREE from "../modules/three/build/three.module.js";
import { OrbitControls } from "../modules/three/examples/jsm/controls/OrbitControls.js";
import { FBXLoader } from "../modules/three/examples/jsm/loaders/FBXLoader.js";
import { createPlaneStencilGroup } from "./utils3d.js";

var object, planes, planeObjects, planeHelpers;

var container = document.querySelector(".canvas-3d"),
  w = container.clientWidth,
  h = container.clientHeight,
  scene = new THREE.Scene(),
  camera = new THREE.PerspectiveCamera(75, w / h, 0.001, 1000),
  controls = new OrbitControls(camera, container),
  renderConfig = { antialias: true, alpha: false },
  renderer = new THREE.WebGLRenderer(renderConfig);
controls.target = new THREE.Vector3(0, 0, 0.75);
controls.panSpeed = 5.4;
camera.position.set(-155, 16, -150);
render.localClippingEnabled = true;
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(w, h);
renderer.localClippingEnabled = true;
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

planes = [new THREE.Plane(new THREE.Vector3(0, -1, 0), 10)];

planeHelpers = planes.map((p) => new THREE.PlaneHelper(p, 60, 0xffffff));
planeHelpers.forEach((ph) => {
  ph.visible = true;
  scene.add(ph);
});

const loader = new FBXLoader();
loader.load("../3dmodels/maia/test.fbx", (model) => {
  model.name = "FBXImported";
  const modelMeshArray = model.children;
  modelMeshArray.forEach((mesh) => {
    const geometry = mesh.geometry;
    // mesh.material.clippingPlanes = planes;
    object = new THREE.Group();
    

    // Set up clip plane rendering
    planeObjects = [];
    const planeGeom = new THREE.PlaneBufferGeometry(5000, 5000);

    for (let i = 0; i < 1; i++) {
      const poGroup = new THREE.Group();
      const plane = planes[i];
      const stencilGroup = createPlaneStencilGroup(geometry, plane, i + 1);

      // plane is clipped by the other clipping planes
      const planeMat = new THREE.MeshStandardMaterial({
        color: 0xe91e63,
        metalness: 0.1,
        roughness: 0.75,
        clippingPlanes: planes.filter((p) => p !== plane),

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
      color: 0xffc107,
      metalness: 0.1,
      roughness: 0.75,
      clippingPlanes: planes,
      clipShadows: true,
      shadowSide: THREE.DoubleSide,
    });

    // add the color
    const clippedColorFront = new THREE.Mesh(geometry, material);
    clippedColorFront.castShadow = true;
    clippedColorFront.renderOrder = 6;
    object.add(clippedColorFront);
    scene.add(object);
  });
  // scene.add(model);
});

const helper = new THREE.AxesHelper(5);
scene.add(helper);
function render() {
  requestAnimationFrame(render);
  if(planeObjects){
    for ( let i = 0; i < planeObjects.length; i ++ ) {

      const plane = planes[ i ];
      const po = planeObjects[ i ];
      plane.coplanarPoint( po.position );
      
      po.lookAt(
        po.position.x - plane.normal.x,
        po.position.y - plane.normal.y,
        po.position.z - plane.normal.z,
      );
  
    }
  }
  
  renderer.render(scene, camera);
  controls.update();
}
render();
