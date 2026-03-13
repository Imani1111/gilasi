import { Product } from "../context/AppContext";

const imageFromAssets = (fileName: string) => `/assets/images/${fileName}`;

export const products: Product[] = [
  {
    id: 1,
    name: "Blues Glass",
    description:
      "Elegantly crafted from 100% recycled glass. Each vase is unique with swirling green and amber hues, perfect for fresh flowers or as a standalone centrepiece.",
    price: 400,
    image: imageFromAssets("blue.jpg"),
    category: "Blues",
  },
  {
    id: 2,
    name: "Blues Set",
    description:
      "A set of 4 vibrant hand-blown bowls made from salvaged glass. Microwave-safe and food-grade. Ideal for snacks, salads, or decorative displays.",
    price: 2000,
    image: imageFromAssets("bluesset.jpg"),
    category: "Blues",
  },
  {
    id: 3,
    name: "Blues Decanter",
    description:
      "Transformed from discarded bottles into stunning art pieces. Hand-painted with natural pigments and sealed for longevity. A statement piece for any shelf.",
    price: 400,
    image: imageFromAssets("bluesdecanter.jpg"),
    category: "Blues",
  },
  {
    id: 4,
    name: "Browns Glass",
    description:
      "Set of 6 sturdy drinking cups crafted from melted recycled glass. Each cup features a slightly different tint, making every sip an eco-conscious experience.",
    price: 400,
    image: imageFromAssets("browns.jpg"),
    category: "Browns",
  },
  {
    id: 5,
    name: "Browns Set",
    description:
      "Romantic candle holders blown from recycled wine bottles. The thick walls create a warm, amber glow. Sold as a pair - perfect for dinner tables or bedside.",
    price: 2000,
    image: imageFromAssets("brownsset.jpg"),
    category: "Browns",
  },
  {
    id: 6,
    name: "Classic Glass",
    description:
      "Handcrafted pendant necklace featuring a polished piece of recycled sea glass set in sterling silver. Each piece is one-of-a-kind - wearable art for the eco-conscious.",
    price: 400,
    image: imageFromAssets("classic.jpg"),
    category: "Classics",
  },
  {
    id: 7,
    name: "Classics Set",
    description:
      "A stunning mosaic panel assembled from hundreds of coloured glass fragments. Measures 40x40 cm, ready to hang. Transforms any wall into a kaleidoscope of colour.",
    price: 2000,
    image: imageFromAssets("classicsset.jpg"),
    category: "Classics",
  },
  {
    id: 8,
    name: "Browns Decanter",
    description:
      "Melodious wind chimes crafted from tumbled recycled glass pieces in varying sizes and colours. Hangs 60 cm and produces a gentle, soothing sound in the breeze.",
    price: 400,
    image: imageFromAssets("brownsdecanter.jpg"),
    category: "Browns",
  },
  {
    id: 9,
    name: "Greens Glass",
    description:
      "Melodious wind chimes crafted from tumbled recycled glass pieces in varying sizes and colours. Hangs 60 cm and produces a gentle, soothing sound in the breeze.",
    price: 400,
    image: imageFromAssets("green.jpg"),
    category: "Greens",
  },
  {
    id: 10,
    name: "Greens Set",
    description:
      "Melodious wind chimes crafted from tumbled recycled glass pieces in varying sizes and colours. Hangs 60 cm and produces a gentle, soothing sound in the breeze.",
    price: 2000,
    image: imageFromAssets("greensset.jpg"),
    category: "Greens",
  },
  {
    id: 11,
    name: "Hexagon Glass",
    description:
      "Melodious wind chimes crafted from tumbled recycled glass pieces in varying sizes and colours. Hangs 60 cm and produces a gentle, soothing sound in the breeze.",
    price: 400,
    image: imageFromAssets("hexagon.jpg"),
    category: "Hexagons",
  },
  {
    id: 12,
    name: "Hexagons Set",
    description:
      "Melodious wind chimes crafted from tumbled recycled glass pieces in varying sizes and colours. Hangs 60 cm and produces a gentle, soothing sound in the breeze.",
    price: 2000,
    image: imageFromAssets("hexagonset.jpg"),
    category: "Hexagons",
  },
  {
    id: 13,
    name: "Hexagon Decanter",
    description:
      "Melodious wind chimes crafted from tumbled recycled glass pieces in varying sizes and colours. Hangs 60 cm and produces a gentle, soothing sound in the breeze.",
    price: 400,
    image: imageFromAssets("hexagondecanter.jpg"),
    category: "Hexagons",
  },
  {
    id: 14,
    name: "Lady-like Glass",
    description:
      "Melodious wind chimes crafted from tumbled recycled glass pieces in varying sizes and colours. Hangs 60 cm and produces a gentle, soothing sound in the breeze.",
    price: 400,
    image: imageFromAssets("ladylike.jpg"),
    category: "Lady Likes",
  },
  {
    id: 15,
    name: "Lady-like Set",
    description:
      "Melodious wind chimes crafted from tumbled recycled glass pieces in varying sizes and colours. Hangs 60 cm and produces a gentle, soothing sound in the breeze.",
    price: 2000,
    image: imageFromAssets("ladylikeset.jpg"),
    category: "Lady Likes",
  },
  {
    id: 16,
    name: "Lady-like Decanter",
    description:
      "Melodious wind chimes crafted from tumbled recycled glass pieces in varying sizes and colours. Hangs 60 cm and produces a gentle, soothing sound in the breeze.",
    price: 2000,
    image: imageFromAssets("ladylikedecanter.jpg"),
    category: "Lady Likes",
  },
  {
    id: 17,
    name: "Nedenburg Glass",
    description:
      "Melodious wind chimes crafted from tumbled recycled glass pieces in varying sizes and colours. Hangs 60 cm and produces a gentle, soothing sound in the breeze.",
    price: 400,
    image: imageFromAssets("nedenburg.jpg"),
    category: "Nedenburgs",
  },
  {
    id: 18,
    name: "Nedenburg Set",
    description:
      "Melodious wind chimes crafted from tumbled recycled glass pieces in varying sizes and colours. Hangs 60 cm and produces a gentle, soothing sound in the breeze.",
    price: 2000,
    image: imageFromAssets("nedenburgset.jpg"),
    category: "Nedenburgs",
  },
  {
    id: 19,
    name: "Tankards Glass",
    description:
      "Melodious wind chimes crafted from tumbled recycled glass pieces in varying sizes and colours. Hangs 60 cm and produces a gentle, soothing sound in the breeze.",
    price: 400,
    image: imageFromAssets("tankard.jpg"),
    category: "Tankards",
  },
  {
    id: 20,
    name: "Tankards Set",
    description:
      "Melodious wind chimes crafted from tumbled recycled glass pieces in varying sizes and colours. Hangs 60 cm and produces a gentle, soothing sound in the breeze.",
    price: 2000,
    image: imageFromAssets("tankardsset.jpg"),
    category: "Tankards",
  },
  {
    id: 21,
    name: "Tankards Decanter",
    description:
      "Melodious wind chimes crafted from tumbled recycled glass pieces in varying sizes and colours. Hangs 60 cm and produces a gentle, soothing sound in the breeze.",
    price: 400,
    image: imageFromAssets("tankarddecanter.jpg"),
    category: "Tankards",
  },
  {
    id: 22,
    name: "Walkers Glass",
    description:
      "Melodious wind chimes crafted from tumbled recycled glass pieces in varying sizes and colours. Hangs 60 cm and produces a gentle, soothing sound in the breeze.",
    price: 400,
    image: imageFromAssets("walker.jpg"),
    category: "Walkers",
  },
  {
    id: 23,
    name: "Walkers Set",
    description:
      "Melodious wind chimes crafted from tumbled recycled glass pieces in varying sizes and colours. Hangs 60 cm and produces a gentle, soothing sound in the breeze.",
    price: 2000,
    image: imageFromAssets("walkersset.jpg"),
    category: "Walkers",
  },
  {
    id: 24,
    name: "Vases",
    description:
      "Melodious wind chimes crafted from tumbled recycled glass pieces in varying sizes and colours. Hangs 60 cm and produces a gentle, soothing sound in the breeze.",
    price: 750,
    image: imageFromAssets("vases.jpg"),
    category: "Vases",
  },
  {
    id: 25,
    name: "Mpesa testing",
    description:
      "For testing purposes only.",
    price: 1,
    image: imageFromAssets("mpesatesting.jpg"),
    category: "Mpesa testing",
  }
];
