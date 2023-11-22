var adjectives = ["tall","short","young","old","pretty","big","small","nice","kind","brave","funny","calm","proud","silly","happy","cute","clean","flat","round","wide","tiny","loud","quiet","red","orange","green","blue","yellow","purple","gray","pink","odd","rich","jolly","low","cold","cool","dry"];

var nouns = ["mall","toy","book","dog","cat","cup","pig","horse","mouse","egg","door","sock","bat","bed","bun","cake","cow","doll","hat","jar","kite","map","bird","clam","desk","dime","fog","hose","joke","rock","seed","snow","star","toe","arm","camp","frog","lock","meal","owl","plot","bunny","song","tiger","wish","hair","pest"];

var numbers_to_avoid = [69]; // sigh
// to avoid other numbers, add them inside the square brackets [] above.
// separate multiple numbers with commas
// example: var numbers_to_avoid = [69, 420];

var combinations_to_avoid = []; 
// to avoid other word combinations, add them inside the square brackets [] above.
// put the words inside "quotation marks" and separate with commas
// example: var combinations_to_avoid = [ "tallcup", "nicehorse", "calmegg" ];


function getPassword(){
  var base;
  do{
    var adjective = adjectives[randomInt(adjectives.length)];
    var noun = nouns[randomInt(nouns.length)];
    base = adjective+noun;
  }
  while(combinations_to_avoid.indexOf(base)!=-1);
  var number;
  do {
  number = Math.floor(Math.random() * 88) + 11;
  }
  while(numbers_to_avoid.indexOf(number)!=-1);

return base+number;
}


function generatePassword() {
  var activeSheet = SpreadsheetApp.getActiveSheet();
  var selection = activeSheet.getActiveRange();
  var used = [];
  for(var i=0; i<selection.getNumRows(); i++){
    for(var j=0; j<selection.getNumColumns(); j++){
      var password;
      do{
        password = getPassword();
      }
      while(used.indexOf(password)>-1);
      used.push(password);
    selection.getCell(i+1, j+1).setValue(password)
    }
  }
  
  
}

function randomInt(max){
  return Math.floor(Math.random() * Math.floor(max));
}



function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Password Generator')
      .addItem('Create passwords', 'generatePassword')
      .addToUi();
}