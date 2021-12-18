// 导航条
let navMenu = $('.nav .tab i');
let navUl = $('.nav .nav-right');
let navBar = $('.nav');
let mainButton = $('.main .mask button')
navMenu.click(function () {
    navBar.toggleClass('open');
})


let navLi = $('.nav .nav-right li');
let navItem = $('.nav-item')
let navItemTop = [];
for (let i = 0; i < navItem.length; i++) {
    navItemTop.push($(navItem[i]).offset().top);
}
navLi.click(function () {
    navBar.toggleClass('open');
    window.scroll(0, navItemTop[$(this).index()]);
})
mainButton.click(function () {
    window.scroll(0, navItemTop[1]);
})


window.onresize = throttle(function () {
    navUl.css('display', '');
}, 1000);


// 轮播图
var swiper = new Swiper(".mySwiper", {
    effect: 'fade',
    fadeEffect: {
        crossFade: true,
    },
    autoplay: {
        delay: 2000,
        stopOnLastSlide: false,
        disableOnInteraction: false,
    }
});

// 关于明德
let aboutImg = $('.aboutUS img');
aboutImg.mouseenter(function () {
    $(this).css('transform', 'scale(120%)');
})
aboutImg.mouseout(function () {
    $(this).css('transform', '');
})

// 图片懒加载函数
let slowImages = document.getElementsByTagName('img');
function slowImgLoad(images) {
    let windowHeight = window.innerHeight;
    [...images].forEach(img => {
        if (img.getAttribute('isload')) {
            return;
        }
        if (img.getBoundingClientRect().top - 200 < windowHeight) {
            img.src = img.getAttribute('data-src');
            img.setAttribute('isload', true);
        }
    })
    return;
}

window.onload = function () {
    slowImgLoad(slowImages);
}

//  节流函数
function throttle(callback, delay) {
    let flag = true;
    return function () {
        if (flag) {
            flag = false;
            setTimeout(() => {
                callback.bind(this)();
                flag = true;
            }, delay);
        }
    }
}

// 滚动事件
window.onscroll = throttle(function () {
    slowImgLoad(slowImages);
    if (window.pageYOffset === 0) {
        navBar.show().removeClass('navbackgroud');
    } else if (window.pageYOffset <= 735) {
        navBar.hide();
    } else {
        navBar.show().addClass('navbackgroud');
    }
}, 150)


// 提交留言
let submitIpt = $('.tellMe .submitipt');
let submitBtn = $('.submit button');
let maskHint = $('.mask-hint');
let hint = $('.mask-hint .hint-body p');
$('.mask-hint .closeBtn').click(function () {
    maskHint.fadeOut();
})
$('.mask-hint .closeBtn2').click(function () {
    maskHint.fadeOut();
})
function PopHint(error) {
    maskHint.fadeIn().css('display', 'flex');
    hint.html(error);
}
submitBtn.click(function () {
    let submitIptVal = [];
    for (let i = 0; i < submitIpt.length; i++) {
        submitIptVal.push(submitIpt[i].value);
    }
    if (submitIptVal[0].length < 1 || submitIptVal[0] == ' ') {
        PopHint('姓名不能为空')
        return;
    } else if (!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(submitIptVal[1])) {
        PopHint('邮箱格式不正确')
        return;
    } else if (submitIptVal[2].length !== 11 || !Number(submitIptVal[2])) {
        PopHint('手机号格式不正确');
        return
    } else if (!submitIptVal[3]) {
        PopHint('留言不能为空');
    } else {
        submitIpt.val('')
        PopHint('留言成功');
    }
})