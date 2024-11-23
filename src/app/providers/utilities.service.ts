import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {
  constructor() { }
  empDetails: any[] = [];
  pushData(item: any,id?): void {
    const storedData = localStorage.getItem('empDetails');
    if (storedData) {
      this.empDetails = JSON.parse(storedData);
    }
    if(id){
      this.empDetails[id] = item
    }else{
      this.empDetails.push(item);
    }
    localStorage.setItem('empDetails', JSON.stringify(this.empDetails));
    localStorage.removeItem('editJson')
  }
}
