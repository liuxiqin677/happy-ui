export const isNumber = (num: any) => {
  const reg = /^-?[1-9]*(\.\d*)?$|^-?0(\.\d*)?$/;
  return !reg.test(num) ? false : true;
};

export const isFunction = (fn: any) => {
  return Object.prototype.toString.call(fn) === '[object Function]';
};

export const parseFloatPrecision = (num: number, precision = 12) => {
  return +parseFloat(num.toPrecision(precision));
};

export const uuid = () => {
  const uuid = window.crypto.getRandomValues(new Uint8Array(8));

  return uuid.toString().split(',').join('');
};
