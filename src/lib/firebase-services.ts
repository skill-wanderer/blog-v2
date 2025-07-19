import { getFirebaseFirestore } from './firebase';
import {
  collection,
  addDoc,
  Timestamp,
} from 'firebase/firestore';

// Types for blog-related data
export interface BlogSubscriber {
  id?: string;
  email: string;
  subscribedAt: Timestamp;
  source: string;
}

// Firestore service class
class FirestoreService {
  private db = getFirebaseFirestore();

  // Newsletter subscription management
  async addSubscriber(subscriberData: Omit<BlogSubscriber, 'id' | 'subscribedAt'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(this.db, 'subscribers'), {
        ...subscriberData,
        subscribedAt: Timestamp.now(),
      });
      return docRef.id;
    } catch (error) {
      console.error('Error adding subscriber:', error);
      throw error;
    }
  }
}

// Export service instances
export const firestoreService = new FirestoreService();
