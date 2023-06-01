import OBSWebSocket from 'obs-websocket-js'

/** 定时录制 */
function record() {
	// OBS WebSocket服务器的连接参数
const obs = new OBSWebSocket()
	// 连接到OBS WebSocket服务器
	obs.connect('ws://127.0.0.1:4455', 'wP8E1BOfQjIUYMDw')
		.then(() => {
			// 开始录制
			obs.call('StartRecord')

			setTimeout(async () => {
				// 停止录制
				await obs.call('StopRecord')
				// 断开与OBS WebSocket服务器的连接
				await obs.disconnect()
			}, 2000)
		})
		.catch((err) => {
			console.log('连接到OBS WebSocket服务器失败:', err)
		})
}

record()