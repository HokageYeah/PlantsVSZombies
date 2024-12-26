import { _decorator, Animation, Component, Enum, Node } from "cc";
import { PlantState, PlantType } from "./Global";
const { ccclass, property } = _decorator;

@ccclass("Plant")
export class Plant extends Component {
  // 植物状态：默认未激活
  plantState: PlantState = PlantState.Disable;

  // 植物类型
  @property({ type: Enum(PlantType), tooltip: "植物类型" })
  public plantType: PlantType;

  start() {
    this.transitionToDisable();
  }

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
  // 状态转换
  transitionToEnable() {
    this.plantState = PlantState.Enable;
  }
  transitionToDisable() {
    this.plantState = PlantState.Disable;
    // 停止播放动画
    this.getComponent(Animation).enabled = false;
  }
}
