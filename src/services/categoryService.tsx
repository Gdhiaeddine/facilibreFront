// src/services/categoryService.ts
import { firestore } from '../contexts/firebase';
import { collection, doc, getDoc, setDoc, updateDoc, query, getDocs,where } from 'firebase/firestore';

export const getCategoryCollectionRef = () => collection(firestore, 'categories');

export const getCategoryDocRef = (categoryId: string) => doc(firestore, 'categories', categoryId);

export const fetchCategory = async (categoryId: string) => {
  const docRef = getCategoryDocRef(categoryId);
  const docSnap = await getDoc(docRef);
  
  if (!docSnap.exists()) {
    throw new Error('Category not found');
  }
  
  return {
    id: docSnap.id,
    ...docSnap.data()
  };
};

export const saveCategory = async (categoryData: any) => {
  const docRef = getCategoryDocRef(categoryData.id || '');
  
  if (categoryData.id) {
    await updateDoc(docRef, categoryData);
  } else {
    const newDocRef = doc(collection(firestore, 'categories'));
    await setDoc(newDocRef, {...categoryData, id: newDocRef.id});
    return newDocRef.id;
  }
};

export async function checkCategoryExists(name: string): Promise<boolean> {
    const q = query(collection(firestore, "categories"), where("name", "==", name));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  }
  