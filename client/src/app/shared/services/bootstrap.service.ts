import {Injectable} from "@angular/core";
declare var $: any

@Injectable({
  providedIn: "root"
})
export class BootstrapService {
  static toast() {
    $('.toast').toast({delay: 2000});
    $('.toast').toast('show');
  }
}
