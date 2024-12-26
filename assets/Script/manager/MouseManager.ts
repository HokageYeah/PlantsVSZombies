import { __private, _decorator, Component, EventMouse, input, Input, instantiate, Node, Prefab, Vec3 } from "cc";
import { Plant } from "../Plant";
import { PlantType } from "../Global";
const { ccclass, property } = _decorator;

@ccclass("MouseManager")
export class MouseManager extends Component {
  private static _instance: MouseManager = null;
  //   植物列表
  @property([Plant])
  public plantPrefabArray: Plant[] = [];

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
  onMouseMove(event: EventMouse) {
    this.followCursor(event);
  }
  addPlant(plantType: PlantType): boolean {
    console.log("添加植物", plantType);
    if(this.currentPlant !== null) return false;
    let plantPrefab = this.getPlantPrefab(plantType);
    if (!plantPrefab) {
      console.error("植物预制体不存在", plantType);
      return false;
    }
    this.currentPlant = instantiate(plantPrefab.node);
    this.currentPlant.parent = this.node.parent;
    return true;
  }
  getPlantPrefab(plantType: PlantType): Plant {
    return this.plantPrefabArray.find((plant) => plant.plantType === plantType);
  }
  //    跟随鼠标
  followCursor(event: EventMouse) {
    // 获取鼠标位置
    let mousePos = event.getUILocation();
    console.log("鼠标位置", mousePos);
    // 将鼠标位置转换为世界坐标
    let worldPos = new Vec3(mousePos.x, mousePos.y, 0);
    if (this.currentPlant) this.currentPlant.setWorldPosition(worldPos);
  }
}
