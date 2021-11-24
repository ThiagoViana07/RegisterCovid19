const connection = require('../database/connection')

const created_at = Date.now()

module.exports = {

  async create(request, response) {
    const { laboratory, batch } = request.body

    await connection('vaccine').insert({
      laboratory, batch, created_at
    })
    return response.json({ laboratory, batch })
  },

  async show(request, response) {
    const vaccine = await connection('vaccine').select('*')
    return response.json(vaccine)
  }


}