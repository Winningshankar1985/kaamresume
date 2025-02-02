import { Component } from '@angular/core';
import { ChildcomponentModule } from "../../../childComponents/childcomponent/childcomponent.module";

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ChildcomponentModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

}
