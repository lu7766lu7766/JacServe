const handler = require('serve-handler')
const http = require('http')
const chalk = require('chalk')
const os = require('os')

module.exports = function(config = {}) {
	const { dir = '.', port = 3000 } = config
	const server = http.createServer((request, response) => {
		return handler(request, response, {
			cleanUrls: false,
			public: dir,
			rewrites: [{ source: '*', destination: '/index.html' }],
			...config
		})
	})

	server.listen(port, () => {
		var interfaces = os.networkInterfaces()
		var IPv4 = '127.0.0.1'
		for (var key in interfaces) {
			var alias = 0
			interfaces[key].forEach(function(details) {
				if (details.family == 'IPv4' && key == 'en0') {
					IPv4 = details.address
				}
			})
		}
		console.log(
			chalk.green.bold(`
-------------------------------------
Host: http://localhost:${port} 
Host: http://${IPv4}:${port}											
--------------------------------------`)
		)
	})
}
