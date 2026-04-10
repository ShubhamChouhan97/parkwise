export interface Booking {
  id: string;
  vehicleNumber: string;
  vehicleType: string;
  parkingArea: string;
  slot: string;
  date: string;
  time: string;
  duration: number;
  fee: number;
  status: "active" | "completed" | "cancelled";
}

export interface ParkingArea {
  id: string;
  name: string;
  location: string;
  totalSlots: number;
  availableSlots: number;
  feePerHour: number;
}

export interface VehicleType {
  id: string;
  name: string;
  feePerHour: number;
}

export interface FeedbackItem {
  id: string;
  userName: string;
  email: string;
  message: string;
  rating: number;
  date: string;
}

export const vehicleTypes: VehicleType[] = [
  { id: "1", name: "Car", feePerHour: 5 },
  { id: "2", name: "Motorcycle", feePerHour: 2 },
  { id: "3", name: "SUV", feePerHour: 7 },
  { id: "4", name: "Truck", feePerHour: 10 },
  { id: "5", name: "Bus", feePerHour: 15 },
];

export const parkingAreas: ParkingArea[] = [
  { id: "1", name: "Zone A - Ground Floor", location: "Building 1", totalSlots: 50, availableSlots: 12, feePerHour: 5 },
  { id: "2", name: "Zone B - First Floor", location: "Building 1", totalSlots: 40, availableSlots: 8, feePerHour: 4 },
  { id: "3", name: "Zone C - Open Lot", location: "Outdoor", totalSlots: 80, availableSlots: 35, feePerHour: 3 },
  { id: "4", name: "Zone D - Basement", location: "Building 2", totalSlots: 30, availableSlots: 5, feePerHour: 6 },
  { id: "5", name: "Zone E - Rooftop", location: "Building 2", totalSlots: 25, availableSlots: 18, feePerHour: 2 },
];

export const bookings: Booking[] = [
  { id: "BK001", vehicleNumber: "MH-12-AB-1234", vehicleType: "Car", parkingArea: "Zone A - Ground Floor", slot: "A-12", date: "2026-04-10", time: "09:00", duration: 3, fee: 15, status: "active" },
  { id: "BK002", vehicleNumber: "MH-14-CD-5678", vehicleType: "SUV", parkingArea: "Zone B - First Floor", slot: "B-05", date: "2026-04-09", time: "14:00", duration: 2, fee: 14, status: "completed" },
  { id: "BK003", vehicleNumber: "MH-12-EF-9012", vehicleType: "Motorcycle", parkingArea: "Zone C - Open Lot", slot: "C-22", date: "2026-04-10", time: "10:30", duration: 5, fee: 10, status: "active" },
  { id: "BK004", vehicleNumber: "MH-20-GH-3456", vehicleType: "Car", parkingArea: "Zone A - Ground Floor", slot: "A-03", date: "2026-04-08", time: "08:00", duration: 8, fee: 40, status: "completed" },
  { id: "BK005", vehicleNumber: "MH-01-IJ-7890", vehicleType: "Truck", parkingArea: "Zone D - Basement", slot: "D-01", date: "2026-04-10", time: "07:00", duration: 4, fee: 40, status: "cancelled" },
  { id: "BK006", vehicleNumber: "MH-12-KL-2345", vehicleType: "Car", parkingArea: "Zone E - Rooftop", slot: "E-15", date: "2026-04-10", time: "11:00", duration: 2, fee: 4, status: "active" },
];

export const feedbacks: FeedbackItem[] = [
  { id: "FB001", userName: "John Doe", email: "john@example.com", message: "Great parking service! Very convenient.", rating: 5, date: "2026-04-09" },
  { id: "FB002", userName: "Jane Smith", email: "jane@example.com", message: "Could use better signage in Zone B.", rating: 3, date: "2026-04-08" },
  { id: "FB003", userName: "Bob Wilson", email: "bob@example.com", message: "Affordable and clean. Will use again.", rating: 4, date: "2026-04-07" },
];
