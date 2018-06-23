import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { MyproviderProvider } from '../../providers/myprovider/myprovider';
/**
 * Generated class for the HttpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-http',
  templateUrl: 'http.html',
})
export class HttpPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public http: Http,private provider:MyproviderProvider) {
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad HttpPage');
    //let getPara = this.navParams.get('data');  
    //console.log("getPara:"+getPara);
  }

  inputName:String;
  apiURL = this.provider.apiURL+"/http/";

  sendData(){
    console.log("sendData()");

    let data = {
      'act':'post',
      'data': this.inputName
    }
    
    this.http.post(this.apiURL,JSON.stringify(data))
        .subscribe(res => {
          let Response = res.json();
          this.provider.presentToast(Response.msg);
          console.log(Response.msg);
        });   
          

  }


}
