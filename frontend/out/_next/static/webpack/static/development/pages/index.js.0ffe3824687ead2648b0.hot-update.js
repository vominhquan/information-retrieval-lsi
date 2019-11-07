webpackHotUpdate("static/development/pages/index.js",{

/***/ "./components/result.js":
/*!******************************!*\
  !*** ./components/result.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/index.js");
var _jsxFileName = "/Users/128419/project/graduit/information-retrieval-lsi/frontend/components/result.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;


var data = [{
  title: 'Ant Design Title 1'
}, {
  title: 'Ant Design Title 2'
}, {
  title: 'Ant Design Title 3'
}, {
  title: 'Ant Design Title 4'
}];

var Result = function Result(_ref) {
  var results = _ref.results,
      _ref$title = _ref.title,
      title = _ref$title === void 0 ? 'Results without expansion' : _ref$title;
  return __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, __jsx(antd__WEBPACK_IMPORTED_MODULE_1__["PageHeader"], {
    title: title,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 22
    },
    __self: this
  }), __jsx(antd__WEBPACK_IMPORTED_MODULE_1__["List"], {
    itemLayout: "horizontal",
    dataSource: data,
    renderItem: function renderItem(item) {
      return __jsx(antd__WEBPACK_IMPORTED_MODULE_1__["List"].Item, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 27
        },
        __self: this
      }, __jsx(antd__WEBPACK_IMPORTED_MODULE_1__["List"].Item.Meta, {
        avatar: __jsx(antd__WEBPACK_IMPORTED_MODULE_1__["Avatar"], {
          src: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 29
          },
          __self: this
        }),
        title: item,
        description: "Ant Design, a design language for background applications, is refined by Ant UED Team",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 28
        },
        __self: this
      }));
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 23
    },
    __self: this
  }));
};

/* harmony default export */ __webpack_exports__["default"] = (Result);

/***/ })

})
//# sourceMappingURL=index.js.0ffe3824687ead2648b0.hot-update.js.map