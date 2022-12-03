import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";

@Injectable({ providedIn: 'root' })
export class AdventOfCodeService {

    constructor(private httpClient: HttpClient) { }

    getData(): Promise<IAdventOfCodeData> {
        return firstValueFrom(this.httpClient.get<IAdventOfCodeData>('assets/advent-of-code.json'));
    }
}

export type IAdventOfCodeData = Record<string /* year */, IAdventOfCodeDay[]>;

export interface IAdventOfCodeDay {
    day: number;
    videoId: string;
    title?: string;
    debut?: number;
}
