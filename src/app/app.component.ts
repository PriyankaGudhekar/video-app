import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Service } from './Services/app.services';
import { ToastConfig, Toaster, ToastType } from "ngx-toast-notifications";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent implements OnInit {
  title = 'video-app';
  name = 'Angular 6';

  showAddPage: boolean = false;
  showVideo: boolean = false;

  video_name: string = "";
  video_desc: string = "";
  video_url: string = "";

  video_name_err: string = "";
  video_desc_err: string = "";
  video_url_err: string = "";

  safeSrc: SafeResourceUrl;
  videoList: []
  constructor(private sanitizer: DomSanitizer, private service: Service, private toaster: Toaster) {
    service.getData("app/getVideos").subscribe((result) => {

      if (result.status) {
        this.videoList = result.data
      }
      else {
        "No video found"
      }
    })
  }

  ngOnInit() { }

  addNew() {
    this.showAddPage = true;
    this.showVideo = false;
  }

  cancel() {
    this.showAddPage = false;
    this.video_desc_err = "";
    this.video_name_err = "";
    this.video_url_err = "";
  }

  nameCheck() {
    // console.log(this.video_name, "this.video_name---")
    if (this.video_name == "" || this.video_name == undefined || this.video_name == null) {
      this.video_name_err = "Enter Video Name"
      return false
    } else {
      this.video_name_err = ""
      return true
    }
  }

  descCheck() {
    // console.log(this.video_desc, "this.video_desc---")
    if (this.video_desc == "" || this.video_desc == undefined || this.video_desc == null) {
      this.video_desc_err = "Enter Video Description"
      return false
    } else {
      this.video_desc_err = ""
      return true
    }
  }

  urlCheck() {
    // console.log(this.video_url, "this.video_url---")
    if (this.video_url == "" || this.video_url == undefined || this.video_url == null) {
      this.video_url_err = "Enter Video URL"
      return false
    } else {
      this.video_url_err = ""
      return true
    }
  }

  saveVideo() {

    let nameData = this.nameCheck()
    let descData = this.descCheck()
    let urlData = this.urlCheck()
    if (nameData && descData && urlData) {
      this.service.postData("app/addVideo", {
        video_name: this.video_name,
        video_desc: this.video_desc,
        video_url: this.video_url
      }).subscribe((result) => {
        // console.log(result, "insert check---")
        let res
        if (result.status) {
          res = "Success"
        }
        else {
          res = "Failed"
        }

        this.toaster.open({
          text: result.data,
          caption: res,
          type: "secondary",
          position: "top-right",
          duration: 1000,
        });

        setTimeout(() => {
          window.location.reload()
        }, 1000);

      })
    }

  }

  videoClicked(vidDetails) {
    // console.log(vidDetails, "vidDetails")
    if (vidDetails.vid_url.includes("watch?v=")) {
      vidDetails.vid_url = vidDetails.vid_url.replace("watch?v=", "embed/")
    }
    // console.log(vidDetails, "vidDetails after")

    this.safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(vidDetails.vid_url);
    this.showVideo = true;
    this.showAddPage = false;
  }

  showToast() {
    const type = "primary";
    this.toaster.open({
      text: "abc",
      caption: type + ' notification',
      type: type,
    });
  }

}
