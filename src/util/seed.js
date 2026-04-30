// seed.js — run once with: node seed.js
const admin = require('firebase-admin')
const serviceAccount = require('./serviceAccountKey.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

const db = admin.firestore()
const auth = admin.auth()

const users = [
  { email: 'super@sea.edu', password: 'yourpassword', role: 'super' },
  { email: 'admin@sea.edu', password: 'yourpassword', role: 'admin' },
  { email: 'basic@sea.edu', password: 'yourpassword', role: 'basic' },
]

async function seed() {
  for (const user of users) {
    const created = await auth.createUser({ email: user.email, password: user.password })
    await db.collection('users').doc(created.uid).set({ role: user.role })
    console.log(`Created ${user.email} (${user.role})`)
  }
}

seed()