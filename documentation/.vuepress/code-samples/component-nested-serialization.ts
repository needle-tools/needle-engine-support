import { Behaviour, serializable } from "@needle-tools/engine";

// Documentation → https://docs.needle.tools/scripting

class CustomSubData {
    @serializable()
    subString: string = "";
    
    @serializable()
    subNumber: number = 0;
}

class CustomData {
    @serializable()
    myStringField: string = "";
    
    @serializable()
    myNumberField: number = 0;
    
    @serializable()
    myBooleanField: boolean = false;
    
    @serializable(CustomSubData)
    subData: CustomSubData | undefined = undefined;

    someMethod() {
        console.log("My string is " + this.myStringField, "my sub data", this.subData)
    }
}

export class SerializedDataSample extends Behaviour {

    @serializable(CustomData)  
    myData: CustomData | undefined;
    
    onEnable() {
        console.log(this.myData);
        this.myData?.someMethod();
    }
}