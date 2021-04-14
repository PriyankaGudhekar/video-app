import { Injectable } from '@angular/core';

@Injectable()
export class CsvToJson {

    result: any = [];
    full_line: any = [];
    keys: any = [];

    convertToJson(text) {

        this.full_line = text.split("\n");

        console.log('full_line-->', this.full_line)
        this.keys = this.full_line[0].split(",");

        for (var i = 1; i < this.full_line.length - 1; i++) {
            var obj = {};

            var currentline = this.full_line[i].split(",");

            for (var j = 0; j < this.keys.length; j++) {
                obj[this.keys[j]] = currentline[j];
            }

            console.log('obj--->', obj);

            this.result.push(obj);
        }
        //  console.log('final result_--->', this.result);
        return this.result;
    }
}