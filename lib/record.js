import OBSWebSocket from 'obs-websocket-js'

/**
 * @typedef {Object} RecordData
 * @property {string} url
 * @property {string} password  
 * @property {number} time
 */

/** 
 * 定时录制
 * @param {RecordData} recordData
 */
export function record(recordData, callback) {
	const { url, password, time } = recordData
	// OBS WebSocket服务器的连接参数
	const obs = new OBSWebSocket()
	// 连接到OBS WebSocket服务器
	obs.connect(url, password)
		.then(() => {
			// 开始录制
			obs.call('StartRecord')
			setTimeout(async () => {
				// 停止录制
				const result = await obs.call('StopRecord')
				// 断开与OBS WebSocket服务器的连接
				// await obs.disconnect()
				callback && callback(result)
			}, time)
		})
		.catch((err) => {
			console.log('连接到OBS WebSocket服务器失败:', err)
		})
}