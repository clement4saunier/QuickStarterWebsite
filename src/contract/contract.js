import FundingAbi from './Funding.json'
import ERC20Abi from './ERC20.json'

export const contract = {
    address: "0xB8942E9e99C4F7eFF3B57Da5588661C76A7F6b6F",
    abi: FundingAbi
}

export const erc20Contract = {
    address: "0x992946917214397fdbDD6C6b63ecf615535b5D75",
    abi: ERC20Abi,
    name: "TKN"
}

export const erc20Contracts = [
    {
        address: "0x992946917214397fdbDD6C6b63ecf615535b5D75",
        abi: ERC20Abi,
        name: "USDC"
    },
    {
        address: "0x65c890037ba6e2dC260111E158b33cc9941368C7",
        abi: ERC20Abi,
        name: "USDT"
    }
]