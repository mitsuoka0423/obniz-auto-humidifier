const Obniz = require('obniz');
const obniz = new Obniz(process.env.OBNIZ_ID);
const { Client } = require('tplink-smarthome-api');

const callback = async () => {
    obniz.connect(); // obnizに接続
    await obniz.connectWait();
    const sensor = obniz.wired("SHT31", {vcc:0, sda:1, scl:2, adr:3, gnd:4, addressmode:5});
  
    const client = new Client(); // HS105に接続
    const plug = client.getPlug({ host: process.env.HS105_IP_ADDRESS }); // 各自のIPアドレスに書き換え
  
    const humid = await sensor.getHumidWait();

    if (humid < 55) { // 湿度に応じてHS105をON/OFF
      plug.setPowerState(true);
    } else {
      plug.setPowerState(false);
    }
  
    obniz.close(); // 繰り返し実行するので1回毎に切断する
    plug.closeConnection();
  };
  
  setInterval(callback, 60000); // 1分毎に実行する