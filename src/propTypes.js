"use strict";
var PropTypes = require('prop-types');
module.exports = {
  items: PropTypes.array,
  columns: PropTypes.array,
  onMount: PropTypes.func,
  defaultRowActiveStyle: PropTypes.object,
  defaultRowOverStyle: PropTypes.object,
  defaultRowStyle: PropTypes.object,
  rowActiveStyle: PropTypes.object,
  rowOverStyle: PropTypes.object,
  rowStyle: PropTypes.object,
  cellStyle: PropTypes.object
};

