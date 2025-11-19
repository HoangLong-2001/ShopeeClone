import { beforeEach,describe,expect, it } from 'vitest'
import http from '../http'
import { HttpStatusCode } from 'axios'

describe('http axios',()=>{
  beforeEach(()=>{
    localStorage.clear()
  })
    it('products',async()=>{
        const res = await http.get('products')
        expect(res.status).toBe(HttpStatusCode.Ok)
    })
})