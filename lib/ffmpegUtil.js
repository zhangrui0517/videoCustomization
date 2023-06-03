import { execa } from 'execa'

export function cutVideo(data) {
	const { inputPath, outputPath, startTime, duration } = data
	console.log('开始剪辑')

	execa('ffmpeg', ['-i', inputPath, '-ss', startTime, '-t', duration, '-c:v', 'libx264', '-c:a', 'copy', outputPath])
		.then(result => {
			console.log(result)
			// 命令执行成功
			console.log('剪辑完成')
		})
		.catch(error => {
			// 命令执行失败
			console.error(error)
		})
}