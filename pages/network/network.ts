import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Network } from '@ionic-native/network';
import { NetworkInterface } from '@ionic-native/network-interface';
import { MyproviderProvider } from '../../providers/myprovider/myprovider';


/**
 * Generated class for the NetworkPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-network',
  templateUrl: 'network.html',
})
export class NetworkPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private network:Network,private networkInterface:NetworkInterface,private provider:MyproviderProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NetworkPage');
  }
  netType:string;
  netIP:string;
  netSubnet:string;
  
  getNetinfo(){
      console.log("getNetinfo()");
      // watch network for a disconnect
      let disconnectSubscription = this.network.onDisconnect().subscribe(()=>{
        console.log('network was disconnected :-(');
      
      });
      //stop disconnect watch
      disconnectSubscription.unsubscribe();
      
      let connectSubscription = this.network.onConnect().subscribe(()=>{
          console.log('network connected! - '+this.network.type);

          this.netType = this.network.type;
          if(this.network.type == 'wifi'){
              this.networkInterface.getWiFiIPAddress().then(result => {
                console.log(result);
                this.netIP = result['ip'];
                this.netSubnet = result['subnet'];
                this.provider.presentToast('ip:'+result['ip']+' subnet:'+result['subnet']);
              });
              console.log('connected by wifi');            
          }else{
              this.networkInterface.getCarrierIPAddress().then(result=>{
                  console.log(result);
                  this.netIP = result['ip'];
                  this.netSubnet = result['subnet'];
                  this.provider.presentToast('ip:'+result['ip']+' subnet:'+result['subnet']);
              })

          }

      })      
      // stop connect watch
      connectSubscription.unsubscribe();

  }

}
