import { Directive, EmbeddedViewRef, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({ selector: '[cfBindingContextBe]' })
export class BindingContextDirective {
  private context = new BindingContextDirectiveContext();
  private viewRef: EmbeddedViewRef<BindingContextDirectiveContext>|null = null;

  @Input()
  set cfBindingContextBe(context: any) {
    this.context.$implicit = context;
    if (!this.viewRef) {
      this.viewContainer.clear();
      this.viewRef = this.viewContainer.createEmbeddedView(this.templateRef, this.context);
    }
  }

  constructor(
    private readonly viewContainer: ViewContainerRef,
    private readonly templateRef: TemplateRef<BindingContextDirectiveContext>
  ) {}
}

class BindingContextDirectiveContext {
  $implicit: any = null;
}
