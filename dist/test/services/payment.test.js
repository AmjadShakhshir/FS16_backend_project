"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ordersService_1 = __importDefault(require("../../services/ordersService"));
const usersService_1 = __importDefault(require("../../services/usersService"));
const ProductModel_1 = __importDefault(require("../../models/ProductModel"));
const paymentsService_1 = __importDefault(require("../../services/paymentsService"));
const CategoryModel_1 = __importDefault(require("../../models/CategoryModel"));
const db_helper_1 = __importDefault(require("../db-helper"));
describe("Payment service", () => {
    let mongoHelper;
    let productOne;
    let category;
    let bodyPayment;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        const categoryInstance = new CategoryModel_1.default({
            name: "mobile",
            images: ["fdfgdf"],
        });
        category = yield categoryInstance.save();
        const iphoneProduct = new ProductModel_1.default({
            name: "iphone",
            description: "super phone",
            price: 123,
            categoryId: category._id.toString(),
            images: ["fdfgdf"],
            stock: 12,
        });
        productOne = yield iphoneProduct.save();
        const bodyUser = {
            name: "Sirko",
            email: "te112@gmail.com",
            password: "1234567",
            roleId: "6554c883ab8e8fbcc83c643a",
        };
        const user = yield usersService_1.default.signUp(bodyUser);
        if (!user) {
            return;
        }
        const findUser = yield usersService_1.default.getSingleUser(user._id.toString());
        if (!findUser) {
            return;
        }
        const bodyOrder = {
            userId: findUser._id.toString(),
            products: [{ productId: productOne._id, quantity: 1 }],
        };
        const order = yield ordersService_1.default.createOrder(bodyOrder);
        if (!(order === null || order === void 0 ? void 0 : order._id)) {
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
    }));
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        mongoHelper = yield (0, db_helper_1.default)();
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoHelper.clearDatabase();
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoHelper.closeDatabase();
    }));
    it("should create a new payment", () => __awaiter(void 0, void 0, void 0, function* () {
        const payment = yield paymentsService_1.default.createOne(bodyPayment);
        expect(payment === null || payment === void 0 ? void 0 : payment.method).toEqual("paypal");
        expect(payment === null || payment === void 0 ? void 0 : payment.bankName).toEqual("OTP");
    }));
    it("should delete payment", () => __awaiter(void 0, void 0, void 0, function* () {
        const payment = yield paymentsService_1.default.createOne(bodyPayment);
        if (!(payment === null || payment === void 0 ? void 0 : payment._id)) {
            return;
        }
        yield paymentsService_1.default.removeOne(payment._id.toString());
        const payments = yield paymentsService_1.default.findAll();
        expect(payments.length).toEqual(0);
    }));
    it("should return all payments", () => __awaiter(void 0, void 0, void 0, function* () {
        yield paymentsService_1.default.createOne(bodyPayment);
        const payments = yield paymentsService_1.default.findAll();
        expect(payments.length).toEqual(1);
    }));
    it("should return one payment", () => __awaiter(void 0, void 0, void 0, function* () {
        const newPayment = yield paymentsService_1.default.createOne(bodyPayment);
        if (!(newPayment === null || newPayment === void 0 ? void 0 : newPayment._id)) {
            return;
        }
        const payment = yield paymentsService_1.default.findOne(newPayment._id.toString());
        expect(payment === null || payment === void 0 ? void 0 : payment.bankName).toEqual("OTP");
        expect(payment === null || payment === void 0 ? void 0 : payment.method).toEqual("paypal");
    }));
});
//# sourceMappingURL=payment.test.js.map