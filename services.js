// AgroSmart Advanced Farming services — trilingual
const L = (en, te, hi) => ({ en, te, hi });

const I = {
  drone: "https://media.base44.com/images/public/6aa2e4ed578747937a80907f/a93288ca6_generated_fec0c0de.jpg",
  hydroponic: "https://media.base44.com/images/public/6aa2e4ed578747937a80907f/d8802b390_generated_202341a3.jpg",
  weeding: "https://media.base44.com/images/public/6aa2e4ed578747937a80907f/f62ce4c0c_generated_6696b713.jpg",
  soil: "https://media.base44.com/images/public/6aa2e4ed578747937a80907f/bf80f052f_generated_aa9f1d43.jpg",
  drip: "https://media.base44.com/images/public/6aa2e4ed578747937a80907f/f5093b956_generated_54ebf97b.jpg",
  precision: "https://media.base44.com/images/public/6aa2e4ed578747937a80907f/7f451fe71_generated_0ddc1b31.jpg",
  machinery: "https://media.base44.com/images/public/6aa2e4ed578747937a80907f/764d6fa39_generated_32baee3c.jpg",
};

export const SERVICES = [
  { id: "svc-drone", image: I.drone,
    name: L("Drone Spraying", "డ్రోన్ స్ప్రేయింగ్", "ड्रोन स्प्रे"),
    desc: L("Precision aerial spraying of pesticides & nutrients across large fields in minutes.", "కొద్ది నిమిషాల్లో విస్తృత పొలాలపై కచ్చితమైన వాయు స్ప్రేయింగ్.", "मिनटों में बड़े खेतों पर सटीक वायवीय स्प्रे।"),
    provider: "AgriDrones Pro", location: "Hyderabad, Telangana",
    durations: [{ key: "oneHour", hours: 1, price: 600 }, { key: "fiveHours", hours: 5, price: 2800 }, { key: "twentyFourHours", hours: 24, price: 12000 }] },
  { id: "svc-hydroponic", image: I.hydroponic,
    name: L("Hydroponic Farming", "హైడ్రోపోనిక్ వ్యవసాయం", "हाइड्रोपोनिक खेती"),
    desc: L("Setup & training for soil-less, water-efficient high-value cultivation.", "నేల లేని, నీటి-సమృద్ధి అధిక విలువ సాగు సెటప్ & శిక్షణ.", "मिट्टी-रहित, जल-कुशल उच्च-मूल्य खेती की स्थापना व प्रशिक्षण।"),
    provider: "HydroGreen Labs", location: "Bengaluru, Karnataka",
    durations: [{ key: "oneHour", hours: 1, price: 500 }, { key: "fiveHours", hours: 5, price: 2000 }, { key: "twentyFourHours", hours: 24, price: 8000 }] },
  { id: "svc-weeding", image: I.weeding,
    name: L("Laser / Mechanical Weeding", "లేజర్/యాంత్రిక కలుపు తొలగింపు", "लेजर/यांत्रिक निराई"),
    desc: L("Mechanical & laser-guided weeding that protects the crop and saves labour.", "పంటను కాపాడుకుంటూ శ్రమ ఆదా చేసే యాంత్రిక & లేజర్ కలుపు తొలగింపు.", "फसल बचाती और श्रम बचाती यांत्रिक व लेजर-निर्देशित निराई।"),
    provider: "FarmTech Services", location: "Pune, Maharashtra",
    durations: [{ key: "oneHour", hours: 1, price: 800 }, { key: "fiveHours", hours: 5, price: 3500 }, { key: "twentyFourHours", hours: 24, price: 15000 }] },
  { id: "svc-soil", image: I.soil,
    name: L("Soil Testing", "నేల పరీక్ష", "मिट्टी जांच"),
    desc: L("On-site soil nutrient & pH testing with crop-specific recommendations.", "పంట-విశిష్ట సిఫార్సులతో స్థల నేల పోషక & pH పరీక్ష.", "फसल-विशिष्ट सिफारिशों के साथ स्थल पर मिट्टी पोषक व pH जांच।"),
    provider: "SoilSense Labs", location: "Vijayawada, Andhra Pradesh",
    durations: [{ key: "oneHour", hours: 1, price: 400 }, { key: "fiveHours", hours: 5, price: 1500 }, { key: "twentyFourHours", hours: 24, price: 6000 }] },
  { id: "svc-drip", image: I.drip,
    name: L("Drip Irrigation", "డ్రిప్ నీటిపారుదల", "ड्रिप सिंचाई"),
    desc: L("Design & installation of water-saving drip irrigation systems.", "నీటి ఆదా డ్రిప్ నీటిపారుదల వ్యవస్థల రూపకల్పన & స్థాపన.", "जल-संरक्षी ड्रिप सिंचाई प्रणालियों की डिज़ाइन व स्थापना।"),
    provider: "AquaFarm Tech", location: "Coimbatore, Tamil Nadu",
    durations: [{ key: "oneHour", hours: 1, price: 700 }, { key: "fiveHours", hours: 5, price: 3000 }, { key: "twentyFourHours", hours: 24, price: 12000 }] },
  { id: "svc-precision", image: I.precision,
    name: L("Precision Crop Monitoring", "క్షేత్రియ పర్యవేక్షణ", "परिशुद्ध फसल निगरानी"),
    desc: L("IoT sensors for real-time crop health, soil moisture & weather tracking.", "నిజ-సమయ పంట ఆరోగ్యం, నేల తేమ & వాతావరణ ట్రాకింగ్ IoT సెన్సార్లు.", "वास्तविक समय फसल स्वास्थ्य, मिट्टी नमी व मौसम ट्रैकिंग के IoT सेंसर।"),
    provider: "SmartField AI", location: "Hyderabad, Telangana",
    durations: [{ key: "oneHour", hours: 1, price: 600 }, { key: "fiveHours", hours: 5, price: 2500 }, { key: "twentyFourHours", hours: 24, price: 10000 }] },
  { id: "svc-machinery", image: I.machinery,
    name: L("Farm Machinery Rental", "యంత్రాల అద్దె", "मशीनरी किराया"),
    desc: L("Hourly & daily rental of tractors, rotavators & harvesters.", "ట్రాక్టర్లు, రోటావేటర్లు & హార్వెస్టర్ల గంటల & రోజు అద్దె.", "ट्रैक्टर, रोटावेटर व हार्वेस्टर की घंटा व दैनिक किराया।"),
    provider: "AgriRent Hub", location: "Nashik, Maharashtra",
    durations: [{ key: "oneHour", hours: 1, price: 500 }, { key: "fiveHours", hours: 5, price: 2200 }, { key: "twentyFourHours", hours: 24, price: 9000 }] },
];

export function loc(field, lang) {
  if (!field) return "";
  return field[lang] || field.en;
}

export function getService(id) {
  return SERVICES.find((s) => s.id === id);
}