import admin from "firebase-admin";

type KeyPair = { [key: string]: string };

const { FIREBASE_CONFIG } = process.env as KeyPair;
const serviceAccount = JSON.parse(FIREBASE_CONFIG) as KeyPair;

export default admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
