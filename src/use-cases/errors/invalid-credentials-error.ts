export class InvalidaCredentialsError extends Error {
  constructor() {
    super('Invalid credentials.')
  }
}