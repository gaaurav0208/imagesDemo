import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ImageService } from "../../services/image.service";
import { IonSlides } from "@ionic/angular";
@Component({
  selector: "app-detail",
  templateUrl: "./detail.page.html",
  styleUrls: ["./detail.page.scss"],
})
export class DetailPage implements OnInit {
  url: string;
  index: number;
  @ViewChild(IonSlides) slides: IonSlides;
  private sub: any;
  constructor(
    private route: ActivatedRoute,
    private imageService: ImageService
  ) {}

  ngOnInit() {
    this.imageService.getImages().subscribe((images) => {
      this.images = images.pugs;
      this.sub = this.route.queryParams.subscribe((params) => {
        // Defaults to 0 if no query param provided.
        this.index = params["index"];
        this.slides.slideTo(this.index, 500);
      });
    });
  }
}
