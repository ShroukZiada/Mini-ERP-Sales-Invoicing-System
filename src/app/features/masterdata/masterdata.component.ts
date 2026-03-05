import { Component, OnInit } from '@angular/core';
import { MasterDataRoutingModule } from "./master-data-routing.module";

@Component({
  selector: 'app-masterdata',
  templateUrl: './masterdata.component.html',
  standalone: true,
  styleUrls: ['./masterdata.component.css'],
  imports: [MasterDataRoutingModule]
})
export class MasterdataComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
