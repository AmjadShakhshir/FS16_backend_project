"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var PaymentModel_1 = require("../models/PaymentModel");
var UserModel_1 = require("../models/UserModel");
var shipmentsService_1 = require("./shipmentsService");
var createOne = function (newPayment) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, method, bankName, accountNumber, shipmentInfo, user, paymentDate, existingPayment, createdPayment, createdShipment;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = newPayment.userId, method = newPayment.method, bankName = newPayment.bankName, accountNumber = newPayment.accountNumber, shipmentInfo = newPayment.shipmentInfo;
                return [4 /*yield*/, UserModel_1.default.findById(userId)];
            case 1:
                user = _a.sent();
                if (!user) {
                    return [2 /*return*/, null];
                }
                paymentDate = new Date();
                return [4 /*yield*/, PaymentModel_1.default.findOne({
                        userId: userId,
                    })];
            case 2:
                existingPayment = _a.sent();
                if (!!existingPayment) return [3 /*break*/, 5];
                createdPayment = new PaymentModel_1.default({
                    userId: userId,
                    method: method,
                    bankName: bankName,
                    accountNumber: accountNumber,
                    paymentDate: paymentDate,
                });
                return [4 /*yield*/, shipmentsService_1.default.createShipment(__assign(__assign({}, shipmentInfo), { userId: new mongoose_1.default.Types.ObjectId(userId) }))];
            case 3:
                createdShipment = _a.sent();
                return [4 /*yield*/, createdPayment.save()];
            case 4:
                _a.sent();
                return [2 /*return*/, __assign(__assign({}, createdPayment.toObject()), { shipment: createdShipment })];
            case 5:
                existingPayment.method = method;
                return [2 /*return*/];
        }
    });
}); };
var removeOne = function (paymentId) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, PaymentModel_1.default.findByIdAndDelete(paymentId)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
var findOne = function (paymentId) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, PaymentModel_1.default.findById(paymentId)
                    .populate("userId")];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
var findAll = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, PaymentModel_1.default.find()
                    .populate("userId")
                    .exec()];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.default = {
    removeOne: removeOne,
    findOne: findOne,
    findAll: findAll,
    createOne: createOne
};
