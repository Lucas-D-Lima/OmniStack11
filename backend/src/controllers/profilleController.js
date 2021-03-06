const connection = require('../database/connection')

module.exports={
    async index(request, response){
        const ong_id = request.header.authorization

        const cases = await connection('cases').where('ong_id',ong_id).select('*')

        return response.json(cases)
    }
}