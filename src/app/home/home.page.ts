import { Component, OnInit, ViewChild, } from '@angular/core';
import { ImageService } from '../../services/image.service';
import { IonInfiniteScroll, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'page-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  galleryType = 'regular';
  images: any[];
  list: any;
  length = 0;
  constructor(private router: Router, private imageService: ImageService, public navCtrl: NavController) {
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

  loadData(event){
    this.imageService.getImages().subscribe(data => {
      data.pugs.forEach(element => {
        this.images.push(element);
      });
      event.target.complete();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      if (this.images.length > 50) {
        event.target.disabled = true;
      }
    });
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
