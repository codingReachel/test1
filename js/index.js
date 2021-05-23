$(function () {
    // 查询当前城市当天天气信息
    let weather;
    $.ajax({
        type: "GET",
        url: "https://v0.yiketianqi.com/api/worldchina?appid=45778385&appsecret=N9zEhuat",
        dataType: 'json',
        data: JSON.stringify({}),
        error: function (xhr, status) { // 错误处理
            console.log(xhr, status);
        },
        success: function (data) {
            weather = data;
            update(weather);
            console.log(data);
        }
    })

    //更新当前城市天气
    function update(weather) {
        // header
        $(".city").html(weather.city);
        $(".pollu").html(weather.day.air_level);
        $(".air").html(weather.day.air);
        $(".tem").html(weather.day.temperature + "°");
        $(".wea").html(weather.day.phrase);
        $(".win").html(weather.day.phrase_img);

        //tq
        $(".tq-today-top-right").html(weather.month[0].day.temperature + "/" + weather.month[0].day.temperature + "°");
        $(".tq-today-bottom-left").html(weather.month[0].day.phrase);
        $(".tq-today-img").css({
            "background-image": "url(imgs/" + weather.month[0].day.phrase_img + ".png)"
        });
        $(".tq-tomorrow-top-right").html(weather.month[1].day.temperature + "/" + weather.month[1].day.temperature + "°");
        $(".tq-tomorrow-bottom-left").html(weather.month[1].day.phrase);
        $(".tq-tomorrow-img").css({
            "background-image": "url(imgs/" + weather.month[1].day.phrase_img + ".png)"
        });


        //hours
        let hours = weather.hours;
        let str = "";
        hours.forEach((vaule, index) => {
            str = str + `
        <div class="hours-chart">
            <h2 class="hours-time">${vaule.time}</h2>
            <div class="hours-img" style="background-image:url(imgs/${vaule.wea_img}.png)"></div>
            <h2 class="hours-tem">${vaule.tem}</h2>
        </div>
        `
        });
        $(".hoursa").html(str);

        //days
        let days = weather.month;
        let strDay = "";
        days.forEach((vaule, index) => {
            strDay = strDay + `
        <div class="days-charts">
            <p>${vaule.dateOfWeek}</p>
            <p>${vaule.date}</p>
            <p>${vaule.day.temperature}</p>
            <div class="days-imga" style="background-image:url(imgs/${vaule.day.phrase_img}.png)"></div>

            <div class="days-imgp" style="background-image:url(imgs/${vaule.night.night_img}.png)"></div>
            <p>${vaule.night.temperature}</p>
            <P>${vaule.day.windDirCompass}</P>
            <P>${vaule.day.uvIndex}</P>
        </div>
        `
        });
        $(".daysa").html(strDay);
    }

    //city
    let city;
    $.ajax({
        type: "get",
        url: "../json/city.json",
        dataType: "json",
        success: function (data) {
            city = data;
            console.log(data);
            // updataCity(obj.data);
        }
    })
    $(".city").on("click", function () {
        $(".loc").css({
            "display": "block"
        });
        $(".header").css({
            "display": "none"
        });
        $(".tq").css({
            "display": "none"
        });
        $(".hours").css({
            "display": "none"
        });
        $(".days").css({
            "display": "none"
        });
        $(".fit").css({
            "display": "none"
        });
        $(".info").css({
            "display": "none"
        });
    })
    $(".search-right").on("click", function () {
        $(".loc").css({
            "display": "none"
        });
        $(".header").css({
            "display": "block"
        });
        $(".tq").css({
            "display": "block"
        });
        $(".hours").css({
            "display": "block"
        });
        $(".days").css({
            "display": "block"
        });
        $(".fit").css({
            "display": "block"
        });
        $(".info").css({
            "display": "block"
        });
    })

    //fit
    let fit;
    // $.ajax({
    //     type: "GET",
    //     url: "https://www.tianqiapi.com/life/lifepro?appid=45778385&appsecret=N9zEhuat",
    //     dataType: 'json',
    //     data: JSON.stringify({}),
    //     error: function (xhr, status) { // 错误处理
    //         console.log(xhr, status);
    //     },
    //     success: function (data) {
    //         fit = data.data;
    //         updateFit(weather);
    //         console.log(data);
    //     }
    // })
    // function updateFit(fit) {
        
    // }
})