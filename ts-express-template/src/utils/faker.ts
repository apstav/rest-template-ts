const athensLocations = [
  { lat: 37.9838, long: 23.7275 },
  { lat: 37.9755, long: 23.7348 },
  { lat: 37.9667, long: 23.7283 },
  { lat: 37.9912, long: 23.743 },
  { lat: 37.955, long: 23.703 },
];

const faker = {
  thermometerData: () => {
    const location = athensLocations[Math.floor(Math.random() * athensLocations.length)];

    return {
      deviceId: `DEV-${Math.floor(1000 + Math.random() * 9000)}`,
      temperature: parseFloat((Math.random() * 30 + 10).toFixed(1)), // 10-40°C
      humidity: Math.random() > 0.2 ? parseFloat((Math.random() * 100).toFixed(1)) : null,
      batteryLevel: parseFloat((Math.random() * 100).toFixed(1)), // 0-100%
      lat: location.lat,
      long: location.long,
      recordedAt: new Date(),
    };
  },
};

export { faker };
