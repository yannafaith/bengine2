
"use client"
import p5Types from "p5"
import { usePathname } from "next/navigation"
import { useState, useRef, useEffect } from "react"
import InitP5, { P5Recorder, Controls, CS } from "@/p5/InitP5.tsx"

type P5jsContainerRef = HTMLDivElement;
type P5jsSketch = ( p: p5Types, parentRef: P5jsContainerRef ) => void;

export default function StemSketch({ imgs, noises }) {
  let mp5 = null
  let parentRef = useRef()
  let path = usePathname().split('/')[ 2 ]
  const [ isMounted, setIsMounted ] = useState( false )

  useEffect(() => { if( !isMounted ) setIsMounted( true ) }, [])

  useEffect(() => {
    if ( !isMounted ) return
    if ( !mp5 ) mp5 = InitP5( sketch, parentRef )
    else return mp5.remove()
  }, [ isMounted ] )

  const sketch: P5jsSketch = ( p5, parentRef ) => {

    let idx = 0
    let changeEvery = 10
    let canvasParent = document.getElementById("canvasParent")

    let seconds
  
    let waveSlider, durationSlider 
    let drawPlayTimer = 0, drawPauseTimer = 0
    let overlay, mediaRecorder, isPlaying = false

    let Shader 
    let p5Imgs 
    let p5Noises



    p5.preload = () => {
      Shader = p5.loadShader( '/shaders/standard.vert', '/shaders/stem.frag' )
      p5Imgs = imgs.map( img => p5.loadImage( `/images/${ img.path }` ))
      p5Noises = noises.map( noise => p5.loadImage( `/images/${ noise.path }` ))
    }
  
    p5.setup = () => {
      p5.createCanvas( canvasParent.offsetWidth, canvasParent.offsetHeight, p5.WEBGL ).parent( parentRef )
      mediaRecorder = P5Recorder( path )
      overlay = Controls( p5, path, parentRef )

      waveSlider =  CS( p5, 15, 120, 7, 15, "waves", "ctrls")
      durationSlider = CS( p5, 15, 120, 7, 15, "duration", "ctrls" )

      overlay.playBtn.mouseClicked(() => {
        if ( !isPlaying ) {
          isPlaying = true
          overlay.playBtnLabel.html("running")
        }
        else if ( isPlaying ) {
          isPlaying = false
          overlay.playBtnLabel.html("play")
        }
      })
    
      overlay.recordBtn.mouseClicked(() => {
        if ( mediaRecorder.state == "inactive") {
          if ( !isPlaying ) isPlaying = true
          overlay.playBtnLabel.html("running")
          overlay.recordBtnLabel.html("recording")
          overlay.recordBtn.addClass("text-red-500")
          mediaRecorder.start()
        }
        else if ( mediaRecorder.state == "recording" ) {
          if ( isPlaying ) isPlaying = false
          overlay.playBtnLabel.html("play")
          overlay.recordBtnLabel.html("record")
          overlay.recordBtn.addClass("text-black")
          mediaRecorder.stop()
        }
      })

    }
  
    p5.draw = () => {

      overlay.sketchTime.html(`${ p5.round( drawPlayTimer / 1000 )} seconds`)
      waveSlider.value.html(`${ waveSlider.input.value() }`)
      durationSlider.value.html(`${ durationSlider.input.value() }`)
      handleControls()

      Shader.setUniform( "u_range", 0.0 )
      Shader.setUniform( "u_threshold", 1.0 )
      Shader.setUniform( "u_noise", p5Noises[ 0 ] )
  
      if ( seconds < changeEvery ) {
        Shader.setUniform( "u_background",  p5Imgs[ idx ])
        Shader.setUniform( "u_foreground", p5Imgs[ idx + 1 ]) 
      }
      else if ( p5Imgs.length-2 > idx ) {
        idx+=1
        changeEvery += 10
        Shader.setUniform( "u_timeout", drawPlayTimer )
      } 

  
      p5.shader( Shader )
      p5.rect( 0, 0, 0 )
  
    }
  
    p5.windowResized = () => {
      p5.resizeCanvas( canvasParent.offsetWidth, canvasParent.offsetHeight )
    }

    function handleControls() {
      if ( !isPlaying ) {
        const pausedAt = drawPlayTimer
        drawPauseTimer = p5.millis() - drawPlayTimer
        seconds = pausedAt / 1000
      }
    
      if ( isPlaying ) {
        if ( !drawPauseTimer ) drawPlayTimer = p5.millis()
        else if ( drawPauseTimer ) drawPlayTimer = p5.millis() - drawPauseTimer
        seconds = drawPlayTimer / 1000 
        Shader.setUniform( "u_time", drawPlayTimer )
      } 
    }
  
  }

  return (
    <div>
      <div ref={ parentRef } id="canvasParent" className="h-[400px] sm:w-full md:w-4/6 lg:w-2/3 m-auto" />
      <a id="download" className="hidden">download</a>
      <div id="ctrls" />
    </div> 
  )
}
