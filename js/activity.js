// 播放数据
var a; //播放控件
var noise = {
    name: "",
    subtitle: "",
    desc: "",
    dir: "",
    img: ""
};

$(function() {
    a = document.getElementById("audio");
});

// #arrowbox 没check就是关闭，checked就打开
function switchPanel() {
    if ($("#arrowbox").prop("checked") == true) {
        //关闭
        $("#bigscreen-panel").css("bottom", "64px");
        $("#bigscreen-panel").css("top", "");

        $("#smallscreen-panel").css("bottom", "56px");
        $("#smallscreen-panel").css("top", "");

        //允许滚动
        $('body').removeClass('noscroll');

        //效果
        $('#content').removeClass('bg-blur');
        $("#panel-overlay").removeClass('active');

    } else {
        //打开
        $("#bigscreen-panel").css("top", "0px");
        $("#bigscreen-panel").css("bottom", "");

        $("#smallscreen-panel").css("top", "0px");
        $("#smallscreen-panel").css("bottom", "");

        //禁止滚动
        $('body').addClass('noscroll');

        //效果
        $('#content').addClass('bg-blur');
        $("#panel-overlay").addClass('active');
    }
}

var runningTimer;

function play(index) {
    var code = index.split('-');
    // alert(code); //code[0]-种类；code[1]-卡片

    $.getJSON("db.json", function(response) {
        // console.log(response);
        var info = response[code[0]].content[code[1]];

        // console.log(info);

        noise.name = info.name; //卡片标题、panel标题
        noise.subtitle = info.subtitle; //卡片副标题
        noise.desc = info.desc; //panel描述
        noise.dir = info.sound_path; //声音位置
        noise.img = info.panel_img_path; //panel图

        // console.log(info.name); //标题
        // console.log(info.subtitle); //副标题
        // console.log(info.sound_path); //声音位置
        // console.log(info.panel_img_path); //panel图

        clearInterval(runningTimer); //停止所有计时

        $("#play-button-icon").html("pause");
        $("#timer").html("0:00");
        runningTimer = setInterval(function() { timer() }, 1000);
        min = 0;
        sec = 0;

        // 开始播放
        a.src = noise.dir;
        a.load();
        a.play()

        $('.panel-title').html(noise.name);
        $('.panel-subtitle').html(noise.desc);
        $('.bar-title').html(noise.name);
        $('.panel-img').attr("src", noise.img);

        $('#now-playing-title').css('width', '127px');

        switchPanel();
        $('#arrowbox').prop('checked', true);
    });

}

var min;
var sec;

function timer() {
    sec++;
    var x = "00";
    if (sec >= 60) {
        min++;
        sec = 0;
        x = "00";
    } else if (sec < 10) {
        x = "0" + String(sec);
    } else {
        x = String(sec);
    }
    $("#timer").html(String(min) + ":" + x);
}

function suspend() {
    if (document.getElementById("play-button-icon").innerHTML == "pause") {
        //正在播放
        $("#now-playing-title").css("width", "0px");
        a.pause();

        clearInterval(runningTimer);
        $('#play-button-icon').html("play_arrow");
    } else {
        //正在暂停

        if (noise.name == "") {
            //弹出提示
            mdui.snackbar({
                message: '点击卡片的播放按钮进行播放',
                position: 'right-top'
            });
        } else {
            //继续播放
            $("#now-playing-title").css("width", "127px");
            a.play();

            runningTimer = setInterval(function() { timer() }, 1000);
            $('#play-button-icon').html("pause");
        }

    }
}


var volumeTick;

function openVolumeBar() {
    if ($('#volume-bar-container').css('width') == "0px") {
        // 打开
        $('#volume-bar-container').css('width', '100px');
        $('#volume-bar-container').css('margin', '0 -20px 0 -15px');
        $('.mdui-slider-thumb').css('visibility', 'visible');
        // $('#volume-bar-container').css('margin-right', '-10px');

        volumeTick = setInterval(function() {
            // val = $('.mdui-slider-thumb').css('left');
            // alert(val);
            // val = val.replace("%", "");
            // val = val / 100;
            // a.volume = val;
        }, 200);
    } else {
        // 关闭
        $('#volume-bar-container').css('width', '0px');
        $('#volume-bar-container').css('margin-left', '-25px');
        $('.mdui-slider-thumb').css('visibility', 'hidden');
        clearInterval(volumeTick);
    }
}

$(document).on('input change', '#slide-bar', function() {
    // console.log($(this).val());
    var volume = $(this).val();
    // console.log(volume);
    if (volume >= 50) {
        $('#volume-icon').html("volume_up");
    } else if (volume > 0) {
        $('#volume-icon').html("volume_down");
    } else {
        $('#volume-icon').html("volume_off");
    }
    a.volume = volume * 0.01;
});