pragma solidity ^0.5.16;

import "truffle/Assert.sol";
import "truffle/DeployedAddress.sol"; //动测试时态生成
import "../contracts/InfoContract.sol";
contract TestInfoContract{
	//拿到合约实例
	InfoContract info = InfoContract(DeployedAddress.InfoContract());

	//测试方法
	function testInfo(){
		info.setInfo("muse",24);
		
		(name,age) = info.getInfo();
		
		Assert.equal(name,"muse","设置名字出错");
		Assert.equal(age,24,"设置年龄出错");
	}
	
}