const Web3 = require('./web3.min.js');
web3=new Web3();
web3.setProvider(new Web3.providers.WebsocketProvider("ws://localhost:7545"));

//metamask
// function initWeb3() {
//     var web3;
//     if (window.ethereum) {
//         web3 = new Web3(window.ethereum);
//         // 请求用户授权
//         window.ethereum.enable();
//     } else if (typeof web3 !== 'undefined') {
//         web3 = new Web3(web3.currentProvider);
//         web3.eth.defaultAccount = web3.eth.accounts[0];
//         console.log(web3.eth.defaultAccount);
//     } else {
//         // set the provider you want from Web3.providers
//         web3 = new Web3(new Web3.providers.WebsocketProvider("ws://localhost:7545"));
//     }
//     return web3;
// }
// var web3 = initWeb3();


//web3.eth.getAccounts().then(console.log);

//部署合约
var jsonInterface = [
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "age",
                "type": "uint256"
            }
        ],
        "name": "Instructor",
        "type": "event"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "string",
                "name": "_name",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "_age",
                "type": "uint256"
            }
        ],
        "name": "setInfo",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getInfo",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }
];
var myContract = new web3.eth.Contract(jsonInterface, '0x9ec1477d130533fd3f540e63ee728f6723bd8665');

//调用方法
myContract.methods.getInfo().call((error, result) => {
    if(!error){
        $("#info").html(result[0]+'(' + result[1] + ' years old )');
    }
});
//myContract.methods.getInfo().call().then(console.log);

$("#button").click(function () {
    $("#loader").show();
    var name = $("#name").val();
    var age = $("#age").val();
    var message = {
        from: '0x2670A910a0Ba3d1faDf6E82EC74087e540d663C9'
        //value:web3.toWei(amount,'ether')
    };
    myContract.methods.setInfo(name,age).send(message, function(error, transactionHash){
        if(!error){
            console.log("set transactionHash: "+transactionHash);
        }
    });

    myContract.events.Instructor({   
        fromBlock: 0
    }, function(error, event){
        if(!error){
            $("#loader").hide();
            $("#info").html(event.returnValues.name+'(' + event.returnValues.age + ' years old )');
        }else{
            console.log(error);
            $("#loader").hide();
            $("#info").html('ERROR: '+error);
        }
    });
});




