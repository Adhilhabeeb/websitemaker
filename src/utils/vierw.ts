export let mobileik = {
  x: 393,
  y: 852,
};

export function isStringInteger(str: any) {
  if (typeof str != "string" || str.trim() === "") return false;
  return Number.isInteger(Number(str));
}

export type checkretur = {
  status: boolean;
  valueas: string;
};
export function checkitisinwidth(
  name: string,
  value: string,
  maxwidth: number,
  checkedasmobile: Boolean,
): checkretur {
  switch (name) {
    case "width":
      

      let parsevalue = parseInt(value);

      if (parsevalue > maxwidth) {
        return { status: false, valueas: value };
      }
      return { status: true, valueas: value };
      break;

    default:
      return { status: true, valueas: value };
      break;
  }
}

export function checkisvwandconverttomobilescerrrnwidth(
  name: string,
  value: string ,
  maxwidth: number,
  checkedasmobile: Boolean,
):string {

switch (name) {
  case "width":
    
  if (value.includes("vw") && checkedasmobile) {
    console.log("has vwwwww")
        let mobilx = mobileik.x;
        let onemob = mobilx / 100;

        let vwvaluepar = parseInt(value);

     
        let newvwforscreenmobile = onemob * vwvaluepar + "px";
        return newvwforscreenmobile;
      }
      return value
    break;

  default:
    return value
    break;
}

}
