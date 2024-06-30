System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Node, Sprite, Color, Component, director, Scheduler, tween, Vec3, _dec, _dec2, _class, _class2, _descriptor, _crd, ccclass, property, ArtButton;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Node = _cc.Node;
      Sprite = _cc.Sprite;
      Color = _cc.Color;
      Component = _cc.Component;
      director = _cc.director;
      Scheduler = _cc.Scheduler;
      tween = _cc.tween;
      Vec3 = _cc.Vec3;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "ab20eeh1cxBh5TmhgkRal5m", "ArtButton", undefined);

      __checkObsolete__(['_decorator', 'UITransform', 'Label', 'Node', 'Sprite']);

      __checkObsolete__(['instantiate']);

      __checkObsolete__(['Color']);

      __checkObsolete__(['Component']);

      __checkObsolete__(['director']);

      __checkObsolete__(['Scheduler']);

      __checkObsolete__(['tween']);

      __checkObsolete__(['Vec3']);

      __checkObsolete__(['EventTouch']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("ArtButton", ArtButton = (_dec = ccclass('ArtButton'), _dec2 = property(Node), _dec(_class = (_class2 = class ArtButton extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "resetBtn", _descriptor, this);

          this.anim_start = void 0;
          this.anim_loop = void 0;
          this.anim_press = void 0;
          this.anim_hold_loop = void 0;
          this.anim_release = void 0;
        }

        start() {
          var _this$resetBtn;

          this.node.on(Node.EventType.TOUCH_START, this.onTouchStart, this, true);
          this.node.on(Node.EventType.TOUCH_END, this.onTouchEnd, this);
          (_this$resetBtn = this.resetBtn) == null ? void 0 : _this$resetBtn.on(Node.EventType.TOUCH_END, this.onResetBtnClick, this);
          this.node.scale = Vec3.ZERO;
          this.setTimeOnce(this, () => {
            this.animStart();
          }, 2);
        }

        onResetBtnClick() {
          this.animStart();
        }

        reset() {
          var _this$anim_start, _this$anim_loop, _this$anim_press, _this$anim_hold_loop, _this$anim_release;

          (_this$anim_start = this.anim_start) == null ? void 0 : _this$anim_start.stop();
          (_this$anim_loop = this.anim_loop) == null ? void 0 : _this$anim_loop.stop();
          (_this$anim_press = this.anim_press) == null ? void 0 : _this$anim_press.stop();
          (_this$anim_hold_loop = this.anim_hold_loop) == null ? void 0 : _this$anim_hold_loop.stop();
          (_this$anim_release = this.anim_release) == null ? void 0 : _this$anim_release.stop();
          this.cancelAllTimer(this);
        }

        animStart() {
          this.reset();
          var node = this.node;

          if (!this.anim_loop) {
            this.anim_loop = tween(node).to(0.4, {
              scale: new Vec3(1.05, 0.96, 1)
            }, {
              easing: "cubicOut"
            }).to(0.3, {
              scale: new Vec3(1, 1, 1)
            }, {
              easing: "cubicOut"
            }).union().repeatForever();
          }

          node.eulerAngles = new Vec3(0, 0, -7);
          node.scale = Vec3.ZERO;
          var start_scale = 0.6;
          var scale1 = new Vec3(1.2, 1, 1);
          var scale2 = new Vec3(1, 1, 1);
          var eulerAngles1 = new Vec3(0, 0, 7);
          var eulerAngles2 = new Vec3(0, 0, -7);
          var eulerAngles3 = new Vec3(0, 0, 0);
          this.anim_start = tween(node).parallel(tween().to(0.4 * start_scale, {
            scale: scale1
          }, {
            easing: "cubicOut"
          }).to(0.3 * start_scale, {
            scale: scale2
          }, {
            easing: "cubicOut"
          }), tween().to(0.28 * start_scale, {
            eulerAngles: eulerAngles1
          }, {
            easing: "cubicOut"
          }).to(0.28 * start_scale, {
            eulerAngles: eulerAngles2
          }, {
            easing: "cubicOut"
          }).to(0.14 * start_scale, {
            eulerAngles: eulerAngles3
          }, {
            easing: "cubicOut"
          }));
          this.setTimeOnce(this, () => {
            this.anim_loop.start();
          }, 0.7 * start_scale);
          this.anim_start.start();
        }

        onTouchStart(event) {
          this.reset();
          var node = this.node;
          var sprite = node.getComponent(Sprite);
          sprite.color = new Color(128, 128, 128);
          var time_scale = 0.6;
          var press_time = 0.2;
          var press_effect = 0.85;
          var scale1 = new Vec3(1, 1, 1).multiplyScalar(press_effect);

          if (!this.anim_press) {
            this.anim_press = tween(node).to(press_time, {
              scale: scale1
            }, {
              easing: "cubicOut"
            });
          }

          if (!this.anim_hold_loop) {
            this.anim_hold_loop = tween(node).to(0.4, {
              scale: new Vec3(1.05, 0.96, 1).multiplyScalar(press_effect)
            }, {
              easing: "cubicOut"
            }).to(0.3, {
              scale: new Vec3(1, 1, 1).multiplyScalar(press_effect)
            }, {
              easing: "cubicOut"
            }).union().repeatForever();
          }

          this.anim_press.start();
          this.setTimeOnce(this, () => {
            this.anim_hold_loop.start();
          }, press_time);
        }

        anim_hold_loop_start() {
          var _this$anim_hold_loop2;

          (_this$anim_hold_loop2 = this.anim_hold_loop) == null ? void 0 : _this$anim_hold_loop2.start();
        }

        onTouchEnd(event) {
          this.reset();
          var node = this.node;
          var sprite = node.getComponent(Sprite);
          sprite.color = new Color(255, 255, 255);
          var press_time = 0.2;

          if (!this.anim_release) {
            this.anim_release = tween(node).to(press_time, {
              scale: new Vec3(1, 1, 1)
            }, {
              easing: "cubicOut"
            });
          }

          this.anim_release.start();
          this.setTimeOnce(this, () => {
            this.anim_loop.start();
          }, press_time);
        }

        setTimeOnce(obj, callback, delay) {
          var scheduler = director.getScheduler();
          Scheduler.enableForTarget(obj);
          var paused = scheduler.isTargetPaused(obj);
          scheduler.schedule(callback, obj, 0, 0, delay, paused);
        }

        cancelAllTimer(obj) {
          if (obj) {
            var scheduler = director.getScheduler();
            Scheduler.enableForTarget(obj);
            scheduler.unscheduleAllForTarget(obj);
          }
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "resetBtn", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=b5472319c2507e2863b1573204390f2be0dd59bd.js.map