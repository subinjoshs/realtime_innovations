import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class empDetails<T> {
  private stack: T[] = [];

  push(item: T): void {
    this.stack.push(item);
  }

//   pop(index): T | undefined {
//     if(index){
//         this.stack.splice(index, 1);
//     }
//     return this.stack.pop();
//   }

//   peek(): T | undefined {
//     return this.stack[this.stack.length - 1];
//   }

//   isEmpty(): boolean {
//     return this.stack.length === 0;
//   }

//   size(): number {
//     return this.stack.length;
//   }

  clear(): void {
    this.stack = [];
  }
  values():string{
    return this.stack.toString()
  }

}
