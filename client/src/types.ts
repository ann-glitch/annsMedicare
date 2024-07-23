export interface Appointment {
  _id: string;
  consultationDate: string;
  consultationType: string;
  createdAt: string;
  doctor: string;
  medicalCondition: string;
  officer: string;
  patient: string;
}

export interface User {
  name: string;
  email: string;
  password: string;
  role: string;
  token: string;
}

export interface Patient {
  _id: string;
  name: string;
  email: string;
  gender: string;
  dateOfBirth: string;
  phoneNumber: string;
  role: string;
  createdAt: string;
}
