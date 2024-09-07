from zokrates_pycrypto.gadgets.pedersenHasher import PedersenHasher
from zokrates_pycrypto.utils import insert_uint256_to_array

def generate_identity_proof(user_data):
    hasher = PedersenHasher("test")
    hashed_data = hasher.hash_bytes(user_data.encode())
    return insert_uint256_to_array(int(hashed_data))

