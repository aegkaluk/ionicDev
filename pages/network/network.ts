import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Network } from '@ionic-native/network';
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

  constructor(public navCtrl: NavController, public navParams: NavParams,private network:Network,private provider:MyproviderProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NetworkPage');
    this.handleNetwork();
  }
  ionViewDidLeave(){
    console.log('ionViewDidLeave NetworkPage');
    this.handleNetworkClose();
  }
  netStat:string;
  disconnectSubscription:any;
  connectSubscription:any;  

  handleNetwork(){
      this.provider.presentToast("handleNetwork():started");

      this.disconnectSubscription = this.network.onDisconnect()
            .subscribe(() =>{
              this.provider.presentToast('Disconnection Detected. :-(');
              this.netStat = "Disconnected ?";
      });

      this.connectSubscription = this.network.onConnect()
          .subscribe(() => {              
              this.provider.presentToast('Connection Detected -> '+this.network.type);
              this.netStat = "Connected !";
      });
  }

  handleNetworkClose(){
    this.connectSubscription.unsubscribe();
    this.disconnectSubscription.unsubscribe();
  }

}
