import { z } from "zod";

import { shipmentBodySchema } from "../schemas/shipmentSchema";
import mongoose from "mongoose";

export type Shipment = z.infer<typeof shipmentBodySchema> & {
  _id: mongoose.Types.ObjectId;

};
export type CreateShipmetInput = Omit<Shipment, "_id"> & {
  userId: mongoose.Types.ObjectId;
};


export type shipmentUpdate = Partial<Shipment>;
