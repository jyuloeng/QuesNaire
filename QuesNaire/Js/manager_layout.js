var nav_item = document.getElementsByClassName("nav_item");
var layout_item = document.getElementsByClassName("layout_item");

for (var i = 0; i < nav_item.length; i++) {

    (function (i) {
        nav_item[i].addEventListener("click", function () {
            changeLayout(i);
            nav_item[i].classList.add("nav_item_active");
        }, false);
    }(i));
}

function changeLayout(i) {
    for (var j = 0; j < layout_item.length; j++) {
        nav_item[j].classList.remove("nav_item_active");
        layout_item[j].classList.remove("layout_item_active");
    }
    layout_item[i].classList.add("layout_item_active");
}

