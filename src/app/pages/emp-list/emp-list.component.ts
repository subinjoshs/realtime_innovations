import { ChangeDetectionStrategy, Component, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageTitleComponent } from 'src/app/components/page-title/page-title.component';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Router } from '@angular/router';

@Component({
  selector: 'app-emp-list',
  standalone: true,
  imports: [CommonModule, PageTitleComponent],
  templateUrl: './emp-list.component.html',
  styleUrls: ['./emp-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmpListComponent implements OnInit {
  public empDetailsList: any;
  public swipedIndex: number | null = null;
  public p_swipedIndex: number | null = null;
  public isMenuOpen: number | null = null; // Track which employee menu is open
  deviceType: any

  constructor(private renderer: Renderer2, private el: ElementRef, private deviceService: DeviceDetectorService, private router: Router) { }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const isClickInside = target.closest('.swipeable-item');
    const pre_isClickInside = target.closest('.p_swipeable-item');
    if (!isClickInside || pre_isClickInside) {
      this.removecurrentClass();
      this.removePreviousclass();
    }
  }

  removecurrentClass() {
    const allItems = this.el.nativeElement.querySelectorAll('.swipeable-item');
    allItems.forEach((item: HTMLElement) => {
      this.renderer.removeClass(item, 'swiped');
      this.swipedIndex = null;
    });

  }

  removePreviousclass() {
    const p_alltimes = this.el.nativeElement.querySelectorAll('.p_swipeable-item');
    p_alltimes.forEach((item: HTMLElement) => {
      this.renderer.removeClass(item, 'swiped');
      this.p_swipedIndex = null;
    });
  }

  ngOnInit(): void {
    this.deviceType = this.deviceService?.['deviceType']
    if (localStorage.getItem('empDetails')) {
      this.empDetailsList = JSON.parse(localStorage.getItem('empDetails'));
    }
  }

  get currentEmployess() {
    return this.empDetailsList.filter(res => res.endDate === '');
  }

  get previousEmployee() {
    return this.empDetailsList.filter(res => res.endDate !== '');
  }

  toggleMenu(index: number) {
    this.isMenuOpen = this.isMenuOpen === index ? null : index;
  }

  onTouchMove(e, index?) {
    this.swipedIndex = index;
    this.moveSlider('.swipeable-item');
    this.removePreviousclass();
  }

  onPreviousdliderMove(e, index) {
    this.p_swipedIndex = index;
    this.moveSlider('.p_swipeable-item');
    this.removecurrentClass();
    document.getElementById('edit_icon').classList.add('dly_edt')
  }

  moveSlider(cls) {
    const element = (event.target as HTMLElement).closest(cls);
    if (element) {
      this.renderer.addClass(element, 'swiped');
      const allItems = this.el.nativeElement.querySelectorAll(cls);
      allItems.forEach((item: HTMLElement) => {
        if (item !== element) {
          this.renderer.removeClass(item, 'swiped');
        }
      });
    }
  }

  deleteData(id?) {
    this.empDetailsList = this.empDetailsList.filter((employee: any) => employee.emp_id !== id);
    localStorage.setItem('empDetails', JSON.stringify(this.empDetailsList));
  }
  editData(dt?) {
    localStorage.setItem('editJson', JSON.stringify(dt));
    this.router.navigateByUrl('emp-details')
  }
}
