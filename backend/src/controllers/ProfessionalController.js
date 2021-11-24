const connection = require('../database/connection')

const created_at = Date.now()

module.exports = {

  async create(request, response) {
    const { name, email } = request.body

    if (name.length < 3) {
      return response.status(404).json({ error: 'The name must have more than 3 characters. ' })
    }

    await connection('professional').insert({
      name, email, created_at
    })

    return response.json({ name, email })
  },

  async show(request, response) {
    const professionals = await connection('professional').select('*')
    return response.json(professionals)
  }



}