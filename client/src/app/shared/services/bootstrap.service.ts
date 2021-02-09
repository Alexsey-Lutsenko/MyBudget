import {ElementRef, Injectable} from "@angular/core";
declare var $: any

@Injectable({
  providedIn: "root"
})
export class BootstrapService {
  toast() {
    $('.toast').toast({delay: 2000});
    $('.toast').toast('show');
  }

  modalOpen(ref: ElementRef) {
    $(ref).modal('show')
  }

  modalExit(ref: ElementRef) {
    $(ref).modal('hide')
  }
}
