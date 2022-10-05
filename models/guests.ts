export type GuestDecision = "NOT_DECIDED" | "YES" | "NO";
export type Gender = "MALE" | "FEMALE" | "NON";
export interface IGuest {
  id: number;
  firstName: string;
  lastName: string;
  mobileNumber: string;
  gender: Gender;
  accepted: GuestDecision;
  family: boolean;
}
