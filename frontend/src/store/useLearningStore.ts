import { create } from 'zustand';

export interface Step {
  id: string;
  title: string;
  completed: boolean;
  isActive?: boolean;
}

export interface Message {
  role: 'assistant' | 'user';
  content: string;
  time: string;
}

interface LearningState {
  currentTopic: string | null;
  learningPath: Step[];
  code: string;
  messages: Message[];
  terminalOutput: string;
  isLoading: boolean;
  
  // Actions
  setTopic: (topic: string) => Promise<void>;
  updateCode: (newCode: string | undefined) => void;
  sendMessage: (msg: string) => Promise<void>;
  runCode: () => Promise<void>;
  reset: () => void;
}

export const useLearningStore = create<LearningState>((set, get) => ({
  currentTopic: null, 
  learningPath: [],
  code: '# Ready to write Python code',
  messages: [],
  terminalOutput: '',
  isLoading: false,

  setTopic: async (topic) => {
    set({ currentTopic: topic, isLoading: true, code: '# Loading starting code...' });
    try {
      const res = await fetch('http://localhost:8000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_id: 'default', message: topic, is_first_topic: true })
      });
      const data = await res.json();
      
      const newPlan = data.plan?.map((p: string, idx: number) => ({
        id: idx.toString(),
        title: p,
        completed: false,
        isActive: idx === 0
      })) || [];

      set((state) => ({
        learningPath: newPlan,
        messages: [{ role: 'assistant', content: data.reply || `Let's dive into ${topic}.`, time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }],
        code: data.starting_code || state.code,
        isLoading: false
      }));
    } catch (e) {
      console.error(e);
      set({ isLoading: false });
    }
  },

  updateCode: (newCode) => set({ code: newCode || '' }),

  sendMessage: async (msg) => {
    set((state) => ({
      messages: [...state.messages, { role: 'user', content: msg, time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }],
      isLoading: true
    }));
    
    try {
      const res = await fetch('http://localhost:8000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_id: 'default', message: msg, is_first_topic: false })
      });
      const data = await res.json();
      
      set((state) => ({
        messages: [...state.messages, { role: 'assistant', content: data.reply, time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }],
        isLoading: false
      }));
    } catch (e) {
      console.error(e);
      set({ isLoading: false });
    }
  },

  runCode: async () => {
    const code = get().code;
    set({ terminalOutput: 'Running code...', isLoading: true });
    try {
      const res = await fetch('http://localhost:8000/api/run-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_id: 'default', code })
      });
      const data = await res.json();
      
      set((state) => ({
        terminalOutput: data.terminal_output || '',
        messages: data.ai_feedback ? [...state.messages, { role: 'assistant', content: data.ai_feedback, time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }] : state.messages,
        isLoading: false
      }));
    } catch (e) {
      console.error(e);
      set({ terminalOutput: 'Error running code', isLoading: false });
    }
  },

  reset: () => set({ currentTopic: null, learningPath: [], messages: [], terminalOutput: '' })
}));