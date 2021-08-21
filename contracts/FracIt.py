import smartpy as sp

# Main FracIt Contract

class FracIt(sp.Contract):
    def __init__(self):
        self.tokenContract = FA12()
        self.init(
            issues = sp.big_map(tkey=sp.TAddress, tvalue=sp.TRecord(address = sp.TAddress, token_id = sp.TNat)),
            rev_issues = sp.big_map(tkey=sp.TRecord(address = sp.TAddress, token_id = sp.TNat), tvalue=sp.TAddress),
        )
    
    @sp.entry_point
    def frac(self, params):
        '''
        Fractionalize an NFT (nft_address, token_id) into (supply) fungible tokens.
        Requires that this contract be an operator of the NFT token with the current owner.
        '''
        sp.set_type(params, sp.TRecord(nft_address = sp.TAddress, nft_token_id = sp.TNat, supply = sp.TNat))

        # define transfer entrypoint
        transfer_entry = sp.contract(
            sp.TList(
                sp.TPair(
                    sp.TAddress,
                    sp.TList(
                        sp.TPair(
                            sp.TAddress,
                            sp.TPair(
                                sp.TNat,
                                sp.TNat
                            )
                        )
                    )
                )
            ), params.nft_address, entry_point = "transfer"
        ).open_some()

        # transfer NFT to contract
        sp.transfer(sp.list([sp.pair(
            sp.sender,
            sp.list([
                sp.pair(
                    sp.to_address(sp.self),
                    sp.pair(
                        params.nft_token_id,
                        sp.as_nat(1)
                    )
                )
            ]))]
        ), sp.mutez(0), transfer_entry)

        # create fungible token contract, with the minted
        # tokens under the caller's address 
        new_contract = sp.create_contract(
            storage = sp.record(
                balances = sp.map({
                    sp.sender : sp.record(
                        approvals = {
                            sp.sender : params.supply
                        }, balance = params.supply
                    )
                }),
                totalSupply = params.supply
            ),
            contract = self.tokenContract
        )

        self.data.issues[new_contract] = sp.record(address = params.nft_address, token_id = params.nft_token_id)
        self.data.rev_issues[sp.record(address = params.nft_address, token_id = params.nft_token_id)] = new_contract

    @sp.entry_point
    def defrac(self, fa1_2_token_address):
        '''
        Burns the fungible tokens associated with an NFT and redeems the NFT.
        Requires the caller holds all issued fungible tokens.
        '''
        # call redeem method on generated FA1.2 contract to burn tokens
        redeem_entry = sp.contract(sp.TUnit, fa1_2_token_address, entry_point = "redeem").open_some()
        sp.transfer(sp.unit, sp.mutez(0), redeem_entry)

        # define transfer entrypoint
        transfer_entry = sp.contract(
            sp.TList(
                sp.TPair(
                    sp.TAddress,
                    sp.TList(
                        sp.TPair(
                            sp.TAddress,
                            sp.TPair(
                                sp.TNat,
                                sp.TNat
                            )
                        )
                    )
                )
            ), self.data.issues[fa1_2_token_address].address, entry_point = "transfer"
        ).open_some()

        # transfer nft
        sp.transfer(sp.list([sp.pair(
            sp.to_address(sp.self),
            sp.list([
                sp.pair(
                    sp.source,
                    sp.pair(
                        self.data.issues[fa1_2_token_address].token_id,
                        sp.as_nat(1)
                    )
                )
            ]))]
        ), sp.mutez(0), transfer_entry)

        del self.data.rev_issues[sp.record(address = self.data.issues[fa1_2_token_address].address, token_id = self.data.issues[fa1_2_token_address].token_id)]
        del self.data.issues[fa1_2_token_address]


# FA1.2 Token Definition.
# Taken from reference implementation, with an additional 'redeem' method.

class FA12_Error:
    def make(s): return ("FA1.2_" + s)

    InsufficientBalance   = make("InsufficientBalance")
    UnsafeAllowanceChange = make("UnsafeAllowanceChange")
    NotAllowed            = make("NotAllowed")

class FA12(sp.Contract):
    def __init__(self):
        self.init_type(
            sp.TRecord(
                balances = sp.TMap(
                    sp.TAddress, sp.TRecord(approvals = sp.TMap(sp.TAddress, sp.TNat), balance = sp.TNat)
                ),
                totalSupply = sp.TNat
            )
        )

    @sp.entry_point
    def redeem(self):
        sp.if self.data.balances.contains(sp.source):
            sp.if self.data.balances[sp.source].balance == self.data.totalSupply:
                self.data.balances[sp.source].balance = 0

    @sp.entry_point
    def transfer(self, params):
        sp.set_type(params, sp.TRecord(from_ = sp.TAddress, to_ = sp.TAddress, value = sp.TNat).layout(("from_ as from", ("to_ as to", "value"))))
        sp.verify(
                ((params.from_ == sp.sender) |
                 (self.data.balances[params.from_].approvals[sp.sender] >= params.value)), FA12_Error.NotAllowed)
        self.addAddressIfNecessary(params.from_)
        self.addAddressIfNecessary(params.to_)
        sp.verify(self.data.balances[params.from_].balance >= params.value, FA12_Error.InsufficientBalance)
        self.data.balances[params.from_].balance = sp.as_nat(self.data.balances[params.from_].balance - params.value)
        self.data.balances[params.to_].balance += params.value
        sp.if (params.from_ != sp.sender):
            self.data.balances[params.from_].approvals[sp.sender] = sp.as_nat(self.data.balances[params.from_].approvals[sp.sender] - params.value)

    def addAddressIfNecessary(self, address):
        sp.if ~ self.data.balances.contains(address):
            self.data.balances[address] = sp.record(balance = 0, approvals = {})

    @sp.entry_point
    def approve(self, params):
        sp.set_type(params, sp.TRecord(spender = sp.TAddress, value = sp.TNat).layout(("spender", "value")))
        self.addAddressIfNecessary(sp.sender)
        alreadyApproved = self.data.balances[sp.sender].approvals.get(params.spender, 0)
        sp.verify((alreadyApproved == 0) | (params.value == 0), FA12_Error.UnsafeAllowanceChange)
        self.data.balances[sp.sender].approvals[params.spender] = params.value

    @sp.utils.view(sp.TNat)
    def getBalance(self, params):
        sp.if self.data.balances.contains(params):
            sp.result(self.data.balances[params].balance)
        sp.else:
            sp.result(sp.nat(0))

    @sp.utils.view(sp.TNat)
    def getAllowance(self, params):
        sp.if self.data.balances.contains(params.owner):
            sp.result(self.data.balances[params.owner].approvals.get(params.spender, 0))
        sp.else:
            sp.result(sp.nat(0))

    @sp.utils.view(sp.TNat)
    def getTotalSupply(self, params):
        sp.set_type(params, sp.TUnit)
        sp.result(self.data.totalSupply)

sp.add_compilation_target("FracIt", FracIt())