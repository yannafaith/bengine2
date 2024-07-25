
"use client"
import p5Types from "p5"
import InitP5 from "@/p5/Instance"
import { Slider } from "@/p5/Slider"
import { Controls } from "@/p5/Controls"
import { P5Recorder } from "@/p5/Recorder"
import { P5Sketch } from "@/p5/P5Sketch"
import { useState, useRef, useEffect } from "react"

type P5jsContainerRef = HTMLDivElement;
type P5jsSketch = ( p: p5Types, parentRef: P5jsContainerRef ) => void

export default function Sketch({ imgs, title, shaders }) {
  let mp5 
  let parentRef = useRef()
  let canvasParent

  let Shader 
  let p5Imgs 

  let drawPlayTimer = 0, drawPauseTimer = 0
  let overlay, mediaRecorder, isPlaying = false

  const [ isMounted, setIsMounted ] = useState( false )
  const [ waveMotion, setWaveMotion ] = useState( 10 )
  const [ zoomMotion, setZoomMotion ] = useState( 30 )
  const [ timeMotion, setTimeMotion ] = useState( 30 )

  useEffect(() => { if( !isMounted ) setIsMounted( true ) }, [])

  useEffect(() => { 
    if ( !isMounted ) return
    canvasParent = document.getElementById("canvasParent")
    if ( !mp5 ) mp5 = InitP5( sketch, parentRef, canvasParent )
    else return mp5.remove()
  }, [ isMounted ])


  const sketch: P5jsSketch = ( p5, parentRef ) => {


    p5.preload = () => {
      Shader = p5.loadShader("/shaders/standard.vert", "/shaders/ocean-mix.frag")
      p5Imgs = imgs.map( img => p5.loadImage( img.url ))
    }

    p5.setup = () => {

      p5.createCanvas( canvasParent.offsetWidth, canvasParent.offsetHeight, p5.WEBGL ).parent( parentRef )
      
      mediaRecorder = P5Recorder( title )
      overlay = Controls( p5, title, parentRef )

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
      // uTopTime.value.html(`${ uTopTime.input.value() }`)
      // uBtmTime.value.html(`${ uBtmTime.input.value() }`)
      // waveSlider.value.html(`${ waveSlider.input.value() }`)

      handleControls()
      
      Shader.setUniform( "u_topTime", waveMotion )
      Shader.setUniform( "u_btmTime", timeMotion )
      Shader.setUniform( "u_waves", zoomMotion )
      Shader.setUniform( "u_industrial_ocean", p5Imgs[ 0 ] )
      Shader.setUniform( "u_red_ocean", p5Imgs[ 1 ])
      Shader.setUniform("u_polluted_ocean", p5Imgs[ 2 ])

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
        Shader.setUniform( "u_time", pausedAt / 1000 )
      }
    
      if ( isPlaying ) {
        if ( !drawPauseTimer ) drawPlayTimer = p5.millis()
        else if ( drawPauseTimer ) drawPlayTimer = p5.millis() - drawPauseTimer
        Shader.setUniform( "u_time", drawPlayTimer / 1000 )
      } 
    }

  }

  return (
    <P5Sketch parentRef={ parentRef }>
      <Slider label={"waves"} min={0} max={1000} step={1} defaultValue={10} sliderValue={waveMotion} setSliderValue={setWaveMotion} />
      <Slider label={"time"} min={0} max={3000} step={1} defaultValue={30} sliderValue={zoomMotion} setSliderValue={setZoomMotion} />
      <Slider label={"zoom"} min={0} max={3000} step={1} defaultValue={30} sliderValue={zoomMotion} setSliderValue={setZoomMotion} />
    </P5Sketch>
  )
}