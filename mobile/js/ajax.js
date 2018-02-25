$(function () {
    //$("[name='mcode']").val("S1");
    //$("[name='interactive_id']").val("");
    //$("[name='product_id']").val("");

    $.ajaxSetup(
        { cache: false }
    );
})

//$(function () {
//    $.ajax({
//        url: 'S.aspx',
//        type: "POST",
//        data: window.location.search.substring(1)
//    });
//});

$(function () {
    var submitform = function () {
        var a = $(this);
        var uniqueid = $("#" + a.data("form")).find("input[name=mobile_phone]").val().substring(0);
        if (CheckAll(a.data("form")))
        {
            var formId = a.data("form");
            var d = new Date;
            var dformat = [d.getFullYear(), padLeft((d.getMonth() + 1), 2), padLeft(d.getDate(), 2)].join('/') +
                                ' ' +
                              [padLeft(d.getHours(), 2), padLeft(d.getMinutes(), 2), padLeft(d.getSeconds(), 2)].join(':');

            window.APPIER_RETARGET.send({
                't': 'type_conversion',
                'content': 'submit_form'
            });

            tribes.sendLeads(formId, dformat, function () {
                Appier.appierTrack('gjY22GWk6ts3Q5B',{uu: uniqueid, callback: function() {
                    window.location.href = window.location.href.replace(window.location.pathname.split("/").slice(-1)[0], "thank.html");
                }},'h901npKqTT4439I');
            });
        }
    };

    $("body").on("click", "[data-form]", submitform);
});

function CheckAll(thisform) {
    //檢查姓名
    //必填,必須為中文
    var regName = /^[\u4e00-\u9fa5]+$/i;
    var varName = $("#" + thisform + " input[name='name']").val();
    if (varName.length == 0) {
        alert("請填寫姓名欄！");
        return false;
    };
    if (!regName.test(varName)) {
        alert("姓名欄只能輸入中文！");
        return false;
    };
    if (varName.length > 20) {
        alert("最多只能輸入20個字！");
        return false;
    };
    //性別
    //必填
    var varGender = $("#" + thisform + " input[name='gender']");
    if (!varGender.is(':checked') || !(varGender.val() == "1" || varGender.val() == "2")) {
        alert("請選擇性別！");
        return false;
    };
    //手機
    //必填,符合格式,10字數字 0開頭
    var regMobile = /^[09]{2}[0-9]{8}$/;
    var varMobile = $("#" + thisform + " input[name='mobile_phone']").val();
    if (!regMobile.test(varMobile)) {
        alert("行動電話格式錯誤！");
        return false;
    };
    //詳閱,檢查是否勾選
    var varInfo = $("#" + thisform + " input[name='info']");
    if (!varInfo.is(':checked')) {
        alert("請勾選個人資料訊息告知事項！");
        return false;
    };

    return true;
};

function padLeft(str, lenght) {
    str = str + "";
    if (str.length >= lenght)
        return str;
    else
        return padLeft("0" + str, lenght);
}
function padRight(str, lenght) {
    if (str.length >= lenght)
        return str;
    else
        return padRight(str + "0", lenght);
}

