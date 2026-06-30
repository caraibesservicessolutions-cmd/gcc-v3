import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "GOLDEN CIRCLE Caraïbes",
    short_name: "Golden Circle",
    description: "L'Accès aux Privilèges.",
    start_url: "/fr",
    display: "standalone",
    background_color: "#4A192E",
    theme_color: "#4A192E",
    icons: [
      {
        src: "/brand/golden-circle-emblem.png",
        sizes: "631x639",
        type: "image/png"
      }
    ]
  };
}
