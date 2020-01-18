
// variables are defined in an object so they can be also accessed by dat.gui
var params = {
  cube: { autoRotation: true,
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
  cubeGeometry.colorsNeedUpdate = true;
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

// var colorsFolder = gui.addFolder('Box Colors');
// colorsFolder.addColor(params.cube, 'color1').onChange( function() {refreshColors();});
// colorsFolder.addColor(params.cube, 'color2').onChange( function() {refreshColors();});
// colorsFolder.addColor(params.cube, 'color3').onChange( function() {refreshColors();});
// colorsFolder.addColor(params.cube, 'color4').onChange( function() {refreshColors();});
// colorsFolder.addColor(params.cube, 'color5').onChange( function() {refreshColors();});
// colorsFolder.addColor(params.cube, 'color6').onChange( function() {refreshColors();});

var autoRotationFolder = gui.addFolder('Box autoRotation');
autoRotationFolder.add(params.cube, 'autoRotation');
autoRotationFolder.open();

function refreshCamera() {
  camera.updateProjectionMatrix();
}


animate();
