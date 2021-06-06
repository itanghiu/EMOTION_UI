
function Utils() {
}

Utils.arrayStringRemove= function (arr, value) {

       const index = arr.indexOf(value);
        if (index > -1) {
            arr.splice(index, 1);
        }
        return arr
    }

Utils.convertColorToGrey = function (hexColor){

        saturation = 0
        var col = hexadecimalToRgb(hexColor);
        var sat = saturation/100;
        var gray = col[0] * 0.3086 + col[1] * 0.6094 + col[2] * 0.0820;
        col.r = Math.round(col[0] * sat + gray * (1-sat));
        col.g = Math.round(col[1] * sat + gray * (1-sat));
        col.b = Math.round(col[2] * sat + gray * (1-sat));
        var out = rgbToHex(col.r,col.g,col.b);
        return out
}

function rgbToHex(r, g, b) {
      return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
      }

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function hexadecimalToRgb(hex){

        var aRgbHex = hex.match(/.{1,2}/g);
        var aRgb = [
            parseInt(aRgbHex[0], 16),
            parseInt(aRgbHex[1], 16),
            parseInt(aRgbHex[2], 16)
        ];
        return aRgb;
}