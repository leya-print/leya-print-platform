import { Component,  h, Prop } from '@stencil/core';

@Component({
    tag: 'tplb-image-fetch',
  })

  export class ImageFetchTpl{
    @Prop() imgSrc: string;
    private convertedImg: string;

    constructor() {
        this.renderImage();
        console.log(this.convertedImg)

    }
    
    async renderImage() {
        const result = await fetch(this.imgSrc)
        const data = await result.blob();
        const re = await data.text();
        this.convertedImg = re;
    }

    render() {
        return <div><img src={this.convertedImg}/></div>
    }
}