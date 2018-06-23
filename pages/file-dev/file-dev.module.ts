import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FileDevPage } from './file-dev';

@NgModule({
  declarations: [
    FileDevPage,
  ],
  imports: [
    IonicPageModule.forChild(FileDevPage),
  ],
})
export class FileDevPageModule {}
