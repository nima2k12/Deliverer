import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { GeoOrderModel, IGeoOrderModel } from '../../../../data/model/deliverer/GeoOrderModel';
import { G } from '../../../../core/common/G';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  p = `123
  
  456`;
  str: string[];
  url: SafeResourceUrl;
  domain = this.domSanitizer
    .bypassSecurityTrustResourceUrl('https://maps.google.com/maps?q=38.0633812%2C46.393843&t=&z=15&ie=UTF8&iwloc=&output=embed');

  constructor(private domSanitizer: DomSanitizer) { }

  ngOnInit(): void {

    //this.p = this.p.replace(/(?:\r\n|\r|\n)/g, '<br>');

    this.url = this.domSanitizer
      .bypassSecurityTrustResourceUrl
      (`https://www.google.fr/maps/dir/'43.6667,7.15'/'43.7040875,7.2544981'`);
  }

  onClick() {

    this.domain = this.domSanitizer
      .bypassSecurityTrustResourceUrl('https://maps.google.com/maps?q=38.0033812%2C46.393843&t=&z=15&ie=UTF8&iwloc=&output=embed');
  }
}
