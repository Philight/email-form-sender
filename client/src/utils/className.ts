Array.prototype.css = function () {
  return this?.filter(Boolean).join(' ');
};
