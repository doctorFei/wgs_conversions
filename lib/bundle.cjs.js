'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var pi = 3.14159265358979323846;
var epsilon = 0.000000000000001;
var d2r = pi / 180;
var r2d = 180 / pi;
var zv = 6378137.0;
var f_inverse = 298.257223563;
var b = zv - zv / f_inverse;
var e = Math.sqrt(zv * zv - b * b) / zv;
var Blh2ECEF = function (x, y, z) {
    var L = x * d2r;
    var B = y * d2r;
    var H = z;
    var N = zv / Math.sqrt(1 - e * e * Math.sin(B) * Math.sin(B));
    x = (N + H) * (Math.abs(y) === 90 ? 0 : Math.cos(B)) * (Math.abs(x) === 90 ? 0 : Math.cos(L));
    y = (N + H) * (Math.abs(y) === 90 ? 0 : Math.cos(B)) * (x === -180 ? 0 : Math.sin(L));
    z = (N * (1 - e * e) + H) * Math.sin(B);
    return [x, y, z];
};
var ECEF2Blh = function (x, y, z) {
    var tmpX = x;
    var temY = y;
    var temZ = z;
    var curB = 0;
    var N = 0;
    var calB = Math.atan2(temZ, Math.sqrt(tmpX * tmpX + temY * temY));
    var counter = 0;
    while (Math.abs(curB - calB) * r2d > epsilon && counter < 25) {
        curB = calB;
        N = zv / Math.sqrt(1 - e * e * Math.sin(curB) * Math.sin(curB));
        calB = Math.atan2(temZ + N * e * e * Math.sin(curB), Math.sqrt(tmpX * tmpX + temY * temY));
        counter++;
    }
    x = Math.atan2(temY, tmpX) * r2d;
    y = curB * r2d;
    z = temZ / Math.sin(curB) - N * (1 - e * e);
    return [x, y, z];
};

exports.Blh2ECEF = Blh2ECEF;
exports.ECEF2Blh = ECEF2Blh;
//# sourceMappingURL=bundle.cjs.js.map
