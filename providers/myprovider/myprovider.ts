import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';
//import { HttpClient } from '@angular/common/http';
/*
  Generated class for the MyproviderProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MyproviderProvider {

  constructor(public toastCtrl: ToastController) { //public http: HttpClient
    console.log('Hello My Provider loaded.');
  }

    public apiURL = "http://cloud.phuket-it.com/api/dev";

    presentToast(msg) {
      let toast = this.toastCtrl.create({        
        message: msg,
        duration: 3000,
        position: 'bottom'
      });
    
      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
      });
    
      toast.present();
    }

    createFileName(){
      var d = new Date(),
      n = d.getTime(),
      newFileName=n+".jpg";
      return newFileName;
    }
}
