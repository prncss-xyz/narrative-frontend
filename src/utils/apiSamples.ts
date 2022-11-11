export const datasets = [
  {
    id: 1,
    name: "fishing",
    label: "Fishing Zones",
    description:
      "Data about global fishing zones, including yields, historical trends and ocean life surveys.",
    thumbnailUrl: "https://picsum.photos/id/1038/92/92",
    costPerRecord: 0.03,
  },
  {
    id: 2,
    name: "shipping",
    label: "Shipping Routes",
    description:
      "Metadata regarding global shipping routes. Contains data such as traffic volumne, operating restrictiona and mileage of routes.",
    thumbnailUrl: "https://picsum.photos/id/1002/92/92",
    costPerRecord: 0.05,
  },
  {
    id: 3,
    name: "ports",
    label: "Ports of Entry",
    description: "Detailed information about ports related to cargo shipping.",
    thumbnailUrl: "https://picsum.photos/id/1026/92/92",
    costPerRecord: 0.02,
  },
  {
    id: 4,
    name: "ocean",
    label: "Ocean Measurements",
    description:
      "Detailed measurements of many ocean locations, including LAT/LON, temperature, humidity and precipitation.",
    thumbnailUrl: "https://picsum.photos/id/1024/92/92",
    costPerRecord: 0.01,
  },
  {
    id: 5,
    name: "weather",
    label: "Weather and Climate",
    description: "Historical averages and trends of oceanographic climate.",
    thumbnailUrl: "https://picsum.photos/id/135/92/92",
    costPerRecord: 0.04,
  },
];

export const countries = [
  {
    countryCode: "US",
    name: "United States",
    storedData: [
      { datasetId: 1, recordCount: 500 },
      { datasetId: 2, recordCount: 0 },
      { datasetId: 3, recordCount: 2500 },
      { datasetId: 4, recordCount: 750 },
      { datasetId: 5, recordCount: 50 },
      { datasetId: 6, recordCount: 1000 },
    ],
  },
  {
    countryCode: "GB",
    name: "United Kingdom",
    storedData: [
      { datasetId: 1, recordCount: 0 },
      { datasetId: 2, recordCount: 1250 },
      { datasetId: 3, recordCount: 2000 },
      { datasetId: 4, recordCount: 1500 },
      { datasetId: 5, recordCount: 500 },
      { datasetId: 6, recordCount: 500 },
    ],
  },
  {
    countryCode: "CA",
    name: "Canada",
    storedData: [
      { datasetId: 1, recordCount: 1200 },
      { datasetId: 2, recordCount: 799 },
      { datasetId: 3, recordCount: 0 },
      { datasetId: 4, recordCount: 0 },
      { datasetId: 5, recordCount: 0 },
      { datasetId: 6, recordCount: 900 },
    ],
  },
  {
    countryCode: "AU",
    name: "Australia",
    storedData: [
      { datasetId: 1, recordCount: 473 },
      { datasetId: 2, recordCount: 1445 },
      { datasetId: 3, recordCount: 90 },
      { datasetId: 4, recordCount: 2549 },
      { datasetId: 5, recordCount: 3498 },
      { datasetId: 6, recordCount: 3498 },
    ],
  },
];

export const buyOrders = [
  {
    id: "1",
    name: "My first buy order",
    createdAt: "2022-10-25T21:09:34+0000",
    datasetIds: [1, 3, 4],
    countries: ["US", "GB"],
    budget: 2500,
  },
  {
    id: "2",
    name: "My shipping data",
    createdAt: "2022-09-29T22:09:34+0000",
    datasetIds: [2, 3],
    countries: ["US"],
    budget: 1250,
  },
  {
    id: "3",
    name: "Ocean weather order",
    createdAt: "2022-09-26T21:09:34+0000",
    datasetIds: [4],
    countries: ["US", "GB", "CA"],
    budget: 100,
  },
];
