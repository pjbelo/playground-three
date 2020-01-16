

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
  spotLight: {
    resetPosition: function() {spotLight.position.set(3,3,3);},
    resetTarget: function() {spotLight.target.position.set(0,0,0);},
    color: '#FFFFFF', // white
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
renderer.shadowMap.enabled = true; // enable shadows rendering
document.body.appendChild(renderer.domElement);

// cube (box)
var cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
cubeGeometry.colorsNeedUpdate = true;
var cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, vertexColors: THREE.FaceColors });
var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.castShadow = true;
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
plane.receiveShadow = true;
scene.add(plane);

// white spotlight shining from the side, casting a shadow
var spotLightColor = 0xFFFFFF;
var spotLightIntensity = 1;
var spotLight = new THREE.SpotLight(spotLightColor, spotLightIntensity);
spotLight.position.set( 3, 3, 3 );
spotLight.castShadow = true;
scene.add( spotLight );
scene.add( spotLight.target );

// light helper
var lightHelper = new THREE.CameraHelper( spotLight.shadow.camera );
scene.add( lightHelper );

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

function refreshLightColor() {
  spotLight.color.set(params.spotLight.color);
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

var positionFolder = gui.addFolder('Light Position');
positionFolder.add(spotLight.position, 'x').step(0.1).listen();
positionFolder.add(spotLight.position, 'y').step(0.1).listen();
positionFolder.add(spotLight.position, 'z').step(0.1).listen();
positionFolder.add(params.spotLight, 'resetPosition');
positionFolder.open();

var rotationFolder = gui.addFolder('Target Position');
rotationFolder.add(spotLight.target.position, 'x').step(0.1).listen();
rotationFolder.add(spotLight.target.position, 'y').step(0.1).listen();
rotationFolder.add(spotLight.target.position, 'z').step(0.1).listen();
rotationFolder.add(params.spotLight, 'resetTarget');

var paramsFolder = gui.addFolder('Light Parameters');
paramsFolder.add(spotLight, 'power').step(0.1);
paramsFolder.add(spotLight, 'angle').step(0.01);
paramsFolder.add(spotLight, 'decay').step(1);
paramsFolder.add(spotLight, 'distance').step(0.1);
paramsFolder.add(spotLight, 'penumbra').step(0.01);
paramsFolder.addColor(params.spotLight, 'color').onChange( function() {refreshLightColor();});

var lightHelperFolder = gui.addFolder('Light Helper');
lightHelperFolder.add(lightHelper, 'visible');

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


refreshColors();

animate();
