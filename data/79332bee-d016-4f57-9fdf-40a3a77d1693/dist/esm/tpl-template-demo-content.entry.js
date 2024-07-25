import { r as registerInstance, h, H as Host } from './index-11521ed9.js';

const _1TemplateDemoContentCss = "body{font-size:14pt;font-family:\"Lucida Sans\", \"Lucida Sans Regular\", \"Lucida Grande\", \"Lucida Sans Unicode\", Geneva, Verdana, sans-serif !important}tpl-template-demo-content{display:block;box-sizing:border-box;border:1mm solid red;padding:0 1cm}.template-demo__content-end{background:red;color:white;text-align:center;border:1px solid white}.template-demo__content__spacer{margin:0.5cm 0;padding:0.5cm;border:1px solid green}";

const TemplateDemoContentTpl = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    return h(Host, null, "content start", h("div", { class: "template-demo__content__spacer", style: { height: '1000px' } }, "spacer"), new Array(20).fill(true).map((_, i) => {
      return h("section", null, h("h3", null, "Section ", i), h("p", null, "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."));
    }), h("div", { class: "template-demo__content-end" }, "content end"));
  }
};
TemplateDemoContentTpl.style = _1TemplateDemoContentCss;

export { TemplateDemoContentTpl as tpl_template_demo_content };
