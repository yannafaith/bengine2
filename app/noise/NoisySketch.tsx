
"use client"
import { useState, useRef, useEffect } from "react"

function sketch( p5, ref ) {

    let Shader: any
    let background: any
    let foreground: any
    let noise: any


    let [ width, height ] = [
        p5.windowWidth / 1.15,
        p5.windowHeight / 1.25
    ]

    p5.preload = () => {
        Shader = p5.loadShader( 'shaders/standard.vert', 'shaders/noise.frag' )
        background = p5.loadImage("images/stem/yellow_actuality.png"),
        foreground = p5.loadImage("images/stem/ballerina.png")
        noise = p5.loadImage("images/noise/perlin.png")
    }

    p5.setup = () => {
      p5.createCanvas( width, height, p5.WEBGL ).parent( ref )
    }

    p5.draw = () => {
        Shader.setUniform( "u_time", p5.millis() )
        Shader.setUniform( "u_noise", noise )
        Shader.setUniform( "u_background", background)
        Shader.setUniform( "u_foreground", foreground)

        p5.shader( Shader )
        p5.rect( 0, 0, 0 )

    }
 
    
}

export default function NoisySketch() {
    const noisySketchRef = useRef()
    const [ isMounted, setIsMounted ] = useState( false )
    useEffect(() => { setIsMounted( true ) }, [])

    let mp5 = null;

    async function initSketch() {
        const p5 = ( await import( "p5" )).default
        return new p5( sketch, noisySketchRef.current )
      }
    

    useEffect(() => {
        if ( !isMounted ) return
        if ( !mp5 ) mp5 = initSketch()
        else mp5.remove()
      }, [ isMounted ] )

    useEffect(() => {}, [ sketch ])

  return(
    <div className="border-4 border-black min-w-[300px] max-w-[1200px]" ref={ noisySketchRef } /> 
  )
}