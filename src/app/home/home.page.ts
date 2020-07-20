import { Component, OnInit, ViewChild } from "@angular/core";
import { ImageService } from "../../services/image.service";
import { IonInfiniteScroll, NavController } from "@ionic/angular";
import { Router } from "@angular/router";
@Component({
  selector: "page-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  galleryType = "regular";
  images: any[];
  list: any;
  length = 0;
  lastIndex: any;
  constructor(
    private router: Router,
    private imageService: ImageService,
    public navCtrl: NavController
  ) { }

  ngOnInit() {
    this.getImages();
  }

  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      if (this.lastIndex + 9 < this.images.length) {
        this.list.push(...this.images.slice(this.lastIndex, this.lastIndex + 9));
      }
      else {
        this.list.push(...this.images.slice(this.lastIndex, this.images.length));
      }
      this.lastIndex += 9;
      event.target.complete();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      if (this.list.length == 50) {
        event.target.disabled = true;
      }
    }, 500);

  }

  getImages() {
    this.imageService.getImages().subscribe((images) => {
      this.images = images.pugs;
      console.log(this.images);
      this.list = this.images.slice(0, 9);
      this.lastIndex = this.list.length;
    });
  }

  gotoDetail(image, index) {
    console.log(image);
    this.router.navigate(["/detail"], { queryParams: { url: image, index } });
  }
}
