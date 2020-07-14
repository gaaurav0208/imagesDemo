import { Component, OnInit, } from '@angular/core';
import { ImageService } from '../../services/image.service';
import { IonInfiniteScroll, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'page-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
  galleryType = 'regular';
  images: any[];
  list: any;
  length = 0;
  infiniteScroll: any;
   constructor(private router: Router, private imageService: ImageService, public navCtrl: NavController) {


  }


  private appendItems(number) {
    console.log('length is', length);
    const originalLength = length;
    for (var i = 0; i < number; i++) {
      const el = document.createElement('ion-item');
      el.innerHTML = `
        <ion-col col-6 col-md-4 col-xl-3>
          <img src="${this.images[i]}" (click)="gotoDetail(${this.images[i]})">
        </ion-col>
      `;
      this.list.appendChild(el);
      this.length++;
    }
  }

  private wait(time) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, time);
    });
  }

  ngOnInit() {
    this.getImages();
  }

  doInfinite(): Promise<any> {
    console.log('Begin async operation');

    return new Promise((resolve) => {
      setTimeout(() => {
        for (var i = 0; i < 10; i++) {
          this.images.push( this.images[i] );
        }

        console.log('Async operation has ended');
        resolve();
      }, 500);
    })
  }

  getImages() {
    this.imageService.getImages()
      .subscribe(images => {
        this.images = images.pugs;
        console.log(this.images);
      });
  }

  getUrl(image) {
    return "url(" + image + ")";
  }

  gotoDetail(image) {
    console.log(image);
    this.router.navigate(['/detail'], { queryParams: { url: image } });

  }
}
