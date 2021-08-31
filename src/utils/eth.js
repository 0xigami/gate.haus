import Web3 from 'web3'
import Web3Modal from 'web3modal'
import WalletConnectProvider from '@walletconnect/web3-provider'
import Fortmatic from 'fortmatic'
import Torus from '@toruslabs/torus-embed'
import Authereum from 'authereum'

export async function signMessage ({ body }) {
  const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        infuraId: 'abcc7c6003a44f58a86a71ae0f8fa3c8' // Infura PROJECT ID
      }
    },
    fortmatic: {
      package: Fortmatic,
      options: {
        key: 'pk_live_A14B69C286B8428E' // Production Mainnet
      }
    },
    torus: {
      package: Torus
    },
    authereum: {
      package: Authereum
    }
  }

  const web3Modal = new Web3Modal({
    network: 'mainnet', // optional
    cacheProvider: true, // optional
    providerOptions, // required
    disableInjectedProvider: false
  })

  const provider = await web3Modal.connect()

  const web3 = new Web3(provider)

  const accounts = await web3.eth.getAccounts()
  const account = accounts[0]
  console.log('signing with ', account)
  const signature = await web3.eth.personal.sign(body, account)
  const signingAddress = web3.eth.accounts.recover(body, signature)

  console.log('Signature: ', signature)
  console.log('recovered signingAddress: ', signingAddress)

  return signature
}
