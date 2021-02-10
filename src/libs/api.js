export default [
    {
        name: '获取access_token',
        route: '/token',
        method: 'GET',
        params: [
            {
                name:'grant_type',
                default: 'client_credential',
            },
            {
                name:'appId',
                default: 'wx9173e3022a7c6764',
            },
            {
                name:'secret',
                default: '2d1696fbc9f0f715bdc16649854fdbb4'
            }
        ]
    }
]