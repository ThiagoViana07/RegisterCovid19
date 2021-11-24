const request = require('supertest')
const app = require('../../src/app')
const conecction = require('../../src/database/connection')

describe('PROFESSIONAL', () => {
  beforeEach(async () => {
    await conecction.migrate.rollback();
    await conecction.migrate.latest();
  })

  // afterAll(async () => {
  //   await conecction.destroy();
  // })

  it('should be able to create a new Professional', async () => {
    const created_at = Date.now()
    const response = await request(app)
      .post('/professional')
      .send({
        name: "Thiago",
        email: "thiago@hotmail.com",
        created_at: created_at
      })

    expect(response.body).toHaveProperty('email')
  })
})

describe('VACCINE', () => {
  // beforeEach(async () => {
  //   await conecction.migrate.rollback();
  //   await conecction.migrate.latest();
  // })

  // afterAll(async () => {
  //   await conecction.destroy();
  // })

  it('should be able to create a new Vaccine', async () => {
    const created_at = Date.now()
    const response = await request(app)
      .post('/vaccine')
      .send({
        laboratory: "coronavac",
        batch: "1",
        created_at: created_at
      })

    expect(response.body).toHaveProperty('batch')
  })
})



describe('CITIZIEN', () => {
  // beforeEach(async () => {
  //   await conecction.migrate.rollback();
  //   await conecction.migrate.latest();
  // })

  afterAll(async () => {
    await conecction.destroy();
  })

  it('should be able to create a new Citizen', async () => {
    const created_at = Date.now()
    const response = await request(app)
      .post('/citizen')
      .set("Authorization", 1)
      .send({
        name: "Fulano",
        first_dose: true,
        second_dose: false,
        next_dose: "2021-01-21",
        batch: '1',
        created_at: created_at
      })

    expect(response.body).toHaveProperty('name')
  })

  it('should be able show one Citizen', async () => {
    const response = await request(app)
      .get('/citizen-index')
      .send({
        name: "Fulano"
      })

    expect(response.body).toHaveProperty('name')
  })

  it('should be able second_dose citizen', async () => {
    const response = await request(app)
      .put('/citizen')
      .set("Authorization", 1)
      .send({
        name_citizen: "Fulano"
      })

    expect(response.body).toBe(1)
  })
})