
import fetch from 'node-fetch'


const getPriceByHashName = async (hashName) => {
  if (!hashName) {
    return {
      status: 'error'
    }
  }
  try {
    const res = await fetch(`http://steamcommunity.com/market/priceoverview/?format=json&currency=5&appid=753&market_hash_name=${hashName}`)
    if (res.status !== 200) {
      console.error(`[getPriceByHashName] [statusCode] ${res.status}`)
      return {
        status: 'error'
      }
    }
    const resJson = await res.json()
    if (resJson === null || !resJson.success) {
      console.error('[getPriceByHashName] resJson test')
      return {
        status: 'error'
      }
    }
    return {
      status: 'ok',
      data: resJson.lowest_price || '0'
    }
  } catch (e) {
    console.error(`[getPriceByHashName] [catch] ${e.message}`)
    return {
      status: 'error'
    }
  }
}

export default getPriceByHashName
