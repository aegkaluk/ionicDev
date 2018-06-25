import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { Crop } from '@ionic-native/crop';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { MyproviderProvider } from '../../providers/myprovider/myprovider';

/**
 * Generated class for the CropPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-crop',
  templateUrl: 'crop.html',
})
export class CropPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private crop:Crop,private camera:Camera,private provider:MyproviderProvider,public loadingCtrl: LoadingController,private transfer: FileTransfer) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CropPage');
  }
  
  imageURICrop:any;
  apiURL = this.provider.apiURL;
  imageURIuploaded:any;

   // Return a promise to catch errors while loading image
  selectImage(): Promise<any> {
    const options : CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }

    return this.camera.getPicture(options)
        .then((imageData)=>{
          return this.crop.crop(imageData, { quality: 100, targetWidth: -1, targetHeight: -1 });
      })

      .then((path) => {
          // path looks like 'file:///storage/emulated/0/Android/data/com.foo.bar/cache/1477008080626-cropped.jpg?1477008106566'
          console.log('Cropped Image Path!: ' + path);
          this.provider.presentToast('Cropped Image Path!: ' + path);
          this.imageURICrop = path;
          return path;
      })
      .catch((e) => {
          console.log(e)
          this.provider.presentToast(e);
       });
  }

  onTakePicture(): Promise<any>  {
    const options: CameraOptions = {
      quality: 50,      
      saveToPhotoAlbum:true,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType:this.camera.MediaType.PICTURE
    }
    return this.camera.getPicture(options)
        .then((imageData)=>{
          //let image = 'data:image/jpeg;base64,'+imageData;
          this.provider.presentToast(imageData);
          return this.crop.crop(imageData, { quality: 100, targetWidth: -1, targetHeight: -1 });
        })
        .then((path) => {
          console.log('Cropped Image Path!: ' + path);
          this.provider.presentToast('Cropped Image Path!: ' + path);
          this.imageURICrop = path;
          return path;
        })
        .catch((e) => {
          console.log(e)
          this.provider.presentToast(e);
        });   
  }

  uploadFile(){
    if(this.imageURICrop!=undefined){
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
        
        fileTransfer.upload(this.imageURICrop,pathUpload,options)
            .then((data) => {
                console.log(data+" Uploaded Successfully");
                this.provider.presentToast(data);//show object                
                this.imageURIuploaded = pathUpload+"/images/"+fileName;
                loader.dismiss();
            },(err) => {
                console.log(err);
                loader.dismiss();
                this.provider.presentToast(err);
            });
      }else{
        this.provider.presentToast('Select or Take image ?');
      }
    }


}
