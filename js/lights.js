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
  spotLight: {
    resetPosition: function() {spotLight.position.set(3,3,3);},
    resetTarget: function() {spotLight.target.position.set(0,0,0);},
    color: '#FFFFFF', // white
  },
  help: {
    lightNew: function() { createModal(lightNewText()); },
    lightPosition: function() { createModal(lightPositionText()); },
    targetPosition: function() { createModal(targetPositionText()); },
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
renderer.shadowMap.enabled = true; // enable shadows rendering
document.body.appendChild(renderer.domElement);

// box
var boxGeometry = new THREE.BoxGeometry(1, 1, 1);
boxGeometry.colorsNeedUpdate = true;
var boxMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, vertexColors: THREE.FaceColors });
var box = new THREE.Mesh(boxGeometry, boxMaterial);
box.castShadow = true;
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
plane.receiveShadow = true;
scene.add(plane);

// white spotlight shining from the side, casting a shadow
var spotLightColor = 0xFFFFFF;
var spotLightIntensity = 1;
var spotLight = new THREE.SpotLight(spotLightColor, spotLightIntensity);
spotLight.position.set(3, 3, 3);
spotLight.castShadow = true;
scene.add(spotLight);
scene.add(spotLight.target);

// light helper
var lightHelper = new THREE.CameraHelper(spotLight.shadow.camera);
scene.add(lightHelper);

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

function refreshLightColor() {
  spotLight.color.set(params.spotLight.color);
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
paramsFolder.add(spotLight, 'intensity').step(0.1);
paramsFolder.add(spotLight, 'angle').step(0.01);
paramsFolder.add(spotLight, 'decay').step(1);
paramsFolder.add(spotLight, 'distance').step(0.1);
paramsFolder.add(spotLight, 'penumbra').step(0.01);
paramsFolder.addColor(params.spotLight, 'color').onChange(function() {refreshLightColor();});

var lightHelperFolder = gui.addFolder('Light Helper');
lightHelperFolder.add(lightHelper, 'visible');

var autoRotationFolder = gui.addFolder('Box autoRotation');
autoRotationFolder.add(params.box, 'autoRotation');
autoRotationFolder.open();

var helpFolder = gui.addFolder('Help Code');
helpFolder.add(params.help, 'lightNew').name('New and Params');
helpFolder.add(params.help, 'lightPosition');
helpFolder.add(params.help, 'targetPosition');

// Help Text

function lightNewText() {
  var text = `
  var color = ${params.spotLight.color}; <br>
  // color - (optional) hexadecimal color of the light. Default is 0xffffff (white). <br>
  var intensity = ${spotLight.intensity.toFixed(2)}; <br>
  // intensity - (optional) numeric value of the light's strength/intensity. Default is 1. <br>
  var distance = ${spotLight.distance.toFixed(2)}; <br>
  // distance - Maximum range of the light. Default is 0 (no limit). <br>
  var angle = ${spotLight.angle.toFixed(2)}; <br>
  // angle - Maximum angle of light dispersion from its direction whose upper bound is Math.PI/2. <br>
  var penumbra = ${spotLight.penumbra.toFixed(2)}; <br>
  // penumbra - Percent of the spotlight cone that is attenuated due to penumbra. Takes values between zero and 1. Default is zero. <br>
  var decay = ${spotLight.decay.toFixed(2)}; <br>
  // decay - The amount the light dims along the distance of the light. <br><br>
  var spotLight = new THREE.SpotLight(color, intensity, distance, angle, penumbra, decay); <br><br>
  spotLight.castShadow = true; <br>
  // If set to true light will cast dynamic shadows. Warning: This is expensive and requires tweaking to get shadows looking right. See the SpotLightShadow for details. The default is false. <br><br>
  scene.add( spotLight ); <br><br>
  // The Spotlight points from its position to target.position. The default position of the target is (0, 0, 0).<br>
  // For the target's position to be changed to anything other than the default, it must be added to the scene<br>
  scene.add( spotLight.target );<br>`;
return text;
}

function lightPositionText() {
  var text =`
  spotLight.position.x = ${spotLight.position.x.toFixed(2)};<br>
  spotLight.position.y = ${spotLight.position.y.toFixed(2)};<br>
  spotLight.position.z = ${spotLight.position.z.toFixed(2)};`;
  return text;
}

function targetPositionText() {
  var text =`
  spotLight.target.position.x = ${spotLight.target.position.x.toFixed(2)};<br>
  spotLight.target.position.y = ${spotLight.target.position.y.toFixed(2)};<br>
  spotLight.target.position.z = ${spotLight.target.position.z.toFixed(2)};`;
  return text;
}


animate();
