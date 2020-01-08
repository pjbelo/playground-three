// position variables
var positionX = 0;
var positionY = 0;
var positionZ = 0;
var positionXSpeed = 0;
var positionYSpeed = 0;
var positionZSpeed = 0;

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshNormalMaterial();
var cube = new THREE.Mesh( geometry, material );
scene.add( cube );

var geometry = new THREE.PlaneGeometry( 10, 10);
var material = new THREE.MeshBasicMaterial( {color: 0xb7b7b7, side: THREE.DoubleSide} );
var plane = new THREE.Mesh( geometry, material );

plane.position.y = -1.5;
plane.rotation.x = 3.1415/2;
scene.add( plane );

camera.position.z = 5;

function animate() {
    requestAnimationFrame( animate );
    refreshRotation();
    refreshPosition();
    renderer.render( scene, camera );
}

function getPosition() {
    positionX = parseFloat(document.getElementById("pos_x").value);
    positionY = parseFloat(document.getElementById("pos_y").value);
    positionZ = parseFloat(document.getElementById("pos_z").value);
}


function positionXDecrease() {positionXSpeed = -.1;}

function positionXIncrease() {positionXSpeed = .1;}

function positionYDecrease() {positionYSpeed = -.1;}

function positionYIncrease() {positionYSpeed = .1;}            

function positionZDecrease() {positionZSpeed = -.1;}

function positionZIncrease() {positionZSpeed = .1;}            

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
    document.getElementById("pos_x").value = positionX.toFixed(3);
    positionY += positionYSpeed;
    document.getElementById("pos_y").value = positionY.toFixed(3);
    positionZ += positionZSpeed;
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

function refreshRotation() {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
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

animate();
