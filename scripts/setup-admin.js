const admin = require('firebase-admin');
const path = require('path');

// Initialize Firebase Admin with service account
const serviceAccount = require(path.join(__dirname, '..', 'service-account.json'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: 'wedding-f9ff0'
});

const auth = admin.auth();
const db = admin.firestore();

async function setupAdmin() {
  const email = 'admin@wedding.hu';
  const password = 'Wedding2026!';

  try {
    // Check if user already exists
    let user;
    try {
      user = await auth.getUserByEmail(email);
      console.log('User already exists:', user.uid);
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        // Create new user
        user = await auth.createUser({
          email: email,
          password: password,
          displayName: 'Wedding Admin'
        });
        console.log('Created new user:', user.uid);
      } else {
        throw error;
      }
    }

    // Create admin document in Firestore
    await db.collection('admins').doc(user.uid).set({
      email: email,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });
    console.log('Admin document created in Firestore');

    console.log('\n========================================');
    console.log('Admin setup complete!');
    console.log('========================================');
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('UID:', user.uid);
    console.log('\nYou can now login at /admin');
    console.log('========================================\n');

    process.exit(0);
  } catch (error) {
    console.error('Error setting up admin:', error);
    process.exit(1);
  }
}

setupAdmin();
