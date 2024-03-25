/******/ var __webpack_modules__ = ({

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.templatePackage = void 0;
var template_package_const_1 = __webpack_require__(/*! ./template-package.const */ "./src/template-package.const.ts");
Object.defineProperty(exports, "templatePackage", ({ enumerable: true, get: function () { return template_package_const_1.templatePackage; } }));
__exportStar(__webpack_require__(/*! ./models/address.model */ "./src/models/address.model.ts"), exports);
__exportStar(__webpack_require__(/*! ./models/invoice.model */ "./src/models/invoice.model.ts"), exports);


/***/ }),

/***/ "./src/lit-templates/invoice/invoice-samples.ts":
/*!******************************************************!*\
  !*** ./src/lit-templates/invoice/invoice-samples.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.invoiceSamples = void 0;
var litHardware = {
    address: {
        company: 'Lit Hardware Ltd.',
        street1: 'Industry Park 128-48',
        zipCode: '654321',
        city: 'Industry City',
    },
    vatIdent: 'DE293401223',
    phone: '+1 (636) 555-0113',
    email: 'leya-print@code-better.it',
    web: 'https://leya-print.net-root.de',
    bankDetails: {
        name: 'Black-List-Bank',
        iban: 'GB78BARCO0201530093459',
        bic: 'BLCKUS203DS',
    },
};
var customer = {
    address: {
        firstName: 'Sample',
        lastName: 'Customer',
        street1: 'Mainstreet 5a',
        zipCode: '123456',
        city: 'Small Town',
    },
};
exports.invoiceSamples = {
    'invoice-001': {
        invoiceNo: '239045003',
        customerReference: 'project: leya-print\nwork-item: invoice-sample',
        sender: litHardware,
        recipient: customer,
        date: '2022-07-08T15:55:34.315Z',
        positions: [
            {
                title: 'Big Lit Hammer',
                quantity: 3,
                unit: 'pcs',
                pricePerUnit: 99,
                vatPercent: 8.91,
            },
            {
                title: 'Lit Screws 80mm',
                quantity: 200,
                unit: 'pcs',
                pricePerUnit: 0.02,
                vatPercent: 8.91,
            },
        ],
    },
};


/***/ }),

/***/ "./src/lit-templates/invoice/invoice-template-info.const.ts":
/*!******************************************************************!*\
  !*** ./src/lit-templates/invoice/invoice-template-info.const.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.invoiceTemplateInfo = void 0;
var invoice_samples_1 = __webpack_require__(/*! ./invoice-samples */ "./src/lit-templates/invoice/invoice-samples.ts");
exports.invoiceTemplateInfo = {
    ident: 'invoice',
    title: 'Invoice',
    description: 'template - invoice for customers using lit elements',
    components: {
        header: 'tpl-invoice-header',
        content: 'tpl-invoice-content',
        footer: 'tpl-invoice-footer',
    },
    sampleData: {
        'invoice-001': {
            title: 'invoice 0001',
            description: 'simple sample of an invoice',
            data: invoice_samples_1.invoiceSamples['invoice-001'],
        },
    },
};


/***/ }),

/***/ "./src/models/address.model.ts":
/*!*************************************!*\
  !*** ./src/models/address.model.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./src/models/invoice.model.ts":
/*!*************************************!*\
  !*** ./src/models/invoice.model.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./src/template-package.const.ts":
/*!***************************************!*\
  !*** ./src/template-package.const.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.templatePackage = void 0;
var invoice_template_info_const_1 = __webpack_require__(/*! ./lit-templates/invoice/invoice-template-info.const */ "./src/lit-templates/invoice/invoice-template-info.const.ts");
exports.templatePackage = {
    ident: 'lit-templates',
    templatesLoaderPath: 'lit-templates.esm.js',
    version: '1.0.0',
    templates: [invoice_template_info_const_1.invoiceTemplateInfo],
};


/***/ })

/******/ });
/************************************************************************/
/******/ // The module cache
/******/ var __webpack_module_cache__ = {};
/******/ 
/******/ // The require function
/******/ function __webpack_require__(moduleId) {
/******/ 	// Check if module is in cache
/******/ 	var cachedModule = __webpack_module_cache__[moduleId];
/******/ 	if (cachedModule !== undefined) {
/******/ 		return cachedModule.exports;
/******/ 	}
/******/ 	// Create a new module (and put it into the cache)
/******/ 	var module = __webpack_module_cache__[moduleId] = {
/******/ 		// no module.id needed
/******/ 		// no module.loaded needed
/******/ 		exports: {}
/******/ 	};
/******/ 
/******/ 	// Execute the module function
/******/ 	__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
/******/ 
/************************************************************************/
/******/ 
/******/ // startup
/******/ // Load entry module and return exports
/******/ // This entry module is referenced by other modules so it can't be inlined
/******/ var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXNtL2luZGV4LmVzbS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLG9DQUFvQztBQUNuRDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELHVCQUF1QjtBQUN2QiwrQkFBK0IsbUJBQU8sQ0FBQyxpRUFBMEI7QUFDakUsbURBQWtELEVBQUUscUNBQXFDLG9EQUFvRCxFQUFDO0FBQzlJLGFBQWEsbUJBQU8sQ0FBQyw2REFBd0I7QUFDN0MsYUFBYSxtQkFBTyxDQUFDLDZEQUF3Qjs7Ozs7Ozs7Ozs7QUNwQmhDO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELHNCQUFzQjtBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0Esc0JBQXNCO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLEtBQUs7QUFDTDs7Ozs7Ozs7Ozs7QUNyRGE7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QsMkJBQTJCO0FBQzNCLHdCQUF3QixtQkFBTyxDQUFDLHlFQUFtQjtBQUNuRCwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0w7Ozs7Ozs7Ozs7O0FDcEJhO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDOzs7Ozs7Ozs7OztBQ0RoRDtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQzs7Ozs7Ozs7Ozs7QUNEaEQ7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QsdUJBQXVCO0FBQ3ZCLG9DQUFvQyxtQkFBTyxDQUFDLHVIQUFxRDtBQUNqRyx1QkFBdUI7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztTQ1RBO1NBQ0E7O1NBRUE7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7O1NBRUE7U0FDQTs7U0FFQTtTQUNBO1NBQ0E7Ozs7U0V0QkE7U0FDQTtTQUNBO1NBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90ZW1wbGF0ZXMtbGl0Ly4vc3JjL2luZGV4LnRzIiwid2VicGFjazovL3RlbXBsYXRlcy1saXQvLi9zcmMvbGl0LXRlbXBsYXRlcy9pbnZvaWNlL2ludm9pY2Utc2FtcGxlcy50cyIsIndlYnBhY2s6Ly90ZW1wbGF0ZXMtbGl0Ly4vc3JjL2xpdC10ZW1wbGF0ZXMvaW52b2ljZS9pbnZvaWNlLXRlbXBsYXRlLWluZm8uY29uc3QudHMiLCJ3ZWJwYWNrOi8vdGVtcGxhdGVzLWxpdC8uL3NyYy9tb2RlbHMvYWRkcmVzcy5tb2RlbC50cyIsIndlYnBhY2s6Ly90ZW1wbGF0ZXMtbGl0Ly4vc3JjL21vZGVscy9pbnZvaWNlLm1vZGVsLnRzIiwid2VicGFjazovL3RlbXBsYXRlcy1saXQvLi9zcmMvdGVtcGxhdGUtcGFja2FnZS5jb25zdC50cyIsIndlYnBhY2s6Ly90ZW1wbGF0ZXMtbGl0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RlbXBsYXRlcy1saXQvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly90ZW1wbGF0ZXMtbGl0L3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly90ZW1wbGF0ZXMtbGl0L3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2NyZWF0ZUJpbmRpbmcgPSAodGhpcyAmJiB0aGlzLl9fY3JlYXRlQmluZGluZykgfHwgKE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihtLCBrKTtcbiAgICBpZiAoIWRlc2MgfHwgKFwiZ2V0XCIgaW4gZGVzYyA/ICFtLl9fZXNNb2R1bGUgOiBkZXNjLndyaXRhYmxlIHx8IGRlc2MuY29uZmlndXJhYmxlKSkge1xuICAgICAgZGVzYyA9IHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfTtcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGsyLCBkZXNjKTtcbn0pIDogKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICBvW2syXSA9IG1ba107XG59KSk7XG52YXIgX19leHBvcnRTdGFyID0gKHRoaXMgJiYgdGhpcy5fX2V4cG9ydFN0YXIpIHx8IGZ1bmN0aW9uKG0sIGV4cG9ydHMpIHtcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmIChwICE9PSBcImRlZmF1bHRcIiAmJiAhT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGV4cG9ydHMsIHApKSBfX2NyZWF0ZUJpbmRpbmcoZXhwb3J0cywgbSwgcCk7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy50ZW1wbGF0ZVBhY2thZ2UgPSB2b2lkIDA7XG52YXIgdGVtcGxhdGVfcGFja2FnZV9jb25zdF8xID0gcmVxdWlyZShcIi4vdGVtcGxhdGUtcGFja2FnZS5jb25zdFwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcInRlbXBsYXRlUGFja2FnZVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gdGVtcGxhdGVfcGFja2FnZV9jb25zdF8xLnRlbXBsYXRlUGFja2FnZTsgfSB9KTtcbl9fZXhwb3J0U3RhcihyZXF1aXJlKFwiLi9tb2RlbHMvYWRkcmVzcy5tb2RlbFwiKSwgZXhwb3J0cyk7XG5fX2V4cG9ydFN0YXIocmVxdWlyZShcIi4vbW9kZWxzL2ludm9pY2UubW9kZWxcIiksIGV4cG9ydHMpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmludm9pY2VTYW1wbGVzID0gdm9pZCAwO1xudmFyIGxpdEhhcmR3YXJlID0ge1xuICAgIGFkZHJlc3M6IHtcbiAgICAgICAgY29tcGFueTogJ0xpdCBIYXJkd2FyZSBMdGQuJyxcbiAgICAgICAgc3RyZWV0MTogJ0luZHVzdHJ5IFBhcmsgMTI4LTQ4JyxcbiAgICAgICAgemlwQ29kZTogJzY1NDMyMScsXG4gICAgICAgIGNpdHk6ICdJbmR1c3RyeSBDaXR5JyxcbiAgICB9LFxuICAgIHZhdElkZW50OiAnREUyOTM0MDEyMjMnLFxuICAgIHBob25lOiAnKzEgKDYzNikgNTU1LTAxMTMnLFxuICAgIGVtYWlsOiAnbGV5YS1wcmludEBjb2RlLWJldHRlci5pdCcsXG4gICAgd2ViOiAnaHR0cHM6Ly9sZXlhLXByaW50Lm5ldC1yb290LmRlJyxcbiAgICBiYW5rRGV0YWlsczoge1xuICAgICAgICBuYW1lOiAnQmxhY2stTGlzdC1CYW5rJyxcbiAgICAgICAgaWJhbjogJ0dCNzhCQVJDTzAyMDE1MzAwOTM0NTknLFxuICAgICAgICBiaWM6ICdCTENLVVMyMDNEUycsXG4gICAgfSxcbn07XG52YXIgY3VzdG9tZXIgPSB7XG4gICAgYWRkcmVzczoge1xuICAgICAgICBmaXJzdE5hbWU6ICdTYW1wbGUnLFxuICAgICAgICBsYXN0TmFtZTogJ0N1c3RvbWVyJyxcbiAgICAgICAgc3RyZWV0MTogJ01haW5zdHJlZXQgNWEnLFxuICAgICAgICB6aXBDb2RlOiAnMTIzNDU2JyxcbiAgICAgICAgY2l0eTogJ1NtYWxsIFRvd24nLFxuICAgIH0sXG59O1xuZXhwb3J0cy5pbnZvaWNlU2FtcGxlcyA9IHtcbiAgICAnaW52b2ljZS0wMDEnOiB7XG4gICAgICAgIGludm9pY2VObzogJzIzOTA0NTAwMycsXG4gICAgICAgIGN1c3RvbWVyUmVmZXJlbmNlOiAncHJvamVjdDogbGV5YS1wcmludFxcbndvcmstaXRlbTogaW52b2ljZS1zYW1wbGUnLFxuICAgICAgICBzZW5kZXI6IGxpdEhhcmR3YXJlLFxuICAgICAgICByZWNpcGllbnQ6IGN1c3RvbWVyLFxuICAgICAgICBkYXRlOiAnMjAyMi0wNy0wOFQxNTo1NTozNC4zMTVaJyxcbiAgICAgICAgcG9zaXRpb25zOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGl0bGU6ICdCaWcgTGl0IEhhbW1lcicsXG4gICAgICAgICAgICAgICAgcXVhbnRpdHk6IDMsXG4gICAgICAgICAgICAgICAgdW5pdDogJ3BjcycsXG4gICAgICAgICAgICAgICAgcHJpY2VQZXJVbml0OiA5OSxcbiAgICAgICAgICAgICAgICB2YXRQZXJjZW50OiA4LjkxLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aXRsZTogJ0xpdCBTY3Jld3MgODBtbScsXG4gICAgICAgICAgICAgICAgcXVhbnRpdHk6IDIwMCxcbiAgICAgICAgICAgICAgICB1bml0OiAncGNzJyxcbiAgICAgICAgICAgICAgICBwcmljZVBlclVuaXQ6IDAuMDIsXG4gICAgICAgICAgICAgICAgdmF0UGVyY2VudDogOC45MSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgfSxcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuaW52b2ljZVRlbXBsYXRlSW5mbyA9IHZvaWQgMDtcbnZhciBpbnZvaWNlX3NhbXBsZXNfMSA9IHJlcXVpcmUoXCIuL2ludm9pY2Utc2FtcGxlc1wiKTtcbmV4cG9ydHMuaW52b2ljZVRlbXBsYXRlSW5mbyA9IHtcbiAgICBpZGVudDogJ2ludm9pY2UnLFxuICAgIHRpdGxlOiAnSW52b2ljZScsXG4gICAgZGVzY3JpcHRpb246ICd0ZW1wbGF0ZSAtIGludm9pY2UgZm9yIGN1c3RvbWVycyB1c2luZyBsaXQgZWxlbWVudHMnLFxuICAgIGNvbXBvbmVudHM6IHtcbiAgICAgICAgaGVhZGVyOiAndHBsLWludm9pY2UtaGVhZGVyJyxcbiAgICAgICAgY29udGVudDogJ3RwbC1pbnZvaWNlLWNvbnRlbnQnLFxuICAgICAgICBmb290ZXI6ICd0cGwtaW52b2ljZS1mb290ZXInLFxuICAgIH0sXG4gICAgc2FtcGxlRGF0YToge1xuICAgICAgICAnaW52b2ljZS0wMDEnOiB7XG4gICAgICAgICAgICB0aXRsZTogJ2ludm9pY2UgMDAwMScsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ3NpbXBsZSBzYW1wbGUgb2YgYW4gaW52b2ljZScsXG4gICAgICAgICAgICBkYXRhOiBpbnZvaWNlX3NhbXBsZXNfMS5pbnZvaWNlU2FtcGxlc1snaW52b2ljZS0wMDEnXSxcbiAgICAgICAgfSxcbiAgICB9LFxufTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMudGVtcGxhdGVQYWNrYWdlID0gdm9pZCAwO1xudmFyIGludm9pY2VfdGVtcGxhdGVfaW5mb19jb25zdF8xID0gcmVxdWlyZShcIi4vbGl0LXRlbXBsYXRlcy9pbnZvaWNlL2ludm9pY2UtdGVtcGxhdGUtaW5mby5jb25zdFwiKTtcbmV4cG9ydHMudGVtcGxhdGVQYWNrYWdlID0ge1xuICAgIGlkZW50OiAnbGl0LXRlbXBsYXRlcycsXG4gICAgdGVtcGxhdGVzTG9hZGVyUGF0aDogJ2xpdC10ZW1wbGF0ZXMuZXNtLmpzJyxcbiAgICB2ZXJzaW9uOiAnMS4wLjAnLFxuICAgIHRlbXBsYXRlczogW2ludm9pY2VfdGVtcGxhdGVfaW5mb19jb25zdF8xLmludm9pY2VUZW1wbGF0ZUluZm9dLFxufTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9pbmRleC50c1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==