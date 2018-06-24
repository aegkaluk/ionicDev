import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ZBar, ZBarOptions } from '@ionic-native/zbar';
import { MyproviderProvider } from '../../providers/myprovider/myprovider';
/**
 * Generated class for the ZbarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-zbar',
  templateUrl: 'zbar.html',
})
export class ZbarPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private zbar:ZBar,private provider:MyproviderProvider){ 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ZbarPage');
  }

  zbarResult:string;

  zbarScan(){
    let options: ZBarOptions = {
      flash: 'off',
      drawSight: false
    };

    this.zbar.scan(options)
      .then(result => {
        this.zbarResult = result;
        this.provider.presentToast('result: '+result);
        console.log(result);

      })
      .catch(error => {
        this.provider.presentToast(error);
        console.log(error);
      });
  
  }

}
