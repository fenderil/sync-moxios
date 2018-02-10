import axios from 'axios'

let defaultAdapter
const defaultRequest = /.*/
const noop = function () {}
let stubs = {}

let mockAdapter = (request) => new Promise((resolve, reject) => {
    const stub = stubs[request.url]

    if (stub) {
        stub.requests.push(request)
        const { response, afterRequest = noop, afterResponse = noop } = stub

        afterRequest(request)
        if (typeof response === 'function') {
            response((data) => {
                stub.responses.push(data)
                resolve(data)
                afterResponse(request, data)
            }, request)
        } else {
            stub.responses.push(response)
            resolve(response)
            afterResponse(request, response)
        }
    } else {
        reject(new Error(`There is no stub for ${request.url} service`))
    }
})

export default {
    stubs,

    install: (instance = axios) => {
        defaultAdapter = instance.defaults.adapter
        instance.defaults.adapter = mockAdapter
    },

    uninstall: (instance = axios) => {
        instance.defaults.adapter = defaultAdapter
        stubs = {}
    },

    stubRequest: function (url, response, afterRequest, afterResponse) {
        const key = url.source || url || defaultRequest.source
        stubs[key] = {
            response,
            afterRequest,
            afterResponse,
            requests: [],
            responses: [],
            mostRecentRequest: function () { return this.requests[this.requests.length - 1] },
            getRequest: function (index) { return this.requests[index] },
            mostRecentResponse: function () { return this.responses[this.responses.length - 1] },
            getResponse: function (index) { return this.responses[index] },
            requestsCount: function () { return this.requests.length }
        }

        return stubs[key]
    },

    unstubRequest: function (url) {
        delete stubs[url.source || url || defaultRequest.source]
    },

    wait: function (fn) {
        setTimeout(fn, this.WAIT_TIMEOUT)
    },

    WAIT_TIMEOUT: 100
}
