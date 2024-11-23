import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageTitleComponent } from 'src/app/components/page-title/page-title.component';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import * as moment from 'moment';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UtilitiesService } from 'src/app/providers/utilities.service';
import { Router } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-emp-form',
  standalone: true,
  imports: [CommonModule, PageTitleComponent, NgxDaterangepickerMd, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatSelectModule],
  templateUrl: './emp-form.component.html',
  styleUrls: ['./emp-form.component.css']
})
export class EmpFormComponent {
  customStartRanges: any = {
    'Today': [this.calculateNextDays(0)],
    'Next Monday': [this.calculateNextMonday()],
    'Next Tuesday': [this.calculateNextTuesday()],
    'After 1 Week': [this.calculateAfterOneWeek()],
  };
  storedData: any;
  title: any = 'Add Employee Details';
  calculateNextDays(days: number) {
    let start = moment().add(1, 'day').startOf('day');
    return start['_d']
  }

  calculateNextMonday() {
    let nextMonday = moment().day(8);
    return nextMonday['_d'];
  }

  calculateNextTuesday() {
    let nextTuesday = moment().day(9);
    return nextTuesday['_d']
  }
  calculateAfterOneWeek() {
    let start = moment().add(7, 'days').startOf('day');
    return start['_d']
  }
  customEndRanges: any = {
    'No date': [this.calculateNextDays(0)],
    'Today': [this.calculateNextDays(0)],
  }

  public empForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private utilities: UtilitiesService, private router: Router) {
    this.empForm = this.formBuilder.group({
      'empName': new FormControl('', [Validators.required]),
      'role': new FormControl('', [Validators.required]),
      'startDate': new FormControl('', [Validators.required]),
      'endDate': new FormControl('')
    })
    this.storedData = localStorage.getItem('editJson');
    this.storedData = JSON.parse(this.storedData)
    let data = this.storedData
    if (this.storedData) {
      this.title = 'Edit Employee Details'
      this.empForm.controls?.['empName'].patchValue(data?.empName)
      this.empForm.controls?.['role'].patchValue(data?.role)
      this.empForm.controls?.['startDate'].patchValue(data?.startDate)
      this.empForm.controls?.['endDate'].patchValue(data?.endDate)
    }
  }
  formSubmit(empid?) {
    if (this.empForm.valid) {
      let details = {
        'empName': this.empForm.controls['empName'].value,
        'role': this.empForm.controls['role'].value,
        'startDate': this.dateFormater(this.empForm.controls?.['startDate'].value?.['startDate']?.['$d']),
        'endDate': this.dateFormater(this.empForm.controls?.['endDate']?.value?.['endDate']?.['$d']),
        'emp_id': empid ? empid : this.setEmployeddId()
      }
      this.utilities.pushData(details, empid);
      this.router.navigateByUrl('');
    } else {
      alert()
    }
  }
  clrForm() {
    this.empForm.reset();
  }
  dateFormater(dateStr?) {
    if (dateStr) {
      const dateObj = new Date(dateStr);
      const options: any = { day: '2-digit', month: 'short', year: 'numeric' };
      return dateObj.toLocaleDateString('en-IN', options);
    } return ''
  }
  setEmployeddId() {
    let len = 0
    if (localStorage.getItem('empDetails')) {
      len = JSON.parse(localStorage.getItem('empDetails')).length
    }
    return len
  }
  delData(emp_id?){
    let empDetails:any
    const storedData = localStorage.getItem('empDetails');
    if (storedData) {
      empDetails = JSON.parse(storedData);
    }
    empDetails.pop(emp_id);
    localStorage.setItem('empDetails', JSON.stringify(empDetails));
    localStorage.removeItem('editJson');
    this.router.navigateByUrl('')
  }
}
