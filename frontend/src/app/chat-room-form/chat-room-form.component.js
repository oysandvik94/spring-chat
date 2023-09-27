"use strict";
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatRoomFormComponent = void 0;
var core_1 = require("@angular/core");
var dropdown_1 = require("primeng/dropdown");
var ChatRoomFormComponent = function () {
    var _classDecorators = [(0, core_1.Component)({
            selector: 'app-chat-room-form',
            templateUrl: './chat-room-form.component.html',
            styleUrls: ['./chat-room-form.component.css'],
            standalone: true,
            imports: [dropdown_1.DropdownModule]
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _activeChat_decorators;
    var _activeChat_initializers = [];
    var _chatRooms_decorators;
    var _chatRooms_initializers = [];
    var ChatRoomFormComponent = _classThis = /** @class */ (function () {
        function ChatRoomFormComponent_1(stompService) {
            this.stompService = (__runInitializers(this, _instanceExtraInitializers), stompService);
            this.activeChat = __runInitializers(this, _activeChat_initializers, "");
            this.chatRooms = __runInitializers(this, _chatRooms_initializers, []);
            this.newRoomName = "";
        }
        return ChatRoomFormComponent_1;
    }());
    __setFunctionName(_classThis, "ChatRoomFormComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _activeChat_decorators = [(0, core_1.Output)()];
        _chatRooms_decorators = [(0, core_1.Input)()];
        __esDecorate(null, null, _activeChat_decorators, { kind: "field", name: "activeChat", static: false, private: false, access: { has: function (obj) { return "activeChat" in obj; }, get: function (obj) { return obj.activeChat; }, set: function (obj, value) { obj.activeChat = value; } }, metadata: _metadata }, _activeChat_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _chatRooms_decorators, { kind: "field", name: "chatRooms", static: false, private: false, access: { has: function (obj) { return "chatRooms" in obj; }, get: function (obj) { return obj.chatRooms; }, set: function (obj, value) { obj.chatRooms = value; } }, metadata: _metadata }, _chatRooms_initializers, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ChatRoomFormComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ChatRoomFormComponent = _classThis;
}();
exports.ChatRoomFormComponent = ChatRoomFormComponent;
