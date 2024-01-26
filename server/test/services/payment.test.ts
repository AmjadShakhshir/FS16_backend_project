import { ProductDocument } from "Product";

import OrderService from "../../services/ordersService";
import UserService from "../../services/usersService";
import ProductRepo from "../../models/ProductModel";
import PaymentService from "../../services/paymentsService";
import CategoryRepo from "../../models/CategoryModel";
import connect, { MongoHelper } from "../db-helper";
import { Category } from "Category";
import { newOrderData } from "Order";
import { CreateUserInput } from "../../types/User";
import { createPaymentInput } from "Payment";

describe("Payment service", () => {
  let mongoHelper: MongoHelper;
  let productOne: ProductDocument;
  let category: Category;
  let bodyPayment: createPaymentInput;

  beforeEach(async () => {
    const categoryInstance = new CategoryRepo({
      name: "mobile",
      images: ["fdfgdf"],
    });
    category = await categoryInstance.save();
    const iphoneProduct = new ProductRepo({
      name: "iphone",
      description: "super phone",
      price: 123,
      categoryId: category._id.toString(),
      images: ["fdfgdf"],
      stock: 12,
    });
    productOne = await iphoneProduct.save();
    const bodyUser: CreateUserInput = {
      name: "Sirko",
      email: "te112@gmail.com",
      password: "1234567",
      roleId: "6554c883ab8e8fbcc83c643a",
    };
    const user = await UserService.signUp(bodyUser);
    if (!user) {
      return;
    }

    const findUser = await UserService.getSingleUser(user._id.toString());
    if (!findUser) {
      return;
    }
    const bodyOrder: newOrderData = {
      userId: findUser._id.toString(),
      products: [{ productId: productOne._id, quantity: 1 }],
    };
    const order = await OrderService.createOrder(bodyOrder);
    if (!order?._id) {
      return;
    }
    bodyPayment = {
      method: "paypal",
      userId: findUser._id.toString(),
      amount: 100,
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

  it("should create a new payment", async () => {
    const payment = await PaymentService.createOne(bodyPayment);
    expect(payment?.method).toEqual("paypal");
    expect(payment?.bankName).toEqual("OTP");
  });

  it("should delete payment", async () => {
    const payment = await PaymentService.createOne(bodyPayment);
    if (!payment?._id) {
      return;
    }
    await PaymentService.removeOne(payment._id.toString());
    const payments = await PaymentService.findAll();
    expect(payments.length).toEqual(0);
  });

  it("should return all payments", async () => {
    await PaymentService.createOne(bodyPayment);
    const payments = await PaymentService.findAll();
    expect(payments.length).toEqual(1);
  });

  it("should return one payment", async () => {
    const newPayment = await PaymentService.createOne(bodyPayment);
    if (!newPayment?._id) {
      return;
    }
    const payment = await PaymentService.findOne(newPayment._id.toString());
    expect(payment?.bankName).toEqual("OTP");
    expect(payment?.method).toEqual("paypal");
  });
});
