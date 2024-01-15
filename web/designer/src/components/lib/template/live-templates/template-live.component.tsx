// import { TemplatePackage } from '@leya-print/template-api';
import { TemplatePackage } from '/workspace/leya-print/common/template-api/types';
import { Component, h, Host, Prop, State } from '@stencil/core';
import { uiStateService } from '../../ui-state/index'

interface LiveTemplateUIState {
  templateURL?: string
}

@Component({
  tag: 'template-live',
  styleUrl: 'template-live.component.scss',
})
export class TemplateLiveComponent {
  @Prop({mutable: true}) templates = [];  
  @State() templateUrl? : string = "";  
  uiState: LiveTemplateUIState;

  async componentWillLoad() {         
    this.uiState = uiStateService.get({
      ident: "liveTemplates",
      initialize: () => ({})
    });

    if(!!this.uiState.templateURL){
      this.templateUrl = this.uiState.templateURL
      await this.loadTemplates()
    }
  }

  private updateTemplateUrl = (event: Event) => {
    const input = event.target as HTMLInputElement;    
    this.templateUrl = input.value;
  }

  async loadTemplates(){        
    if (this.templateUrl == "") return;

    try {
      console.log('this.templateUrl', this.templateUrl);
      
      const externalPackage = await import (this.templateUrl);
      this.uiState.templateURL = this.templateUrl
      
      console.log('this.externalPackage', externalPackage);

      const templatePackage: TemplatePackage = externalPackage.templatePackage;
      console.log('templatePackage --> ', templatePackage);
      
      this.templates = templatePackage.templates;
    } catch (error) {
      console.log(error);
      this.templates = [];
    };
  }

  render() {
    return <Host>
        <input id="live_template_url" onFocusout={this.updateTemplateUrl} value={this.templateUrl}/>
        <input id="live_template_connect_btn" type='button' onClick={() => { this.loadTemplates(); }} value="Connect" />
        <ul>
          {this.templates.map((template) => <li><a href={`./designer/${template.ident}?tplPackage=${this.templateUrl}`}>{template.title}</a><br />{template.description}</li>)}
        </ul>
    </Host>
  }
}
