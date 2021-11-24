describe('Min length name', () => {
  it('should min name length', () => {
    const name = 'Thiago'
    const caracteres = name.length
    expect(caracteres).toBeGreaterThan(3)

  })
})

describe('Match @ email', () => {
  it('should @ in email', () => {
    const email = 'thiago@hotmail.com'

    expect(email).toMatch(/@/);

  })
})



