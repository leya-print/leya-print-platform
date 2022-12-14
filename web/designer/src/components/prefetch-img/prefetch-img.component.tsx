import { Component,  h, State } from '@stencil/core';

@Component({
    tag: 'tplb-image-fetch',
  })

  export class ImageFetchTpl{
    @State() imgSrc

    renderImage() {
        let xhr = new XMLHttpRequest();       
        xhr.open("GET", "/assets/icons/gitlab.png", true); 
        xhr.responseType = "blob";
        xhr.onload = function (e) {
                console.log(this.response);
                var reader = new FileReader();
                reader.onload = function(event) {
                var res = event.target.result;
                console.log(res)
                }
                var file = this.response;
                reader.readAsDataURL(file)      
        };
        xhr.send()
        
    }


    render() {
        

        
        return <div><img src= {this.imgSrc}/></div>
        
    }
}