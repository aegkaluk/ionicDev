import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams,private camera : Camera,private loadingCtrl:LoadingController,private transfer: FileTransfer,private provider:MyproviderProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CamPage');
  }

  apiURL = this.provider.apiURL;
  imageURI:any;

  onTakePicture(){
    const options: CameraOptions = {
      quality: 50,
      saveToPhotoAlbum:true,
      allowEdit: true,
      //destinationType: this.camera.DestinationType.DATA_URL,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType:this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options)
        .then((imageData)=>{
          //this.image = 'data:image/jpeg;base64,'+imageData;
          this.imageURI = imageData; //use options destinationType: this.camera.DestinationType.FILE_URI,
        })
        .catch((e) => {
          console.log(e)
          this.provider.presentToast(e);
        });   
   
  } 

  uploadFile(){
      if(this.imageURI!=undefined){
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
        
        fileTransfer.upload(this.imageURI,pathUpload,options)
            .then((data) => {
                console.log(data+" Uploaded Successfully");       
                this.provider.presentToast(data);     
                //this.imageUploaded = pathUpload+"/images/"+fileName;
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
