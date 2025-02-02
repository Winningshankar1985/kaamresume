import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { QuillModules } from 'ngx-quill';




@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextEditorComponent),
      multi: true,
    },
  ],
})
export class TextEditorComponent implements OnInit {
  quillConfiguration: QuillModules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }, { background: [] }],
      ['link'],
      ['clean'],
    ],
    
  };
  @Input() PlaceholderText: string = 'Enter Your Details Here';
  @Input() content: any = '';
  constructor() {
  
}
ngOnInit(): void {
    
}
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
    // this.innerValue = event.target.innerHTML;
    const htmlContent = event.target.innerHTML;
    const plainText = htmlContent.replace(/<[^>]*>/g, '');
    this.innerValue = plainText;
    // console.log(event.target.innerHTML,"hhhhhhhhhhhhhhhhh",this.innerValue)
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
