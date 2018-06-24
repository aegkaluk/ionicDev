import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Http } from '@angular/http';
import { MyproviderProvider } from '../../providers/myprovider/myprovider';
//import { NativeStorage } from '@ionic/storage';
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

  constructor(public navCtrl: NavController, public navParams: NavParams,private nativeStorage:NativeStorage,public http:Http,private provider:MyproviderProvider) {
  }

  dataStorage:any;

  ionViewDidLoad() {
    console.log('ionViewDidLoad StoragePage');
  }
  ionViewDidLeave (){
    this.clearData();
  }

  setStorage(obj){
    //var obj = {name: "NativeStorage", author: "GillesCallebaut"};
    this.nativeStorage.setItem('myObj', obj )
    .then(() =>{ 
      console.log('Stored item!');
      this.provider.presentToast("Stored item");
      },error => {
        console.error('Error storing item', error) 
        this.provider.presentToast(error);
      });
  }
  getStorage(){
    this.nativeStorage.getItem('myObj')
    .then(data => {
      console.log(data);
      this.provider.presentToast(data);
      this.dataStorage = data;
    },error =>{ 
      console.error(error) 
      this.provider.presentToast(error);
    });
  }

  setData(){
    console.log("loadData()");
    var obj = [{id:'1',name:'item1'},{id:'2',name:'item2'},{id:'3',name:'item3'}];
    this.setStorage(obj);
  }
  getData(){
    console.log("showData()");
    this.getStorage();
  }
  clearData(){
    //this.nativeStorage.clear();
    this.nativeStorage.remove('myObj')
    .then(()=>{
      console.log("removed storage");
      this.provider.presentToast("Removed Stored");
    })
  }


}
