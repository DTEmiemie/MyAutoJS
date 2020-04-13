auto.waitFor();
toast('请展开全部好友列表，不要展开群聊列表')

// 待完善：识别点赞完后自动关闭脚本

let running = true;
while (running) {
    let elements = className('android.widget.LinearLayout').boundsInside(0, 430, device.width, 2000).clickable().find();
    if (!elements.empty()) {
        log('找到了')
        let boundsArr = [];
        for (let i of elements) {
            boundsArr.push(i.bounds());
        }
        for (let i of boundsArr) {
            sleep(1000); //返回后延迟时间
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
    } else {
        log('没有找到好友列表');
        running = false;
    }
    sleep(1000);
}