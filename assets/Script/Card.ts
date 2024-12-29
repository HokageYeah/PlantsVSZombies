import { _decorator, Component, Enum, EventMouse, Node, Sprite } from "cc";
import { SumManager } from "./manager/SumManager";
import { MouseManager } from "./manager/MouseManager";
import { CardState, PlantType } from "./Global";
const { ccclass, property } = _decorator;


@ccclass("Card")
export class Card extends Component {
  // 卡片状态默认
  private cardState: CardState = CardState.Cooldown;

  // 植物类型
  @property({ type: Enum(PlantType), tooltip: "植物类型" })
  private plantType: PlantType;

  @property(Node)
  private cardLight: Node = null; // 卡牌亮着的节点
  @property(Node)
  private cardGrey: Node = null; // 卡牌灰着的节点
  @property(Sprite)
  private cardMask: Sprite = null; // 卡牌的遮罩

  @property(Number)
  public cdTime: number = 2; // 冷却时间
  private cdTimer: number = 0; // 冷却时间计时器

  @property({ type: Number, tooltip: "卡牌需要阳光点数" })
  private needSunPoint: number = 50; // 卡牌需要阳光点数

  start() {
    this.cdTimer = this.cdTime;
  }

  update(deltaTime: number) {
    switch (this.cardState) {
      case CardState.Cooldown:
        this.CoolingUpdate(deltaTime);
        break;
      case CardState.WaitingSun:
        this.WaitingSunUpdate();
        break;
      case CardState.Ready:
        this.ReadyUpdate();
        break;
    }
  }
  // 冷却中
  private CoolingUpdate(deltaTime: number) {
    this.cdTimer -= deltaTime;
    this.cardMask.fillRange = -(this.cdTimer / this.cdTime);
    if (this.cdTimer <= 0) {
      this.transitionToWaitingSun();
    }
  }

  // 等待阳光
  private WaitingSunUpdate() {
    if (this.needSunPoint <= SumManager.Instance.getSunPoint()) {
      this.transitionToReady();
    }
  }

  // 准备就绪
  private ReadyUpdate() {
    if(this.needSunPoint>SumManager.Instance.getSunPoint()){
      this.transitionToWaitingSun();
    }
  }
  // 过渡到等待阳光
  private transitionToWaitingSun() {
    this.cardState = CardState.WaitingSun;
    this.cardLight.active = false;
    this.cardGrey.active = true;
    this.cardMask.node.active = false;
  }

  // 过渡到准备就绪
  private transitionToReady() {
    this.cardState = CardState.Ready;
    this.cardLight.active = true;
    this.cardGrey.active = false;
    this.cardMask.node.active = false;
  }
  //  切换到准备种植状态
  transitionToCooling(){
    this.cardState = CardState.Cooldown;
    this.cdTimer = this.cdTime;
    this.cardLight.active = false;
    this.cardGrey.active = true;
    this.cardMask.node.active = true;
  }
  //   点击事件
  private onClick(event: EventMouse) {
    if(this.needSunPoint > SumManager.Instance.getSunPoint())return;
    console.log("点击了卡牌");
    // 点击后扣除阳光点数，开始种植
    let isSuccess = MouseManager.Instance.addPlant(this.plantType, event);
    if(!isSuccess) return;
    console.log("点击了卡牌---", isSuccess);
    SumManager.Instance.subSun(this.needSunPoint);
    this.transitionToCooling();
  }
}

