import React, { Component } from "react";
import * as THREE from "three";
import "./App.css";
import NormalMap1 from "./assets/NormalMap1.png";
import star from "./assets/star1.png";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import UFO_Empty from "./assets/UFO_Empty.glb";
// import * as dat from "dat.gui";
import gsap from "gsap";

export class Planet3d extends Component {
  componentDidMount() {
    // const gui = new dat.GUI();
    const scene = new THREE.Scene();

    const tl = gsap.timeline();

    const gltfLoader = new GLTFLoader();

    gltfLoader.load(UFO_Empty, (gltf) => {
      gltf.scene.scale.set(-0.7, -1, -9);
      gltf.scene.position.set(-0.7, -1, 1.2);
      gltf.scene.rotation.set(4.3, 5.3, 4);
      gltf.scene.scale.set(0.2, 0.09, 0.2);
      scene.add(gltf.scene);

      tl.to(gltf.scene.position, { x: 5, z: -15, duration: 1.5 }, "-=1");
      tl.to(camera.position, { z: 0, duration: 2 }, "-=1");
      tl.to(gltf.scene.position, { x: -9, y: 2, z: 1.2, duration: 1.2 }, "-=1");
      tl.to(camera.position, { x: 2, z: 2, duration: 1.2 }, "-=1");
      tl.to(gltf.scene.rotation, { z: 4.7, duration: 1 });
      tl.to(gltf.scene.position, { x: 7, y: -1.4, z: 0, duration: 1.7 });
      tl.to(camera.position, { x: 0, z: 0, duration: 1.2 }, "-=1");
      tl.to(gltf.scene.position, { x: 4, y: 1.4, z: -3, duration: 1.7 });
      tl.to(gltf.scene.rotation, {
        y: 3.7,
        duration: 1,
      });
      tl.to(gltf.scene.rotation, { x: 4.3, y: 5.3, z: 4 });

      tl.to(ParticleMesh.rotation, {
        z: Math.random() * 4,
        duration: 2,
      });

      document.addEventListener("mousemove", onDocumentMouseMove);
      animate(gltf.scene.position.x);
    });
    const textureLoader = new THREE.TextureLoader();
    const normalTexture = textureLoader.load(NormalMap1);
    const particleStar = textureLoader.load(star);

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(new THREE.Color("gray"), 0.01);
    this.mount.appendChild(renderer.domElement);

    const geometry = new THREE.SphereBufferGeometry(0.5, 64, 64);
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCnt = 250000;

    const posArray = new Float32Array(particlesCnt * 3);

    for (let i = 0; i < particlesCnt * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 12;
    }
    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(posArray, 3)
    );

    //material
    const meshMaterial = new THREE.PointsMaterial({
      size: 0.005,
      color: "aqua",
      map: particleStar,
      transparent: true,
    });
    const material = new THREE.MeshStandardMaterial();
    material.metalness = 0.7;
    material.roughness = 0.2;
    material.normalMap = normalTexture;
    material.color = new THREE.Color(0x292929);

    const sphere = new THREE.Mesh(geometry, material);
    const ParticleMesh = new THREE.Points(particlesGeometry, meshMaterial);
    scene.add(sphere, ParticleMesh);

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 6;
    scene.add(camera);

    //lights
    const pointLight = new THREE.PointLight(0xffffff, 0.7);
    pointLight.position.x = 2;
    pointLight.position.y = 3;
    pointLight.position.z = 4;
    // pointLight.intensity = 2;
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0xff0000, 5);
    pointLight2.position.x = -1.86;
    pointLight2.position.y = 1;
    pointLight2.position.z = -1.65;
    // pointLight2.intensity = 5;
    scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(0xe1fff, 1);
    pointLight3.position.x = 2.13;
    pointLight3.position.y = 1;
    pointLight3.position.z = 0.65;
    // pointLight3.intensity = 1;
    scene.add(pointLight3);

    //resize
    window.addEventListener("resize", () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });

    document.addEventListener("mousemove", onDocumentMouseMove);
    let mouseX = 0;
    let mouseY = 0;

    let targetX = 0;
    let targetY = 0;

    const windowhalfx = window.innerWidth / 2;
    const windowhalfy = window.innerHeight / 2;

    function onDocumentMouseMove(e) {
      mouseX = e.clientX - windowhalfx;
      mouseY = e.clientX - windowhalfy;
    }

    //animate
    const clock = new THREE.Clock();
    var animate = function (gltf) {
      targetX = mouseX * 0.01;
      targetY = mouseY * 0.01;

      const elapsedTime = clock.getElapsedTime();

      sphere.rotation.x = 0.5 * (targetY - sphere.rotation.x);
      sphere.rotation.y = 0.5 * (targetX - sphere.rotation.y);
      sphere.rotation.z += -0.5 * (targetY - sphere.rotation.x);
      sphere.rotation.z = 0.5 * elapsedTime;
      ParticleMesh.rotation.y = elapsedTime * 0.02;
      if (mouseX > 0) {
        ParticleMesh.rotation.y = mouseY * (elapsedTime * 0.0006);
        ParticleMesh.rotation.x = mouseX * (-elapsedTime * 0.0006);
        ParticleMesh.rotation.z = mouseY * (elapsedTime * 0.0006);
      }

      renderer.render(scene, camera);
      window.requestAnimationFrame(animate);
    };
    animate();
  }
  render() {
    return <div ref={(ref) => (this.mount = ref)} className="canvas" />;
  }
}

export default Planet3d;
