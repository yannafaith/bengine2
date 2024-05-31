
"use client"
import { useState, useRef, useEffect } from "react"
import { transitionSketch as sketch } from "./transition-sketch"

export default function SketchContainer() {
  const parentRef = useRef()
  const [ isMounted, setIsMounted ] = useState( false )

  useEffect(() => { setIsMounted( true ) }, [])

  async function initSketch() {
    const p5 = ( await import( "p5" )).default
    const mp5 = new p5( sketch, parentRef.current )
    return mp5.remove
  }

  useEffect(() => {
    if ( !isMounted ) return
    initSketch()
  }, [ isMounted ] )

  return ( 
    <div className="border-4 border-purple-500 min-w-[300px] max-w-[1200px]" ref={ parentRef } /> 
  )
}