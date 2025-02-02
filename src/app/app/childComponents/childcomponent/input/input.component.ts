import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor {

  @Input() inputType: string = 'text';
  @Input() error: any = '';
  @Input() placeholderLabel: string = '';
  @Input() required: boolean = false;
  @Input() label: any = '';
  // @Input() isDisabled: boolean=false;
  public innerValue: any = '';

  // Implement writeValue to update the input element when the form model changes
  writeValue(value: any): void {
    this.innerValue = value;
  }

  // Implement registerOnChange to update the form model when the input value changes
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  // Implement registerOnTouched to update the form model when the input is touched
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  // Implement setDisabledState to enable/disable the input programmatically
  setDisabledState(isDisabled: boolean): void {
    // Implement logic to disable/enable the input
  }

  // Custom method to handle input changes and update the form model
  onInputChange(event: any) {
    this.innerValue = event.target.value;
    this.onChange(this.innerValue);
  }

  // Custom method to handle input blur event
  onInputBlur() {
    this.onTouched();
  }

  // Placeholder methods for the ControlValueAccessor interface
  private onChange: (value: any) => void = () => { };
  private onTouched: () => void = () => { };
}


