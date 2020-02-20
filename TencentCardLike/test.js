auto();

function LikeProfile() {
        // Number means counts of like to click. Default number is 20.
        // let number = arguments[0] ? arguments[0] : 20;

    function ScrollDownProfile() {
        className("AbsListView").scrollable().scrollForward();
    };

    function ClickLike() {
        className("ImageView").desc("赞").click();
    };
    
    function ShowMore() {
        click("显示更多");
    };

    function IfCancel() {
        let CancelButton = className("TextView").textContains("取消");
        if (CancelButton.exists()) {
            click("取消");
            sleep(2000);
            ShowMore();
            sleep(4000);
            ScrollDownProfile();
            sleep(2000);
        }
    }

    
    
    let WhetherToLike = "on";
    let LikeNumber = 20;

    toast("The script is about to run, everyone will like [" + LikeNumber + "] points");
    sleep(3000);

    while(WhetherToLike="on") {
        for (let i = 0; i < LikeNumber; i++) {
            ClickLike();
            sleep(100);
            IfCancel();
        };
        ShowMore();
        ScrollDownProfile();
    }

    
}
LikeProfile();

/*
events.observeToast();
events.onToast(function(toast){
        log("Toast内容: " + toast.getText() + " 包名: " + toast.getPackageName());
    });
// √ 每天最多给50个附近的人点赞

*/

