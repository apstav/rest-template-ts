const locations = ['Living Room', 'Bedroom', 'Kitchen', 'Bathroom', 'Outside'];

const faker = {
  thermometerData: () => ({
    deviceId: `DEV-${Math.floor(1000 + Math.random() * 9000)}`,
    temperature: parseFloat((Math.random() * 30 + 10).toFixed(1)), // 10-40°C
    humidity: Math.random() > 0.2 ? parseFloat((Math.random() * 100).toFixed(1)) : null,
    batteryLevel: parseFloat((Math.random() * 100).toFixed(1)), // 0-100%
    location: locations[Math.floor(Math.random() * locations.length)],
    recordedAt: new Date() // Always include recordedAt
  }),
};

export { faker };