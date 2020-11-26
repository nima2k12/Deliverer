import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-access-denied',
  templateUrl: './access-denied.component.html',
  styleUrls: ['./access-denied.component.scss']
})
export class AccessDeniedComponent implements OnInit {

  msg = '';
  isMsg = false;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(params => {

      const msg = params.msg;
      if (msg === undefined) {
        this.msg = '';
        this.isMsg = false;
      } else {

        if (msg === 'deactive') {
          this.msg = 'your account deactivated';
        } else {
          this.msg = msg;
        }

        this.isMsg = true;
      }
    });
  }

}
