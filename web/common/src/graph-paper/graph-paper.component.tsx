import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'leya-print-graph-paper',
  styleUrl: 'leya-print-graph-paper.component.scss',
  shadow: false,
})
export class GraphPaperComponent {
  @Prop() width = '21cm';
  @Prop() height = '29.7cm';

  render() {
    const url = new URL(location.href);
    if (url.searchParams.get('raster')) {
      const cmWidth = parseFloat(this.width);
      const cmHeight = parseFloat(this.height);
      const mmWidth = Math.round(cmWidth * 10);
      const mmHeight = Math.round(cmHeight * 10);
      const scale = 10;
      const width = mmWidth * scale;
      const height = mmHeight * scale;
      return <div class="raster" style={{ width: this.width, height: this.height }}>
        <svg width={this.width} height={this.height} viewBox={`0 0 ${width} ${height}`} xmlns="http://www.w3.org/2000/svg">
          <g class="leya-print-graph-paper__lines">

            <g class="leya-print-graph-paper__column-lines">{new Array(mmWidth - 1).fill(true).map((_, i) => {
                const x = (i + 1) * scale;
                return <line x1={x} y1={0} x2={x} y2={mmHeight * scale} stroke="red" stroke-width="1mm"></line>
            })}</g>
            <g class="leya-print-graph-paper__row-lines">{new Array(mmHeight - 1).fill(true).map((_, i) => {
                const y = (i + 1) * scale;
                return <line x1={0} y1={y} x2={mmWidth * scale} y2={y}></line>
            })}</g>
          </g>
          <g class="leya-print-graph-paper__numbers">
            <g class="leya-print-graph-paper__column-numbers">{new Array(Math.floor(mmWidth / 10)).fill(true).map((_, i) => {
                const x = ((i) * 10 + 1) * scale;
                const y = 3.2 * scale;
                return <text x={x} y={y}>{i}</text>
            })}</g>
            <g class="leya-print-graph-paper__row-numbers">{
              new Array(Math.floor(mmHeight / 10)).fill(true).map((_, i) => {
                  const x = 1 * scale;
                  const y = ((i) * 10 + 3.2) * scale;
                  return <text x={x} y={y}>{i}</text>
              })
            }</g>
          </g>
        </svg>
      </div>
    }
  }
}
