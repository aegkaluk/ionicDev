import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Http } from '@angular/http';
/**
 * Generated class for the StoragePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-storage',
  templateUrl: 'storage.html',
})
export class StoragePage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private nativeStorage:NativeStorage,public http:Http) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StoragePage');
  }

  setStorage(obj){
    //var obj = {name: "NativeStorage", author: "GillesCallebaut"};
    this.nativeStorage.setItem('myObj', obj )
    .then(() =>{ 
      console.log('Stored item!')
      },error => console.error('Error storing item', error) );
  }
  getStorage(){
    this.nativeStorage.getItem('myObj')
    .then(data => {
      console.log(data)
    },error => console.error(error) );
  }

  loadData(){
    console.log("loadData()");
    let path = 'http://cloud.phuket-it.com/api/vh/vehicle/';
    let data = {
      'act':'getType'
    }
    this.http.post(path,JSON.stringify(data))
        .subscribe(res => {
          let Response = res.json();
          this.setStorage(Response.objSelect);
          console.log(Response.objSelect);
        });   
  }
  showData(){
    console.log("showData()");
    this.getStorage();
  }


}
