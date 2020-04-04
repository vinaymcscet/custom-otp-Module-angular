import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { KeyPipe } from 'src/app/pipes/keypipe/key.pipe';
import { Config } from 'src/app/models/common-models';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss']
})
export class OtpComponent implements OnInit {
  otpForm: FormGroup;
  inputType: string;
  componentKey =
    Math.random()
      .toString(36)
      .substring(2) + new Date().getTime().toString(36);
  @Input() config: Config = {
    length: 4
  };
  inputControls: FormControl[] = new Array(this.config.length);
  constructor(private keysPipe: KeyPipe) { 
    console.log(this.config.length);
  }

  ngOnInit() {
    this.otpForm = new FormGroup({});
    for(let index=0;index<this.config.length;index++){
      this.otpForm.addControl(this.getControlName(index), new FormControl());
    }
    this.inputType = 'text';
  }

  ngAfterViewInit(): void {
    if (!this.config.disableAutoFocus) {
      const containerItem = document.getElementById(`c_${this.componentKey}`);
      if (containerItem) {
        containerItem.addEventListener('paste', (evt) => this.handlePaste(evt));
        const ele: any = containerItem.getElementsByClassName('otp-input')[0];
        if (ele && ele.focus) {
          ele.focus();
        }
      }
    }
  }

  handlePaste(e) {
    // Get pasted data via clipboard API
    let clipboardData = e.clipboardData || window['clipboardData'];
    if(clipboardData){
     var pastedData =clipboardData.getData('Text');
    }
    // Stop data actually being pasted into div
    e.stopPropagation();
    e.preventDefault();
    if (!pastedData) {
      return;
    }
    // this.setValue(pastedData);
  }

  validateOtp(){}
  private getControlName(idx) {
    return `ctrl_${idx}`;
  }
  onKeyDown($event){
    var isSpace=this.ifKeyCode($event,32)
    if (isSpace) {// prevent space
    return false;
    }
  }
  ifKeyCode(event, targetCode) {
    const key = event.keyCode || event.charCode;
    return key == targetCode ? true : false;
  }
  onKeyUp($event, inputIdx) {
    const nextInputId = this.appendKey(`otp_${inputIdx + 1}`);
    const prevInputId = this.appendKey(`otp_${inputIdx - 1}`);
    if (this.ifRightArrow($event)) {
      this.setSelected(nextInputId);
      return;
    }
    if (this.ifLeftArrow($event)) {
      this.setSelected(prevInputId);
      return;
    }
    const isBackspace = this.ifBackspaceOrDelete($event);
    if (isBackspace && !$event.target.value) {
      this.setSelected(prevInputId);
      // this.rebuildValue();
      return;
    }
    if (!$event.target.value) {
      return;
    }
    if (this.ifValidEntry($event)) {
      this.setSelected(nextInputId);
    }
    // this.rebuildValue();
  }

  appendKey(id) {
    return `${id}_${this.componentKey}`;
  }

  ifLeftArrow(event) {
    return this.ifKeyCode(event, 37);
  }

  ifRightArrow(event) {
    return this.ifKeyCode(event, 39);
  }
  
  ifBackspaceOrDelete(event) {
    return (
      event.key === 'Backspace' ||
      event.key === 'Delete' ||
      this.ifKeyCode(event, 8) ||
      this.ifKeyCode(event, 46)
    );
  }

  ifValidEntry(event) {
    const inp = String.fromCharCode(event.keyCode);
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    return (
      isMobile ||
      /[a-zA-Z0-9-_]/.test(inp) ||
      (this.config.allowKeyCodes &&
        this.config.allowKeyCodes.includes(event.keyCode)) ||
      (event.keyCode >= 96 && event.keyCode <= 105)
    );
  }

  
  setSelected(eleId) {
    this.focusTo(eleId);
    const ele: any = document.getElementById(eleId);
    if (ele && ele.setSelectionRange) {
      setTimeout(() => {
        ele.setSelectionRange(0, 1);
      }, 0);
    }
  }

  
  focusTo(eleId) {
    const ele: any = document.getElementById(eleId);
    if (ele) {
      ele.focus();
    }
  }
}
