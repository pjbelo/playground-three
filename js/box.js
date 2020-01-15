
// variables are defined in an object so they can be also accessed by dat.gui
var params = {
  cube: { autoRotation: true,
    resetPosition: function() {cube.position.set(0,0,0);},
    resetRotation: function() {cube.rotation.set(0,0,0);},
    resetSize: function() {cube.scale.set(1,1,1)},
    color1: '#FFD500', // yellow
    color2: '#009B48', // green
    color3: '#0045AD', // blue
    color4: '#FFFFFF', // white
    color5: '#B90000', // red
    color6: '#FF5900', // orange
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
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// cube (box)
var cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
cubeGeometry.colorsNeedUpdate = true;
var cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, vertexColors: THREE.FaceColors });
var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
scene.add(cube);

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
if (params.cube.autoRotation) { autoRotate(); }
}

function autoRotate() {
cube.rotation.x += .01;
cube.rotation.y += .01;
if (cube.rotation.x > Math.PI * 2) { cube.rotation.x = 0; }
if (cube.rotation.y > Math.PI * 2) { cube.rotation.y = 0; }
}

function refreshColors() {
cube.geometry.faces[0].color.set(params.cube.color1);
cube.geometry.faces[1].color.set(params.cube.color1);
cube.geometry.faces[2].color.set(params.cube.color2);
cube.geometry.faces[3].color.set(params.cube.color2);
cube.geometry.faces[4].color.set(params.cube.color3);
cube.geometry.faces[5].color.set(params.cube.color3);
cube.geometry.faces[6].color.set(params.cube.color4);
cube.geometry.faces[7].color.set(params.cube.color4);
cube.geometry.faces[8].color.set(params.cube.color5);
cube.geometry.faces[9].color.set(params.cube.color5);
cube.geometry.faces[10].color.set(params.cube.color6);
cube.geometry.faces[11].color.set(params.cube.color6);
cubeGeometry.colorsNeedUpdate = true; // flag to update colors
}

// Set flags only for attributes that you need to update, updates are costly. 
// Once buffers change, these flags reset automatically back to false. 
// You need to keep setting them to true if you want to keep updating buffers. 
// Note that this applies only to Geometry and not to BufferGeometry.
// https://threejs.org/docs/#manual/en/introduction/How-to-update-things


//// GUI ////

var gui = new dat.GUI();

var positionFolder = gui.addFolder('Box Position');
positionFolder.add(cube.position, 'x').step(0.1).listen();
positionFolder.add(cube.position, 'y').step(0.1).listen();
positionFolder.add(cube.position, 'z').step(0.1).listen();
positionFolder.add(params.cube, 'resetPosition');
positionFolder.open();

var sizeFolder = gui.addFolder('Box Size');
sizeFolder.add(cube.scale, 'x').step(0.1).listen();
sizeFolder.add(cube.scale, 'y').step(0.1).listen();
sizeFolder.add(cube.scale, 'z').step(0.1).listen();
sizeFolder.add(params.cube, 'resetSize');

var rotationFolder = gui.addFolder('Box Rotation (radians)');
rotationFolder.add(cube.rotation, 'x').step(0.1).listen();
rotationFolder.add(cube.rotation, 'y').step(0.1).listen();
rotationFolder.add(cube.rotation, 'z').step(0.1).listen();
rotationFolder.add(params.cube, 'resetRotation');

var colorsFolder = gui.addFolder('Box Colors');
colorsFolder.addColor(params.cube, 'color1').onChange( function() {refreshColors();});
colorsFolder.addColor(params.cube, 'color2').onChange( function() {refreshColors();});
colorsFolder.addColor(params.cube, 'color3').onChange( function() {refreshColors();});
colorsFolder.addColor(params.cube, 'color4').onChange( function() {refreshColors();});
colorsFolder.addColor(params.cube, 'color5').onChange( function() {refreshColors();});
colorsFolder.addColor(params.cube, 'color6').onChange( function() {refreshColors();});

var planeFolder = gui.addFolder('Plane');
planeFolder.add(plane, 'visible');

var autoRotationFolder = gui.addFolder('Box autoRotation');
autoRotationFolder.add(params.cube, 'autoRotation');
autoRotationFolder.open();



animate();
