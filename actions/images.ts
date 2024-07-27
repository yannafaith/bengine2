
// export const noisesDict = {
//   perlin: { id: 0,  path: "noise/perlin.png" }
// }

const images = [
  { title: "red_ocean", id: 0, path: "red_ocean.png", blob: "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/red_ocean.png" },
  { title: "polluted_ocean", id: 1, path: "polluted_ocean.jpg", blob: "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/polluted_ocean.jpg" },
  { title: "industrial_ocean", id: 2, path: "industrial_ocean.jpg", blob: "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/industrial_ocean.jpg" },
  { title: "your_ocean_changed", id: 3, path: "your_ocean_changed.png", blob: "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/your_ocean_changed.png" },
  { title: "yellow_org_collab", id: 0, path: "yellow_org_collab.jpg", blob: "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/yellow_org_collab.jpg" },
  { title: "ballerina", id: 1, path: "ballerina.png", blob: "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/ballerina.png" },
  { title: "Reclamation", id: 2, path: "Reclamation.png", blob: "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/Reclamation.png" },
  { title: "yellow_org_stem", id: 3, path: "yellow_org_stem.jpg", blob: "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/yellow_org_stem.jpg" },
  { title: "blue_red_stem", id: 5, path: "blue_red_stem.jpg", blob: "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/blue_red_stem.jpg" },
  { title: "sunset_circles_stem", id: 6, path: "sunset_circles_stem.jpg", blob: "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/sunset_circles_stem.jpg" },
  { title: "in_search_of_pareto", id: 7, path: "in_search_of_pareto.png", blob: "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/in_search_of_pareto.png" },
  { title: "patents_stem", id: 8, path: "patents_stem.jpg", blob: "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/patents_stem.jpg" },
  { title: "person_stem", id: 9, path: "person_stem.jpg", blob: "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/person_stem.jpg" },
  { title: "pink_glimpses", id: 10, path: "pink_glimpses.png", blob: "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/pink_glimpses.png" },
  { title: "predicting_the_present", id: 11, path: "predicting_the_present.png", blob: "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/predicting_the_present.png" },
  { title: "quantum_ballerina", id: 12, path: "quantum_ballerina.png", blob: "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/quantum_ballerina.png" },
  { title: "quantum_computer", id: 13, path: "quantum_computer.png", blob: "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/quantum_computer.png" },
  { title: "reconfiguring_formality", id: 14, path: "reconfiguring_formality.jpg", blob: "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/reconfiguring_formality.jpg" },
  { title: "resistance", id: 15, path: "resistance.png", blob: "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/resistance.png" },
  { title: "abstract_toon_stem", id: 16, path: "abstract_toon_stem.jpg", blob: "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/abstract_toon_stem.jpg" },
  { title: "sid", id: 17, path: "sid.jpg", blob: "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/sid.jpg" },
  { title: "industrial_ocean", id: 36, path: "industrial_ocean.jpg", blob: "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/industrial_ocean.jpg" },
  { title: "red_ocean", id: 33, path: "red_ocean.png", blob: "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/red_ocean.png" },
  { title: "polluted_ocean", id: 35, path: "polluted_ocean.jpg", blob: "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/polluted_ocean.jpg" },
]

const imagesBySketch = {
  oceans : [
    { title: "red_ocean", id: 0, path: "red_ocean.png", blob: "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/red_ocean.png" },
    { title: "polluted_ocean", id: 1, path: "polluted_ocean.jpg", blob: "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/polluted_ocean.jpg" },
    { title: "industrial_ocean", id: 2, path: "industrial_ocean.jpg", blob: "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/industrial_ocean.jpg" },
    { title: "your_ocean_changed", id: 3, path: "your_ocean_changed.png", blob: "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/your_ocean_changed.png" },
  ],
  city : [
    { title: "industrial_ocean", id: 36, path: "industrial_ocean.jpg", blob: "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/industrial_ocean.jpg" },
    { title: "red_ocean", id: 33, path: "red_ocean.png", blob: "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/red_ocean.png" },
    { title: "polluted_ocean", id: 35, path: "polluted_ocean.jpg", blob: "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/polluted_ocean.jpg" },
  ],
  stem: [
    { title: "yellow_org_collab", id: 0, path: "yellow_org_collab.jpg", blob: "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/yellow_org_collab.jpg" },
    { title: "ballerina", id: 1, path: "ballerina.png", blob: "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/ballerina.png" },
    { title: "Reclamation", id: 2, path: "Reclamation.png", blob: "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/Reclamation.png" },
    { title: "yellow_org_stem", id: 3, path: "yellow_org_stem.jpg", blob: "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/yellow_org_stem.jpg" },
    { title: "blue_red_stem", id: 5, path: "blue_red_stem.jpg", blob: "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/blue_red_stem.jpg" },
    { title: "sunset_circles_stem", id: 6, path: "sunset_circles_stem.jpg", blob: "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/sunset_circles_stem.jpg" },
    { title: "in_search_of_pareto", id: 7, path: "in_search_of_pareto.png", blob: "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/in_search_of_pareto.png" },
    { title: "patents_stem", id: 8, path: "patents_stem.jpg", blob: "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/patents_stem.jpg" },
    { title: "person_stem", id: 9, path: "person_stem.jpg", blob: "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/person_stem.jpg" },
    { title: "pink_glimpses", id: 10, path: "pink_glimpses.png", blob: "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/pink_glimpses.png" },
    { title: "predicting_the_present", id: 11, path: "predicting_the_present.png", blob: "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/predicting_the_present.png" },
    { title: "quantum_ballerina", id: 12, path: "quantum_ballerina.png", blob: "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/quantum_ballerina.png" },
    { title: "quantum_computer", id: 13, path: "quantum_computer.png", blob: "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/quantum_computer.png" },
    { title: "reconfiguring_formality", id: 14, path: "reconfiguring_formality.jpg", blob: "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/reconfiguring_formality.jpg" },
    { title: "resistance", id: 15, path: "resistance.png", blob: "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/resistance.png" },
    { title: "abstract_toon_stem", id: 16, path: "abstract_toon_stem.jpg", blob: "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/abstract_toon_stem.jpg" },
    { title: "sid", id: 17, path: "sid.jpg", blob: "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/sid.jpg" },
  ]
}

export async function getImagesBySketch( sketchTitle ) {
  return imagesBySketch[ sketchTitle ]
}

export async function getDefinedSketches() {
  return Object.keys( imagesBySketch )
}

export async function getImages() {
  return images
}









