import request from "supertest";

import app from "../../app";
import connect, { MongoHelper } from "../db-helper";
import { CreateUserInput } from "User";
import { newOrderData } from "Order";
import OrderService from "../../services/ordersService";
import UserService from "../../services/usersService";
import ProductRepo from "../../models/ProductModel";
import PaymentRepo from "../../models/PaymentModel";
import CategoryRepo from "../../models/CategoryModel";
import { authenticateUser } from "../auth/authenticateUser";

async function createOrderWithPayment() {
  const categoryInstance = new CategoryRepo({
    name: "mobile",
    images: ["fdfgdf"],
  });
  const category = await categoryInstance.save();
  const iphoneProduct = new ProductRepo({
    name: "iphone",
    description: "super phone",
    price: 123,
    categoryId: category._id.toString(),
    images: ["fdfgdf"],
    stock: 12,
  });
  const productOne = await iphoneProduct.save();

  const bodyUser: CreateUserInput = {
    name: "Sirko",
    email: "te112@gmail.com",
    password: "1234567",
  };
  const user = await UserService.signUp(bodyUser);

  if (!user?._id) {
    return;
  }

  const bodyOrder: newOrderData = {
    userId: user._id.toString(),
    products: [{ productId: productOne._id.toString(), quantity: 1 }],
  };
  const order = await OrderService.createOrder(bodyOrder);

  if (!order?._id) {
    return;
  }

  const bodyPayment = {
    method: "paypal",
    userId: user._id.toString(),
    amount:100,
    bankName: "OTP",
    accountNumber: "sdfdsfdsf",
    shipmentInfo: {
      firstName: "Sirko",
      lastName: "K",
      street1: "new Street 1",
      street2: "new Street 2",
      shippingPrice: 10,
      city: "Oulu",
      zipCode: "12412",
      country: "Finland",
      state: "Oulu",
    },
  };

  return bodyPayment;
}

describe("Payment controller", () => {
  let mongoHelper: MongoHelper;
  let accessToken: { accessToken: string };

  beforeEach(async () => {
    accessToken = await authenticateUser();
  });

  beforeAll(async () => {
    mongoHelper = await connect();
  });

  afterEach(async () => {
    await mongoHelper.clearDatabase();
  });

  afterAll(async () => {
    await mongoHelper.closeDatabase();
  });

  it("Should create a payment", async () => {
    const bodyPayment = await createOrderWithPayment();
    const response = await request(app)
      .post("/payments")
      .send(bodyPayment)
      .set("Authorization", `Bearer ${accessToken.accessToken}`);
    expect(response.status).toBe(201);
    expect(response.body.payment.bankName).toEqual("OTP");
    expect(response.body.message).toEqual("Payment is created");
    expect(response.body.payment.userId).toEqual(bodyPayment?.userId);
  });

  it("Should delete a payment", async () => {
    const bodyPayment = await createOrderWithPayment();
    const newPayment = new PaymentRepo({
      ...bodyPayment
    });
    await newPayment.save();
    console.log("-----------------", newPayment._id);
    const response = await request(app)
      .delete(`/payments/${newPayment._id}`)
      .set("Authorization", `Bearer ${accessToken.accessToken}`);
  });
});
