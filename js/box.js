var pos_x = 0;
var pos_y = 0;
var pos_z = 0;
var pos_x_speed = 0;
var pos_y_speed = 0;
var pos_z_speed = 0;

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
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    if (pos_moving()) {
        update_position(); 
    }
    refresh_position();
    renderer.render( scene, camera );
}

function get_position() {
    pos_x = parseFloat(document.getElementById("pos_x").value);
    pos_y = parseFloat(document.getElementById("pos_y").value);
    pos_z = parseFloat(document.getElementById("pos_z").value);
}


function pos_x_decrease() {
    pos_x_speed = -.1;
}

function pos_x_increase() {
    pos_x_speed = .1;              
}

function pos_y_decrease() {
    pos_y_speed = -.1;             
}

function pos_y_increase() {
    pos_y_speed = .1;            
}            

function pos_z_decrease() {
    pos_z_speed = -.1;         
}

function pos_z_increase() {
    pos_z_speed = .1;       
}            

function pos_stop() {
    pos_x_speed = 0;
    pos_y_speed = 0;
    pos_z_speed = 0;             
}

function pos_moving() {
    var pos_moving = false;
    if (pos_x_speed != 0 || pos_y_speed != 0 || pos_z_speed != 0) {
        pos_moving = true;
    }
    return pos_moving;
}

function update_position() {
    pos_x += pos_x_speed;
    document.getElementById("pos_x").value = pos_x.toFixed(3);
    pos_y += pos_y_speed;
    document.getElementById("pos_y").value = pos_y.toFixed(3);
    pos_z += pos_z_speed;
    document.getElementById("pos_z").value = pos_z.toFixed(3);
}

function refresh_position() {
    cube.position.x = pos_x;
    cube.position.y = pos_y;
    cube.position.z = pos_z;
}

function reset_position() {
    pos_x = 0;
    pos_y = 0;
    pos_z = 0;
    update_position();
}


// get new position values if input values have changed
document.getElementById("pos_x").addEventListener("change", get_position);
document.getElementById("pos_y").addEventListener("change", get_position);
document.getElementById("pos_z").addEventListener("change", get_position);

document.getElementById("reset_pos").addEventListener("click", reset_position);


// increase or decrease x values while clicking button
document.getElementById("pos_x_d").addEventListener("mousedown", pos_x_decrease);
document.getElementById("pos_x_d").addEventListener("mouseup", pos_stop);
document.getElementById("pos_x_i").addEventListener("mousedown", pos_x_increase);
document.getElementById("pos_x_i").addEventListener("mouseup", pos_stop);

// increase or decrease y values while clicking button
document.getElementById("pos_y_d").addEventListener("mousedown", pos_y_decrease);
document.getElementById("pos_y_d").addEventListener("mouseup", pos_stop);
document.getElementById("pos_y_i").addEventListener("mousedown", pos_y_increase);
document.getElementById("pos_y_i").addEventListener("mouseup", pos_stop);

// increase or decrease z values while clicking button
document.getElementById("pos_z_d").addEventListener("mousedown", pos_z_decrease);
document.getElementById("pos_z_d").addEventListener("mouseup", pos_stop);
document.getElementById("pos_z_i").addEventListener("mousedown", pos_z_increase);
document.getElementById("pos_z_i").addEventListener("mouseup", pos_stop);

animate();
