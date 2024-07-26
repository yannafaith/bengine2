
import Sketch from "app/sketches/Sketch"
import { getSketchData } from "actions/sketches"

export default async function Page({ params }) {
  const title = params.path
  const settings = await getSketchData(title)
  return <Sketch {...settings} />
  
}
