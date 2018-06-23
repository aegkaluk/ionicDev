import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CamPage } from './cam';

@NgModule({
  declarations: [
    CamPage,
  ],
  imports: [
    IonicPageModule.forChild(CamPage),
  ],
})
export class CamPageModule {}
