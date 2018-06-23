import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { MyproviderProvider } from '../../providers/myprovider/myprovider';
/**
 * Generated class for the FileDevPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-file-dev',
  templateUrl: 'file-dev.html',
})
export class FileDevPage {
  imageURI:any;
  imageFileName:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private transfer: FileTransfer,private camera: Camera,public loadingCtrl: LoadingController,public toastCtrl: ToastController,private provider: MyproviderProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FileDevPage');
    console.log(this.imageURI);
  }
  
  apiURL = this.provider.apiURL;
   
  getImage(){
    const options : CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }
    this.camera.getPicture(options).then((imageData)=>{
      this.imageURI = imageData;
    },(err)=> {
      console.log(err);     
      this.presentToast(err); 
    })
  }

  uploadFile(){
      if(this.imageURI!=undefined){
          let loader = this.loadingCtrl.create({
            content:"Uploading.."
          })
          loader.present();
          const fileTransfer: FileTransferObject = this.transfer.create();
          
          let fileName = this.createFileName();
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
                  this.provider.presentToast(data);//show object
                  
                  this.imageFileName = pathUpload+"/images/"+fileName;
                  loader.dismiss();
              },(err) => {
                  console.log(err);
                  loader.dismiss();
                  this.presentToast(err);
              });
        }else{
          this.provider.presentToast('Please GET IMAGE First');
        }
    }

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
    private createFileName(){
      var d = new Date(),
      n = d.getTime(),
      newFileName=n+".jpg";
      return newFileName;
    }

}
