import { _decorator, animation, Component, find, instantiate, Node, Prefab } from "cc";
import { Plant } from "./Plant";
const { ccclass, property } = _decorator;

// 继承Plant，向日葵
@ccclass("SunFlower")
export class SunFlower extends Plant {
  // 计时器
  @property(Number)
  produceDuration: number = 0;
  private produceTimer: number = 0;
  anim: animation.AnimationController = null;
  private delataTime: number = 0;
  // 太阳预制体
  @property({ type: Prefab })
  sunPrefab: Prefab = null;
  protected onLoad(): void {
    this.anim = this.getComponent(animation.AnimationController);
  }
  update(deltaTime: number): void {
    super.update(deltaTime);
    this.delataTime = deltaTime;
  }
  // 帧动画事件
  produceSun() {
    console.log("produceSun");
    // 生成太阳
    const sunNode = instantiate(this.sunPrefab);
    sunNode.parent = find("Canvas/ForeGround");
    sunNode.setPosition(this.node.position);
  }
  // 未激活状态更新逻辑
  disableUpdate() {
    super.disableUpdate();
  }
  // 激活状态更新逻辑
  enableUpdate() {
    super.enableUpdate();
    this.produceTimer += this.delataTime;
    if (this.produceTimer >= this.produceDuration) {
      this.anim.setValue("isGlowing", true);
      this.produceTimer = 0;
    }
  }
}
