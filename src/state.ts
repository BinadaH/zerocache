// state.ts
export interface GameState {
  player: {
    username: string;
    balance: number;
    inventory: string[];
  };
  browser: {
    currentUrl: string;
    history: string[];
    isHacked: boolean;
  };
}

// Initial default state
const state: GameState = {
  player: {
    username: "Player1",
    balance: 500,
    inventory: ["Basic Decryptor"],
  },
  browser: {
    currentUrl: "home.com",
    history: ["home.com"],
    isHacked: false,
  }
};

// Accessor functions
export const getState = () => state;

export const updateState = (newState: Partial<GameState>) => {
  Object.assign(state, newState);
  // Optional: Trigger a re-render of the UI here
  console.log("State updated:", state);
};