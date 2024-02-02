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
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../app"));
const db_helper_1 = __importDefault(require("../db-helper"));
const ordersService_1 = __importDefault(require("../../services/ordersService"));
const usersService_1 = __importDefault(require("../../services/usersService"));
const ProductModel_1 = __importDefault(require("../../models/ProductModel"));
const PaymentModel_1 = __importDefault(require("../../models/PaymentModel"));
const CategoryModel_1 = __importDefault(require("../../models/CategoryModel"));
const authenticateUser_1 = require("../auth/authenticateUser");
function createOrderWithPayment() {
    return __awaiter(this, void 0, void 0, function* () {
        const categoryInstance = new CategoryModel_1.default({
            name: "mobile",
            images: ["fdfgdf"],
        });
        const category = yield categoryInstance.save();
        const iphoneProduct = new ProductModel_1.default({
            name: "iphone",
            description: "super phone",
            price: 123,
            categoryId: category._id.toString(),
            images: ["fdfgdf"],
            stock: 12,
        });
        const productOne = yield iphoneProduct.save();
        const bodyUser = {
            name: "Sirko",
            email: "te112@gmail.com",
            password: "1234567",
        };
        const user = yield usersService_1.default.signUp(bodyUser);
        if (!(user === null || user === void 0 ? void 0 : user._id)) {
            return;
        }
        const bodyOrder = {
            userId: user._id.toString(),
            products: [{ productId: productOne._id.toString(), quantity: 1 }],
        };
        const order = yield ordersService_1.default.createOrder(bodyOrder);
        if (!(order === null || order === void 0 ? void 0 : order._id)) {
            return;
        }
        const bodyPayment = {
            method: "paypal",
            userId: user._id.toString(),
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
        return bodyPayment;
    });
}
describe("Payment controller", () => {
    let mongoHelper;
    let accessToken;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        accessToken = yield (0, authenticateUser_1.authenticateUser)();
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
    it("Should create a payment", () => __awaiter(void 0, void 0, void 0, function* () {
        const bodyPayment = yield createOrderWithPayment();
        const response = yield (0, supertest_1.default)(app_1.default)
            .post("/payments")
            .send(bodyPayment)
            .set("Authorization", `Bearer ${accessToken.accessToken}`);
        expect(response.status).toBe(201);
        expect(response.body.payment.bankName).toEqual("OTP");
        expect(response.body.message).toEqual("Payment is created");
        expect(response.body.payment.userId).toEqual(bodyPayment === null || bodyPayment === void 0 ? void 0 : bodyPayment.userId);
    }));
    it("Should delete a payment", () => __awaiter(void 0, void 0, void 0, function* () {
        const bodyPayment = yield createOrderWithPayment();
        const newPayment = new PaymentModel_1.default(Object.assign({}, bodyPayment));
        yield newPayment.save();
        console.log("-----------------", newPayment._id);
        const response = yield (0, supertest_1.default)(app_1.default)
            .delete(`/payments/${newPayment._id}`)
            .set("Authorization", `Bearer ${accessToken.accessToken}`);
    }));
});
//# sourceMappingURL=payment.test.js.map