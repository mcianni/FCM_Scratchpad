import * as THREE from 'three';
import { Canvas, useFrame, useThree, Vector3 } from '@react-three/fiber';
import React, { useRef, useLayoutEffect, useEffect, useMemo } from 'react';
import { OrbitControls, Line, Box, Sphere } from '@react-three/drei';
import { dot, cross, abs} from 'mathjs';
import './App.css';

type Vector = [number, number, number]
type Parallelepiped = {a:Vector, b:Vector, c:Vector}

const v3 = (v:Vector) => {
  return new THREE.Vector3(v[0], v[1], v[2])
}

const Axes = () => {
  return (
    <>
      <arrowHelper args={[v3([1, 0, 0]), v3([52, 0, 0]), 0, 'red',   2, 2]} />
      <arrowHelper args={[v3([0, 1, 0]), v3([0, 52, 0]), 0, 'green', 2, 2]} />
      <arrowHelper args={[v3([0, 0, 1]), v3([0, 0, 52]), 0, 'blue',  2, 2]} />
      <Line points={[[0,0,0], [50,0,0]]} color='#666666' />
      <Line points={[[0,0,0], [0,50,0]]} color='#666666' />
      <Line points={[[0,0,0], [0,0,50]]} color='#666666' />
    </>
  )
}

const ParallelepipedComponent = ({ a, b, c }: Parallelepiped) => {

  const va = v3(a)
  const vb = v3(b)
  const vc = v3(c)

  const lines = [
    { start: [0,0,0], end: a },
    { start: [0,0,0], end: b },
    { start: [0,0,0], end: c },
    { start: a, end: va.clone().add(vb).toArray() },
    { start: a, end: va.clone().add(vc).toArray() },
    { start: b, end: vb.clone().add(va).toArray() },
    { start: b, end: vb.clone().add(vc).toArray() },
    { start: c, end: vc.clone().add(va).toArray() },
    { start: c, end: vc.clone().add(vb).toArray() },
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
      { lines.map((l, i) => <LineComponent key={i} origin={l.start} end={l.end} color={i<3?'blue':'red'} /> )}
    </>
  )
}

const LineComponent = (props:any) => {
  return (
    <Line
      id={props.id}
      points={[props.origin, props.end]}
      color={props.color || 'red'}
    />
  )
}

const Sidebar = ({ parallelepipeds }: { parallelepipeds: Parallelepiped[] }) => {
  return (
    <div id="sidebar">
      {
        parallelepipeds.map((p, i) => {
          return (
            <div className="details" key={i}>
              <div>A: ({p.a.toString()})</div>
              <div>B: ({p.b.toString()})</div>
              <div>C: ({p.c.toString()})</div>
              <div>Volume: {abs(dot(cross(p.a,p.b),p.c))}</div>
            </div>
          )
        })
      }
    </div>
  )
}

const Grid = () => {
  return (
    <>
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
    </>
  )
}

const Camera = () => {
  useThree(({ camera }) => {
    camera.position.set(100,100,100)
  });
  return (<></>);
}

const Scene = ({ parallelepipeds }: { parallelepipeds: Parallelepiped[] }) => {
  return (
    <div id="canvas-container">
      <Canvas dpr={window.devicePixelRatio} >
        { parallelepipeds.map((p, i) => <ParallelepipedComponent key={`p${i}`} a={p.a} b={p.b} c={p.c}/>) }

        <Grid />
        <ambientLight intensity={0.1} />
        <directionalLight color="red" position={[0, 0, 5]} />
        <OrbitControls />
        <Camera />
      </Canvas>
    </div>
  )
}

function App() {
  const v1:Vector = [0,20,4]
  const v2:Vector = [-20,10,6]
  const v3:Vector = [8,-12,30]
  const v4:Vector = [10,-10,-20]

  const parallelepipeds:Parallelepiped[] = [
    { a:v1, b:v2, c:v3 },
    { a:v1, b:v2, c:v4 },
    { a:v1, b:v3, c:v4 },
    { a:v2, b:v3, c:v4 },
  ]

  return (
    <div className="App">
      <Sidebar parallelepipeds={parallelepipeds} />
      <Scene parallelepipeds={parallelepipeds} />
    </div>
  );
}

export default App;