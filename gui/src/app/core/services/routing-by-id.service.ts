import { Injectable } from "@angular/core";

let id: number;
let routing: string;

@Injectable()
export class RoutingByIDService {

    public set(setId, setRouting) {
        id = setId;
        routing = setRouting;
    }

    public getId() {
        return id;
    }

    public getRouting() {
        return routing;
    }
}