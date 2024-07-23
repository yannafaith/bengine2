
import Nav from "@/comps/Nav"
import ArtLink from "@/comps/ArtLinks"
import { getImages } from "actions/blobs"

export default function ArtPage() {
  const links = [
    { path: "/sketches/stem", text: "stem" },
    { path: "/sketches/ocean", text: "ocean" },
    { path: "/sketches/house", text: "house" },
    { path: "/sketches/waves", text: "waves" },
    { path: "/sketches/window", text: "window" },
  ]

  return (
    <>
      <Nav links={ links } />
        <ArtLinks />
    </>
  )
}

async function ArtLinks() {
  const images = await getImages({ limit: 30 })
  return (
    <div className="mb-[10px] max-w-[1200px] h-[350px] m-auto flex flex-wrap justify-center items-center overflow-auto">
      { images.blobs && images.blobs.map(( img, idx ) => <ArtLink key={ idx } url={ img.url } pathname={ img.pathname} /> )}
    </div>
  )
}

