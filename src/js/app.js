App={
    web3Provider:null,
    contracts:{},

    init:function(){
        return App.initWeb3();
    },

    //初始化web3
    initWeb3:function () {
        if (typeof web3 !== 'undefined') {
            App.web3Provider = web3.currentProvider;
        } else {
            App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
        }
        web3 = new Web3(App.web3Provider);

        App.initContrct();
    },

    //初始化合约
    initContrct:function () {
        $.getJSON('InfoContract.json',function (data) {
            App.contracts.InfoContract = TruffleContract(data);
            App.contracts.InfoContract.setProvider(App.web3Provider);
            return App.getInfo();
        });

        App.bindEvents();
		App.watchChanged();
    },

    //调用
    getInfo:function () {
        App.contracts.InfoContract.deployed().then(function (instance) {
            //return instance.methods.getInfo().call(); //没有return后面then就拿不到
			return instance.getInfo.call(); 
        }).then(function (result) {
            $("#loader").hide();
            $("#info").html(result[0]+'(' + result[1] + ' years old )');
        }).catch(function (error) {
            console.log(error);
        });
    },

    //绑定事件
    bindEvents:function () {
        $("#button").click(function () {
            $("#loader").show();

            var message = {
                from: '0x2670A910a0Ba3d1faDf6E82EC74087e540d663C9'
                //value:web3.toWei(amount,'ether')
            };

            App.contracts.InfoContract.deployed().then(function (instance) {
                return instance.setInfo($("#name").val(),$("#age").val(),message);
            }).then(function (result) {
                   //return App.getInfo(); //重新调用get
				   return App.watchChanged(); //事件监听
                }).catch(function (error) {
                    console.log(error);
                });
        });
    },
	
	//事件监听
	 watchChanged:function(){ 
		 App.contracts.InfoContract.deployed().then(function (instance) {
			 var infoEvent = instance.Instructor();
			 infoEvent.watch(function(error,result){
				 $("#loader").hide();
				 $("#info").html(result.args.name+'(' + result.args.age + ' years old )');
			 });
		 });
		 
	 }


}

$(function () {
    $(window).load(function () {
        App.init();
    });
});



