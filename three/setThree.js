var scene, camera, renderer, canvas, light;

function init() {
    canvas=document.getElementById('cc');
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 1, 1000);
    renderer = new THREE.WebGLRenderer({
        maxLights: 5
    });
    light = new THREE.AmbientLight(0x0000ff, 1.0);
    renderer.setSize(window.innerWidth,window.innerHeight);
    document.body.appendChild(renderer.domElement);
    renderer.setClearColor(0xeeeeee, 0.5);
}

function render() {
    renderer.clear();
    renderer.render(scene, camera);
    update();
    requestAnimationFrame(render);
}


