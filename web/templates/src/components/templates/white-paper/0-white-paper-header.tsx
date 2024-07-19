import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'tpl-white-paper-header',
  styleUrl: '0-white-paper-header.scss',
  shadow: false,
})
export class WhitePaperHeaderTpl {    
  render() {        
    const imagePath = '/assets/icon/leya-Print-Platform.png';    
    const url = window.location.href.toString().includes('/dev/') ? `/dev${imagePath}` : `/print${imagePath}`;

    return <Host>
      <div class="invoice-header__img"><div class="invoice-header__img-size"><leya-print-image-fetch imgSrc={url}/></div></div>      
    </Host>
  }
}