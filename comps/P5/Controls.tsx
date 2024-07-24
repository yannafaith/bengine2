import p5Types from "p5"
export const ICONS_FILL = "material-symbols-fill"
export const ICONS_OUTLINE = "material-symbols-outlined"
export const RECORD_ICON_TEXT = "radio_button_checked"
export const PLAY_ICON_TEXT = "play_arrow"

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

export function Controls( p5, path, parent ) {
    let className = "bg-white bg-opacity-20 backdrop-blur-lg rounded drop-shadow-lg border p-2"
    let ctn = p5.createDiv()
    ctn.size( 150 )
    ctn.position( 20, 20 )
    ctn.class( className )
    ctn.parent( parent )
    ctn.draggable()
  
    let recordBtn = Button( p5, ctn ).class("flex items-center text-xs text-black")
    Icon( p5, ICONS_OUTLINE, RECORD_ICON_TEXT, recordBtn )
    let recordBtnP = Paragraph( p5, "record", recordBtn )
  
    let playBtn = Button( p5, ctn )
    Icon( p5, ICONS_OUTLINE, PLAY_ICON_TEXT, playBtn )
    let playBtnP = Paragraph( p5, "play", playBtn )
  
    let sketchTime = Paragraph( p5, "0 seconds", ctn )
    Paragraph( p5, `${ path } sketch`, ctn  )
  
    
    let res = {
      recordBtn: recordBtn,
      recordBtnLabel: recordBtnP,
      playBtn: playBtn,
      playBtnLabel: playBtnP,
      playBtnP: playBtn,
      sketchTime: sketchTime
    }
  
    return res
  }