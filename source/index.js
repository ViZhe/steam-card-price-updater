
import mongoose from 'mongoose'

import Badge from './models/Badge'
import Card from './models/Card'
import getPriceByHashName from './getPriceByHashName'


mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGO_DB_URL)

const updateCardPrice = async () => {
  const cardType = Math.floor(Math.random() * 2) ? 'normal' : 'foil'

  const badgeList = await Badge.find({
    [`cardList.${cardType}`]: {$not: {$size: 0}}
  }).sort({
    [`updatedAt.${cardType}`]: 1
  }).limit(100)
  const badge = badgeList[Math.floor(Math.random() * badgeList.length)]

  let wasUpdates = false
  let totalPrice = 0
  const cardNameList = badge.cardList[cardType]
  const cardList = await Promise.all(cardNameList.map(async ({hashName, price = 0}) => {
    const result = {
      hashName,
      price
    }

    try {
      const resultGetPrice = await getPriceByHashName(`${badge.steamId}-${hashName}`)
      if (resultGetPrice.status === 'ok') {
        result.price = parseFloat(resultGetPrice.data.replace(',', '.'))
        wasUpdates = true
        await Card.update({hashName}, {
          steamId: badge.steamId,
          price: result.price,
          isFoil: cardType !== 'normal',
          updatedAt: Date.now()
        }, {
          upsert: true
        })
      }
    } catch (e) {
      console.error(`[updateCardPrice] [catch] ${e.message}`)
    }

    totalPrice += result.price
    return result
  }))

  if (!wasUpdates) {
    return {
      status: 'skip',
      message: `[${badge.steamId}] [${cardType}] failed to get the price`
    }
  }

  const totalPriceRounded = Math.round(totalPrice * 100) / 100

  await Badge.update({_id: badge.id}, {
    $set: {
      [`cardList.${cardType}`]: cardList,
      [`totalPrice.${cardType}`]: totalPriceRounded,
      [`updatedAt.${cardType}`]: Date.now()
    }
  })

  return {
    status: 'updated',
    message: `[${badge.steamId}] [${cardType}] ${totalPriceRounded}`
  }
}

const runUpdater = setInterval(async () => {
  const result = await updateCardPrice()
  console.log(`[${result.status}] ${result.message}`)

  if (result.status === 'skip') {
    clearTimeout(runUpdater)
    mongoose.disconnect()
  }
}, 120000)
