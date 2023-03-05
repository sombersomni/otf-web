
import * as THREE from 'three';
import React, { Suspense, useState, useCallback, useEffect } from 'react'
import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'

import { useRef } from 'react';
import { useSpring, animated } from '@react-spring/three';
import { useFrame, useThree } from '@react-three/fiber';
import { useDrag } from '@use-gesture/react';


function SceneImage({src, size, meshRef, bind, position, handleClick}) {
  const texture = useLoader(TextureLoader, src)
  return (
    <animated.mesh ref={meshRef} position={position} {...bind()} onClick={handleClick}>
      <planeGeometry attach="geometry" args={size} />
      <meshBasicMaterial attach="material" map={texture} transparent />
    </animated.mesh>
  )
}

function SceneObject({ handleClick, size, src }) {
  const meshRef = useRef();
  const isOver = useRef(false);
  const isSelected = useRef(false);
  const { size: s, viewport } = useThree();

  const aspect = s.width / viewport.width;
  console.log(aspect)


  // Set up a spring animation for the mesh's position
  const [spring, api] = useSpring(() => ({
    position: [0, 0],
    
    config: { mass: 1, tension: 350, friction: 40 }
  }));

  const handlePointerEnter = () => {
    console.log('found item');
  }

  const handlePointerLeave = () => {
    console.log('left item');
  }


  const handleWindowPointerOver = useCallback(() => {
    isOver.current = true
  }, [])

  const handleWindowPointerOut = useCallback(() => {
    isOver.current = false

  }, [])


  const handlePointerMove = useCallback(
    e => {
      if (isOver.current) {
        const x = (e.offsetX / s.width) * 2 - 1
        const y = (e.offsetY / s.height) * -2 + 1
        // api.start({
        //   position: [x, y],
        // })
      }
    },
    [api, s]
  )

  const clickHandler = useCallback(
    (e) => {
      handleClick(e, meshRef)
    }
  , [meshRef])

  useEffect(() => {
    window.addEventListener('pointerover', handleWindowPointerOver)
    window.addEventListener('pointerout', handleWindowPointerOut)
    window.addEventListener('pointermove', handlePointerMove)

    return () => {
      window.removeEventListener('pointerover', handleWindowPointerOver)
      window.removeEventListener('pointerout', handleWindowPointerOut)
      window.removeEventListener('pointermove', handlePointerMove)
    }
  }, [handleWindowPointerOver, handleWindowPointerOut, handlePointerMove])

  const bind = useDrag(
    ({ offset: [x, y] }) => {
      api.start({
        position: [x / aspect, -y / aspect ],
      })
    },
    { pointerEvents: true }
  );

  // Use useFrame to update the mesh's position based on the spring animation
  // useFrame(() => {
  //   if (!meshRef?.current?.position) return;
  //   meshRef.current.position.x = spring.position[0];
  //   meshRef.current.position.y = spring.position[1];
  //   meshRef.current.position.z = -200;
  // });

  return (
    <SceneImage
      size={size}
      src={src}
      meshRef={meshRef}
      position={spring.position.to((x, y) => [x, y, -200])}
      bind={bind}
      handleClick={clickHandler}
    />
  );
}

export const Layer = () => {
  const { camera } = useThree();

  const handleClick = useCallback(
    (event, meshRef) => {
      // Use raycasting to detect when the user clicks on the mesh
      console.log('clicked, enable drag')
      const raycaster = new THREE.Raycaster();
      const mouse = new THREE.Vector2();
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObject(meshRef.current);
      if (intersects.length > 0) {
        // Do something when the user clicks on the mesh
        console.log('raycasting works');
      }
    },
    [camera]
  );

  return (
      <>
        <SceneObject handleClick={handleClick} size={[600, 400]} src="nba.jpg" />
        <SceneObject handleClick={handleClick} size={[100, 100]} src="logo.png" />
      </>
  )
}