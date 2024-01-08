import express from "express";

import ctrl from "../controllers/payments";
import { validate } from "../middlewares/validate";
import { paymentSchema } from "../schemas/paymentSchema";
import { checkAuth } from "../middlewares/checkAuth";
import { checkRoles } from "../middlewares/checkRoles";
import { ROLE } from "../utils/role";
import { checkPermission } from "../middlewares/checkPermissions";

const router = express.Router();

router.get(
  "/",
  checkAuth,
  checkRoles(ROLE.ADMIN, ROLE.USER),
  checkPermission("READ"),
  ctrl.getAllPayments
);
router.get(
  "/:paymentId",
  checkAuth,
  checkRoles(ROLE.ADMIN, ROLE.USER),
  checkPermission("READ"),
  ctrl.getPayment
);
router.post(
  "/",
  validate(paymentSchema),
  checkAuth,
  checkRoles(ROLE.ADMIN, ROLE.USER),
  checkPermission("CREATE"),
  ctrl.addPayment
);
router.delete("/:paymentId", checkAuth, ctrl.removePayment);

export default router;
