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
const mongoose_1 = __importDefault(require("mongoose"));
const ProductModel_1 = __importDefault(require("../models/ProductModel"));
const OrderModel_1 = __importDefault(require("../models/OrderModel"));
const UserModel_1 = __importDefault(require("../models/UserModel"));
const OrderItemModel_1 = __importDefault(require("../models/OrderItemModel"));
const getOrders = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield OrderModel_1.default.find()
        .populate("userId")
        .populate("paymentId")
        .populate("shipmentId")
        .exec();
});
const getAllOrderItems = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield OrderItemModel_1.default.find()
        .populate("orderId")
        .populate("productId")
        .exec();
});
const getSingleOrder = (orderId) => __awaiter(void 0, void 0, void 0, function* () {
    const id = new mongoose_1.default.Types.ObjectId(orderId);
    return yield OrderModel_1.default.findOne({ _id: id })
        .populate("userId")
        .populate("paymentId")
        .populate("shipmentId")
        .exec();
});
const addOrder = (createData) => __awaiter(void 0, void 0, void 0, function* () {
    const newOrder = new OrderModel_1.default(createData);
    return yield newOrder.save();
});
const createOrder = (newOrderData) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, products } = newOrderData;
    const isExistUser = yield UserModel_1.default.findOne({ _id: userId });
    const productDocs = yield Promise.all(products.map((product) => ProductModel_1.default.findOne({ _id: product.productId })));
    if (productDocs.includes(null) || !isExistUser) {
        return null;
    }
    const totalAmount = productDocs.reduce((total, productDoc, index) => total + Number(productDoc === null || productDoc === void 0 ? void 0 : productDoc.price) * products[index].quantity || 0, 0);
    const newOrder = new OrderModel_1.default({ userId, totalAmount });
    yield newOrder.save();
    const orderId = newOrder._id;
    yield Promise.all(products.map((product) => {
        const orderItem = new OrderItemModel_1.default({
            orderId,
            productId: product.productId,
            quantity: product.quantity,
        });
        orderItem.save();
    }));
    return newOrder;
});
const updateOrder = (orderId, updateOrder) => __awaiter(void 0, void 0, void 0, function* () {
    const id = new mongoose_1.default.Types.ObjectId(orderId);
    return yield OrderModel_1.default.findByIdAndUpdate(id, updateOrder, { new: true });
});
const removeOrder = (orderId) => __awaiter(void 0, void 0, void 0, function* () {
    const id = new mongoose_1.default.Types.ObjectId(orderId);
    return yield OrderModel_1.default.findByIdAndDelete(id);
});
exports.default = {
    getOrders,
    getAllOrderItems,
    getSingleOrder,
    addOrder,
    createOrder,
    removeOrder,
    updateOrder,
};
//# sourceMappingURL=ordersService.js.map