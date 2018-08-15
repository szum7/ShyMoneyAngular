import { OnInit, Directive, Input, ElementRef, Renderer, SimpleChanges } from '@angular/core';

@Directive({ selector: '[sFocus]' })
export class FocusDirective {

    @Input('sFocus')
    isFocused: boolean;

    constructor(private hostElement: ElementRef, private renderer: Renderer) { }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.isFocused) {
            if (this.isFocused)
                this.renderer.invokeElementMethod(this.hostElement.nativeElement, 'focus');
            else
                this.renderer.invokeElementMethod(this.hostElement.nativeElement, 'blur');
        }
    }
}