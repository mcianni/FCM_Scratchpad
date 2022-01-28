import * as THREE from 'three';
import { Canvas, useFrame, useThree, Vector3 } from '@react-three/fiber';
import React, { useRef, useLayoutEffect, useEffect, useMemo } from 'react';
import { OrbitControls, Line, Box, Sphere } from '@react-three/drei';
import './App.css';

type vector = [number, number, number]

const deg2rad = (degrees:number) => degrees * (Math.PI / 180);

const v3 = (v:vector) => {
  return new THREE.Vector3(v[0], v[1], v[2])
}

const Axes = () => {
  return (
    <>
      <arrowHelper args={[v3([1, 0, 0]), v3([55, 0, 0]), 0, 0x333333, 5, 5]} />
      <arrowHelper args={[v3([0, 1, 0]), v3([0, 55, 0]), 0, 0x333333, 5, 5]} />
      <arrowHelper args={[v3([0, 0, 1]), v3([0, 0, 55]), 0, 0x333333, 5, 5]} />
    </>
  )
}

const Parallelpiped = (props:{a:vector, b:vector, c:vector}) => {
  const ref = useRef<any>()

  /*const vertices = new Float32Array([
    ...props.a,
    ...props.b,
    ...props.c,
  ])*/

  const va = v3(props.a)
  const vb = v3(props.b)
  const vc = v3(props.c)

  let lines = [
    { start: [0,0,0], end: props.a    },
    { start: [0,0,0], end: props.b    },
    { start: [0,0,0], end: props.c    },
    { start: props.a, end: va.clone().add(vb).toArray() },
    { start: props.a, end: va.clone().add(vc).toArray() },
    { start: props.b, end: vb.clone().add(va).toArray() },
    { start: props.b, end: vb.clone().add(vc).toArray() },
    { start: props.c, end: vc.clone().add(va).toArray() },
    { start: props.c, end: vc.clone().add(vb).toArray() },
    { start: va.clone().add(vb).toArray(), end: vb.clone().add(vc.clone().add(va)).toArray() },
    { start: va.clone().add(vc).toArray(), end: vb.clone().add(vc.clone().add(va)).toArray() },
    { start: vc.clone().add(vb).toArray(), end: vb.clone().add(vc.clone().add(va)).toArray() },
  ]

  /*useLayoutEffect(() => {
    ref?.current?.geometry?.setFromPoints(vertices)
    ref?.current?.geometry?.setAttribute('position', new THREE.BufferAttribute(vertices, 3))
  }, [props.a, vertices])*/

  return (
    <>
      { lines.map((l, i) => <MyVector key={i} origin={l.start} end={l.end} /> )}
    </>
  )
}

const MyVector = (props:any) => {
  return (
    <Line
      id={props.id}
      points={[props.origin, props.end]}
      color="black"
    />
  )
}

const Scene = () => {
  return (
    <div id="canvas-container">
      <Canvas dpr={window.devicePixelRatio} >
        <gridHelper
          args={[100, 20, "#999999"]}
          position={[0, 0, 0]}
          rotation={[0, 0, -Math.PI / 2]}
        />

        <gridHelper
          args={[100, 20, "#999999"]}
          position={[0, 0, 0]}
          rotation={[0, -Math.PI / 2, 0]}
        />

        <gridHelper
          args={[100, 20, "#999999"]}
          position={[0, 0, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
        />
        <Axes />
        <Parallelpiped a={[0,10,12]} b={[2,1,6]} c={[8,6,3]}/>

        <ambientLight intensity={0.1} />
        <directionalLight color="red" position={[0, 0, 5]} />
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
