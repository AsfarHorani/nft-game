import React, { useEffect, useState } from 'react';
import './App.css';
import twitterLogo from './assets/twitter-logo.svg';
import SelectCharacter from './Components/SelectCharacter';
import { CONTRACT_ADDRESS, transformCharacterData } from './constants';
import myEpicGame from './utils/MyEpicGame.json';
import { ethers } from 'ethers';
import Arena from './Components/Arena/index.jsx';
import LoadingIndicator from './Components/LoadingIndicator';

// Constants
const TWITTER_HANDLE = 'asfarhorani';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const App = () => {
  // State
// State
const [currentAccount, setCurrentAccount] = useState(null);
const [isLoading, setIsLoading] = useState(false);
const [wrongNetwork, setWrongNetwork] = useState(false);
/*
 * Right under current account, setup this new state property
 */
const [characterNFT, setCharacterNFT] = useState(null);
  // Actions
  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log('Make sure you have MetaMask!');
                setIsLoading(false);

        return;
      } else {
        console.log('We have the ethereum object', ethereum);

        const accounts = await ethereum.request({ method: 'eth_accounts' });

        if (accounts.length !== 0) {
          const account = accounts[0];
          console.log('Found an authorized account:', account);
          setCurrentAccount(account);
          checkNetwork();
        } else {
          console.log('No authorized account found');
        }
      }
    } catch (error) {
      console.log(error);
    }
        setIsLoading(false);

  };

  /*
   * Implement your connectWallet method here
   */
  const connectWalletAction = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert('Get MetaMask!');
        return;
      }

      /*
       * Fancy method to request access to account.
       */
      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });

      /*
       * Boom! This should print out public address once we authorize Metamask.
       */
      console.log('Connected', accounts[0]);
      setCurrentAccount(accounts[0]);
      checkNetwork();
    } catch (error) {
      console.log(error);
    }
  };
const checkNetwork = async () => {
  try { 
    if (window.ethereum.networkVersion !== '4') {
      alert("Please connect to Rinkeby!")
      setWrongNetwork(true);
    }
    else{
      setWrongNetwork(false);

    }
  } catch(error) {
    console.log(error)
  }
}

  useEffect(() => {
      setIsLoading(true);

    checkIfWalletIsConnected();
  }, []);
// Render Methods
const renderContent = () => {
  console.log("characterNFT", characterNFT)
  if (isLoading) {
    return <LoadingIndicator />;
  }
  if (!currentAccount) {
    return (
      <div className="connect-wallet-container">
        <img
          src="https://cinephellasdotcom.files.wordpress.com/2018/06/avengers-infinity-war-release-date-change-april.jpg"
          alt="Monty Python Gif"
        />
        <button
          className="cta-button connect-wallet-button"
          onClick={connectWalletAction}
        >
          Connect Wallet To Get Started
        </button>
      </div>
    );
  } else if (currentAccount && !characterNFT) {
    console.log("acc hai but no nft")
    return <SelectCharacter  wrongNetwork={wrongNetwork} setCharacterNFT={setCharacterNFT} />;	
	/*
	* If there is a connected wallet and characterNFT, it's time to battle!
	*/
  } else if (currentAccount && characterNFT) {
        console.log("acc hai but nft bhi hai")

    return <Arena setCharacterNFT={setCharacterNFT} currentAccount={currentAccount} characterNFT={characterNFT} />;
  }
};

  useEffect(() => {
  /*
   * The function we will call that interacts with our smart contract
   */
  const fetchNFTMetadata = async () => {
    console.log('Checking for Character NFT on address:', currentAccount);

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const gameContract = new ethers.Contract(
      CONTRACT_ADDRESS,
      myEpicGame.abi,
      signer
    );

    const txn = await gameContract.checkIfUserHasNFT();
    if (txn.name) {
      console.log('User has character NFT');
      setCharacterNFT(transformCharacterData(txn));
    } else {
      console.log('No character NFT found');
    }
 
      setIsLoading(false);

  };

  /*
   * We only want to run this, if we have a connected wallet
   */
  if (currentAccount) {
    console.log('CurrentAccount:', currentAccount);
    fetchNFTMetadata();
  }
}, [currentAccount,wrongNetwork]);
  
      
  return (
  <div className="App">
    <div className="container">
      <div className="header-container">
        <p className="header gradient-text">?????? Infinity war ??????</p>
        <p className="sub-text">Team up to defeat thanos and save universe!</p>
        {wrongNetwork? <p className="sub-text">Please switch to rinkeby!!</p>: renderContent()}
      </div>
      <div className="footer-container">
        <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
        <a
          className="footer-text"
          href={TWITTER_LINK}
          target="_blank"
          rel="noreferrer"
        >{`built with @${TWITTER_HANDLE}`}</a>
      </div>
    </div>
  </div>
)
};
export default App;
