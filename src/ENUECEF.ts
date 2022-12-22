import { LLAtoECEF, ECEFtoLLA } from "./LLAECEF";
import { Matrix4 } from 'three/src/math/Matrix4';
import { Vector3 } from 'three/src/math/Vector3';

const pi = 3.141592653589;
const d2r = pi / 180;

// 地心地固坐标系 ECEF
// 站心坐标系 ENU

/**
 * 地心转站心
 * @param topocentricOrigin 
 * @returns 
 */
export const CalEcef2EnuMatrix = (topocentricOrigin: Vector3): Matrix4 => {
  const rzAngle = -(topocentricOrigin.x * d2r + pi / 2);
  const rxAngle = -(pi / 2 - topocentricOrigin.y * d2r);

  const rotationMatrix = new Matrix4().makeRotationX(rxAngle).multiply(new Matrix4().makeRotationZ(rzAngle))

  const xyz = LLAtoECEF(topocentricOrigin.x, topocentricOrigin.y, topocentricOrigin.z)
  const transMatrix = new Matrix4();
  transMatrix.makeTranslation(-xyz[0], -xyz[1], -xyz[2])

  return rotationMatrix.multiply(transMatrix)
}

/**
 * 站心转地心
 * @param topocentricOrigin 站心坐标
 * @returns 从ENU转换到ECEF的图形变换矩阵
 */
export const CalEnu2EcefMatrix = (topocentricOrigin: Vector3): Matrix4 => {
  const rzAngle = (topocentricOrigin.x * d2r + pi / 2);
  const rxAngle = (pi / 2 - topocentricOrigin.y * d2r);
  const rotationMatrix = new Matrix4().makeRotationZ(rzAngle).multiply(new Matrix4().makeRotationX(rxAngle));

  const xyz = LLAtoECEF(topocentricOrigin.x, topocentricOrigin.y, topocentricOrigin.z)
  const transMatrix = new Matrix4();
  transMatrix.makeTranslation(...xyz)

  return transMatrix.multiply(rotationMatrix)
}

// 经纬度 =>> 站心
export const LLAToENU = (LLACoords: Array<number>, topocentricOrigin: Array<number>) => {
  // 地心转站心矩阵
  const ecef2EnuMatrix = CalEcef2EnuMatrix(new Vector3(...topocentricOrigin))
  // 经纬度转地心
  const ECEFCoords = LLAtoECEF(LLACoords[0], LLACoords[1], LLACoords[2])
  // 矩阵转换wolrd2localMatrix * xyz;
  const res = new Vector3(...ECEFCoords).applyMatrix4(ecef2EnuMatrix)

  return [res.x, res.y, res.z]
}

// 站心 ==> 经纬度
export const ENUtoLLA = (ENUCoords: Array<number>, topocentricOrigin: Array<number>) => {
  // 站心转地心矩阵
  const enu2EcefMatrix = CalEnu2EcefMatrix(new Vector3(...topocentricOrigin))
  // 转地心
  const ecef = new Vector3(...ENUCoords).applyMatrix4(enu2EcefMatrix)

  // 地心转经纬度
  return ECEFtoLLA(ecef.x, ecef.y, ecef.z)
}