import { Deserializable } from './deserializable.model';
import { isArray } from 'util';
import { Type } from '@angular/core';
import { AnonymousSubject } from 'rxjs/internal/Subject';

// type pomType=Deserializable<any>|DeserializableArray<any>; //typescript 2.0 introduce tagged union
export class Result<T> {
    deserialize(input: any,deserializedData:T): Result<T> {

        this.info=input.info;
        this.status=input.status;
        this.value=deserializedData;
        return this;
    }
    status: boolean;
    info: string;
    value: T;
}
