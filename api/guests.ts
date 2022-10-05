import { AxiosResponse } from "axios";
import AxiosClient from "../config/axios";
import { GuestDecision, IGuest } from "../models/guests";
const guestsUrl = "guests";
const Get = (phoneNumber: string): Promise<AxiosResponse<IGuest>> =>
  AxiosClient.get(`${guestsUrl}/${phoneNumber}`);
const ChangeDecision = (
  phoneNumber: string,
  decision: GuestDecision
): Promise<AxiosResponse<IGuest>> => {
  return AxiosClient.put(`${guestsUrl}/${phoneNumber}/${decision}`);
};
const GuestsAPIs = { Get, ChangeDecision };
export default GuestsAPIs;
