import { createModal } from './modal.js';

// variables are defined in an object so they can be also accessed by dat.gui
var params = {
    box: {
      autoRotation: true,
      resetPosition: function() {box.position.set(0,0,0);},
      resetRotation: function() {box.rotation.set(0,0,0);},
      resetSize: function() {box.scale.set(1,1,1)},
      color1: '#FFD500', // yellow
      color2: '#009B48', // green
      color3: '#0045AD', // blue
      color4: '#FFFFFF', // white
      color5: '#B90000', // red
      color6: '#FF5900', // orange
    },
    help: {
      boxNew: function() { createModal(boxNewText);},
      boxPosition: function() { createModal(boxPositionText());},
      boxSize: function() { createModal(boxSizeText());},
      boxRotation: function() { createModal(boxRotationText());},
      boxColor: function() { createModal(boxColorText());},
    }
}

// scene
var scene = new THREE.Scene();
scene.background = new THREE.Color(0x2f7dfb);

// camera
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
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
  if (params.box.autoRotation) { autoRotate(); }
}

function autoRotate() {
  box.rotation.x += .01;
  box.rotation.y += .01;
  if (box.rotation.x > Math.PI * 2) { box.rotation.x = 0; }
  if (box.rotation.y > Math.PI * 2) { box.rotation.y = 0; }
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
  boxGeometry.colorsNeedUpdate = true; // flag to update colors
}

// Set flags only for attributes that you need to update, updates are costly. 
// Once buffers change, these flags reset automatically back to false. 
// You need to keep setting them to true if you want to keep updating buffers. 
// Note that this applies only to Geometry and not to BufferGeometry.
// https://threejs.org/docs/#manual/en/introduction/How-to-update-things


//// GUI ////

var gui = new dat.GUI();

var positionFolder = gui.addFolder('Box Position');
positionFolder.add(box.position, 'x').step(0.1).listen();
positionFolder.add(box.position, 'y').step(0.1).listen();
positionFolder.add(box.position, 'z').step(0.1).listen();
positionFolder.add(params.box, 'resetPosition');
positionFolder.open();

var sizeFolder = gui.addFolder('Box Size');
sizeFolder.add(box.scale, 'x').step(0.1).listen();
sizeFolder.add(box.scale, 'y').step(0.1).listen();
sizeFolder.add(box.scale, 'z').step(0.1).listen();
sizeFolder.add(params.box, 'resetSize');

var rotationFolder = gui.addFolder('Box Rotation (radians)');
rotationFolder.add(box.rotation, 'x').step(0.1).listen();
rotationFolder.add(box.rotation, 'y').step(0.1).listen();
rotationFolder.add(box.rotation, 'z').step(0.1).listen();
rotationFolder.add(params.box, 'resetRotation');

var colorsFolder = gui.addFolder('Box Colors');
colorsFolder.addColor(params.box, 'color1').onChange( function() {refreshColors();});
colorsFolder.addColor(params.box, 'color2').onChange( function() {refreshColors();});
colorsFolder.addColor(params.box, 'color3').onChange( function() {refreshColors();});
colorsFolder.addColor(params.box, 'color4').onChange( function() {refreshColors();});
colorsFolder.addColor(params.box, 'color5').onChange( function() {refreshColors();});
colorsFolder.addColor(params.box, 'color6').onChange( function() {refreshColors();});

var planeFolder = gui.addFolder('Plane');
planeFolder.add(plane, 'visible');

var autoRotationFolder = gui.addFolder('Box autoRotation');
autoRotationFolder.add(params.box, 'autoRotation');
autoRotationFolder.open();

var helpFolder = gui.addFolder('Help Code');
helpFolder.add(params.help, 'boxNew');
helpFolder.add(params.help, 'boxPosition');
helpFolder.add(params.help, 'boxSize').name('boxSize (scale)');
helpFolder.add(params.help, 'boxRotation');
helpFolder.add(params.help, 'boxColor');

// Help Text

var boxNewText =
"var boxGeometry = new THREE.BoxGeometry(1, 1, 1);<br>"+
"// Face color - for this to be used a material's vertexColors property must be set to THREE.FaceColors <br>"+
"var boxMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, vertexColors: THREE.FaceColors });<br>"+
"var box = new THREE.Mesh(boxGeometry, boxMaterial);<br>"+
"scene.add(box);";

function boxPositionText() {
  var text =`
  box.position.x = ${box.position.x};<br>
  box.position.y = ${box.position.y};<br>
  box.position.z = ${box.position.z};`;
  return text;
}

function boxSizeText() {
  var text =`
  box.scale.x = ${box.scale.x};<br>
  box.scale.y = ${box.scale.y};<br>
  box.scale.z = ${box.scale.z};`;  
  return text;
}

function boxRotationText() {
  var text =`
  box.rotation.x = ${box.rotation.x.toFixed(2)};<br>
  box.rotation.y = ${box.rotation.y.toFixed(2)};<br>
  box.rotation.z = ${box.rotation.z.toFixed(2)};`;  
  return text;
}

function boxColorText() {
  var text =`
  // each rectangular face is composed of two triangular faces (Face3)<br>
  box.geometry.faces[0].color.set(${params.box.color1});<br>
  box.geometry.faces[1].color.set(${params.box.color1});<br>
  box.geometry.faces[2].color.set(${params.box.color2});<br>
  box.geometry.faces[3].color.set(${params.box.color2});<br>
  box.geometry.faces[4].color.set(${params.box.color3});<br>
  box.geometry.faces[5].color.set(${params.box.color3});<br>
  box.geometry.faces[6].color.set(${params.box.color4});<br>
  box.geometry.faces[7].color.set(${params.box.color4});<br>
  box.geometry.faces[8].color.set(${params.box.color5});<br>
  box.geometry.faces[9].color.set(${params.box.color5});<br>
  box.geometry.faces[10].color.set(${params.box.color6});<br>
  box.geometry.faces[11].color.set(${params.box.color6});<br>
  boxGeometry.colorsNeedUpdate = true; // flag to update colors`;
  return text;
}


animate();
