interface ThermometerInput {
  deviceId: string;
  temperature: number;
  humidity?: number | null;
  batteryLevel: number;
  long: number;
  lat: number;
  recordedAt?: Date;
}

interface ThermometerOutput extends Omit<ThermometerInput, 'id'> {
  id: string;
  recordedAt: Date;
}

export type { ThermometerInput, ThermometerOutput };