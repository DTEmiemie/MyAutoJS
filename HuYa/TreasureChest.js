auto();

// You should execute the following code in the live interface

function GetBeans(BeanType){
    if (BeanType === "Sliver") {
        function ClickTreasureChest(){
            className("FrameLayout").drawingOrder(1).depth(11).clickable().findOnce().click();
         };

         function ClickBoxGift() {
             click("领取");
         };

         // Start to run
         
        ClickTreasureChest();
        sleep(1000);
        ClickBoxGift();
    };
};

GetBeans("Sliver");


