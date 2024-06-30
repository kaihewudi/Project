System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Node, Sprite, instantiate, Color, Component, EditBox, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _crd, ccclass, property, GridPanel;

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
      instantiate = _cc.instantiate;
      Color = _cc.Color;
      Component = _cc.Component;
      EditBox = _cc.EditBox;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "07ef10EEMVJaoTnkG8v6NCN", "GridPanel", undefined);

      __checkObsolete__(['_decorator', 'UITransform', 'Label', 'Node', 'Sprite']);

      __checkObsolete__(['instantiate']);

      __checkObsolete__(['Color']);

      __checkObsolete__(['Component']);

      __checkObsolete__(['EditBox']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("GridPanel", GridPanel = (_dec = ccclass('GridPanel'), _dec2 = property(Node), _dec3 = property(Node), _dec4 = property(Node), _dec5 = property(EditBox), _dec6 = property(EditBox), _dec(_class = (_class2 = class GridPanel extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "content", _descriptor, this);

          _initializerDefineProperty(this, "item", _descriptor2, this);

          _initializerDefineProperty(this, "createBtn", _descriptor3, this);

          _initializerDefineProperty(this, "XEditBox", _descriptor4, this);

          _initializerDefineProperty(this, "YEditBox", _descriptor5, this);

          this.cells = [];
          this.colors = [Color.RED, Color.YELLOW, Color.BLUE, Color.GREEN, Color.CYAN];
          this.map = void 0;
        }

        start() {
          var _this$createBtn;

          (_this$createBtn = this.createBtn) == null ? void 0 : _this$createBtn.on(Node.EventType.TOUCH_END, this.onCreateBtnClick, this);
          this.item.active = false;
        }

        onCreateBtnClick() {
          if (this.cells.length == 0) {
            for (var i = 0; i < 100; i++) {
              var ins = instantiate(this.item);
              this.cells.push(ins);
              ins.active = true;
              ins.parent = this.content;
            }
          }

          var x = parseInt(this.XEditBox.string);
          x = Number.isNaN(x) ? 0 : x;
          var y = parseInt(this.YEditBox.string);
          y = Number.isNaN(y) ? 0 : y;
          this.map = new Array(100);

          for (var _i = 0; _i < 10; _i++) {
            for (var j = 0; j < 10; j++) {
              var index = _i * 10 + j;
              var top_color = null;
              var left_color = null;

              if (_i > 0) {
                top_color = this.map[(_i - 1) * 10 + j];
              }

              if (j > 0) {
                left_color = this.map[_i * 10 + j - 1];
              }

              var weight_list = [];

              for (var k = 0; k < 5; k++) {
                weight_list[k] = null;
              }

              var average = 1 / 5;
              var remain = 1; //相同

              if (top_color == left_color) {
                if (top_color != null) {
                  var w = average + y / 100;
                  weight_list[top_color] = w;
                  remain -= w;
                }
              } else {
                if (top_color != null) {
                  var _w = average + x / 100;

                  weight_list[top_color] = _w;
                  remain -= _w;
                }

                if (left_color != null) {
                  var _w2 = average + x / 100;

                  weight_list[left_color] = _w2;
                  remain -= _w2;
                }
              }

              remain = Math.max(remain, 0);
              var remain_lengh = weight_list.filter(x => x == null).length;
              var remain_average = remain / remain_lengh;

              for (var _k = 0; _k < weight_list.length; _k++) {
                weight_list[_k] = weight_list[_k] == null ? remain_average : weight_list[_k];
              }

              var result = this.getRandomIndex(weight_list);
              this.map[index] = result;
              var node = this.cells[index];
              node.getComponent(Sprite).color = this.colors[result];
            }
          }
        }

        getRandomIndex(list) {
          var fields = [];

          for (var i = 0; i < list.length; i++) {
            if (i == 0) {
              fields[i] = list[i];
            } else {
              fields[i] = fields[i - 1] + list[i];
            }
          }

          var random = Math.random() * fields[fields.length - 1];

          for (var _i2 = 0; _i2 < fields.length; _i2++) {
            if (random <= fields[_i2]) {
              return _i2;
            }
          }
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "content", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "item", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "createBtn", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "XEditBox", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "YEditBox", [_dec6], {
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
//# sourceMappingURL=33638c8ac6cfcd970e69222098827705b549a09b.js.map