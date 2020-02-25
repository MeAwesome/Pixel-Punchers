function Player(){
  this.nickname = undefined;
  this.playerNumber = undefined;
  this.coords = {
    x:undefined,
    y:undefined
  }
  this.characterId = 0;

  this.setPlayerNumber = function(num){
    this.playerNumber = num;
  }

  this.setPlayerNickname = function(name){
    this.nickname = name;
  }
}
