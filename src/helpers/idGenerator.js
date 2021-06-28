export function GENERATEID() {
  return (new Date().getTime()).toString(18).toUpperCase();
}
