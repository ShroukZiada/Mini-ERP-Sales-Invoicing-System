import { CommonModule } from '@angular/common';
import { Component, HostListener, Input, TemplateRef } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { MatTabsModule } from '@angular/material/tabs';
@Component({
  selector: 'app-toggle-div-top.component',
  standalone: true,
  imports: [CommonModule, MatTabsModule, TranslateModule],
  templateUrl: './toggle-div-top.component.component.html',
  styleUrl: './toggle-div-top.component.component.css'
})

export class ToggleDivTopComponentComponent {
  activetabindex: number = 0;
  @Input() tabs: any[] = [];
  @Input() templates: TemplateRef<any>[] = [];
}