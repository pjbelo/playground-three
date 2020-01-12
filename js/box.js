/* eslint-disable space-before-function-paren */
/* eslint-disable semi */

const GREEN = 0x009B48;
const BLUE = 0x0045AD
const RED = 0xB90000
const YELLOW = 0xFFD500
const WHITE = 0xFFFFFF
const ORANGE = 0xFF5900
const BLACK = 0x000000

// position variables
var positionX = 0;
var positionY = 0;
var positionZ = 0;
var positionXSpeed = 0;
var positionYSpeed = 0;
var positionZSpeed = 0;

// rotation variables
var rotationX = 0;
var rotationY = 0;
var rotationZ = 0;
var rotationXSpeed = 0;
var rotationYSpeed = 0;
var rotationZSpeed = 0;
var isAutoRotation = true;

var scene = new THREE.Scene();
scene.background = new THREE.Color(0x2f7dfb);

var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
var cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, vertexColors: THREE.FaceColors });
var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

scene.add(cube);

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
// planeMaterial.transparent = true;
// planeMaterial.opacity = 0.9;
scene.add(plane);

camera.position.z = 5;

function animate() {
  requestAnimationFrame(animate);
  refreshRotation();
  refreshPosition();
  renderer.render(scene, camera);
}


//////////// Position /////////////

function getPosition() {
  positionX = parseFloat(document.getElementById("pos_x").value);
  positionY = parseFloat(document.getElementById("pos_y").value);
  positionZ = parseFloat(document.getElementById("pos_z").value);
}

function positionXDecrease() { positionXSpeed = -0.1; }
function positionXIncrease() { positionXSpeed = 0.1; }
function positionYDecrease() { positionYSpeed = -0.1; }
function positionYIncrease() { positionYSpeed = 0.1; }
function positionZDecrease() { positionZSpeed = -0.1; }
function positionZIncrease() { positionZSpeed = 0.1; }

function positionMoveStop() {
  positionXSpeed = 0;
  positionYSpeed = 0;
  positionZSpeed = 0;
}

function isPositionMoving() {
  var isPositionMoving = false;
  if (positionXSpeed != 0 || positionYSpeed != 0 || positionZSpeed != 0) {
    isPositionMoving = true;
  }
  return isPositionMoving;
}

function updatePosition() {
  positionX += positionXSpeed;
  positionY += positionYSpeed;
  positionZ += positionZSpeed;
  updatePositionInputFields();
}

function updatePositionInputFields() {
  document.getElementById("pos_x").value = positionX.toFixed(3);
  document.getElementById("pos_y").value = positionY.toFixed(3);
  document.getElementById("pos_z").value = positionZ.toFixed(3);
}

function refreshPosition() {
  if (isPositionMoving()) {
    updatePosition();
  }
  cube.position.x = positionX;
  cube.position.y = positionY;
  cube.position.z = positionZ;
}

function resetPosition() {
  positionX = 0;
  positionY = 0;
  positionZ = 0;
  updatePosition();
}


// get new position values if input values have changed
document.getElementById("pos_x").addEventListener("change", getPosition);
document.getElementById("pos_y").addEventListener("change", getPosition);
document.getElementById("pos_z").addEventListener("change", getPosition);

document.getElementById("reset_pos").addEventListener("click", resetPosition);


// increase or decrease x values while clicking button
document.getElementById("pos_x_d").addEventListener("mousedown", positionXDecrease);
document.getElementById("pos_x_d").addEventListener("mouseup", positionMoveStop);
document.getElementById("pos_x_i").addEventListener("mousedown", positionXIncrease);
document.getElementById("pos_x_i").addEventListener("mouseup", positionMoveStop);

// increase or decrease y values while clicking button
document.getElementById("pos_y_d").addEventListener("mousedown", positionYDecrease);
document.getElementById("pos_y_d").addEventListener("mouseup", positionMoveStop);
document.getElementById("pos_y_i").addEventListener("mousedown", positionYIncrease);
document.getElementById("pos_y_i").addEventListener("mouseup", positionMoveStop);

// increase or decrease z values while clicking button
document.getElementById("pos_z_d").addEventListener("mousedown", positionZDecrease);
document.getElementById("pos_z_d").addEventListener("mouseup", positionMoveStop);
document.getElementById("pos_z_i").addEventListener("mousedown", positionZIncrease);
document.getElementById("pos_z_i").addEventListener("mouseup", positionMoveStop);



//////////// Rotation /////////////

function getRotation() {
  rotationX = parseFloat(document.getElementById("rot_x").value);
  rotationY = parseFloat(document.getElementById("rot_y").value);
  rotationZ = parseFloat(document.getElementById("rot_z").value);
}

function rotationXDecrease() { rotationXSpeed = -0.1; }
function rotationXIncrease() { rotationXSpeed = 0.1; }
function rotationYDecrease() { rotationYSpeed = -0.1; }
function rotationYIncrease() { rotationYSpeed = 0.1; }
function rotationZDecrease() { rotationZSpeed = -0.1; }
function rotationZIncrease() { rotationZSpeed = 0.1; }

function rotationMoveStop() {
  rotationXSpeed = 0;
  rotationYSpeed = 0;
  rotationZSpeed = 0;
}

function isRotationMoving() {
  var isRotationMoving = false;
  if (rotationXSpeed != 0 || rotationYSpeed != 0 || rotationZSpeed != 0) {
    isRotationMoving = true;
  }
  return isRotationMoving;
}

function updateRotation() {
  rotationX += rotationXSpeed;
  rotationY += rotationYSpeed;
  rotationZ += rotationZSpeed;
  updateRotationInputFields();
}

function updateRotationInputFields() {
  document.getElementById("rot_x").value = rotationX.toFixed(1);
  document.getElementById("rot_y").value = rotationY.toFixed(1);
  document.getElementById("rot_z").value = rotationZ.toFixed(1);
}

function refreshRotation() {
  if (isRotationMoving()) { updateRotation(); }
  if (isAutoRotation) { autoRotate(); }
  cube.rotation.x = rotationX;
  cube.rotation.y = rotationY;
  cube.rotation.z = rotationZ;
}

function resetRotation() {
  rotationX = 0;
  rotationY = 0;
  rotationZ = 0;
  updateRotation();
}


function autoRotate() {
  rotationX += .01;
  rotationY += .01;
  if (rotationX > Math.PI * 2) { rotationX = 0; }
  if (rotationY > Math.PI * 2) { rotationY = 0; }
  updateRotationInputFields();
}

function updateAutoRotation() {
  if (document.getElementById("is_auto_rotation").checked) {
    isAutoRotation = true;
  } else {
    isAutoRotation = false;
  }
}


function updateShowPlane() {
  if (document.getElementById("is_show_plane").checked) {
    plane.visible = true;
  } else {
    plane.visible = false;
  }
}


// get new rotation values if input values have changed
document.getElementById("rot_x").addEventListener("change", getRotation);
document.getElementById("rot_y").addEventListener("change", getRotation);
document.getElementById("rot_z").addEventListener("change", getRotation);

// increase or decrease x values while clicking button
document.getElementById("rot_x_d").addEventListener("mousedown", rotationXDecrease);
document.getElementById("rot_x_d").addEventListener("mouseup", rotationMoveStop);
document.getElementById("rot_x_i").addEventListener("mousedown", rotationXIncrease);
document.getElementById("rot_x_i").addEventListener("mouseup", rotationMoveStop);

// increase or decrease y values while clicking button
document.getElementById("rot_y_d").addEventListener("mousedown", rotationYDecrease);
document.getElementById("rot_y_d").addEventListener("mouseup", rotationMoveStop);
document.getElementById("rot_y_i").addEventListener("mousedown", rotationYIncrease);
document.getElementById("rot_y_i").addEventListener("mouseup", rotationMoveStop);

// increase or decrease z values while clicking button
document.getElementById("rot_z_d").addEventListener("mousedown", rotationZDecrease);
document.getElementById("rot_z_d").addEventListener("mouseup", rotationMoveStop);
document.getElementById("rot_z_i").addEventListener("mousedown", rotationZIncrease);
document.getElementById("rot_z_i").addEventListener("mouseup", rotationMoveStop);

document.getElementById("reset_rot").addEventListener("click", resetRotation);

document.getElementById("is_auto_rotation").addEventListener("change", updateAutoRotation);

document.getElementById("is_show_plane").addEventListener("change", updateShowPlane);


///// Colors //////

cubeGeometry.faces[0].color.setHex( YELLOW );
cubeGeometry.faces[1].color.setHex( YELLOW );
cubeGeometry.faces[2].color.setHex( GREEN );
cubeGeometry.faces[3].color.setHex( GREEN );
cubeGeometry.faces[4].color.setHex( BLUE );
cubeGeometry.faces[5].color.setHex( BLUE );
cubeGeometry.faces[6].color.setHex( WHITE );
cubeGeometry.faces[7].color.setHex( WHITE );
cubeGeometry.faces[8].color.setHex( RED );
cubeGeometry.faces[9].color.setHex( RED );
cubeGeometry.faces[10].color.setHex( ORANGE );
cubeGeometry.faces[11].color.setHex( ORANGE );



function addLight(...pos) {
  const color = 0xFFFFFF;
  const intensity = 1;
  const light = new THREE.DirectionalLight(color, intensity);
  light.position.set(...pos);
  scene.add(light);
}
addLight(-1, 2, 4);
addLight( 1, -1, -2);


animate();
