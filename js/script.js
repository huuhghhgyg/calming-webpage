$(function() {
    SayHi();
});

function SayHi() {
    var now = new Date();
    var now_hour = now.getHours();
    var emotion;

    output = "Hello!";
    var timeclass; //1为早上，2为中午下午，3为晚上,4为深夜
    if (now_hour < 8) {
        output = "清晨好";
        emotion = "😊";
        timeclass = 1;
    } else if (now_hour < 12) {
        output = "早上好";
        emotion = "😊";
        timeclass = 1;
    } else if (now_hour < 14) {
        output = "中午好";
        emotion = "😝";
        timeclass = 2;
    } else if (now_hour < 16) {
        output = "下午好";
        emotion = "😉";
        timeclass = 2;
    } else if (now_hour < 18) {
        output = "傍晚好";
        emotion = "😋";
        timeclass = 2;
    } else if (now_hour < 22) {
        output = "晚上好";
        emotion = "🙂";
        timeclass = 3;
    } else {
        output = "深夜了，早点睡吧";
        emotion = "🌛";
        timeclass = 4;
    }

    //是否更改表情
    if (getRndInteger(0, 1) == 1) {
        //更改表情
        switch (timeclass) {
            case 1:
                //早上
                x = getRndInteger(1, 3);
                switch (x) {
                    case 1:
                        emotion = "☕";
                        break;
                    case 2:
                        emotion = "🥛";
                        break;
                    case 3:
                        emotion = "🌅";
                        break;
                }
                break;
            case 2:
                //中午、下午
                x = getRndInteger(1, 5);
                switch (x) {
                    case 1:
                        emotion = "🎉";
                        break;
                    case 2:
                        emotion = "🎈";
                        break;
                    case 3:
                        emotion = "🌞";
                        break;
                    case 4:
                        emotion = "👀";
                        break;
                    case 5:
                        emotion = "🍮";
                        break;
                }
                break;
            case 3:
                //晚上
                x = getRndInteger(1, 3);
                switch (x) {
                    case 1:
                        emotion = "🌙";
                        break;
                    case 2:
                        emotion = "🌟";
                        break;
                    case 3:
                        emotion = "🛀";
                        break;
                }
                break;
            case 4:
                emotion = "🌚"
                    //深夜
                break;
        }

    }
    output += ('<span>' + emotion + '</span>'); //装入span，取消font-weight，可以显示emoji

    // document.getElementById("headline-hi").innerText = output;
    $('#headline-hi').html(output);
    $('.panel-title').html(output);
    $('.panel-subtitle').html('欢迎来到Calming，今天是'+now.toLocaleDateString());
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min; //包括最小和最大
}