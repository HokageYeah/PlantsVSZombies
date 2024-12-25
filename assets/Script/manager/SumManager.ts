import { _decorator, Component, Label, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SumManager')
export class SumManager extends Component {
    private static _instance: SumManager = null;

    @property(Number)
    public sunPoint: number = 0; // 阳光点数

    @property(Label)
    public sunPointLabel: Label = null; // 阳光点数标签

    // 获取实例
    public static get Instance(): SumManager {
        return this._instance;
    }

    // 获取阳光点数
    public getSunPoint(): number {
        return this.sunPoint;
    }

    // 增加阳光点数
    public addSunPoint(point: number): void {
        this.sunPoint += point;
    }

    protected onLoad(): void {
        if (!SumManager._instance) {
            SumManager._instance = this;
        }else{
            this.node.destroy();
            return;
        }
    }
    // 更新阳光点数标签
    private updateSunPointLabel(){
        this.sunPointLabel.string = this.sunPoint.toString();
    }
    // 扣除阳光点数
    public subSun(point: number) :void{
        this.sunPoint -= point;
        if(this.sunPoint<0){
            this.sunPoint = 0;
        }
        this.updateSunPointLabel();
    }
    start() {
        this.updateSunPointLabel();
    }

    update(deltaTime: number) {
        
    }
}


