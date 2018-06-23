import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CamPage } from '../cam/cam';
import { FileDevPage } from '../file-dev/file-dev';
import { ScanPage } from '../scan/scan';
import { HttpPage } from '../http/http';
import { NetworkPage } from '../network/network';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  constructor(public navCtrl: NavController) {

  }

  toCamPage(){
    this.navCtrl.push(CamPage, {
      data: 'cam-para-999'
    });
  }

  toFileDevPage(){
    this.navCtrl.push(FileDevPage,{
      data: 'file-para-999'
    })
  }

  toScanPage(){
    this.navCtrl.push(ScanPage,{
       data: 'scan-para-999'
    })
  }

  toHttpPage(){
    this.navCtrl.push(HttpPage,{
      data: 'http-para-999'
   })
  }
  toNetworkPage(){
    this.navCtrl.push(NetworkPage,{
      data: 'network-para-999'
   })
  }

}
