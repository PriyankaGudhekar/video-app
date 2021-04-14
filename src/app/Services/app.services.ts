import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable()
export class Service {
  projectPath: string = "http://localhost:8124";

  constructor(private http: Http) {

  }

  // menudetails:any=[];
  // getData(url: string) {
  //   console.log(url, "url---")
  //   // let token = localStorage.getItem("token");
  //   return this.http.get(this.projectPath + "/" + url)
  //     .pipe(map(res => res.json()));
  // }

  // postData(url: string, params: any) {
  //   // var headers = new Headers();
  //   // headers.append("Content-Type", "application/json");
  //   // console.log(params, "params---")
  //   // params = (JSON.stringify(params));
  //   // console.log(params, "params-2--")

  //   // let token = localStorage.getItem("token");
  //   return this.http.post(this.projectPath + "/" + url, { params })
  //     .pipe(map(res => res.json()));
  // }



  getData(url: string) {
    let token = localStorage.getItem("token");
    return this.http.get(this.projectPath + "/" + url)
      .pipe(map(res => res.json()));
  }

  postData(url: string, params: any) {
    var headers = new Headers();
    headers.append("Content-Type", "application/json");
    // params = btoa(JSON.stringify(params));
    let token = localStorage.getItem("token");
    console.log(token, 'url--->', url);
    console.log('params-----', params);
    return this.http.post(this.projectPath + "/" + url, { params: params }, { headers: headers })
      .pipe(map(res => res.json()));
  }



  upload_File(url: string, params: any) {
    console.log(url, "url------", params)
    return this.http.post(this.projectPath + url, params)
      .pipe(map(res => res.json()));
  }

  savedata(params) {
    var headers = new Headers();
    headers.append("Content-Type", "application/json")
    params = btoa(JSON.stringify(params));
    return this.http.post(this.projectPath + "/savedata", { params: params }, { headers: headers })
      .pipe(map(res => res.json()));
  }
  checkblank(value) {
    if (value === undefined) {
      value = "";
    }
    if (value === null) {
      value = "";
    }
    if (value === 0) {
      value = "";
    }
    return value;
  }
  ValidateScreenData(ScreenData) {
    return new Promise((resolve, reject) => {
      let isvalid: boolean = true;
      for (let field in ScreenData.screen.fields) {
        if (ScreenData.screen.fields[field].mandatory) {
          if (this.checkblank(ScreenData.screen.fields[field].value) === "") {
            console.log("Validation:", ScreenData.screen.fields[field].value, field)
            isvalid = false;
          }
        }
      }
      resolve(isvalid);
    })
  }
}
