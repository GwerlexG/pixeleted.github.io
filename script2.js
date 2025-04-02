console.log(document.cookie)
const colorlist = [
    "rgb(0, 0, 0)",  // Черный
    "rgb(29, 43, 83)", // Синий
    "rgb(126, 37, 83)", // Пурпурный
    "rgb(0, 135, 81)", // Зеленый
    "rgb(171, 82, 54)", // Коричневый
    "rgb(95, 87, 79)", // Темно-серый
    "rgb(194, 195, 199)", // Светло-серый
    "rgb(255, 241, 232)", // Белый
    "rgb(255, 0, 77)", // Ярко-красный
    "rgb(255, 163, 0)", // Оранжевый
    "rgb(255, 236, 39)", // Желтый
    "rgb(0, 228, 54)", // Ярко-зеленый
    "rgb(41, 173, 255)", // Голубой
    "rgb(131, 118, 156)", // Лавандовый
    "rgb(255, 204, 170)" // Бежевый
];
function getcookie(){
    let cookies = document.cookie.split(";");
    for (let cookie of cookies){
        let name = cookie.split("=")[0]
        let value = cookie.split("=")[1]
        if (name ==="pixelated-result"){
            return value.split(",");
        }
    }
    return 0
}
function decodecolor(index){
    console.log(index)
    return colorlist[index]
}
let group=document.querySelector(".group")
let cookie_list=getcookie()

for (let i=0; i<144;i+=1){
    let newtile= document.createElement("div")
    newtile.classList.add("tile")
    group.appendChild(newtile)
    if (cookie_list !=0){
        newtile.style.backgroundColor=decodecolor(+cookie_list[i])
    }
    else {
        newtile.style.backgroundColor="#FFF1E8"
    }
}
let current_ins="none"
let current_color="none"

let black_button=document.querySelector(".black")
black_button.addEventListener("click", function(){current_color="black"})
let pen_button=document.querySelector(".pen")
let bucket_button=document.querySelector(".bucket")
pen_button.addEventListener("click", function(){
    current_ins="pen"
    current_color=last_color
})
bucket_button.addEventListener("click", function(){
    current_ins="bucket"
    current_color=last_color
})
let eraser_button=document.querySelector(".eraser")
eraser_button.addEventListener("click", function(){
    current_ins="eraser"
    current_color="white"
})
let colors=document.querySelectorAll(".color")
let last_color = "white"



colors.forEach(element => {
    element.addEventListener("click",function(){
        if (current_ins != "eraser"){
            current_color=getComputedStyle(element).backgroundColor
            console.log(current_color)
            last_color=current_color
        }
     })

});
let check_mouse=false
let tiles=document.querySelectorAll(".tile")
tiles.forEach(element => {
    element.addEventListener("click",function(){
        if (current_ins=="pen" || current_ins=="eraser"){
            element.style.backgroundColor=current_color
        }
        else if (current_ins=="bucket"){
            tiles.forEach(element1 => {
                element1.style.backgroundColor=current_color
            })
        }
    })
    element.addEventListener("mouseover", function(){
        if (check_mouse==true){
            if (current_ins=="pen" || current_ins=="eraser"){
                element.style.backgroundColor=current_color
            }
        }
    })
    console.log(check_mouse)
})
document.addEventListener("mousedown", function(){
    check_mouse=true
})
document.addEventListener("mouseup",function(){
    check_mouse=false
})

function convertcolor(tile_color){
    let index=colorlist.indexOf(tile_color)
    return index
}


setInterval(function() {
    let result=""
    tiles.forEach(element => {
        let tile_color_hex = getComputedStyle(element).backgroundColor
        let index_color = String(convertcolor(tile_color_hex))
        result+=index_color + ","
        console.log(tile_color_hex)
        
    })
    result=result.slice(0,-1)
    console.log(result)
    document.cookie = `pixelated-result=${result};max-age=100000`
}, 1000)
document.querySelector(".download").addEventListener("click", function(){
    domtoimage.toJpeg(group, {quality:2})
    .then(function (dataUrl){
        let img=new Image();
        img.src=dataUrl;
        let link = document.createElement("a")
        link.download = "pixel.jpg"
        link.href=dataUrl;
        link.click();
    })
    .catch(function (error){
        console.error("ошибка!", error);
    });
})
