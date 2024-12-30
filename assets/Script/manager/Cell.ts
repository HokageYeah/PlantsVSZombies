import { _decorator, Component, EventMouse, Node } from "cc";
import { MouseManager } from "./MouseManager";
import { Plant } from "../Plant";
const { ccclass, property } = _decorator;

@ccclass("Cell")
export class Cell extends Component {
  // 当前格子的植物
  public currentPlant: Node = null;
  start() {}

  update(deltaTime: number) {}
  protected onLoad(): void {
    this.node.on(Node.EventType.MOUSE_DOWN, this.onMouseDown, this);
    this.node.on(Node.EventType.MOUSE_MOVE, this.onMouseMove, this);
  }
  protected onDestroy(): void {
    this.node.off(Node.EventType.MOUSE_DOWN, this.onMouseDown, this);
    this.node.off(Node.EventType.MOUSE_MOVE, this.onMouseMove, this);
  }
  onMouseDown(event: EventMouse) {
    // console.log("鼠标按下", event);
    MouseManager.Instance.onCellCLick(this);
  }
  onMouseMove(event: EventMouse) {
    // console.log("鼠标抬起", event);
    MouseManager.Instance.followCursor(event);
  }
  addPlant(plant: Node):boolean {
    if(this.currentPlant !== null) return false;
    this.currentPlant = plant;
    // 设置植物位置
    this.currentPlant.setPosition(this.node.position);
    // 设置植物状态为激活
    plant.getComponent(Plant).transitionToEnable();
    return true;
  }
}
