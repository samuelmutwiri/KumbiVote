from decouple import config
from web3 import Web3

w3 = Web3(Web3.HTTPProvider(config('INFURA_URL')))

contract_abi = ""
contract_address = config("CONTRACT_ADDRESS")

contract = w3.eth.contract(address=contract_address, abi=contract_abi)

def register_user_on_blockchain(user_id, identity_hash):
    # Get account private key
    account = w3.eth.account.privateKeyToAccount(config('PRIVATE_KEY'))

    # Build transaction
    txn =
    contract.functions.registerIdentity(identity_hash).buildTransaction({
        'from': account.address,
        'nonce': w3.eth.getTransactionCount(account.address),
    })

    # Sign and send transaction
    signed_txn = account.signTransaction(txn)
    tx_hash = w3.eth.sendRawTransaction(signed_txn.rawTransaction)

    # Wait for transaction receipt
    tx_receipt = w3.eth.waitForTransactionReceipt(tx_hash)

    return tx_receipt
