import { useEffect, useState } from 'react';
import apiList from './libs/api'
import axios from 'axios'
axios.defaults.baseURL = 'https://api.weixin.qq.com/cgi-bin'

function App() {

  let [selectedApi, setSelectedApi] = useState(0)
  let [params, setParams] = useState({

  })

  useEffect(() => {
    const newParams = {}
    apiList[selectedApi].params.forEach((p) => {
      newParams[p.name] = p.default
    })
    setParams(newParams)
  }, [])
  return (
    <div className="App">
      <span>选择API</span>
      <select value={selectedApi} onChange={(target) => {
        setSelectedApi(target.value)
      }}>
        {
          apiList.map((api, index) => {
            return (
              <option key={index} value={index}>{api.name}&nbsp;{api.route}</option>
            )
          })
        }
      </select>
      <div>
        <span>method</span>
        <span>{apiList[selectedApi].method}</span>
      </div>
      {
        apiList[selectedApi].params.map((p) => {
          return (
            <div key={ p.name}>
              <span>{p.name}</span>
              <input value={params[p.name] || ''} onChange={({ target }) => {
                const newParams = {...params}
                newParams[p.name] = target.value
                setParams(newParams)
              }}/>
            </div>
          )
        })
      }
      <div>
        <button onClick={async () => {
          console.log('submit', params)
          const api = apiList[selectedApi]
          const callApi = async () => {

            switch (api.method.toLowerCase()) {
              case 'get':
                return await axios.get(api.route, { params })
              case 'post':
              case 'put':
                return await axios[api.method.toLowerCase()](params)
              default:
                return {}
            }
          }
          const res = await callApi()
          console.log(res)
          
        }}>提交</button>
      </div>
    </div>
  );
}

export default App;
