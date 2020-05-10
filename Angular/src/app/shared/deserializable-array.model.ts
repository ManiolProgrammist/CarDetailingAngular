
export class DeserializableArray<T> extends Array<T> {

    constructor(deser: (elem) => T){
        super();
        this.deser=deser;
    }
    deser:(elem)=>T;
    deserialize(input:Array<T>):DeserializableArray<T>{
        var R=new DeserializableArray<T>(this.deser);
        input.forEach(element=>{R.push(this.deser(element))});
        return R;
    }

}
