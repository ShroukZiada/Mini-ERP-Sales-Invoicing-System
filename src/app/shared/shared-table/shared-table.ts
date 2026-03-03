import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-shared-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './shared-table.html',
  styleUrl: './shared-table.css',
})
export class SharedTable implements OnChanges {
  @Input() title: string = 'List';
  @Input() columns: { header: string, field: string }[] = [];
  @Input() data: any[] = [];
  @Input() showAddButton: boolean = true;
  @Input() showActions: boolean = true;
  @Input() pageSize: number = 5;

  @Output() add = new EventEmitter<void>();
  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
  @Output() view = new EventEmitter<any>();

  searchTerm: string = '';
  filteredData: any[] = [];
  currentPage: number = 1;

  ngOnChanges() {
    this.filteredData = [...this.data];
  }

  onSearch() {
    const term = this.searchTerm.toLowerCase();
    this.filteredData = this.data.filter(item =>
      Object.values(item).some(val =>
        String(val).toLowerCase().includes(term)
      )
    );
    this.currentPage = 1;
  }

  get paginatedData() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredData.slice(start, start + this.pageSize);
  }

  get totalPages() {
    return Math.ceil(this.filteredData.length / this.pageSize);
  }

  changePage(page: number) {
    this.currentPage = page;
  }
}

