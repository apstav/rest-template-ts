interface ThermometerInput {
  deviceId: string;
  temperature: number;
  humidity?: number | null;
  batteryLevel: number;
  location: string;
  recordedAt?: Date;
}

interface ThermometerOutput extends ThermometerInput {
  id: string;
  recordedAt: Date; // Make sure this is required in output
}

export type { ThermometerInput, ThermometerOutput };