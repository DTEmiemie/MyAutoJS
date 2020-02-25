auto();
/* Need to do:
1. automatically turn off volume
2. 优化流程 (逻辑有问题)
*/

// You should execute the following code in the live interface

function GetBeans(BeanType){
    if (BeanType === "Sliver") {
        function ClickTreasureChest(){
            className("FrameLayout").drawingOrder(1).depth(11).clickable().findOnce().click();
         };

         function ClickBoxGift() {
             click("领取");
         };

         function ClickAds() {
             if (className("TextView").textContains("看15秒视频领200银豆").exists()) {
                function GetBeansFromAds() {
                    click("立即领取")
                    sleep(17000);
                    click("关闭广告");
                    sleep(1000);
                };

                 GetBeansFromAds();
                 while (className("TextView").text("再领一次").exists()) {
                     click("再领一次");

                 };
             };
         };

         // Start to run    
        ClickTreasureChest();
        sleep(1000);
        // To get boxes of gift
        ClickBoxGift();
        // [3th step] To get Sliver Beans from Ads
        ClickAds();

    };
};

GetBeans("Sliver");


