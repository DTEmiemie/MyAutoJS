auto.waitFor();
toast('请展开全部好友列表，不要展开群聊列表')

/*
    注意： 
        - 只适配 Android 7 以上 (滑动使用 swipe 函数)
        - QQ 只能使用日间模式，否则无法启动到联系人栏 (这个还没做功能函数)
    待完善：
        - 识别点赞完后自动关闭脚本
        - 联动回赞 
            （在列表点赞后点到自己，通过这个识别回赞页面后(所以要做区分到底是处于哪个页面)）
            （可以进行回赞处理，回赞完毕后返回）
*/

/* Function Module  */
function DirectToList() {
    launch("com.tencent.mobileqq")
    click("联系人")
    sleep(100)
    click("好友")
    element= className('android.widget.LinearLayout').depth(16).boundsInside(0, 430, device.width, 2300).clickable()
    element.untilFind()
}

function ClosePopUp(){
    // 点赞超过上限会触发的弹窗
    if (className("TextView").text("提升点赞数").exists()) {
        className("ImageView").clickable().click()
    }
}

/* Variabe Module */
let running = true;

// Config parameter area 
let LeftNum = 140; // 到时候改 input()，输入好友数量


/* Body */
DirectToList()
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
            sleep(300); // 返回后延迟时间
            bounds(i.left, i.top, i.right, i.bottom).findOne().click();
            let zan = descEndsWith('次赞').findOne();
            for (let index = 0; index < 20; index++) {
                zan.click();
            }
            id("ivTitleBtnLeft").findOne().click(); // QQ版本更新可能会变动，注意更改
            sleep(1000);
        }
        sleep(1000);
        log('滑动');
        swipe(520, boundsArr[boundsArr.length - 1].top, 520, 458, 1000);
        
        EndNum = elements[elements.length - 1].drawingOrder() + 1
        log("EndNum:",EndNum)
        /*
        if (className("FrameLayout").drawingOrder(EndNum).exists()) {
            show()
        }
        */
/*
        if (className("FrameLayout").drawingOrder().exists()) {
            console.show()
        }
*/
        sleep(1500);
    } else {
        log('没有找到好友列表');
        running = false;
    }

    

    /*
    LeftNum = LeftNum - elements.length
    log("LeftNum：",LeftNum)
    if (LeftNum < 0) {
        engines.stopAll()
    }
    */

    sleep(1000);
}