auto();

/* To be updated next time:
    1. Search "This first item will be perfected next time"

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
        click("DTEmiemie");
        sleep(1000); // Delay 1s
        className("RelativeLayout").descEndsWith("次赞").clickable().findOnce().click();
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
        };
    };


    // ===variables===
    let WhetherToLike = "on";
    // - Custom -
    let LikeNumber = 20;

    // Start to a thread to determine if Likes Reach the Limit of Nearby People
    let IfLimit = threads.start(function(){
        auto();
        function ExitScript(ExitWay){
            // Ways[0]
            if (ExitWay == "Just exit the script") {
                exit();
            }
            
            // This first item will be perfected next time
            if (ExitWay == "Exit the script and QQ") {
                function ClickButton(button) {
                    button.findOnce.click()
                    sleep(1000);
                };

                let TitleBtnLeft = className("TextView").id("ivTitleBtnLeft");
                if (TitleBtnLeft.exists()) {
                    ClickButton(TitleBtnLeft);
                    if (TitleBtnLeft.exists()) {
                        ClickButton(TitleBtnLeft);
                    }
                }
            }
        }


        // Thread variables
        Ways = ["Just exit the script","Exit the script and QQ"];
        ExitWay = Ways[0];
        
        // Thread Main
        events.observeToast();
        events.onToast(function(toast){
            while (true) {
                if (toast.getText() === "每天最多给50个附近的人点赞哦。") {
                    console.log("Likes have been completed");
                    ExitScript(ExitWay);
                }
            }
        })
    })
    // Wait IfLimit thread to run
    IfLimit.waitFor();

    
    // ===Main===
    sleep(500); // To load the like interface (Optional)
    toast("The script is about to run, everyone will like [" + LikeNumber + "] points");
    sleep(3000);
    while(WhetherToLike = "on") {
        for (let i = 0; i < LikeNumber; i++) {
            ClickLike();
            sleep(100);
            IfCancel();
        };
        ShowMore();
        ScrollDownProfile();
    };
};
ClickToLikeInterface();
while (Like()) {
    Like();
}



