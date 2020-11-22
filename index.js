const Obniz = require('obniz');
const { on, off } = require('./signal');

const callback = async () => {
    const obniz = new Obniz(process.env.OBNIZ_ID);
    obniz.connect(); // obnizに接続
    await obniz.connectWait();
    const sensor = obniz.wired("SHT31", { vcc: 0, sda: 1, scl: 2, adr: 3, gnd: 4, addressmode: 5 });
    const irLed = obniz.wired('InfraredLED', { anode: 6, cathode: 11 });

    const { temperature, humidity } = await sensor.getAllWait();
    console.log(new Date(), temperature, humidity);

    if (humidity < 50) { // 湿度に応じてOCR-05WをON/OFF
        irLed.send(on);
    } else if (humidity > 60) {
        irLed.send(off);
    }

    obniz.close(); // 繰り返し実行するので1回毎に切断する
};

setInterval(callback, process.env.INTERVAL || 60 * 1000); // 1分毎に実行する