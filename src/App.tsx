import * as THREE from 'three';
import { Canvas, useFrame, useThree, Vector3 } from '@react-three/fiber';
import React, { useRef, useEffect } from 'react';
import { OrbitControls } from '@react-three/drei';
import logo from './logo.svg';
import './App.css';

const deg2rad = (degrees:number) => degrees * (Math.PI / 180);

const Axes = () => {
    return (
        <>
            <arrowHelper args={[new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 0, 0), 60, 0x333333, 10, 10]} />
            <arrowHelper args={[new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 0, 0), 60, 0x333333, 10, 10]} />
            <arrowHelper args={[new THREE.Vector3(0, 0, 1), new THREE.Vector3(0, 0, 0), 60, 0x333333, 10, 10]} />
        </>
    )
}

const Scene = () => {

    return (
        <div id="canvas-container">
            <Canvas>
                <gridHelper
                    args={[100, 20, "#4D089A", "#4D089A"]}
                    position={[0, 0, 0]}
                    rotation={[0, 0, -Math.PI / 2]}
                />

                <gridHelper
                    args={[100, 20, "#4D089A", "#4D089A"]}
                    position={[0, 0, 0]}
                    rotation={[0, -Math.PI / 2, 0]}
                />

                <gridHelper
                    args={[100, 20, "#4D089A", "#4D089A"]}
                    position={[0, 0, 0]}
                    rotation={[-Math.PI / 2, 0, 0]}
                />
                <Axes />
                <ambientLight intensity={0.1} />
                <directionalLight color="red" position={[0, 0, 5]} />
                <mesh>
                    <boxGeometry args={[2, 4, 3]}/>
                    <meshStandardMaterial />
                </mesh>
                <vector3 args={[0, 1, 2]} />
                <OrbitControls autoRotateSpeed={5} />
            </Canvas>
        </div>
    )
}

function App() {
  return (
    <div className="App">
        <Scene />
    </div>
  );
}

export default App;
