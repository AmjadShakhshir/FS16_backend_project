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
exports.createOrder = void 0;
const db_helper_1 = __importDefault(require("../db-helper"));
const usersService_1 = __importDefault(require("../../services/usersService"));
const ordersService_1 = __importDefault(require("../../services/ordersService"));
const ProductModel_1 = __importDefault(require("../../models/ProductModel"));
const CategoryModel_1 = __importDefault(require("../../models/CategoryModel"));
function createOrder() {
    return __awaiter(this, void 0, void 0, function* () {
        const bodyUser = {
            name: "Alan",
            email: "alan@gmail.com",
            password: "1234567",
        };
        const category = new CategoryModel_1.default({
            name: "mobile",
            images: ["fdfgdf"],
        });
        yield category.save();
        const iphoneProduct = new ProductModel_1.default({
            name: "iphone",
            description: "super phone",
            price: 123,
            categoryId: category._id.toString(),
            images: ["fdfgdf"],
            stock: 12,
        });
        yield iphoneProduct.save();
        const user = yield usersService_1.default.signUp(bodyUser);
        if (!(iphoneProduct === null || iphoneProduct === void 0 ? void 0 : iphoneProduct._id)) {
            return;
        }
        if (!(user === null || user === void 0 ? void 0 : user._id)) {
            return;
        }
        const bodyOrder = {
            userId: user._id.toString(),
            products: [
                {
                    productId: iphoneProduct._id.toString(),
                    quantity: 1,
                },
                {
                    productId: iphoneProduct._id.toString(),
                    quantity: 2,
                },
            ],
        };
        return yield ordersService_1.default.createOrder(bodyOrder);
    });
}
exports.createOrder = createOrder;
describe("Order Service", () => {
    let mongoHelper;
    let productOne;
    let user;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        mongoHelper = yield (0, db_helper_1.default)();
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoHelper.closeDatabase();
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoHelper.clearDatabase();
    }));
    it("should create a new order", () => __awaiter(void 0, void 0, void 0, function* () {
        const order = yield createOrder();
        expect(order).toHaveProperty("_id");
        expect(order).toHaveProperty("userId");
        expect(order === null || order === void 0 ? void 0 : order.paymentStatus).toBe("pending");
        expect(order === null || order === void 0 ? void 0 : order.totalAmount).toBe(369);
    }));
    it("Should return a list of all orders", () => __awaiter(void 0, void 0, void 0, function* () {
        yield createOrder();
        const orders = yield ordersService_1.default.getAllOrderItems();
        expect(orders.length).toBeGreaterThanOrEqual(1);
    }));
    it("Should return a single order", () => __awaiter(void 0, void 0, void 0, function* () {
        const order = yield createOrder();
        if (!(order === null || order === void 0 ? void 0 : order._id)) {
            return;
        }
        const singleOrder = yield ordersService_1.default.getSingleOrder(order._id.toString());
        expect(singleOrder).toHaveProperty("userId");
        expect(singleOrder === null || singleOrder === void 0 ? void 0 : singleOrder.paymentStatus).toBe("pending");
        expect(singleOrder === null || singleOrder === void 0 ? void 0 : singleOrder.totalAmount).toBe(369);
    }));
});
//# sourceMappingURL=order.test.js.map