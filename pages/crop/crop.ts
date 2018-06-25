import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Crop } from '@ionic-native/crop';
import { Camera, CameraOptions } from '@ionic-native/camera';
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

  constructor(public navCtrl: NavController, public navParams: NavParams,private crop:Crop,private camera:Camera,private provider:MyproviderProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CropPage');
  }
  
  imageFileName:any;
  imageFileNameCrop:any;

   // Return a promise to catch errors while loading image
  selectImage(): Promise<any> {
    const options : CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }

    return this.camera.getPicture(options)
        .then((imageData)=>{
          this.imageFileName = imageData;
          return this.crop.crop(imageData, { quality: 100, targetWidth: -1, targetHeight: -1 });
      })

      .then((path) => {
          // path looks like 'file:///storage/emulated/0/Android/data/com.foo.bar/cache/1477008080626-cropped.jpg?1477008106566'
          console.log('Cropped Image Path!: ' + path);
          this.provider.presentToast('Cropped Image Path!: ' + path);
          this.imageFileNameCrop = path;
          return path;
      })
      .catch((e) => {
          console.log(e)
          this.provider.presentToast(e);
       });
  }


}
