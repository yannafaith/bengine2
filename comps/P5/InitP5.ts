import p5Types from "p5"

export const ICONS_FILL = "material-symbols-fill"
export const ICONS_OUTLINE = "material-symbols-outlined"

export const RECORD_ICON_TEXT = "radio_button_checked"
export const PLAY_ICON_TEXT = "play_arrow"

export function P5Recorder( path ) {
  let recordedChunks = []
  let link = document.querySelector("a")
  let canvas = document.querySelector("canvas")
  let stream = canvas.captureStream( 60 )
  let options = { mimeType: "video/webm; codecs=vp9" }
  let mediaRecorder = new MediaRecorder( stream, options )

  function download( event ) {
    if ( event.data.size > 0 ) recordedChunks.push( event.data )
    const blob = new Blob( recordedChunks, { type: "video/webm" })
    const url = URL.createObjectURL( blob )
    link.href = url
    link.download = `${ path }_sketch.webm`
    link.click()
    window.URL.revokeObjectURL(url)
  }

  mediaRecorder.ondataavailable = download
  return mediaRecorder

}

export default async function InitP5( sketch, parentRef ) {
  let p5 = ( await import( "p5" )).default
  return new p5( sketch, parentRef.current )
}

export function Controls( p5, parent? ) {
  let className = "bg-white bg-opacity-20 backdrop-blur-lg rounded drop-shadow-lg p-2 m-2"
  let ctn = p5.createDiv()
  ctn.size( 150, 120 )
  ctn.position( 20, 20 )
  ctn.class( className )
  ctn.draggable()
  parent && ctn.parent( parent )
  return ctn
}

export function Icon( p5: p5Types, icon_class: string, icon_text:string, parent? ) {
  let ctn = p5.createSpan()
  ctn.html( icon_text )
  ctn.class( icon_class ) 
  ctn.addClass('text-sm p-1')
  parent && ctn.parent( parent )
  return ctn
}

export function Button( p5: p5Types, parent? ) {
  let className = "flex items-center cursor-pointer"
  let ctn = p5.createButton("")
  ctn.class( className )
  parent && ctn.parent( parent )
  return ctn
}

export function Paragraph( p5: p5Types, text?: string, parent? ) {
  let className = "text-xs p-1"
  let ctn = p5.createP( text )
  ctn.class( className )
  parent && ctn.parent( parent )
  return ctn
}

export function Slider( p5, start, stop, val, i, parent? ) {
  let ctn = p5.createSlider( start, stop, val, i )
  ctn.size( 100 )
  parent && ctn.parent( parent )
  return ctn
}

// export function CustomSlider( p5, parent? ) {
//   let className = "w-[130px] flex justify-around items-center text-xs"
//   let ctn = p5.createDiv()
//   ctn.class( className )
//   ctn.parent( parent )
//   return ctn
// }

// export function CustomSlider({ sliderParentId, sliderValueParentId, sliderLabel }) {
//   return (
//     <div className="flex items-center mx-2">
//       <p id={ sliderValueParentId } className="px-2 py-1 mx-2 border rounded-md" />
//       <div id={ sliderParentId } className="flex flex-col p-1 justify-center">
//         <p>{ sliderLabel } </p>
//       </div>
//     </div>
//   )
// }

// export function CanvasWithOverlay({ canvasParentId, canvasParentRef }) {
//   let twClass = "h-[500px] sm:w-full md:w-4/6 lg:w-2/3 m-auto"
//   return <div id = { canvasParentId } ref = { canvasParentRef } className={ twClass }/>
// }


