import { Component, getAssetPath, h, Host } from '@stencil/core';

@Component({
  tag: 'tpl-white-paper-header',
  styleUrl: '0-white-paper-header.scss',
  shadow: false,
  assetsDirs: ['assets'],
})
export class WhitePaperHeaderTpl {    
  render() {            
    const image = getAssetPath(`assets/leya-print-platform-logo.png`); 

    return <Host>      
      <div class="invoice-header__img"><div class="invoice-header__img-size"><leya-print-image-fetch imgSrc={image} class="leya-print-image" imgAlt="Leya Print Platform Logo" /></div></div>
    </Host>
  }
}