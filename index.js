const Obniz = require('obniz');
const ambient = require('ambient-lib');
const { on, off } = require('./signal');
require('dotenv').config();

if (process.env.AMBIENT_CHANNEL_ID && process.env.AMBIENT_WRITE_KEY) {
    ambient.connect(process.env.AMBIENT_CHANNEL_ID, process.env.AMBIENT_WRITE_KEY);
}

let power = 0;

const callback = async () => {
    const obniz = new Obniz(process.env.OBNIZ_ID);
    obniz.connect(); // obnizに接続
    await obniz.connectWait(); 
    const sensor = obniz.wired("SHT31", { vcc: 0, sda: 1, scl: 2, adr: 3, gnd: 4, addressmode: 5 });
    const irLed = obniz.wired('InfraredLED', { anode: 6, cathode: 11 });

    const { temperature, humidity } = await sensor.getAllWait();

    if (humidity < 50) { // 湿度に応じてOCR-05WをON/OFF
        irLed.send(on);
        power = 1;
    } else if (humidity > 60) {
        irLed.send(off);
        power = 0;
    }

    console.log(new Date(), temperature, humidity, power);

    if (process.env.AMBIENT_CHANNEL_ID && process.env.AMBIENT_WRITE_KEY) {
        ambient.send({ d1: temperature, d2: humidity, d3: power });
    }

    obniz.close(); // 繰り返し実行するので1回毎に切断する
};

setInterval(callback, process.env.INTERVAL || 120 * 1000); // 2分毎に実行する