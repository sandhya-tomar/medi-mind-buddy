
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface UserProfile {
  id: string;
  name: string;
  age: string;
  email: string;
  phone: string;
  emergencyContact: string;
  medicalConditions: string;
  allergies: string;
  doctorName: string;
  doctorPhone: string;
  healthStreak: number;
  totalMedications: number;
  completedToday: number;
  healthScore: number;
  role?: 'patient' | 'caregiver';
  createdAt: string;
  lastActive: string;
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  time: string;
  type: string;
  notes: string;
  taken: boolean;
  takenAt?: string;
}

export interface HealthMetric {
  name: string;
  value: string;
  status: string;
  progress: number;
  timestamp: string;
}

interface UserContextType {
  currentUser: UserProfile | null;
  medications: Medication[];
  healthMetrics: HealthMetric[];
  setCurrentUser: (user: UserProfile | null) => void;
  updateUserProfile: (updates: Partial<UserProfile>) => void;
  addMedication: (medication: Omit<Medication, 'id' | 'taken'>) => void;
  updateMedication: (id: string, updates: Partial<Medication>) => void;
  deleteMedication: (id: string) => void;
  markMedicationTaken: (id: string) => void;
  updateHealthMetrics: (metrics: HealthMetric[]) => void;
  getAllUsers: () => UserProfile[];
  switchUser: (userId: string) => void;
  createNewUser: (profile: Omit<UserProfile, 'id' | 'createdAt' | 'lastActive'>) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [medications, setMedications] = useState<Medication[]>([]);
  const [healthMetrics, setHealthMetrics] = useState<HealthMetric[]>([]);

  // Load user data from localStorage on mount
  useEffect(() => {
    const savedUserId = localStorage.getItem('currentUserId');
    if (savedUserId) {
      loadUserData(savedUserId);
    }
  }, []);

  // Save data whenever medications or health metrics change
  useEffect(() => {
    if (currentUser) {
      saveUserData();
    }
  }, [medications, healthMetrics]);

  const loadUserData = (userId: string) => {
    const userData = localStorage.getItem(`user_${userId}`);
    const medicationData = localStorage.getItem(`medications_${userId}`);
    const healthData = localStorage.getItem(`health_${userId}`);

    if (userData) {
      const user = JSON.parse(userData);
      setCurrentUser(user);
      localStorage.setItem('currentUserId', userId);
    }

    if (medicationData) {
      setMedications(JSON.parse(medicationData));
    } else {
      // Default medications for new users
      const defaultMeds: Medication[] = [
        {
          id: '1',
          name: 'Aspirin',
          dosage: '75mg',
          frequency: 'Once daily',
          time: '09:00',
          type: 'Heart',
          notes: 'Take with food',
          taken: false
        }
      ];
      setMedications(defaultMeds);
    }

    if (healthData) {
      setHealthMetrics(JSON.parse(healthData));
    } else {
      // Default health metrics
      const defaultMetrics: HealthMetric[] = [
        { name: 'Blood Pressure', value: '120/80', status: 'normal', progress: 85, timestamp: new Date().toISOString() },
        { name: 'Heart Rate', value: '72 BPM', status: 'good', progress: 90, timestamp: new Date().toISOString() },
        { name: 'Blood Sugar', value: '95 mg/dL', status: 'normal', progress: 80, timestamp: new Date().toISOString() },
        { name: 'Temperature', value: '98.6°F', status: 'normal', progress: 95, timestamp: new Date().toISOString() }
      ];
      setHealthMetrics(defaultMetrics);
    }
  };

  const saveUserData = () => {
    if (currentUser) {
      const updatedUser = {
        ...currentUser,
        lastActive: new Date().toISOString(),
        completedToday: medications.filter(med => med.taken).length,
        totalMedications: medications.length
      };
      
      localStorage.setItem(`user_${currentUser.id}`, JSON.stringify(updatedUser));
      localStorage.setItem(`medications_${currentUser.id}`, JSON.stringify(medications));
      localStorage.setItem(`health_${currentUser.id}`, JSON.stringify(healthMetrics));
    }
  };

  const updateUserProfile = (updates: Partial<UserProfile>) => {
    if (currentUser) {
      const updatedUser = { ...currentUser, ...updates };
      setCurrentUser(updatedUser);
    }
  };

  const addMedication = (medication: Omit<Medication, 'id' | 'taken'>) => {
    const newMedication: Medication = {
      ...medication,
      id: Date.now().toString(),
      taken: false
    };
    setMedications(prev => [...prev, newMedication]);
  };

  const updateMedication = (id: string, updates: Partial<Medication>) => {
    setMedications(prev => prev.map(med => 
      med.id === id ? { ...med, ...updates } : med
    ));
  };

  const deleteMedication = (id: string) => {
    setMedications(prev => prev.filter(med => med.id !== id));
  };

  const markMedicationTaken = (id: string) => {
    setMedications(prev => prev.map(med => 
      med.id === id ? { ...med, taken: true, takenAt: new Date().toISOString() } : med
    ));
  };

  const updateHealthMetrics = (metrics: HealthMetric[]) => {
    setHealthMetrics(metrics);
  };

  const getAllUsers = (): UserProfile[] => {
    const users: UserProfile[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('user_')) {
        const userData = localStorage.getItem(key);
        if (userData) {
          users.push(JSON.parse(userData));
        }
      }
    }
    return users.sort((a, b) => new Date(b.lastActive).getTime() - new Date(a.lastActive).getTime());
  };

  const switchUser = (userId: string) => {
    loadUserData(userId);
  };

  const createNewUser = (profile: Omit<UserProfile, 'id' | 'createdAt' | 'lastActive'>) => {
    const newUser: UserProfile = {
      ...profile,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      lastActive: new Date().toISOString()
    };
    
    setCurrentUser(newUser);
    setMedications([]);
    setHealthMetrics([]);
    localStorage.setItem('currentUserId', newUser.id);
  };

  return (
    <UserContext.Provider
      value={{
        currentUser,
        medications,
        healthMetrics,
        setCurrentUser,
        updateUserProfile,
        addMedication,
        updateMedication,
        deleteMedication,
        markMedicationTaken,
        updateHealthMetrics,
        getAllUsers,
        switchUser,
        createNewUser
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
