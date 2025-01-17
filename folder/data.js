const fs = require("fs");
const kakao = require("node-kakao");
require('dotenv').config();

module.exports = bot => {
    try {
        const dataBuffer = fs.readFileSync("./data/userdata.json", {"encoding": "utf-8"});
        const data = JSON.parse(dataBuffer.toString());
        if(data.email.startsWith("이메일") || data.password.startsWith("비밀번호")) {
            console.log("비밀번호나 이메일이 입력되지 않았습니다. data/userdata.json 파일을 확인해주세요.");
        }else {
            try {
                bot(data);
            }catch(e) { console.log(e); }
        }
    }catch(e) {
        if(!fs.existsSync("./data")) fs.mkdirSync("./data");
        fs.writeFileSync("./data/userdata.json", JSON.stringify({
            "email": process.env.E_EMAIL,
            "password": process.env.E_PASSWORD,
            "device": process.env.E_DEVICE,
            "uuid": kakao.util.randomWin32DeviceUUID(),
        }, null, 4), {"encoding": "utf-8"});
    }
}