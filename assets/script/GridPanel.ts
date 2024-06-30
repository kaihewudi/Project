
import { _decorator, UITransform, Label, Node, Sprite } from 'cc';
import { instantiate } from 'cc';
import { Color } from 'cc';
import { Component } from 'cc';
import { EditBox } from 'cc';


const { ccclass, property } = _decorator;

@ccclass('GridPanel')
export class GridPanel extends Component {

    @property(Node) content: Node;
    @property(Node) item: Node;
    @property(Node) createBtn: Node;

    @property(EditBox) XEditBox: EditBox;
    @property(EditBox) YEditBox: EditBox;

    private cells: Node[] = []
    private colors: Color[] = [Color.RED, Color.YELLOW, Color.BLUE, Color.GREEN, Color.CYAN]
    private map: Array<number>


    start () {
        this.createBtn?.on(Node.EventType.TOUCH_END, this.onCreateBtnClick, this);
        this.item.active = false
    }

    onCreateBtnClick () {
        if (this.cells.length == 0) {
            for (let i = 0; i < 100; i++) {
                let ins = instantiate(this.item)
                this.cells.push(ins)
                ins.active = true
                ins.parent = this.content
            }
        }


        let x = parseInt(this.XEditBox.string)
        x = Number.isNaN(x) ? 0 : x
        let y = parseInt(this.YEditBox.string)
        y = Number.isNaN(y) ? 0 : y

        this.map = new Array<number>(100)
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                let index = i * 10 + j

                let top_color: number = null
                let left_color: number = null
                if (i > 0) {
                    top_color = this.map[(i - 1) * 10 + j]
                }
                if (j > 0) {
                    left_color = this.map[i * 10 + j - 1]
                }

                let weight_list: number[] = []
                for (let k = 0; k < 5; k++) {
                    weight_list[k] = null
                }

                let average = 1 / 5
                let remain = 1
                //相同
                if (top_color == left_color) {
                    if (top_color != null) {
                        let w = average + y / 100
                        weight_list[top_color] = w
                        remain -= w
                    }
                } else {
                    if (top_color != null) {
                        let w = average + x / 100
                        weight_list[top_color] = w
                        remain -= w
                    }
                    if (left_color != null) {
                        let w = average + x / 100
                        weight_list[left_color] = w
                        remain -= w
                    }
                }
                remain = Math.max(remain, 0)

                let remain_lengh = weight_list.filter(x => x == null).length
                let remain_average = remain / remain_lengh
                for (let k = 0; k < weight_list.length; k++) {
                    weight_list[k] = weight_list[k] == null ? remain_average : weight_list[k]
                }


                let result = this.getRandomIndex(weight_list)
                this.map[index] = result
                let node = this.cells[index]
                node.getComponent(Sprite).color = this.colors[result]

            }
        }

    }

    getRandomIndex (list: number[]): number {
        let fields: number[] = []
        for (let i = 0; i < list.length; i++) {
            if (i == 0) {
                fields[i] = list[i]
            } else {
                fields[i] = fields[i - 1] + list[i]
            }
        }


        let random = Math.random() * fields[fields.length - 1]
        for (let i = 0; i < fields.length; i++) {
            if (random <= fields[i]) {
                return i
            }
        }
    }
}