import { createModal } from './modal.js';

// variables are defined in an object so they can be also accessed by dat.gui
var params = {
    box: { autoRotation: true,
        color1: '#FFD500', // yellow
        color2: '#009B48', // green
        color3: '#0045AD', // blue
        color4: '#FFFFFF', // white
        color5: '#B90000', // red
        color6: '#FF5900', // orange
        },
    camera: {
      resetPosition: function() {camera.position.set(0,0,5);},
      resetRotation: function() {camera.rotation.set(0,0,0);},
    },
    help: {
      cameraNew: function() { createModal(cameraNewText());},
      cameraPosition: function() { createModal(cameraPositionText());},
      cameraRotation: function() { createModal(cameraRotationText());},
    }
}

// scene
var scene = new THREE.Scene();
scene.background = new THREE.Color(0x2f7dfb);

// camera
var fov = 75;
// fov — Camera frustum vertical field of view.
var aspect = window.innerWidth / window.innerHeight;
// aspect — Camera frustum aspect ratio.
var near = 0.1;
// near — Camera frustum near plane.
var far = 1000;
// far — Camera frustum far plane.
var camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 5;

// renderer
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth-32, window.innerHeight-72);
document.body.appendChild(renderer.domElement);

// box
var boxGeometry = new THREE.BoxGeometry(1, 1, 1);
boxGeometry.colorsNeedUpdate = true;
var boxMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, vertexColors: THREE.FaceColors });
var box = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(box);

// plane
var planeGeometry = new THREE.PlaneGeometry(10, 10);
var planeMaterial = new THREE.MeshPhongMaterial({ 
                    color: 0xc2c2c2, 
                    side: THREE.DoubleSide,
                    opacity: 0.9,
                    transparent: true
                  });
var plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.position.y = -1.5;
plane.rotation.x = 3.1415 / 2;
scene.add(plane);

// directional light
function addLight(...pos) {
  const color = 0xFFFFFF;
  const intensity = 1;
  const light = new THREE.DirectionalLight(color, intensity);
  light.position.set(...pos);
  scene.add(light);
}
addLight(-1, 2, 4);

refreshColors();

function animate() {
  requestAnimationFrame(animate);
  refreshRotation();
  renderer.render(scene, camera);
}

function refreshRotation() {
  if (params.box.autoRotation) { boxAutoRotate(); }
}

function boxAutoRotate() {
  box.rotation.x += .01;
  box.rotation.y += .01;
  if (box.rotation.x > Math.PI * 2) { box.rotation.x = 0; }
  if (box.rotation.y > Math.PI * 2) { box.rotation.y = 0; }
}

function refreshCamera() {
  camera.updateProjectionMatrix();
}

function refreshColors() {
  box.geometry.faces[0].color.set(params.box.color1);
  box.geometry.faces[1].color.set(params.box.color1);
  box.geometry.faces[2].color.set(params.box.color2);
  box.geometry.faces[3].color.set(params.box.color2);
  box.geometry.faces[4].color.set(params.box.color3);
  box.geometry.faces[5].color.set(params.box.color3);
  box.geometry.faces[6].color.set(params.box.color4);
  box.geometry.faces[7].color.set(params.box.color4);
  box.geometry.faces[8].color.set(params.box.color5);
  box.geometry.faces[9].color.set(params.box.color5);
  box.geometry.faces[10].color.set(params.box.color6);
  box.geometry.faces[11].color.set(params.box.color6);
  boxGeometry.colorsNeedUpdate = true;
}

// Set flags only for attributes that you need to update, updates are costly. 
// Once buffers change, these flags reset automatically back to false. 
// You need to keep setting them to true if you want to keep updating buffers. 
// Note that this applies only to Geometry and not to BufferGeometry.
// https://threejs.org/docs/#manual/en/introduction/How-to-update-things



// GUI

var gui = new dat.GUI();

var positionFolder = gui.addFolder('Camera Position');
positionFolder.add(camera.position, 'x').step(0.1).listen();
positionFolder.add(camera.position, 'y').step(0.1).listen();
positionFolder.add(camera.position, 'z').step(0.1).listen();
positionFolder.add(params.camera, 'resetPosition');
positionFolder.open();

var rotationFolder = gui.addFolder('Camera Rotation (radians)');
rotationFolder.add(camera.rotation, 'x').step(0.1).listen();
rotationFolder.add(camera.rotation, 'y').step(0.1).listen();
rotationFolder.add(camera.rotation, 'z').step(0.1).listen();
rotationFolder.add(params.camera, 'resetRotation');

var paramsFolder = gui.addFolder('Camera Parameters');
paramsFolder.add(camera, 'aspect').step(0.1).onChange( function() {refreshCamera();});
paramsFolder.add(camera, 'fov').step(1).onChange( function() {refreshCamera();});
paramsFolder.add(camera, 'near').step(0.1).onChange( function() {refreshCamera();});
paramsFolder.add(camera, 'far').step(1).onChange( function() {refreshCamera();});

var planeFolder = gui.addFolder('Plane');
planeFolder.add(plane, 'visible');

var autoRotationFolder = gui.addFolder('Box autoRotation');
autoRotationFolder.add(params.box, 'autoRotation');
autoRotationFolder.open();

var helpFolder = gui.addFolder('Help Code');
helpFolder.add(params.help, 'cameraNew').name('cameraNew (parameters)');
helpFolder.add(params.help, 'cameraPosition');
helpFolder.add(params.help, 'cameraRotation');

// Help Text

function cameraNewText() {
  var text =`
  var fov = ${camera.fov.toFixed(0)};<br>
  // fov — Camera frustum vertical field of view.<br>
  var aspect = ${camera.aspect.toFixed(2)};<br>
  // aspect — Camera frustum aspect ratio.<br>
  var near = ${camera.near.toFixed(2)};<br>
  // near — Camera frustum near plane.<br>
  var far = ${camera.far.toFixed(0)};<br>
  // far — Camera frustum far plane.<br>
  var camera = new THREE.PerspectiveCamera(fov, aspect, near, far);`;
return text;
}

function cameraPositionText() {
  var text =`
  camera.position.x = ${camera.position.x.toFixed(2)};<br>
  camera.position.y = ${camera.position.y.toFixed(2)};<br>
  camera.position.z = ${camera.position.z.toFixed(2)};`;
  return text;
}

function cameraRotationText() {
  var text =`
  camera.rotation.x = ${camera.rotation.x.toFixed(2)};<br>
  camera.rotation.y = ${camera.rotation.y.toFixed(2)};<br>
  camera.rotation.z = ${camera.rotation.z.toFixed(2)};`;  
  return text;
}

animate();
