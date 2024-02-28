import { Component, Input, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';

@Component({
  selector: 'app-test-inputs',
  templateUrl: './test-inputs.component.html',
  styleUrls: ['./test-inputs.component.css']
})
export class TestInputsComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() type = 'text';
  constructor(@Self() public ngControl: NgControl) {
    this.ngControl.valueAccessor = this;

  }



  writeValue(obj: any): void {
    throw new Error('Method not implemented.');
  }
  registerOnChange(fn: any): void {
    throw new Error('Method not implemented.');
  }
  registerOnTouched(fn: any): void {
    throw new Error('Method not implemented.');
  }

  get control() : FormControl{
    return this.ngControl.control as FormControl
  }

  

}
