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
var positionZ = 5;
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

// cube
var cubeRotationX = 0;
var cubeRotationY = 0;
var cubeRotationZ = 0;
var isCubeAutoRotation = true;

var scene = new THREE.Scene();
scene.background = new THREE.Color(0x2f7dfb);


// var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// camera
var fov = 45;
var aspect = 2;  // the canvas default
var near = 0.1;
var far = 100;
var camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.x = positionX;
camera.position.y = positionY;
camera.position.z = positionZ;

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// cube
var cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
var cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, vertexColors: THREE.FaceColors });
var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
scene.add(cube);

// plane
var planeGeometry = new THREE.PlaneGeometry(10, 10);
var planeMaterial = new THREE.MeshBasicMaterial({ color: 0xc2c2c2, side: THREE.DoubleSide });
var plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.position.y = -1.5;
plane.rotation.x = 3.1415 / 2;
scene.add(plane);

updatePositionInputFields();


function animate() {
  requestAnimationFrame(animate);
  refreshCubeRotation();
  refreshRotation();
  refreshPosition();
  refreshFOV();
  refreshAspect();
  refreshNear();
  refreshFar();
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
  camera.position.x = positionX;
  camera.position.y = positionY;
  camera.position.z = positionZ;
}

function resetPosition() {
  positionX = 0;
  positionY = 0;
  positionZ = 5;
  updatePosition();
}

// get new position values if input values have changed
document.getElementById("pos_x").addEventListener("change", getPosition);
document.getElementById("pos_y").addEventListener("change", getPosition);
document.getElementById("pos_z").addEventListener("change", getPosition);

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

// reset position values
document.getElementById("reset_pos").addEventListener("click", resetPosition);



//////////// Rotation /////////////

function getRotation() {
  rotationX = parseFloat(document.getElementById("rot_x").value);
  rotationY = parseFloat(document.getElementById("rot_y").value);
  rotationZ = parseFloat(document.getElementById("rot_z").value);
}

function rotationXDecrease() { rotationXSpeed = -0.01; }
function rotationXIncrease() { rotationXSpeed = 0.01; }
function rotationYDecrease() { rotationYSpeed = -0.01; }
function rotationYIncrease() { rotationYSpeed = 0.01; }
function rotationZDecrease() { rotationZSpeed = -0.01; }
function rotationZIncrease() { rotationZSpeed = 0.01; }

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
  document.getElementById("rot_x").value = rotationX.toFixed(2);
  document.getElementById("rot_y").value = rotationY.toFixed(2);
  document.getElementById("rot_z").value = rotationZ.toFixed(2);
}

function refreshRotation() {
  if (isRotationMoving()) { updateRotation(); }
  camera.rotation.x = rotationX;
  camera.rotation.y = rotationY;
  camera.rotation.z = rotationZ;
}

function resetRotation() {
  rotationX = 0;
  rotationY = 0;
  rotationZ = 0;
  updateRotation();
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

// reset rotation values
document.getElementById("reset_rot").addEventListener("click", resetRotation);



/////// Cube ////////

function refreshCubeRotation() {
  if (isCubeAutoRotation) { autoRotateCube(); }
  cube.rotation.x = cubeRotationX;
  cube.rotation.y = cubeRotationY;
  cube.rotation.z = cubeRotationZ;
}

function autoRotateCube() {
  cubeRotationX += .01;
  cubeRotationY += .01;
}

function updateAutoRotation() {
  if (document.getElementById("is_cube_auto_rotation").checked) {
    isCubeAutoRotation = true;
  } else {
    isCubeAutoRotation = false;
  }
}

// cube show/hide
document.getElementById("is_cube_auto_rotation").addEventListener("change", updateAutoRotation);

// set cube colors
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


///////// FOV //////////

var FOVChangeRate = 0;
updateFOVInputField();

document.getElementById("fov").addEventListener("change", getFOV);
document.getElementById("fov_d").addEventListener("mousedown", FOVDecrease);
document.getElementById("fov_d").addEventListener("mouseup", FOVStop);
document.getElementById("fov_i").addEventListener("mousedown", FOVIncrease);
document.getElementById("fov_i").addEventListener("mouseup", FOVStop);


function getFOV() {
  fov = parseFloat(document.getElementById("fov").value);
}

function FOVDecrease() { FOVChangeRate = -0.1; }
function FOVIncrease() { FOVChangeRate = 0.1; }
function FOVStop() { FOVChangeRate = 0; }


function updateFOV() {
  fov += FOVChangeRate;
  updateFOVInputField();
}

function updateFOVInputField() {
  document.getElementById("fov").value = fov.toFixed(1);
}

function refreshFOV() {
  if (FOVChangeRate != 0) { updateFOV(); }
  camera.fov = fov;
  camera.updateProjectionMatrix();
}



///////// Aspect //////////

var aspectChangeRate = 0;
updateAspectInputField();

document.getElementById("aspect").addEventListener("change", getAspect);
document.getElementById("aspect_d").addEventListener("mousedown", aspectDecrease);
document.getElementById("aspect_d").addEventListener("mouseup", aspectStop);
document.getElementById("aspect_i").addEventListener("mousedown", aspectIncrease);
document.getElementById("aspect_i").addEventListener("mouseup", aspectStop);


function getAspect() {
  aspect = parseFloat(document.getElementById("aspect").value);
}

function aspectDecrease() { aspectChangeRate = -0.1; }
function aspectIncrease() { aspectChangeRate = 0.1; }
function aspectStop() { aspectChangeRate = 0; }

function updateAspect() {
  aspect += aspectChangeRate;
  updateAspectInputField();
}

function updateAspectInputField() {
  document.getElementById("aspect").value = aspect.toFixed(1);
}

function refreshAspect() {
  if (aspectChangeRate != 0) { updateAspect(); }
  camera.aspect = aspect;
  // camera.updateProjectionMatrix();

}



///////// Near //////////

var nearChangeRate = 0;
updateNearInputField();

document.getElementById("near").addEventListener("change", getNear);
document.getElementById("near_d").addEventListener("mousedown", nearDecrease);
document.getElementById("near_d").addEventListener("mouseup", nearStop);
document.getElementById("near_i").addEventListener("mousedown", nearIncrease);
document.getElementById("near_i").addEventListener("mouseup", nearStop);


function getNear() {
  near = parseFloat(document.getElementById("near").value);
}

function nearDecrease() { nearChangeRate = -0.1; }
function nearIncrease() { nearChangeRate = 0.1; }
function nearStop() { nearChangeRate = 0; }

function updateNear() {
  near += nearChangeRate;
  updateNearInputField();
}

function updateNearInputField() {
  document.getElementById("near").value = near.toFixed(1);
}

function refreshNear() {
  if (nearChangeRate != 0) { updateNear(); }
  camera.near = near;
  // camera.updateProjectionMatrix();

}


///////// Far //////////

var farChangeRate = 0;
updateFarInputField();

document.getElementById("far").addEventListener("change", getFar);
document.getElementById("far_d").addEventListener("mousedown", farDecrease);
document.getElementById("far_d").addEventListener("mouseup", farStop);
document.getElementById("far_i").addEventListener("mousedown", farIncrease);
document.getElementById("far_i").addEventListener("mouseup", farStop);


function getFar() {
  far = parseFloat(document.getElementById("far").value);
}

function farDecrease() { farChangeRate = -0.1; }
function farIncrease() { farChangeRate = 0.1; }
function farStop() { farChangeRate = 0; }

function updateFar() {
  far += farChangeRate;
  updateFarInputField();
}

function updateFarInputField() {
  document.getElementById("far").value = far.toFixed(1);
}

function refreshFar() {
  if (farChangeRate != 0) { updateFar(); }
  camera.far = far;
  // camera.updateProjectionMatrix();

}



animate();


