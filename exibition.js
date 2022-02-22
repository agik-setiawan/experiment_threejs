import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import Stats from 'three/examples/jsm/libs/stats.module'

const scene = new THREE.Scene()
// scene.add(new THREE.AxesHelper(5))

scene.background = new THREE.Color('white');

const texLoader = new THREE.TextureLoader();
// const light = new THREE.SpotLight()
// light.position.set(10, 20, 20)
// scene.add(light)

// const light2 = new THREE.SpotLight('', 0.6)
// light2.position.set(50, 40, 40)
// scene.add(light2)

// const directionalLight = new THREE.DirectionalLight( 0xffffff, 1.8 );
// directionalLight.position.set(50, 40, 40)
// scene.add( directionalLight );

function addLight(...pos) {
    const color = 0xFFFFFF;
    const intensity = 1.8;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(...pos);
    scene.add(light);
}

addLight(50, 40, 40);
addLight(-10, 1, 6);

const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    5,
    1000
)
camera.position.z = -10
camera.position.x = 30
camera.position.y = 10

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.getElementById('booth1').appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true

const loader = new GLTFLoader()
loader.load(
    'exhibition.glb',
    function (gltf) {
        scene.add(gltf.scene)
        // scene.rotateZ(0)
        scene.position.x = 5
        scene.position.y = -2
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
    },
    (error) => {
        console.log(error)
    }
)

/**
 * Front
 */
const geometry_contentFront = new THREE.BoxGeometry(1, 2.6, 4.5)
const material_contentFront = new THREE.MeshBasicMaterial({ color: '#29B6F6'});
const contentFront = new THREE.Mesh(geometry_contentFront, material_contentFront);
contentFront.position.x = 0.7;
contentFront.position.y = 1.8;
contentFront.position.z = 0;
scene.add(contentFront);


/**
 * Right
 */
const geometry_contentRight = new THREE.BoxGeometry(0.010, 7.4, 3.5)
const material_contentRight = new THREE.MeshBasicMaterial({map: texLoader.load('assets/biznet.jpg')});
const contentRight = new THREE.Mesh(geometry_contentRight, material_contentRight);
contentRight.position.x = -1.99;
contentRight.position.y = 4;
contentRight.position.z = -7.55;
scene.add(contentRight);


/**
* Left
*/
const geometry_contentLeft = new THREE.BoxGeometry(0.010, 7.4, 3.5)
const material_contentLeft = new THREE.MeshBasicMaterial({map: texLoader.load('assets/biznet.jpg') });
const contentLeft = new THREE.Mesh(geometry_contentLeft, material_contentLeft);
contentLeft.position.x = -1.99;
contentLeft.position.y = 4;
contentLeft.position.z = 7.55;
scene.add(contentLeft);


/**
 * Back
 */

const geometry_contentBack = new THREE.BoxGeometry(0.010, 5.9, 9)
const material_contentBack = new THREE.MeshBasicMaterial({ map:texLoader.load('assets/bg.jpg') });
const contentBack = new THREE.Mesh(geometry_contentBack, material_contentBack);
contentBack.position.x = -7;
contentBack.position.y = 6;
contentBack.position.z = 0;
scene.add(contentBack);



window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

// const stats = Stats()
// document.body.appendChild(stats.dom)

function animate() {
    requestAnimationFrame(animate)

    controls.update()
    scene.rotateY(-0.01)
    render()
    stats.update()
}

function render() {
    renderer.render(scene, camera)
}

animate()
