import { Component, OnInit } from '@angular/core';
import {UserPageService} from "../../services/user-page.service";
import {MultilinguismService} from "../../services/multilinguism.service";

@Component({
  selector: 'app-info-user',
  templateUrl: './info-user.component.html',
  styleUrls: ['./info-user.component.css']
})
export class InfoUserComponent implements OnInit {

  constructor(public userPageService: UserPageService,
              public multilinguism: MultilinguismService) { }

  mediaInfo;
  inputAudio:MediaDeviceInfo[];
  outputAudio:MediaDeviceInfo[];

  ngOnInit(): void {
    this.inputAudio = [];
    this.outputAudio = [];
    this.loadInfo();
    console.log(this.inputAudio);
    console.log(this.outputAudio);
  }

  loadInfo(){
    let uniqueGroupIdInput = [];
    let uniqueGroupIdOutput = [];
    this.mediaInfo = navigator.mediaDevices.enumerateDevices().then(response => {
      response.forEach(elem => {
        if(elem.kind === "audioinput" && uniqueGroupIdInput.findIndex(GroupId => GroupId === elem.groupId) == -1){
          this.inputAudio.push(elem);
          uniqueGroupIdInput.push(elem.groupId);
        } else if(elem.kind === "audiooutput" && uniqueGroupIdOutput.findIndex(GroupId => GroupId === elem.groupId) == -1){
          this.outputAudio.push(elem)
          uniqueGroupIdOutput.push(elem.groupId);
        }
      })
    });
  }
}
