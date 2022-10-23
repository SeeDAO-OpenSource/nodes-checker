require("dotenv").config()
const Web3 = require("web3")
const fs = require("fs")
const { parse } = require("csv-parse")
const { stringify } = require("csv-stringify")

const SGN = require("./sgn.js")
const SCR = require("./scr.js")

const FILENAME_TOKENHOLDERS = "tokenholders.csv"
const FILENAME_NODELIST = "nodelist.csv"

const nodelistColumns = ["Node", "Address", "SCR", "SGN", "Block", "Time"]

const rpcUrl = `https://mainnet.infura.io/v3/${process.env.INFURA_APIKEY}`

const web3 = new Web3(rpcUrl)

async function getTokenHolders() {
  return new Promise((resolve) => {
    let tokenHoldersAddress = []
    fs.createReadStream(FILENAME_TOKENHOLDERS)
      .pipe(parse({ delimiter: ",", from_line: 2 }))
      .on("data", function (row) {
        tokenHoldersAddress.push(row[0])
      })
      .on("end", function () {
        console.log("We are done!")
        resolve(tokenHoldersAddress)
      })
  })
}

function isNode(scr, sgn) {
  return scr >= process.env.SCR_THRESHOLD && sgn >= process.env.SGN_THRESHOLD
}

async function writeCSV(data) {
  return new Promise((resolve) => {
    const writableStream = fs.createWriteStream(FILENAME_NODELIST)
    const stringifier = stringify({ header: true, columns: nodelistColumns })

    data.forEach((row) => {
      stringifier.write(row)
    })
    stringifier.pipe(writableStream)
    resolve()
  })
}

async function main() {
  const holders = await getTokenHolders()
  let results = []

  for (var i = 0; i < holders.length; i++) {
    const wallet = holders[i]

    const block = await web3.eth.getBlock("latest")
    const time = new Date(block.timestamp * 1000)
    
    const scr = new web3.eth.Contract(SCR.abi(), SCR.address())
    const wei = await scr.methods.balanceOf(wallet).call()
    const scrNumber = web3.utils.fromWei(wei, "ether")

    const sgn = new web3.eth.Contract(SGN.erc721Abi(), SGN.address())
    const sgnNumber = await sgn.methods.balanceOf(wallet).call()

    const status = isNode(scrNumber, sgnNumber) ? "Y" : "N"

    const row = {
      Address: wallet,
      Block: block.number,
      Time: time.toUTCString(),
      SCR: scrNumber,
      SGN: sgnNumber,
      Node: status
    }

    console.log(
      i + 1,
      "/",
      holders.length,
      ": Address:",
      row.Address,
      ", Node: ",
      row.Node
    )
    results.push(row)
  }

  await writeCSV(results)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
