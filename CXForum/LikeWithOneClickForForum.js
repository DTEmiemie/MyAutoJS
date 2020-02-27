/* To Do List
    1. add more comments
    2. perfect View more and don't use while (true)
    3. add delay !!!!!!!!!!!!!!!!!!!!!!!!
*/

// 点击显示更多
// 
function ViewMore() {
    if (document.querySelectorAll("a[id^=more_reply]").length > 0){
        if (document.querySelector("a[id^=more_reply]").getAttribute("style")=="display: none;"){
            return false;
        }
        document.querySelector("a[id^=more_reply]").click();
        return true;
    }
}

function AllLike(){
    // The class name of the like button is "zan"(normally) 、 "zan fr"、""zan1 fr"(cancel)
    // The button tag is anchor ==> <a></a>
    let Likes = document.querySelectorAll("a.zan")
    for (let number=0;number<Likes.length;number++){
        Likes[number].click();
        console.log("已点" + (number+1) + "个");
    }
}
function test(){
    times=4
    while (times<0){
        times++
        if (document.querySelector("a[id^=more_reply]").getAttribute("style")!=="display: none;"){
            console.log("Click more")
        document.querySelector("a[id^=more_reply]").click()
        }
    }
}