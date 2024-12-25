import { _decorator, Component, Enum, Node } from "cc";
import { PlantType } from "./Card";
const { ccclass, property } = _decorator;

@ccclass("Plant")
export class Plant extends Component {
  // 植物状态：默认未激活
  plantState: PlantState = PlantState.Disable;

  // 植物类型
  @property({ type: Enum(PlantType), tooltip: "植物类型" })
  private plantType: PlantType;

  start() {}

  update(deltaTime: number) {
    switch (this.plantState) {
      case PlantState.Disable:
        this.disableUpdate();
        break;
      case PlantState.Enable:
        this.enableUpdate();
        break;
    }
  }
  // 未激活状态更新逻辑
  disableUpdate() {}
  // 激活状态更新逻辑
  enableUpdate() {}
}

export enum PlantState {
  Disable, // 未激活
  Enable, // 激活
}
