const pi = 3.141592653589;
const epsilon = 0.000000000000001;
const d2r = pi / 180;
const r2d = 180 / pi;

const zv = 6378137.0;		//椭球长半轴
const f_inverse = 298.257223563;	//扁率倒数

const b = zv - zv / f_inverse;
const e = Math.sqrt(zv * zv - b * b) / zv;

// const zZ = 0.0066943799013; // 第一偏心率
// const As = 0.00673949674227; // 第二偏心率

// 经纬度转地心坐标
export const LLAtoECEF = (x: number, y: number, z: number) => {
  let L = x * d2r;
  let B = y * d2r;
  let H = z;

  let N = zv / Math.sqrt(1 - e * e * Math.sin(B) * Math.sin(B));
  x = (N + H) * (Math.abs(y) === 90 ? 0 : Math.cos(B)) * (Math.abs(x) === 90 ? 0 : Math.cos(L));
  y = (N + H) * (Math.abs(y) === 90 ? 0 : Math.cos(B)) * (x === -180 ? 0 : Math.sin(L))
  z = (N * (1 - e * e) + H) * Math.sin(B);

  return [x, y, z];
}

// 地心坐标转经纬度
export const ECEFtoLLA = (x: number, y: number, z: number) => {
  let tmpX = x;
  let temY = y;
  let temZ = z;

  let curB = 0;
  let N = 0;
  let calB = Math.atan2(temZ, Math.sqrt(tmpX * tmpX + temY * temY));

  let counter = 0;
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
}


