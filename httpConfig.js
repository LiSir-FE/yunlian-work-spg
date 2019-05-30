const ENV = 'dev'

const baseUrl = {
    dev: 'https://apia.tucmedia.com/',
    pro: 'https://apia.wetuc.com/'
}


module.exports = {
    baseUrl: baseUrl[ENV]
}