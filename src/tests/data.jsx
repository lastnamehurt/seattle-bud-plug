const testData = [
  {
    "Galactic Glue": {
      brand: "Artizen",
      price: "33.00",
      url: "https://shop.kempscannabis.com/seattle/brand/Artizen/product/Galactic_Glue?id=a3642b6b-e3e3-4889-ada0-893bc302da27",
      amount_in_stock: 7,
      thc_percentage: "91.10",
      cbd_percentage: "0.20",
      weight: "1.0 gm",
      category: "Vapor",
      type: "Cartridge",
    },
  },
  {
    Dutchberry: {
      brand: "Artizen",
      price: "65.00",
      url: "https://shop.kempscannabis.com/seattle/brand/Artizen/product/Dutchberry?id=5f1b6b73-d5d9-4165-b5e4-7d4dfd2683f5",
      amount_in_stock: 14,
      thc_percentage: "21.50",
      cbd_percentage: "0.00",
      weight: "7.0 gm",
      category: "Flower",
      type: "Sativa Hybrid",
    },
  },
  {
    "Wedding Cake": {
      brand: "Dabs 4 Less",
      price: "11.00",
      url: "https://shop.kempscannabis.com/seattle/brand/Dabs_4_Less/product/Wedding_Cake?id=e9660b24-fc8c-44d1-9e33-b87d87f1261c",
      amount_in_stock: 30,
      thc_percentage: "72.79",
      cbd_percentage: "0.00",
      weight: "1.0 gm",
      category: "Concentrate",
      type: "Wax",
    },
  },
  {
    Slurpeez: {
      brand: "Artizen",
      price: "10.00",
      url: "https://shop.kempscannabis.com/seattle/brand/Artizen/product/Slurpeez?id=084a8d42-f495-4168-836b-520fe03b2c06",
      amount_in_stock: 49,
      thc_percentage: "23.90",
      cbd_percentage: "0.00",
      weight: "1.0 gm",
      category: "Preroll",
      type: "Classic",
    },
  },
  {
    "Cheetah Piss": {
      brand: "Artizen",
      price: "33.00",
      url: "https://shop.kempscannabis.com/seattle/brand/Artizen/product/Cheetah_Piss?id=1bfa0aaf-d01f-408c-9d5c-7c4e39e45694",
      amount_in_stock: 16,
      thc_percentage: "23.16",
      cbd_percentage: "0.00",
      weight: "3.5 gm",
      category: "Flower",
      type: "Hybrid",
    },
  },
  {
    "Wedding Pie": {
      brand: "Artizen",
      price: "10.00",
      url: "https://shop.kempscannabis.com/seattle/brand/Artizen/product/Wedding_Pie?id=56b0858a-3d40-4d56-b56f-b82a0c3c0ca4",
      amount_in_stock: 27,
      thc_percentage: "25.30",
      cbd_percentage: "0.00",
      weight: "1.0 gm",
      category: "Preroll",
      type: "Classic",
    },
  },
  {
    Slurricane: {
      brand: "Artizen",
      price: "26.00",
      url: "https://shop.kempscannabis.com/seattle/brand/Artizen/product/Slurricane?id=87045aa3-2002-4767-89fe-e77c8df6c3b8",
      amount_in_stock: 5,
      thc_percentage: "76.61",
      cbd_percentage: "0.19",
      weight: "1.0 gm",
      category: "Concentrate",
      type: "Wax",
    },
  },
  {
    "Cheetah Piss": {
      brand: "Artizen",
      price: "65.00",
      url: "https://shop.kempscannabis.com/seattle/brand/Artizen/product/Cheetah_Piss?id=1bfa0aaf-d01f-408c-9d5c-7c4e39e45694",
      amount_in_stock: 6,
      thc_percentage: "23.16",
      cbd_percentage: "0.00",
      weight: "7.0 gm",
      category: "Flower",
      type: "Hybrid",
    },
  },
  {
    Slurricane: {
      brand: "Artizen",
      price: "10.00",
      url: "https://shop.kempscannabis.com/seattle/brand/Artizen/product/Slurricane?id=3e9196a4-997d-47f8-912c-e30accd80553",
      amount_in_stock: 23,
      thc_percentage: "20.64",
      cbd_percentage: "0.09",
      weight: "1.0 gm",
      category: "Preroll",
      type: "Classic",
    },
  },
  {
    "Poison Fruit": {
      brand: "Artizen",
      price: "10.00",
      url: "https://shop.kempscannabis.com/seattle/brand/Artizen/product/Poison_Fruit?id=a81efcd1-2359-4765-8124-6af7e3766d94",
      amount_in_stock: 23,
      thc_percentage: "18.50",
      cbd_percentage: "0.00",
      weight: "1.0 gm",
      category: "Preroll",
      type: "Classic",
    },
  },
  {
    Dutchberry: {
      brand: "Artizen",
      price: "33.00",
      url: "https://shop.kempscannabis.com/seattle/brand/Artizen/product/Dutchberry?id=d37ba7e2-f5c0-47a4-9098-e0c4e9130272",
      amount_in_stock: 5,
      thc_percentage: "90.50",
      cbd_percentage: "0.20",
      weight: "1.0 gm",
      category: "Vapor",
      type: "Cartridge",
    },
  },
  {
    "Tropicanna Cookies": {
      brand: "Artizen",
      price: "10.00",
      url: "https://shop.kempscannabis.com/seattle/brand/Artizen/product/Tropicanna_Cookies?id=cb725c89-1e07-427e-b579-6450e27b1ace",
      amount_in_stock: 41,
      thc_percentage: "20.10",
      cbd_percentage: "0.00",
      weight: "1.0 gm",
      category: "Preroll",
      type: "Classic",
    },
  },
  {
    "Gelato Runtz": {
      brand: "Artizen",
      price: "10.00",
      url: "https://shop.kempscannabis.com/seattle/brand/Artizen/product/Gelato_Runtz?id=b537cad6-a79e-49ee-b709-e3b3f2e59364",
      amount_in_stock: 48,
      thc_percentage: "22.70",
      cbd_percentage: "0.00",
      weight: "1.0 gm",
      category: "Preroll",
      type: "Classic",
    },
  },
  {
    "Cheetah Piss": {
      brand: "Artizen",
      price: "10.00",
      url: "https://shop.kempscannabis.com/seattle/brand/Artizen/product/Cheetah_Piss?id=d23c684d-46f5-4461-a358-d118ec7fc5da",
      amount_in_stock: 75,
      thc_percentage: "25.21",
      cbd_percentage: "0.00",
      weight: "1.0 gm",
      category: "Preroll",
      type: "Classic",
    },
  },
  {
    "Peanut Butter Souffle": {
      brand: "Artizen",
      price: "10.00",
      url: "https://shop.kempscannabis.com/seattle/brand/Artizen/product/Peanut_Butter_Souffle?id=15df4b0b-88e4-4a25-bc8f-4305fdfad283",
      amount_in_stock: 20,
      thc_percentage: "21.10",
      cbd_percentage: "0.00",
      weight: "1.0 gm",
      category: "Preroll",
      type: "Classic",
    },
  },
  {
    "Wedding Pie": {
      brand: "Artizen",
      price: "65.00",
      url: "https://shop.kempscannabis.com/seattle/brand/Artizen/product/Wedding_Pie?id=aba9c5fc-1dd1-4ea2-bd5c-2c6cabeb74e0",
      amount_in_stock: 8,
      thc_percentage: "22.89",
      cbd_percentage: "0.00",
      weight: "7.0 gm",
      category: "Flower",
      type: "Hybrid",
    },
  },
  {
    "Dutchberry ": {
      brand: "Artizen",
      price: "10.00",
      url: "https://shop.kempscannabis.com/seattle/brand/Artizen/product/Dutchberry?id=e4d51178-697e-4d0e-a7b1-2d8769a0b48c",
      amount_in_stock: 92,
      thc_percentage: "25.23",
      cbd_percentage: "0.00",
      weight: "1.0 gm",
      category: "Preroll",
      type: "Classic",
    },
  },
];

export default testData;
