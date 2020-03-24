const connection = require('../database/connection')
const crypto = require('crypto')

module.exports={
    async index (require, response){
        const ongs = await connection('ongs').select('*')
    
        return response.json(ongs)
    },

    async create(request, response){
        const {name, email, Whatsapp, city, uf} = request.body

    const id = crypto.randomBytes(4).toString('HEX')

    await connection('ongs').insert({
        id,
        name,
        email,
        Whatsapp,
        city,
        uf
    })
    return response.json({id})
    }
}