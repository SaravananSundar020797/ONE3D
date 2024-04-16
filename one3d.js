import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";




var ONE3D = {

  camera: null, // Define camera object
  orbit:null,
  scene:null,
  
  init: function (div_id, URL, ONE3D_Model_ID, ONE3D_Variant_ID, options) {
    // Assuming PATH, ONE3D_Model_ID, ONE3D_Variant_ID, and ONE3D_Color_ID are defined elsewhere
    return new Promise((resolve, reject) => {
      
      // Initialize scene, camera, renderer, etc.
      ONE3D.camera = new THREE.PerspectiveCamera(
        50,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    
    // ONE3D.orbit = new OrbitControls(ONE3D.camera, renderer.domElement);
      // Simulate successful initialization
      var successData = "ONE3D initialized successfully!";
      console.log(successData);
      // Create the canvas tag
      createCanvas(div_id);
      // Resolve the promise
      resolve(successData);
      // Simulated delay of 2 seconds
    });
  },
  exteriorView: function() {
    return new Promise((resolve, reject) => {
      try {
        // Set the camera position and rotation to the default exterior view
        if (!ONE3D.camera) {
            reject({ success: false, message: "Camera not initialized." });
            return;
        }
        ONE3D.camera.position.set(1.5, 0.8, 3.5); // Example position (adjust as needed)
        ONE3D.camera.lookAt(0, 0, 0); // Look at the center of the scene

        // Return a success data object
        resolve({ success: true, message: "Exterior view set successfully." });
    } catch (error) {
        // If an error occurs, return an error data object
        reject({ success: false, message: "Failed to set exterior view.", error: error });
    }
    });
  },
  interiorView: function() {
    return new Promise((resolve, reject) => {
        try {
            setInteriorView(); // Call function to set interior view
            resolve({ success: true, message: "Interior view set successfully." });
        } catch (error) {
            reject({success: false, message: "Failed to set interior view.", error: error });
        }
    });
},
backseatView: function() {
  return new Promise((resolve, reject) => {
      try {
          setbackseatView(); // Call function to set interior view
          resolve({ success: true, message: "Backseat view set successfully." });
      } catch (error) {
          reject({success: false, message: "Failed to set backseat view.", error: error });
      }
  });
},
frontseatView: function() {
  return new Promise((resolve, reject) => {
      try {
        setFronteatView(); // Call function to set interior view
          resolve({ success: true, message: "Backseat view set successfully." });
      } catch (error) {
          reject({success: false, message: "Failed to set backseat view.", error: error });
      }
  });
}
};





function createCanvas(div_id) {
  // Create the div Element

  var canvasContainer = document.createElement("div");
  canvasContainer.id = "canvasContainer";
  document.body.appendChild(canvasContainer);

  // Create the Canvas Element

  var canvas = document.createElement("canvas");
  canvas.id = "one3dcanvas";
  canvas.setAttribute(
    "style",
    "width: 100%; height: 100%; position: absolute; outline: 0px;"
  );

  // Append canvas to the container
  var container = document.getElementById(div_id);
  if (container) {
    container.appendChild(canvasContainer);
    canvasContainer.appendChild(canvas);
    ONE3D.scene = new THREE.Scene();
    ONE3D.scene.background = new THREE.Color(0xffffff);


    // ONE3D.camera.position.x = 1.5;
    // ONE3D.camera.position.y = 0.8;
    // ONE3D.camera.position.z = 3.5;

    const ambientLighty = new THREE.AmbientLight(0x404040, 0.5);
    ambientLighty.position.set(0, 5, 0);
    ONE3D.scene.add(ambientLighty);

    const directionalLighty = new THREE.DirectionalLight(0xffffff,15);
    directionalLighty.position.set(0, 1, 0);
    ONE3D.scene.add(directionalLighty);
    const directionalLightyX = new THREE.DirectionalLight(0xffffff,3);
    directionalLightyX.position.set(1, 0, 0);
    ONE3D.scene.add(directionalLightyX);
    const directionalLightyMX = new THREE.DirectionalLight(0xffffff,3);
    directionalLightyMX.position.set(-1, 0, 0);
    ONE3D.scene.add(directionalLightyMX);


    const renderer = new THREE.WebGLRenderer({
      canvas: document.getElementById("one3dcanvas"),
    });

    renderer.shadowMap.enabled = true;

    renderer.setSize(window.innerWidth, window.innerHeight);

    ONE3D.orbit = new OrbitControls(ONE3D.camera, renderer.domElement);

    const loader = new GLTFLoader();

    loader.load(
      "../../../one3d/assets/SUV/scene.gltf",
      function (gltf) {
        const car = gltf.scene;
        car.scale.set(1, 1, 1);
        car.rotation.y = -0.002;

        ONE3D.scene.add(car);
      },
      undefined,
      function (error) {
        console.error(error);
      }
    );

    ONE3D.orbit.update();

    ONE3D.camera.position.set(2, 1.5, 3.2); // Example position (adjust as needed)
    // ONE3D.camera.lookAt(0, 0, 0); // Look at the center of the scene
    // camera.position.set(2, 2, 1.2);
    ONE3D.camera.lookAt(ONE3D.scene.position);

    // Render loop
    function animate() {
      requestAnimationFrame(animate);

      renderer.render(ONE3D.scene, ONE3D.camera);
    }
    animate();
  } else {
    console.error("Container element not found!");
  }
}

function setInteriorView() {
  // Set the camera position and rotation to the default interior view
  // Adjust camera position and rotation as needed
  ONE3D.camera.position.set(0, 1.2, -0.9); // Example position (adjust as needed)
  ONE3D.camera.lookAt(0, 0.5, 0.5); // Look at the dashboard or other interior features

  // // Disable Zoom functionality
  // ONE3D.orbit.enableZoom = false; // Disable Zoom functionality
  // ONE3D.orbit.enableRotate = false; // Disable mouse click events


}

function setbackseatView() {
  // Set the camera position and rotation to the default interior view
  // Adjust camera position and rotation as needed
  ONE3D.camera.position.set(0, 0.8, -1.3); // Example position (adjust as needed)
  ONE3D.camera.lookAt(0, 0.5, 0.5); // Look at the dashboard or other interior features


  // // Disable Zoom functionality
  // ONE3D.orbit.enableZoom = false; // Disable Zoom functionality
  // ONE3D.orbit.enableRotate = false; // Disable mouse click events


}

function setFronteatView() {
  // Set the camera position and rotation to the default interior view
  // Adjust camera position and rotation as needed
  ONE3D.camera.position.set(0, 1.2, -0.9); // Example position (adjust as needed)
  ONE3D.camera.lookAt(0, 0.5, 0.5); // Look at the dashboard or other interior features

  // // Disable Zoom functionality
  // ONE3D.orbit.enableZoom = false; // Disable Zoom functionality
  // ONE3D.orbit.enableRotate = false; // Disable mouse click events


}

// Create a div element
const divElementOne = document.createElement("div");
divElementOne.setAttribute("class","buttonGroup");
// Create a button element
const buttonElementOne = document.createElement("button");

// Set the id of the button element
buttonElementOne.id = "interiorView";

buttonElementOne.setAttribute("onclick","exteriorView()");

// Set the text content of the button
buttonElementOne.textContent = "Interior";

const buttonElementTwo = document.createElement("button");

// Set the id of the button element
buttonElementTwo.id = "exteriorView";

buttonElementTwo.setAttribute("onclick","exteriorView()");
buttonElementTwo.setAttribute("style","display:none;");

// Set the text content of the button
buttonElementTwo.textContent = "Exterior";

const buttonElementThree = document.createElement("button");

// Set the id of the button element
buttonElementThree.id = "backseatView";

buttonElementThree.setAttribute("onclick","exteriorView()");
buttonElementThree.setAttribute("style","display:none;");

// Set the text content of the button
buttonElementThree.textContent = "BackSeat";

const buttonElementFour = document.createElement("button");

// Set the id of the button element
buttonElementFour.id = "frontseatView";

buttonElementFour.setAttribute("onclick","exteriorView()");
buttonElementFour.setAttribute("style","display:none;");

// Set the text content of the button
buttonElementFour.textContent = "FrontSeat";

// Append the button to the div
divElementOne.appendChild(buttonElementOne);
divElementOne.appendChild(buttonElementTwo);
divElementOne.appendChild(buttonElementThree);
divElementOne.appendChild(buttonElementFour);

// Append the div to the document body (or any other parent element)
document.body.appendChild(divElementOne);




// Create Div in Select

// Color data
// const colorData = [
//   { id: "RedCrystalMetallic", name: "Red Crystal" },
//   { id: "CrystalBlue", name: "Blue Crystal" },
//   { id: "GrayMetallic", name: "Gray Metallic" },
//   { id: "Snowflexwhite", name: "Snowflex White" },
//   { id: "SilverMetallic", name: "Silver Metallic" },
//   { id: "JetBlack", name: "Jet Black" }
// ];

// const divElementTwo = document.createElement("div");
// divElementTwo.setAttribute("class","selectGroup");
// const selectElement = document.createElement("select");
// selectElement.id = "colorSelect";
// selectElement.setAttribute("class","colorSelect");

// colorData.forEach(color => {
//   const option = document.createElement("option");
//   option.value = color.id;
//   option.textContent = color.name;
//   selectElement.appendChild(option);
// });

// // Append select to the document body (or any other parent element)
// divElementTwo.appendChild(selectElement);
// document.body.appendChild(divElementTwo);

// function changeDirectionalLightColor(colorId) {
//   // Map color ID to corresponding color in Three.js
//   const colorMap = {
//       RedCrystalMetallic: 0x9f293c, // Red
//       CrystalBlue: 0x0000FF, // Blue
//       GrayMetallic: 0x808080, // Gray
//       Snowflexwhite: 0xFFFFFF, // White
//       SilverMetallic: 0xC0C0C0, // Silver
//       JetBlack: 0x000000 // Black
//   };

//   // Set directional light color based on color ID
//   const lightColor = colorMap[colorId];
//   if (lightColor !== undefined) {
//       // Create a new directional light
//       const directionalLight = new THREE.DirectionalLight(lightColor, 10);
//       directionalLight.position.set(0, 5, 0);
//       ONE3D.scene.add(directionalLight);
//       // const directionalLightMX = new THREE.DirectionalLight(lightColor, 2);
//       // directionalLightMX.position.set(-5, 0, 0);
//       // ONE3D.scene.add(directionalLightMX);
//       // const directionalLightX = new THREE.DirectionalLight(lightColor, 2);
//       // directionalLightX.position.set(5, 0, 0);
//       // ONE3D.scene.add(directionalLightX);
//   }
// }

// // Event listener to change directional light color when select value changes
// selectElement.addEventListener("change", function() {
//   const selectedColorId = this.value;
//   console.log(selectedColorId);
//   changeDirectionalLightColor(selectedColorId);
// });


export { ONE3D };
