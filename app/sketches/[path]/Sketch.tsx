
"use client"
import p5Types from "p5"
import { usePathname } from "next/navigation"
import { useState, useRef, useEffect } from "react"
import InitP5, { P5Recorder, Controls, CS } from "@/p5/InitP5.tsx"

type P5jsContainerRef = HTMLDivElement;
type P5jsSketch = (p: p5Types, parentRef: P5jsContainerRef) => void;

export default function PathSKetch({ imgs }) {

  let mp5: any = null
  let parentRef = useRef()
  let path = usePathname().split('/')[ 2 ]
  const [ isMounted, setIsMounted ] = useState( false )

  useEffect(() => { if( !isMounted ) setIsMounted( true ) }, [])

  useEffect(() => { 
    if ( !isMounted ) return
    if ( !mp5 ) mp5 = InitP5( sketch, parentRef )
    else return mp5.remove()
  }, [ isMounted ])
  
  const sketch: P5jsSketch  = ( p5, parentRef ) => {

    let Shader 
    let p5Imgs 
  
    let timeSlider
    let drawPlayTimer = 0, drawPauseTimer = 0
    let overlay, mediaRecorder, isPlaying = false
    let canvasParent = document.getElementById("canvasParent")

    p5.preload = () => {
      Shader = p5.loadShader("/shaders/standard.vert", "/shaders/texture.frag")
      p5Imgs = imgs.map( img => p5.loadImage(`/images/${ img.path }`))
    }

    p5.setup = () => {
      p5.createCanvas( canvasParent.offsetWidth, canvasParent.offsetHeight, p5.WEBGL ).parent( parentRef )

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
      
      Shader.setUniform( "u_background", p5Imgs[ 0 ] )
      p5.shader( Shader )
    }

    p5.draw = () => {
      timeSlider.value.html(`${ timeSlider.input.value() }`)
      overlay.sketchTime.html(`${ p5.round( drawPlayTimer / 1000 )} seconds`)
      handleControls()
      p5.rect( 0, 0, 0 )
    }

    p5.windowResized = () => {
      p5.resizeCanvas( canvasParent.offsetWidth, canvasParent.offsetHeight )
    }

    
    function handleControls() {
      if ( !isPlaying ) {
        drawPauseTimer = p5.millis() - drawPlayTimer
      }
    
      if ( isPlaying ) {
        if ( !drawPauseTimer ) drawPlayTimer = p5.millis()
        else if ( drawPauseTimer ) drawPlayTimer = p5.millis() - drawPauseTimer
        Shader.setUniform( "u_time", drawPlayTimer / 1000 )
        Shader.setUniform("u_var", timeSlider.input.value())
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