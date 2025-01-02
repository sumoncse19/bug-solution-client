import { create } from 'zustand';

type RegistrationData = {
  email: string;
  username: string;
  enterprise: string;
  password: string;
};

const useAuthStore = create<{
  registrationData: RegistrationData;
  registeredMail: string;

  setRegistrationData: (data: Partial<RegistrationData>) => void;
  setRegisteredMail: (email: string) => void;
}>((set) => ({
  registrationData: {
    email: '',
    username: '',
    enterprise: '',
    password: '',
  },
  registeredMail:
    typeof window !== 'undefined'
      ? localStorage.getItem('registeredMail') || ''
      : '',

  setRegistrationData: (data) =>
    set((state) => ({
      registrationData: { ...state.registrationData, ...data },
    })),
  setRegisteredMail: (email) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('registeredMail', email);
    }
    set({ registeredMail: email });
  },
}));

export default useAuthStore;
