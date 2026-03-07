import { CommonModule } from '@angular/common';
import { Component, HostListener, Input, signal, TemplateRef, WritableSignal } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { MatTabsModule } from '@angular/material/tabs';
@Component({
  selector: 'app-toggle-div-top.component',
  standalone: true,
  imports: [CommonModule, MatTabsModule, TranslateModule],
  templateUrl: './toggle-div-top.component.component.html',
  styleUrl: './toggle-div-top.component.component.css',
  exportAs: 'appToggleDivTop'  // ✅ هذا الاسم مهم

})



export class ToggleDivTopComponentComponent {


}