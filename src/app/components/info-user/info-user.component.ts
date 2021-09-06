import { Component, OnInit } from '@angular/core';
import {UserPageService} from "../../services/user-page.service";
import {MultilinguismService} from "../../services/multilinguism.service";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-info-user',
  templateUrl: './info-user.component.html',
  styleUrls: ['./info-user.component.css']
})
export class InfoUserComponent implements OnInit {

  constructor(public userPageService: UserPageService,
              public multilinguism: MultilinguismService,
              fb: FormBuilder) {
    this.audioDevices = fb.group({
      inputAudio: this.inputAudioControl,
      outputAudio: this.outputAudioControl,
    });
  }

  mediaInfo;
  inputAudio:MediaDeviceInfo[];
  outputAudio:MediaDeviceInfo[];
  audioDevices: FormGroup;
  inputAudioControl = new FormControl();
  outputAudioControl= new FormControl();

  ngOnInit(): void {
    this.inputAudio = [];
    this.outputAudio = [];
    this.loadInfo();
    this.chooseAudioOutput(this.outputAudioControl.value);
    console.log(this.inputAudio, this.outputAudio)
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

  chooseAudioOutput(value){
    console.log('outputAudio',value);
    const promise = navigator.mediaDevices.getUserMedia({audio: true, video: false});
    const perm = navigator.permissions.query({name: "microphone"});
    const audio = <HTMLAudioElement & { setSinkId (deviceId: string): void }> new Audio();
    if(value != null){
      audio.setSinkId(String(value));
    }
  }

  chooseAudioinput(value: any) {
    const perm = navigator.permissions.query({name: "microphone"}).then((perm)=>{
      console.log('perm pour le micro :',perm.state);
    });
    if(value != null){
      // a verifier
      navigator.mediaDevices.getUserMedia({audio: {
        deviceId: value
        }});
    }
  }
}
