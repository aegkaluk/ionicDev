import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { MyproviderProvider } from '../../providers/myprovider/myprovider';

/**
 * Generated class for the CamPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cam',
  templateUrl: 'cam.html',
})
export class CamPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private camera : Camera,private domSanitizer:DomSanitizer,private loadingCtrl:LoadingController,private transfer: FileTransfer,private provider:MyproviderProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CamPage');
    console.log(this.image);
  }

  private image: string;
  apiURL = this.provider.apiURL;

  onTakePicture(){
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType:this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData)=>{
      this.image = 'data:image/jpeg;base64,'+imageData;
    },(err)=>{
      console.log(err);
    })
   
  }

  uploadFile(){
      if(this.image!=undefined){
        let loader = this.loadingCtrl.create({
          content:"Uploading.."
        })
        loader.present();
        const fileTransfer: FileTransferObject = this.transfer.create();
        
        let fileName = this.provider.createFileName();
        console.log(fileName);

        let options: FileUploadOptions = {
          fileKey: 'ionicfile', //php match $_FILES["ionicfile"]
          fileName: fileName,
          chunkedMode: false,
          mimeType: 'image/jpeg',
          headers: {}
        }

        let pathUpload = this.apiURL+"/upload/";
        
        fileTransfer.upload(this.image,pathUpload,options)
            .then((data) => {
                console.log(data+" Uploaded Successfully");       
                this.provider.presentToast("Response msg: "+data['msg']);     
                //this.image = pathUpload+"/images/"+fileName;
                loader.dismiss();
            },(err) => {
                console.log(err);
                loader.dismiss();
                this.provider.presentToast(err);
            });
    
        }else{
            this.provider.presentToast('Please Take Picture First');
        }
    }
}