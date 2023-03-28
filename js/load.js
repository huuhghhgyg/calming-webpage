$(document).ready(function() {
    loadCards();
    // setTimeout(() => {
    //     lazyload();
    // }, 500);

    // loadCards(function() {
    //     lazyload();
    // });
})


function makeCard(img, title, subtitle, f) {
    // '<div class="card-container mdui-col-xs-12 mdui-col-sm-4 mdui-col-md-2 mdui-col-lg-1">' + "\n" +

    var card = '\n' +
        '<div class="card-container mdui-col-xs-12 mdui-col-sm-4 mdui-col-md-3 mdui-col-lg-2 mdui-col-xl-1">' + "\n" +
        '    <div class="mdui-card item-card">' + "\n" +
        '        <div class="mdui-card-media card-img">' + "\n" +
        '            <img class="lazyload" data-src="' + img + '"/>' + "\n" +
        '            <div class="mdui-grid-tile-actions">' + "\n" +
        '                <div class="mdui-grid-tile-text">' + "\n" +
        '                    <div class="mdui-grid-tile-title">' + title + '</div>' + "\n" +
        '                    <div class="mdui-grid-tile-subtitle">' + "\n" +
        '                        ' + subtitle + '</div>' + "\n" +
        '                </div>' + "\n" +
        '                <div class="mdui-grid-tile-buttons">' + "\n" +
        '                    <button onclick="' + f + '" class="mdui-btn mdui-btn-icon">' + "\n" +
        '                    <i class="mdui-icon material-icons">play_arrow</i>' + "\n" +
        '                </button>' + "\n" +
        '                </div>' + "\n" +
        '            </div>' + "\n" +
        '        </div>' + "\n" +
        '    </div>' + "\n" +
        '</div>' + "\n";

    return card;
    // $("#card-container").append(card);
}

function loadCards() {
    $.getJSON("db.json", function(response) {
        // console.log(response);

        $(response).each(function(i, ctgry) {
            // console.log(ctgry.content); //声音种类

            $("#platte").append('<h2 class="mdui-typo-title">' + response[i].name + '</h2>');
            $("#platte").append('<div class="mdui-row" id="container-' + i + '"></div>');


            $(ctgry.content).each(function(index, item) {
                //console.log(response[id]);
                //每一张卡片
                // console.log(item);
                var card = makeCard(item.card_img_path, item.name, item.subtitle, "play('" + i + "-" + index + "')");
                $("#container-" + i).append(card);
            })
        });
        lazyload();
    });
}