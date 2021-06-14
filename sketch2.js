var kap = setInterval(myTimer, 1000); //Real time clock at top of page
var kap1 = setInterval(elapTime, 1000); //Elapsed Time after  START RACE


//The following variables get initialized
document.getElementById("CTA").value = null; //Corrected time on html output
document.getElementById("CTB").value = null; //Corrected time on html output


var ET = 0;         //Elapsed Time since start of Race
var cTA = 0;        //numeric corrected time in javascript
var cTB = 0;        //numeric corrected time in javascript
var dPNA = 83;      //numeric DP-N in javascript (Portsmouth rating)
var dPNB = 105;     //numeric DP-N in javascript (Portsmouth rating)

var spA = [0, 0, 0, 0, 0, 0, 0, 0]; //split array only 1-7 are used.
var spB = [0, 0, 0, 0, 0, 0, 0, 0]; //split array index 0 is not used.
var diff = 0;      //numeric to hold spA[i] - spB[i] 
var t=0;           //initialize elapse time to zero.
document.getElementById("dpnA").innerText="83"; //initialize the dp-n ratings
document.getElementById("dpnB").innerText="105"; //initialize the dp-n ratings


//Called when the user changes a Boat Rating. This reads in the new rating.
function nowIsGood() {
  dPNA = document.getElementById("dpnA").value; //Read the new rating into dPNA
   
  dPNB = document.getElementById("dpnB").value; //Read the new rating into dPNB
}

// This timer is the clock at the top of the page
function myTimer() { 
  var d = new Date();
  document.getElementById("Time").innerHTML = d.toLocaleTimeString();
}

// This is called by the START RACE button ONE TIME per RACE
function startTimer() {
    if(t === 0){        // We must be initialized to start
  t = new Date();       // now t equals the starting moment and is not zero.
  
  //Put the local time onto the page. This the the time the race started.
  document.getElementById("Timer").innerHTML = t.toLocaleTimeString('en-GB');
    }
    else { alert("Reset at page bottom first!");
    }
}

// Routine runs each second during the race.
function elapTime() {
  if(t != 0){       //func startTimer previously set t to non-zero
  var d = new Date();  //every second we fetch a new time
  ET=((d-t)/1000).toFixed(0); //Elapsed time in seconds
  document.getElementById("eT").innerHTML = "ET:"+ ET.toString();
  
  //Compute Corrected time for boat A
  cTA = (ET / (dPNA/ 100)).toFixed(0);
  document.getElementById("CTA").innerHTML=cTA.toString(); //display the corrected time
  
  
  //Compute Corrected time for boat B
  cTB = (ET / (dPNB/ 100)).toFixed(0);
  document.getElementById("CTB").innerHTML=cTB.toString(); //display the corrected time
  
  
  //Calculate splits where they exist.
    for (i = 1; i < 8; i++) { 

    spA[i] = document.getElementById("Sp"+i.toString()+"A").innerHTML;
    spB[i] = document.getElementById("Sp"+i.toString()+"B").innerHTML;


        spA[i] = parseInt(spA[i]);
        spB[i] = parseInt(spB[i]);
        diff = Number(spA[i]-spB[i]); //diff is type number
        diff = Math.abs(diff);
        
        // if diff is a non-zero number, or zero, then we are good. The option would be
        // that diff could be NaN or undefined when we haven't yet clicked a split
        // for one of the two boats.
        if(Number(diff) || diff==0){  
            if(spB[i] < spA[i]){

                document.getElementById('diff'+i.toString()).innerHTML = "<span style='background: green;'>"+diff.toString()+" B</span>";
            } else {
                document.getElementById('diff'+i.toString()).innerHTML = "<span style='background: blue;'>"+diff.toString()+" A</span>";
            }
            
        }
    }
  }
}

//This is a standard initialize everything reset.  Note that we are not
//initializing dPNA or dPNB since for most races they stay the same.
function resetFunc(){
  const ans = confirm('OK to Reset?')
  if(ans){
  t=0;
  ET = 0;
  cTA = 0;
  cTB = 0;
  document.getElementById("Timer").innerHTML = null;
  document.getElementById("eT").innerHTML = null;
  document.getElementById("CTA").value = null;
  document.getElementById("CTB").value = null;
  document.getElementById("BoatA").value = "Boat A";
  document.getElementById("BoatB").value = "Boat B";
  
  //Now initialize the A splits.
  document.getElementById("Sp1A").innerHTML = "<span class='tab'>Btn</span>";
  document.getElementById("Sp2A").innerHTML = "<span class='tab'>Btn</span>";
  document.getElementById("Sp3A").innerHTML = "<span class='tab'>Btn</span>";
  document.getElementById("Sp4A").innerHTML = "<span class='tab'>Btn</span>";
  document.getElementById("Sp5A").innerHTML = "<span class='tab'>Btn</span>";
  document.getElementById("Sp6A").innerHTML = "<span class='tab'>Btn</span>";
  document.getElementById("Sp7A").innerHTML = "<span class='tab'>Btn</span>";
  
  //Now initialize the A elapse times
  document.getElementById("eT1A").innerHTML = "Elap 1";
  document.getElementById("eT2A").innerHTML = "Elap 2";
  document.getElementById("eT3A").innerHTML = "Elap 3";
  document.getElementById("eT4A").innerHTML = "Elap 4";
  document.getElementById("eT5A").innerHTML = "Elap 5";
  document.getElementById("eT6A").innerHTML = "Elap 6";
  document.getElementById("eT7A").innerHTML = "Elap 7";
  
  //Now inititalize the B splits
  document.getElementById("Sp1B").innerHTML = "<span class='tab'>Btn</span>";
  document.getElementById("Sp2B").innerHTML = "<span class='tab'>Btn</span>";
  document.getElementById("Sp3B").innerHTML = "<span class='tab'>Btn</span>";
  document.getElementById("Sp4B").innerHTML = "<span class='tab'>Btn</span>";
  document.getElementById("Sp5B").innerHTML = "<span class='tab'>Btn</span>";
  document.getElementById("Sp6B").innerHTML = "<span class='tab'>Btn</span>";
  document.getElementById("Sp7B").innerHTML = "<span class='tab'>Btn</span>";
  
  //Now initialize the B elapse times
  document.getElementById("eT1B").innerHTML = "Elap 1";
  document.getElementById("eT2B").innerHTML = "Elap 2";
  document.getElementById("eT3B").innerHTML = "Elap 3";
  document.getElementById("eT4B").innerHTML = "Elap 4";
  document.getElementById("eT5B").innerHTML = "Elap 5";
  document.getElementById("eT6B").innerHTML = "Elap 6";
  document.getElementById("eT7B").innerHTML = "Elap 7";
  
  //Initialize the center column of diff calculations
     for (i = 1; i<8; i++){
      document.getElementById('diff'+i.toString()).innerHTML = "<span class='tab'></span>";
     }
  } // end of alert confirmation
} //end of the reset function


//Called by the Split buttons on the html page
// We take the html Corrected time, CTA.value, and transfer it into the split box.
function TakeSplitA(MyId,eTId) {
  document.getElementById(eTId).innerHTML = ET.toString();
  document.getElementById(MyId).innerHTML = cTA.toString();
}

//Called by the Split buttons on the html page
// We take the html Corrected time, CTB.value, and transfer it into the split box.
function TakeSplitB(MyId,eTId) {
  document.getElementById(eTId).innerHTML = ET.toString();
  document.getElementById(MyId).innerHTML = cTB.toString();
}

