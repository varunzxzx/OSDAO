abi = JSON.parse(
  '[{"inputs":[{"internalType":"bytes32[]","name":"candidateNames","type":"bytes32[]"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"candidateList","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"candidate","type":"bytes32"}],"name":"totalVotesFor","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"candidate","type":"bytes32"}],"name":"validCandidate","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"candidate","type":"bytes32"}],"name":"voteForCandidate","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"votesReceived","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]'
);

provider = new ethers.providers.JsonRpcProvider();
signer = provider.getSigner(0);
contract = new ethers.Contract(
  "0xBc709015F774413dDD7ca733D94cBFb487A70bb6",
  abi,
  signer
);

candidates = { Rama: "candidate-1", Nick: "candidate-2", Jose: "candidate-3" };

function voteForCandidate(candidate) {
  candidateName = $("#candidate").val();
  console.log(candidateName);

  contract
    .voteForCandidate(ethers.utils.formatBytes32String(candidateName), {
      value: ethers.utils.parseEther("0.01"),
    })
    .then((f) => {
      let div_id = candidates[candidateName];
      contract
        .totalVotesFor(ethers.utils.formatBytes32String(candidateName))
        .then((f) => {
          console.log(f);
          $("#" + div_id).html(f.toNumber());
        });
    });
}

$(document).ready(function () {
  candidateNames = Object.keys(candidates);

  for (var i = 0; i < candidateNames.length; i++) {
    let name = candidateNames[i];
    contract.totalVotesFor(ethers.utils.formatBytes32String(name)).then((f) => {
      $("#" + candidates[name]).html(f.toNumber());
    });
  }
});
