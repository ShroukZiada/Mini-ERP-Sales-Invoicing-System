import { CommonModule } from '@angular/common';
import { Component, Input, TemplateRef } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-toggle-div-top',
  standalone: true,
  imports: [CommonModule, MatTabsModule, TranslateModule],
  templateUrl: './toggle-div-top.component.html',
  styleUrl: './toggle-div-top.component.css'
})
export class ToggleDivTopComponent {


  activetabindex: number = 0;
  @Input() tabs: any[] = [];
  @Input() templates: TemplateRef<any>[] = []
  @Input() tabsPositionBottom: boolean = false;
  ngOnInit(): void {
    this.activetabindex = 0;
  }
  toggleDivs(tab: string) {
    this.activetabindex = this.tabs.indexOf(tab);

  }

  ngAfterViewInit(): void {
    // console.log(this.tabs);

  }

}
