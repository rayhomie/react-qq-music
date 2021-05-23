import request from '@/utils/request'

export const getCookie = () => request({ method: 'GET', url: `/getCookie` })
