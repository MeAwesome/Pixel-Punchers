function Player(){
  this.nickname = undefined;
  this.playerNumber = undefined;

  this.setPlayerNumber = function(num){
    this.playerNumber = num;
  }

  this.setPlayerNickname = function(name){
    this.nickname = name;
  }
}
