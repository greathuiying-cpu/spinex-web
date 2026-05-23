export async function connectSerialDevice() {
  if (!("serial" in navigator)) {
    throw new Error("Web Serial API is not supported in this browser. Please use Chrome or Edge on desktop.");
  }

  const port = await navigator.serial.requestPort();
  await port.open({ baudRate: 115200 });

  return port;
}