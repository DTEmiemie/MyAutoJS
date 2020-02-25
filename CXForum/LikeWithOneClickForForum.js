function AllLike(){
    // The class name of the like button is "zan"(normally) 、 "zan fr"、""zan1 fr"(cancel)
    // The button tag is anchor ==> <a></a>
    let Likes = document.querySelectorAll("a.zan")
    for (let number=0;number<Likes.length;number++){
        Likes[number].click();
        console.log("已点" + (number+1) + "个");
    }
}