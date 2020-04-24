auto.waitFor();
toast('请展开全部好友列表，不要展开群聊列表')

// 待完善：识别点赞完后自动关闭脚本
// Android 7.0+

function exitPopup(){ // 不是会员的点赞数上限提醒弹窗关闭, 下次写成 switch
    if (className("TextView").textContains("提升点赞数").findOnce() != null){
        className("ImageView").id("h7s").clickable().click();
    }
}

launch("com.tencent.mobileqq")

if (click("联系人")) {
    className("TextView").text("好友").waitFor()
    click("好友")
    className('android.widget.LinearLayout').waitFor()
    sleep(1000)
}

let running = true;

/* Config parameter area */
let LeftNum = 140; // 到时候改 input()，输入好友数量


while (running) {
    // depth(16) 是好友，depth(15) 是分组，2000-->2300 （高度）
    let elements = className('android.widget.LinearLayout').depth(16).boundsInside(0, 430, device.width, 2300).clickable().find();
    if (!elements.empty()) {
        log('找到了')
        let boundsArr = [];
        for (let i of elements) {
            boundsArr.push(i.bounds());
        }
        for (let i of boundsArr) {
            sleep(300); //返回后延迟时间
            bounds(i.left, i.top, i.right, i.bottom).findOne().click();
            descEndsWith('次赞').waitFor();
            let zan = descEndsWith('次赞').findOne();
            sleep(500); // $val1 点进资料卡后缓冲时间 （点赞前），防止速度过快漏赞
            for (let index = 0; index < 20; index++) {
                zan.click();
                if (index > 10){
                    exitPopup();
                }
            }
            id("ivTitleBtnLeft").findOne().click(); // QQ版本更新可能会变动，注意更改
            sleep(1000);
        }
        sleep(1000);
        log('滑动');
        swipe(520, boundsArr[boundsArr.length - 1].top, 520, 458, 1000);
        sleep(1500) // I forget it, need to review


    } else {
        log('没有找到好友列表');
        running = false;
    }
    sleep(1000);
}