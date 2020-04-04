import { Directive, Input, ElementRef, Renderer2, OnInit } from '@angular/core';

@Directive({
  selector: '[appNumberOnly]'
})
export class NumberOnlyDirective implements OnInit{
  @Input() disabledNumberOnly: boolean;
  constructor( private _elem: ElementRef, private _renderer: Renderer2) { }

  ngOnInit(){
    if(!this.disabledNumberOnly){
      this._renderer.setAttribute(this._elem.nativeElement, 'onkeypress', 
      'return (event.charCode >=48 && event.charCode <=57) || event.charCode == 0')
    }
  }
}
