import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'megamenu',
  templateUrl: './megamenu.component.html',
  styleUrls: ['./megamenu.component.scss']
})
export class MegamenuComponent {

  menuExpanded = false;

  toggleMenu() {
    setTimeout(() => {
      this.menuExpanded = !this.menuExpanded;
    }, 0);
  }

  @HostListener('window:click', ['$event'])
  listenToOutsideClick() {
    console.log(this.menuExpanded)
    if (!this.menuExpanded) {
      return;
    }

    this.menuExpanded = false;
  }
}
