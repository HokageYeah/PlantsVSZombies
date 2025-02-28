import {
  __private,
  _decorator,
  Component,
  EventMouse,
  find,
  input,
  Input,
  instantiate,
  Node,
  Prefab,
  Vec3,
} from "cc";
import { Plant } from "../Plant";
import { PlantType } from "../Global";
import { Cell } from "./Cell";
const { ccclass, property } = _decorator;

@ccclass("MouseManager")
export class MouseManager extends Component {
  private static _instance: MouseManager = null;
  //   植物列表
  @property([Prefab])
  public plantPrefabArray: Prefab[] = [];

  //   植物列表
  private currentPlant: Node = null;

  // 获取实例
  public static get Instance(): MouseManager {
    return this._instance;
  }

  protected onLoad(): void {
    if (!MouseManager._instance) {
      MouseManager._instance = this;
    } else {
      this.node.destroy();
      return;
    }
    input.on(Input.EventType.MOUSE_MOVE, this.onMouseMove, this);
  }
  protected onDestroy(): void {
    input.off(Input.EventType.MOUSE_MOVE, this.onMouseMove, this);
  }
  onMouseMove(event: EventMouse) {
    this.followCursor(event);
  }
  addPlant(plantType: PlantType, event: EventMouse): boolean {
    console.log("添加植物", plantType);
    if (this.currentPlant !== null) return false;
    let plantPrefab = this.getPlantPrefab(plantType);
    if (!plantPrefab) {
      console.error("植物预制体不存在", plantType);
      return false;
    }
    this.currentPlant = plantPrefab;
    this.currentPlant.parent = find("Canvas/Game");
    this.followCursor(event);
    return true;
  }
  getPlantPrefab(plantType: PlantType): Node {
    for (let plantPrefab of this.plantPrefabArray) {
      let plabtNode = instantiate(plantPrefab);
      if (plabtNode.getComponent(Plant).plantType == plantType) {
        return plabtNode;
      } else {
        // 如果不同，则销毁
        plabtNode.destroy();
      }
    }
    return null;
  }
  //    跟随鼠标
  followCursor(event: EventMouse) {
    // 获取鼠标位置
    let mousePos = event.getUILocation();
    // console.log("鼠标位置", mousePos);
    // 将鼠标位置转换为世界坐标
    let worldPos = new Vec3(mousePos.x, mousePos.y, 0);
    if (this.currentPlant) this.currentPlant.setWorldPosition(worldPos);
  }
  onCellCLick(cell: Cell) {
    if (!this.currentPlant) return;
    // 设置当前植物对象的位置为点击格子的位置
    let isSuccess = cell.addPlant(this.currentPlant);
    if (!isSuccess) return;
    // 如果植物添加成功 释放当前植物对象
    this.currentPlant = null;
    console.log("点击单元格", cell);
  }
}
