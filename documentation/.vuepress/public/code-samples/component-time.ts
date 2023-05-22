import { Behaviour, Text, serializable, WaitForSeconds } from "@needle-tools/engine";

export class DisplayTime extends Behaviour {

    @serializable(Text)
    text?: Text;

    onEnable(): void {
        this.startCoroutine(this.updateTime())
    }

    private *updateTime() {
        while (true) {
            if (this.text) {
                this.text.text = new Date().toLocaleTimeString();
                console.log(this.text.text)
            }
            yield WaitForSeconds(1)
        }
    };
}