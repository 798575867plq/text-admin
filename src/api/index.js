const files = require.context('./modules',false,/\.js$/)

const apis = {}

for (const key of files.keys()) {
    const keyArr = key.split('/');
    keyArr.shift() // 移除.
    apis[keyArr.join('.').replace(/\.js$/g, '')] = files(key).default
}

module.exports = {
    apis
}
