auto();

/* To be updated next time:
    ...Nothing...
s
*/


function ClickToLikeInterface () {
    function ToLogin() {
        if (className("ImageView").id("login").clickable().exists()) {
            className("ImageView").id("login").clickable().findOnce().click();
            sleep(2000); // Load after login
        };
    };

    // Go to the like interface from homepage
    function FromHomepageToLikeInterface() {
        className("Button").desc("帐户及设置").clickable().findOne().click();
        sleep(1000); // Delay 1s
        IfCancelPopUp();
        click("DTEmiemie");
        sleep(1000); // Delay 1s
        className("FrameLayout").descEndsWith("次赞").clickable().findOnce().click();
    };

    launch("com.tencent.mobileqq");
    sleep(1000);
    ToLogin();
    // If the interface can click the avatar to call out the menu
    if (className("Button").desc("帐户及设置").clickable().exists()) {
        toast("Account is logged in, ready to enter like interface.");
        FromHomepageToLikeInterface();
    };

};

function Like() {
        // Number means counts of like to click. Default number is 20.
        // let number = arguments[0] ? arguments[0] : 20;

    function IfExit(){
        if (className("TextView").text("暂无更多赞过你的人").exists()) {
            toast("到底部辣，即将退出脚本♪(^∇^*)")
            exit()
        }
    }

    function ScrollDownProfile() {
        className("AbsListView").scrollable().scrollForward();
        sleep(1000);
    };
    function ClickLike() {
        className("ImageView").desc("赞").click();
    };
    function ShowMore() {
        click("显示更多");
    };

    function IfCancelPopUp() {
        function One(){
            let CancelButton = className("TextView").textContains("取消");
            if (CancelButton.exists()) {
                click("取消");
                sleep(2000);
                ShowMore();
                sleep(4000);
                ScrollDownProfile();
                sleep(2000);
            }
        };
        function Two() {
            let CancelButton = className("ImageView").textContains("h7s")
            if (CancelButton.exists()) {
                click("取消");
                sleep(2000);
                ShowMore();
                sleep(4000);
                ScrollDownProfile();
                sleep(2000);
            }
        }

        function Third() { // I'm not a vip (Limit 10)
            if (className("TextView").textContains("提升点赞数").exists()){
                className("ImageView").id("h7s").clickable().click();
            }
        }

    One();
    Two();
    Third();
    IfExit();
};

    
    


    // ===variables===
    let WhetherToLike = "on";
    // - Custom -
    let LikeNumber = 10;
    
    // ===Main===
    sleep(500); // To load the like interface (Optional)
    toast("The script is about to run, everyone will like [" + LikeNumber + "] points");
    sleep(3000);
    while(WhetherToLike = "on") {
        for (let i = 0; i < LikeNumber; i++) {
            ClickLike();
            sleep(100);
            IfCancelPopUp();
        };
        ShowMore();
        ScrollDownProfile();
    };
};


ClickToLikeInterface();
while (Like()) {
    Like();
    IfExit();
}



