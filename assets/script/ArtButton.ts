
import { _decorator, UITransform, Label, Node, Sprite } from 'cc';
import { instantiate } from 'cc';
import { Color } from 'cc';
import { Component } from 'cc';
import { director } from 'cc';
import { Scheduler } from 'cc';
import { tween } from 'cc';
import { Vec3 } from 'cc';
import { EventTouch } from 'cc';


const { ccclass, property } = _decorator;

@ccclass('ArtButton')
export class ArtButton extends Component {
    @property(Node) resetBtn: Node;


    start () {
        this.node.on(Node.EventType.TOUCH_START, this.onTouchStart, this, true);
        this.node.on(Node.EventType.TOUCH_END, this.onTouchEnd, this);

        this.resetBtn?.on(Node.EventType.TOUCH_END, this.onResetBtnClick, this);

        this.node.scale = Vec3.ZERO
        this.setTimeOnce(this, () => {
            this.animStart()
        }, 2)
    }


    onResetBtnClick () {
        this.animStart()
    }

    private anim_start
    private anim_loop
    private anim_press
    private anim_hold_loop
    private anim_release

    reset () {
        this.anim_start?.stop();
        this.anim_loop?.stop();
        this.anim_press?.stop();
        this.anim_hold_loop?.stop();
        this.anim_release?.stop();
        this.cancelAllTimer(this)
    }

    animStart () {
        this.reset()
        let node = this.node

        if (!this.anim_loop) {
            this.anim_loop = tween(node)
                .to(0.4, { scale: new Vec3(1.05, 0.96, 1) }, { easing: "cubicOut" })
                .to(0.3, { scale: new Vec3(1, 1, 1) }, { easing: "cubicOut" })
                .union()
                .repeatForever()
        }


        node.eulerAngles = new Vec3(0, 0, -7)
        node.scale = Vec3.ZERO

        let start_scale = 0.6
        let scale1 = new Vec3(1.2, 1, 1)
        let scale2 = new Vec3(1, 1, 1)
        let eulerAngles1 = new Vec3(0, 0, 7)
        let eulerAngles2 = new Vec3(0, 0, -7)
        let eulerAngles3 = new Vec3(0, 0, 0)
        this.anim_start = tween(node).parallel(
            tween()
                .to(0.4 * start_scale, { scale: scale1 }, { easing: "cubicOut" })
                .to(0.3 * start_scale, { scale: scale2 }, { easing: "cubicOut" }),
            tween()
                .to(0.28 * start_scale, { eulerAngles: eulerAngles1 }, { easing: "cubicOut" })
                .to(0.28 * start_scale, { eulerAngles: eulerAngles2 }, { easing: "cubicOut" })
                .to(0.14 * start_scale, { eulerAngles: eulerAngles3 }, { easing: "cubicOut" }),
        )

        this.setTimeOnce(this, () => {
            this.anim_loop.start()
        }, 0.7 * start_scale)

        this.anim_start.start();
    }


    onTouchStart (event: EventTouch) {
        this.reset()


        let node = this.node
        let sprite = node.getComponent(Sprite)
        sprite.color = new Color(128, 128, 128)

        let time_scale = 0.6

        let press_time = 0.2
        let press_effect = 0.85
        let scale1 = new Vec3(1, 1, 1).multiplyScalar(press_effect)

        if (!this.anim_press) {
            this.anim_press = tween(node)
                .to(press_time, { scale: scale1 }, { easing: "cubicOut" })
        }


        if (!this.anim_hold_loop) {
            this.anim_hold_loop = tween(node)
                .to(0.4, { scale: new Vec3(1.05, 0.96, 1).multiplyScalar(press_effect) }, { easing: "cubicOut" })
                .to(0.3, { scale: new Vec3(1, 1, 1).multiplyScalar(press_effect) }, { easing: "cubicOut" })
                .union()
                .repeatForever()
        }

        this.anim_press.start()
        this.setTimeOnce(this, () => {
            this.anim_hold_loop.start()
        }, press_time)
    }

    anim_hold_loop_start () {
        this.anim_hold_loop?.start()
    }

    onTouchEnd (event: EventTouch) {
        this.reset()

        let node = this.node
        let sprite = node.getComponent(Sprite)
        sprite.color = new Color(255, 255, 255)

        let press_time = 0.2
        if (!this.anim_release) {
            this.anim_release = tween(node)
                .to(press_time, { scale: new Vec3(1, 1, 1) }, { easing: "cubicOut" })
        }

        this.anim_release.start()
        this.setTimeOnce(this, () => {
            this.anim_loop.start()
        }, press_time)
    }


    setTimeOnce (obj: Object, callback: (dt: number) => void, delay: number) {
        let scheduler = director.getScheduler();
        Scheduler.enableForTarget(obj);
        const paused = scheduler.isTargetPaused(obj);
        scheduler.schedule(callback, obj, 0, 0, delay, paused);
    }

    cancelAllTimer (obj: Object) {
        if (obj) {
            let scheduler = director.getScheduler();
            Scheduler.enableForTarget(obj);
            scheduler.unscheduleAllForTarget(obj);
        }
    }
}