import { Actor, HttpAgent } from "@dfinity/agent";

// Imports candid interface
import { idlFactory } from './rock_paper_scissors_assets.did.js';
// CANISTER_ID is replaced by webpack based on node enviroment
export const canisterId = process.env.ROCK_PAPER_SCISSORS_ASSETS_CANISTER_ID;

/**
 * 
 * @param {string | Principal} canisterId Canister ID of Agent
 * @param {{agentOptions?: import("@dfinity/agent").HttpAgentOptions; actorOptions?: import("@dfinity/agent").ActorConfig}} [options]
 * @return {import("@dfinity/agent").ActorSubclass<import("./rock_paper_scissors_assets.did.js")._SERVICE>}
 */
 export const createActor = (canisterId, options) => {
  const agent = new HttpAgent({ ...options?.agentOptions });
  
  // Fetch root key for certificate validation during development
  if(process.env.NODE_ENV !== "production") agent.fetchRootKey();

  // Creates an actor with using the candid interface and the HttpAgent
  return Actor.createActor(idlFactory, {
    agent,
    canisterId,
    ...options?.actorOptions,
  });
};
  
/**
 * A ready-to-use agent for the rock_paper_scissors_assets canister
 * @type {import("@dfinity/agent").ActorSubclass<import("./rock_paper_scissors_assets.did.js")._SERVICE>}
 */
 export const rock_paper_scissors_assets = createActor(canisterId);