const ENV = 'pro'

const baseUrl = {
    dev: 'https://apia.tucmedia.com/',
    pro: 'https://apia.wetuc.com/'
}

const picHead = {
    dev: 'https://resource.wetuc.com/'
}


module.exports = {
    baseUrl: baseUrl[ENV],
    picHead: picHead[ENV]
}