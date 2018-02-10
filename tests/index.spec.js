import axios from 'axios'

import syncMoxios from '../'

const request1 = () => {
    axios.get('/foo/bar')
}
const request2 = (data) => {
    axios.post('/baz/qux', data)
}

describe('syncMoxios', () => {
    beforeEach(() => {
        syncMoxios.install()
    })

    afterEach(() => {
        syncMoxios.uninstall()
    })

    it('standard behavior', (done) => {
        const response = {
            status: 200,
            data: { foo: 'bar' }
        }

        const spy = syncMoxios.stubRequest('/foo/bar', response)
        request1()

        syncMoxios.wait(() => {
            expect(spy.mostRecentRequest().url).toBe('/foo/bar')
            expect(spy.mostRecentResponse()).toBe(response)
            done()
        })
    })

    it('parallel requests', (done) => {
        const response1 = {
            status: 200,
            data: { foo: 'bar' }
        }
        const response2 = {
            status: 200,
            data: { bar: 'zux' }
        }

        const spy1 = syncMoxios.stubRequest('/foo/bar', response1)
        request1()

        const spy2 = syncMoxios.stubRequest('/baz/qux', response2)
        const requestBody = { bar: 'qux' }
        request2(requestBody)

        syncMoxios.wait(() => {
            expect(spy1.mostRecentRequest().url).toBe('/foo/bar')
            expect(spy1.mostRecentResponse()).toBe(response1)
            // FIXME
            expect(spy2.mostRecentRequest().data).toBe(JSON.stringify(requestBody))
            expect(spy2.mostRecentResponse()).toBe(response2)
            done()
        })
    })

    it('two requests', (done) => {
        const response = {
            status: 200,
            data: { foo: 'bar' }
        }

        const spy = syncMoxios.stubRequest('/foo/bar', response)
        request1()
        request1()

        syncMoxios.wait(() => {
            expect(spy.requestsCount()).toBe(2)
            done()
        })
    })

    it('response function', (done) => {
        const response = (resolve, request) => {
            if (request.data) {
                return resolve({
                    status: 200
                })
            }

            return resolve({
                status: 500
            })
        }

        const spy = syncMoxios.stubRequest('/baz/qux', response)
        request2()

        syncMoxios.wait(() => {
            expect(spy.mostRecentResponse().status).toBe(500)
            request2('data')

            syncMoxios.wait(() => {
                expect(spy.mostRecentResponse().status).toBe(200)

                done()
            })
        })
    })
})
