import React, { Component } from "react";
import * as THREE from "three";
import "./App.css";
import NormalMap1 from "./assets/NormalMap1.png";
import star from "./assets/star1.png";

export class Planet3d extends Component {
  componentDidMount() {
    const scene = new THREE.Scene();

    const textureLoader = new THREE.TextureLoader();
    const normalTexture = textureLoader.load(NormalMap1);
    const particleStar = textureLoader.load(star);

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(new THREE.Color("gray"), 0.1);
    this.mount.appendChild(renderer.domElement);

    const geometry = new THREE.SphereBufferGeometry(0.5, 64, 64);
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCnt = 9000;

    const posArray = new Float32Array(particlesCnt * 3);

    for (let i = 0; i < particlesCnt * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 5;
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
      100
    );
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 2;
    scene.add(camera);

    //lights
    const pointLight = new THREE.PointLight(0xffffff, 0.1);
    pointLight.position.x = 2;
    pointLight.position.y = 3;
    pointLight.position.z = 4;
    pointLight.intensity = 2;
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0xff0000, 0.1);
    pointLight2.position.x = -1.86;
    pointLight2.position.y = 1;
    pointLight2.position.z = -1.65;
    pointLight2.intensity = 5;
    scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(0xe1fff, 2);
    pointLight3.position.x = 2.13;
    pointLight3.position.y = 1;
    pointLight3.position.z = 0.65;
    pointLight3.intensity = 1;
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
    var animate = function () {
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
