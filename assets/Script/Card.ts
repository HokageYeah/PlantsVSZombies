import { _decorator, Component, Node, Sprite } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Card')
export class Card extends Component {
    // 卡片状态默认
    private cardState: CardState = CardState.Cooldown;

    @property(Node)
    private cardLight: Node = null; // 卡牌亮着的节点
    @property(Node)
    private cardGrey: Node = null; // 卡牌灰着的节点
    @property(Sprite)
    private cardMask: Sprite = null; // 卡牌的遮罩

    start() {

    }

    update(deltaTime: number) {
        switch (this.cardState) {
            case CardState.Cooldown:
                CoolingUpdate();
                break;
            case CardState.WaitingSun:
                WaitingSunUpdate();
                break;
            case CardState.Ready:
                ReadyUpdate();
                break;
        }
    }
}

// 冷却中
function CoolingUpdate() {

}

// 等待阳光
function WaitingSunUpdate() {

}

// 准备就绪
function ReadyUpdate() {

}

export enum CardState {
    Cooldown, // 冷却中
    WaitingSun, // 等待阳光
    Ready, // 准备就绪
}
