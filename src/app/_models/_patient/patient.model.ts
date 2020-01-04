export interface Patient {
  id: string;
  code: string;
  name: string;
  maritalStatus: string;
  phone1: string;
  phone2: string;
  occupationId: number;
  occupation: string;
  birthday: Date;
  knowingId: number;
  knowing: string;
  residence: string;
  husbandName: string;
  husbandOccupationId: number;
  husbandOccupation: string;
  husbandBirthday: Date;
  husbandPhone: string;
  bloodGroup: string;
  bmi: string;
  children: string;
  weight: string;
  smoking: string;
}
