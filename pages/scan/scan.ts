import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { MyproviderProvider } from '../../providers/myprovider/myprovider';

/**
 * Generated class for the ScanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-scan',
  templateUrl: 'scan.html',
})
export class ScanPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public barcodeScanner: BarcodeScanner,private provider:MyproviderProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ScanPage');
    //let getPara = this.navParams.get('data');  
    //console.log("getPara:"+getPara);
  }

  scanResult:String;

  scanQR(){
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
      this.scanResult = barcodeData.text;
      this.provider.presentToast("Result Scan:"+barcodeData.text);

     }).catch(err => {
         console.log('Error', err);
         this.provider.presentToast("Error:"+err);
     });
  }



}
