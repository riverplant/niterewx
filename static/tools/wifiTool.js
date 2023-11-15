
/**
 * 初始化参数
 */
//#ifdef APP-PLUS
var Socket = plus.android.importClass("java.net.Socket");
var socket;
var outputStream;
//解决高低版本兼容
var StrictMode = plus.android.importClass("android.os.StrictMode");
var Build = plus.android.importClass("android.os.Build");
//#endif
/**
 * 构造对象
 */
var wifiTool = {
	connectWifi(ip, port) {
		if (Build.VERSION.SDK_INT > 9) {
			var policy = new StrictMode.ThreadPolicy.Builder().permitAll().build();
			StrictMode.setThreadPolicy(policy);
		}
		try {
			socket = new Socket(ip, port);
			socket.setKeepAlive(true);
			outputStream = socket.getOutputStream();
			plus.android.importClass(outputStream);
			//   var bytes = plus.android.invoke(str, "getBytes", "gbk");
			uni.showToast({
				title: 'wifi连接成功',
			});

			//   plus.nativeUI.closeWaiting();
		} catch (e) {
			console.log("网络连接超时，请重新连接！")
			//TODO handle the exception
			//   plus.nativeUI.closeWaiting();
		}
	},
	sendData(data) {
		
		console.log(outputStream);
		outputStream.write(data);
		outputStream.flush();
		// 关闭socket
		// socket.shutdownOutput();
		console.log(socket);
	}
}

module.exports = wifiTool
