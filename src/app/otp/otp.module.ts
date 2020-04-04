import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OtpComponent } from './component/otp.component';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { KeyPipe } from 'src/app/pipes/keypipe/key.pipe';
import { NumberOnlyModule } from 'src/app/directives/number-only/number-only.module';

const routes: Routes = [
  {path: '', component: OtpComponent }
];

const CUSTOM_MODULES = [ReactiveFormsModule]
@NgModule({
  declarations: [OtpComponent, KeyPipe],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ...CUSTOM_MODULES,
    NumberOnlyModule
  ],
  providers: [KeyPipe]
})
export class OtpModule { }
