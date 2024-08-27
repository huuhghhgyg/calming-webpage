$(function () {
    SayHi();
});

function SayHi() {
    var now = new Date();
    var now_hour = now.getHours();

    const emotions = {
        0: ["😊", "😊", "☕", "🥛", "🌅"],
        1: ["😝", "😉", "🎉", "🎈", "🌞", "👀", "🍮"],
        2: ["🌙", "🌟", "🛀"],
        3: ["🌚"]
    }

    const greetings = { 8: "清晨好", 12: "早上好", 14: "中午好", 16: "下午好", 18: "傍晚好", 22: "晚上好", 24: "深夜了，早点睡吧" };
    const emotions_divider = [12, 18, 22, 24];

    let output = "Hello!";
    let emotion = "😊";

    for (h in greetings) {
        if (now_hour < h) {
            output = greetings[h];
            for (d = 0; d < emotions_divider.length; d++) {
                if (now_hour < emotions_divider[d]) {
                    timeclass = d;
                    break;
                }
            }

            emotion = emotions[timeclass][getRndInteger(0, emotions[timeclass].length - 1)];
            setFavicon(emotion); //设置图标
            
            output += ('<span>' + emotion + '</span>'); //装入span，取消font-weight，可以显示emoji

            // document.getElementById("headline-hi").innerText = output;
            $('#headline-hi').html(output);
            $('.panel-title').html(output);
            $('.panel-subtitle').html('欢迎来到Calming，今天是' + now.toLocaleDateString());
            
            break;
        }
    }
}

function setFavicon(emoji){
    let svgUrl = `data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text x=%2250%%22 y=%2250%%22 style=%22dominant-baseline:central;text-anchor:middle;font-size:80;%22>${emoji}</text></svg>`

    // 设置 favicon
    let link = document.getElementById("favicon");
    link.href = svgUrl;
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min; //包括最小和最大
}