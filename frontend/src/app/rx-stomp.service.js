"use strict";
var __extends =
  (this && this.__extends) ||
  (function () {
    var extendStatics = function (d, b) {
      extendStatics =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function (d, b) {
            d.__proto__ = b;
          }) ||
        function (d, b) {
          for (var p in b)
            if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
        };
      return extendStatics(d, b);
    };
    return function (d, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError(
          "Class extends value " + String(b) + " is not a constructor or null",
        );
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype =
        b === null
          ? Object.create(b)
          : ((__.prototype = b.prototype), new __());
    };
  })();
var __esDecorate =
  (this && this.__esDecorate) ||
  function (
    ctor,
    descriptorIn,
    decorators,
    contextIn,
    initializers,
    extraInitializers,
  ) {
    function accept(f) {
      if (f !== void 0 && typeof f !== "function")
        throw new TypeError("Function expected");
      return f;
    }
    var kind = contextIn.kind,
      key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target =
      !descriptorIn && ctor
        ? contextIn["static"]
          ? ctor
          : ctor.prototype
        : null;
    var descriptor =
      descriptorIn ||
      (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _,
      done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
      var context = {};
      for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
      for (var p in contextIn.access) context.access[p] = contextIn.access[p];
      context.addInitializer = function (f) {
        if (done)
          throw new TypeError(
            "Cannot add initializers after decoration has completed",
          );
        extraInitializers.push(accept(f || null));
      };
      var result = (0, decorators[i])(
        kind === "accessor"
          ? { get: descriptor.get, set: descriptor.set }
          : descriptor[key],
        context,
      );
      if (kind === "accessor") {
        if (result === void 0) continue;
        if (result === null || typeof result !== "object")
          throw new TypeError("Object expected");
        if ((_ = accept(result.get))) descriptor.get = _;
        if ((_ = accept(result.set))) descriptor.set = _;
        if ((_ = accept(result.init))) initializers.unshift(_);
      } else if ((_ = accept(result))) {
        if (kind === "field") initializers.unshift(_);
        else descriptor[key] = _;
      }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
  };
var __runInitializers =
  (this && this.__runInitializers) ||
  function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
      value = useValue
        ? initializers[i].call(thisArg, value)
        : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
  };
var __setFunctionName =
  (this && this.__setFunctionName) ||
  function (f, name, prefix) {
    if (typeof name === "symbol")
      name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", {
      configurable: true,
      value: prefix ? "".concat(prefix, " ", name) : name,
    });
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.RxStompService = void 0;
var core_1 = require("@angular/core");
var rx_stomp_1 = require("@stomp/rx-stomp");
var RxStompService = (function () {
  var _classDecorators = [
    (0, core_1.Injectable)({
      providedIn: "root",
    }),
  ];
  var _classDescriptor;
  var _classExtraInitializers = [];
  var _classThis;
  var _classSuper = rx_stomp_1.RxStomp;
  var RxStompService = (_classThis = /** @class */ (function (_super) {
    __extends(RxStompService_1, _super);
    function RxStompService_1() {
      var _this = _super.call(this) || this;
      _this.activeChat = "";
      _this.chatSubscriptions = [];
      return _this;
    }
    RxStompService_1.prototype.getChatRooms = function () {
      return this.chatSubscriptions.map(function (x) {
        return x.roomName;
      });
    };
    RxStompService_1.prototype.joinRoom = function (newRoomName) {
      var _this = this;
      var subscription = this.watch("/topic/chat/" + newRoomName).subscribe(
        function (message) {
          var chatMessage = JSON.parse(message.body);
          _this.chatSubscriptions
            .filter(function (x) {
              return x.roomName == chatMessage.roomName;
            })[0]
            .chatLog.push(chatMessage);
        },
      );
      this.chatSubscriptions.push({
        roomName: newRoomName,
        subscription: subscription,
        chatLog: [],
      });
      this.activeChat = newRoomName;
    };
    RxStompService_1.prototype.getActiveChatLog = function () {
      if (this.chatSubscriptions.length < 1) return [];

      return this.chatSubscriptions.filter(function (x) {
        return x.roomName === _this.activeChat;
      })[0].chatLog;
    };
    RxStompService_1.prototype.sendMessage = function (newMessageString) {
      var newMessage = {
        body: newMessageString,
        from: "foo",
        roomName: this.activeChat,
      };
      this.publish({
        destination: "/topic/chat/" + this.activeChat,
        body: JSON.stringify(newMessage),
      });
    };
    return RxStompService_1;
  })(_classSuper));
  __setFunctionName(_classThis, "RxStompService");
  (function () {
    var _a;
    var _metadata =
      typeof Symbol === "function" && Symbol.metadata
        ? Object.create(
            (_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0
              ? _a
              : null,
          )
        : void 0;
    __esDecorate(
      null,
      (_classDescriptor = { value: _classThis }),
      _classDecorators,
      { kind: "class", name: _classThis.name, metadata: _metadata },
      null,
      _classExtraInitializers,
    );
    RxStompService = _classThis = _classDescriptor.value;
    if (_metadata)
      Object.defineProperty(_classThis, Symbol.metadata, {
        enumerable: true,
        configurable: true,
        writable: true,
        value: _metadata,
      });
    __runInitializers(_classThis, _classExtraInitializers);
  })();
  return (RxStompService = _classThis);
})();
exports.RxStompService = RxStompService;
