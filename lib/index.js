import { homedir } from 'os'
import { resolve, basename } from 'path'
import schedule from 'node-schedule'
import { record } from './record.js'
import { cutVideo } from './ffmpegUtil.js'

/** 定时录制，每天的4点钟开始录制任务 */
schedule.scheduleJob('0 30 4 * * *', () => {
	console.log('开始录制任务')
	record({
		url: 'ws://127.0.0.1:4455',
		password: 'wP8E1BOfQjIUYMDw',
		time: 1000 * 60 * 60 * 5
	}, (result) => {
		const { outputPath } = result
		cutVideo({
			inputPath: outputPath,
			outputPath: resolve(homedir(), `./24videos/${basename(outputPath)}`),
			startTime: 60 * 30,
			duration: 60 * 60 * 2 
		})
	})
})

