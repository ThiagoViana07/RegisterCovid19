const { application } = require('express')
const { response } = require('../app')
const connection = require('../database/connection')

const created_at = Date.now()

module.exports = {

  async create(request, response) {
    const { name, first_dose, second_dose, next_dose, batch } = request.body
    const professional_id = request.headers.authorization

    const vaccine = await connection('vaccine')
      .where('batch', batch)
      .select('*')
      .first()

    if (!vaccine) {
      return response.status(404).json({ error: 'Vaccine Not Found!' })
    }

    const professional = await connection('professional')
      .where('id', professional_id)
      .select('*')
      .first()

    if (!professional) {
      return response.status(404).json({ error: 'Professional Not Found!' })
    }


    const vaccine_id = vaccine.id

    await connection('citizen').insert({
      name, first_dose, second_dose, next_dose, vaccine_id, professional_id, created_at
    })
    return response.json({ name, first_dose, second_dose, next_dose, vaccine_id, professional_id })
  },

  async show(request, response) {
    const citizens = await connection('citizen').select('*')
    return response.json(citizens)
  },

  async index(request, response) {
    const { name } = request.body
    // const citizen = await connection('citizen')
    //   .where('name', name)
    //   .select()
    //   .first()



    // const vaccine = await connection('vaccine')
    //   .where('id', citizen.vaccine_id)
    //   .select()
    //   .first()

    // return response.json({
    //   name: citizen.name,
    //   first_dose: citizen.first_dose,
    //   second_dose: citizen.second_dose,
    //   next_dose: citizen.next_dose,
    //   laboratory: vaccine.laboratory,
    //   batch: vaccine.batch
    // })

    const citizen = await connection('citizen')
      .innerJoin('vaccine', 'vaccine.id', "=", 'citizen.vaccine_id')
      .select([
        'citizen.name',
        'citizen.first_dose',
        'citizen.second_dose',
        'citizen.next_dose',
        'vaccine.laboratory',
        'vaccine.batch'
      ])
      .where('name', name)
      .first()

    if (!citizen) {
      return response.status(404).json({ error: 'Citizen not found!' })
    }

    return response.json(citizen)
  },

  async application_vaccine(request, response) {
    const { name_citizen } = request.body
    const professional_id = request.headers.authorization

    const professional = await connection('professional')
      .where('id', professional_id)
      .select('*')
      .first()

    if (!professional) {
      return response.status(404).json({ error: 'Professional Not Found!' })
    }


    const citizen = await connection('citizen')
      .where('name', name_citizen)
      .update({
        second_dose: true,
        next_dose: null
      })
      .select('*')

    if (!citizen) {
      return response.status(404).json({ error: 'Citizen not found!' })
    }
    return response.json(citizen)
  }



}