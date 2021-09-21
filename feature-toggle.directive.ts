import {AfterViewInit, Directive, ElementRef, Input, OnInit, Renderer2} from '@angular/core';
import {FeatureToggleService} from './feature-toggle.service';

@Directive({
  selector: '[featureToggle]',
})
export class FeatureToggleDirective implements OnInit, AfterViewInit {
  private featureToggleName = '';

  @Input() set featureToggle(toggleName: string) {
    if (!toggleName) {
      return;
    }
    this.featureToggleName = toggleName;
  }

  constructor(private renderer2: Renderer2,
              private element: ElementRef<HTMLElement>,
              private featureToggleService: FeatureToggleService) {
  }

  isVisible(): boolean {
    let visible = !this.featureToggleName || this.featureToggleService.isActive(this.featureToggleName);
    return visible;
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.updateView();
  }

  private updateView() {
    if (this.isVisible()) {
      return;
    }
    this.renderer2.removeChild(this.element.nativeElement.parentElement, this.element.nativeElement);
  }
}
