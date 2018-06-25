import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { FileTransfer } from '@ionic-native/file-transfer';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { HttpModule } from '@angular/http';
import { Network } from '@ionic-native/network';
import { NativeStorage } from '@ionic-native/native-storage';
import { Crop } from '@ionic-native/crop';

import { MyproviderProvider } from '../providers/myprovider/myprovider';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CamPage } from '../pages/cam/cam';
import { FileDevPage } from '../pages/file-dev/file-dev';
import { ScanPage } from '../pages/scan/scan';
import { HttpPage } from '../pages/http/http';
import { NetworkPage } from '../pages/network/network';
import { StoragePage } from '../pages/storage/storage';
import { CropPage } from '../pages/crop/crop';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CamPage,
    FileDevPage,
    ScanPage,
    HttpPage,
    NetworkPage,
    StoragePage,
    CropPage,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CamPage,
    FileDevPage,
    ScanPage,
    HttpPage,
    NetworkPage,
    StoragePage,
    CropPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    File,
    FileTransfer,
    BarcodeScanner,
    Network,
    NativeStorage,
    Crop,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MyproviderProvider
  ]
})
export class AppModule {}
