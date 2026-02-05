import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { DNAFunction, sequenceStrip } from './gene.js'
import { Random } from './random.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth * 2 / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight / 2);
const root = document.getElementById(`terr_editor`);
root.prepend(renderer.domElement);
renderer.domElement.style.width = '100%';
// const geometry = new THREE.BoxGeometry(1, 1, 1);

// const pillar = new THREE.Mesh(geometry, material);
// scene.add(pillar);

let worldSize = 32;
const controls = new OrbitControls(camera, renderer.domElement);
controls.minDistance = 10;
camera.position.set(0, worldSize / 2, worldSize / 2);
controls.maxDistance = 1000;
controls.maxPolarAngle = Math.PI / 2;

controls.update();
controls.addEventListener('change', render);
window.addEventListener('resize', render);
function render() {
    const canvas = renderer.domElement;
    if (canvas.width !== canvas.clientWidth || canvas.height !== canvas.clientHeight) {
        renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);

        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
    }
    renderer.render(scene, camera);

}
render();

function addLight(x, y, z) {
    const color = 0xFFFFFF;
    const intensity = 3;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(x, y, z);
    scene.add(light);
}

function makeTerrain(strip) {
    scene.clear();
    
    addLight(-1, 2, 4);
    addLight(1, -1, -2);
    let scaling = 1;

    if (!strip) return render();
    let offset = scaling * worldSize / 2;
    let func = new DNAFunction(strip);
    let data = Array.from({ length: worldSize }, (_) => []);
    func.context.fill = (ctx, a, n, b) => {
        ctx.val = n;
        let color = "rgb(" + Math.round(b.color[0]) + "," + Math.round(b.color[1]) + "," + Math.round(b.color[2]) + ")";
        data[ctx.input.x][ctx.input.z] = [Math.round(n), new THREE.Color(color)];
        // const geometry = new THREE.BoxGeometry(scaling, n * scaling, scaling);
        // const material = new THREE.MeshPhongMaterial({ color: new THREE.Color(color) });
        // const pillar = new THREE.Mesh(geometry, material);
        // scene.add(pillar);
        // pillar.position.x = -offset + ctx.input.x * scaling;
        // pillar.position.z = -offset + ctx.input.z * scaling;
        //console.log(n)
    }
    func.context.random = new Random(`seed`);
    func.context.blockList = Array.from({ 'length': 6 }, (_, i) => {
        return { color: [255 * ((i + 1) % 6 < 3), 255 * ((i) % 6 < 4 && (i) % 6 > 0), 255 * ((i) % 6 >= 3)] }
    });

    for (let y = 0; y < worldSize; y++) {
        for (let x = 0; x < worldSize; x++) {
            func.context.input.x = x;
            func.context.input.z = y;
            func.calculate(func.context);
        }
    }
    // const faces = Array.from({length: 6}, (_, i) => ({
    //     dir: Array.from({length: 3}, (_, j) => Math.floor(i/2)===j?Math.pow(-1, i%2):0),
    //     corners: Array.from({length: 4}, (_, j) => Array.from({length: 3}, (_, k) => k===0?1-i%2:(Math.floor(j/2)*(k%2) + j%2)%2).map((_, n, arr) => arr.at((3 + n - Math.floor(i/2))%3)))
    // }))
    const faces = [
        { // left
            dir: [-1, 0, 0,],
            corners: [
                [0, 1, 0],
                [0, 0, 0],
                [0, 1, 1],
                [0, 0, 1],
            ],
        },
        { // right
            dir: [1, 0, 0,],
            corners: [
                [1, 1, 1],
                [1, 0, 1],
                [1, 1, 0],
                [1, 0, 0],
            ],
        },
        { // bottom
            dir: [0, -1, 0,],
            corners: [
                [1, 0, 1],
                [0, 0, 1],
                [1, 0, 0],
                [0, 0, 0],
            ],
        },
        { // top
            dir: [0, 1, 0,],
            corners: [
                [0, 1, 1],
                [1, 1, 1],
                [0, 1, 0],
                [1, 1, 0],
            ],
        },
        { // back
            dir: [0, 0, -1,],
            corners: [
                [1, 0, 0],
                [0, 0, 0],
                [1, 1, 0],
                [0, 1, 0],
            ],
        },
        { // front
            dir: [0, 0, 1,],
            corners: [
                [0, 0, 1],
                [1, 0, 1],
                [0, 1, 1],
                [1, 1, 1],
            ],
        },
    ];
    const positions = [];
    const normals = [];
    const indices = [];
    const colors = [];
    for (let i = 0; i < worldSize ** 2; i++) {
        let [x, z] = [Math.floor(i / worldSize), i % worldSize];
        let [y, color] = data[x][z];
        for (const { dir, corners } of faces) {
            let neighborHeight = data[x + dir[0]]?.[z + dir[2]]?.[0] ?? 0;
            if (y > neighborHeight || dir[1] === 1) {
                let idx = positions.length / 3;
                for (let pos of corners) {
                    positions.push(x + pos[0], pos[1] ? y : neighborHeight, z + pos[2]);
                    normals.push(...dir);
                    colors.push(color.r, color.g, color.b);
                }
                indices.push(idx, idx + 1, idx + 2, idx + 2, idx + 1, idx + 3);
            }
        }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positions), 3));
    geometry.setAttribute('normal', new THREE.BufferAttribute(new Float32Array(normals), 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array(colors), 3));
    geometry.setIndex(indices);
    const material = new THREE.MeshPhongMaterial({ vertexColors: true });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    mesh.position.x -= worldSize / 2;
    mesh.position.z -= worldSize / 2;
    render();
}

let lastStrip = '';
export const previewTarget = {
    label: `Terrain preview`,
    flow: `output`,
    type: `sequence`,
    eval: (val) => {
            lastStrip = sequenceStrip(val);
            makeTerrain(lastStrip);
    }
}

const slider = document.createElement('div');
slider.className = `worldSizeContainer`;
const current = document.createElement('div');
const knob = document.createElement('div');
current.className = `worldSizeDisplay`;
knob.className = `worldSizeSlider`;
current.innerHTML = worldSize.toString();
let y0 = 0;
let y1 = 0;
knob.addEventListener('mousedown', (evt) => {
    evt.stopPropagation();
    y0 = evt.pageY;
    let callback = (evt) => {
        let dy = y1 - y0;
        knob.style = `translate: 0px ${dy}px`;

        if (Math.abs(dy) < 10) return;
        worldSize = Math.max(10, worldSize-Math.floor(dy/10));
        current.innerHTML = worldSize.toString();
        if (lastStrip) makeTerrain(lastStrip);
    }
    let id = setInterval(callback, 100);
    window.addEventListener('mousemove', (evt) => y1 = evt.pageY);
    window.addEventListener('mouseup', (evt) => {
        knob.style = ``;
        clearInterval(id)
    });
})
slider.append(current, knob);
root.appendChild(slider);