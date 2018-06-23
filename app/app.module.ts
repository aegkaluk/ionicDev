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

import { MyproviderProvider } from '../providers/myprovider/myprovider';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CamPage } from '../pages/cam/cam';
import { FileDevPage } from '../pages/file-dev/file-dev';
import { ScanPage } from '../pages/scan/scan';
import { HttpPage } from '../pages/http/http';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CamPage,
    FileDevPage,
    ScanPage,
    HttpPage,
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
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    File,
    FileTransfer,
    BarcodeScanner,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MyproviderProvider
  ]
})
export class AppModule {}
