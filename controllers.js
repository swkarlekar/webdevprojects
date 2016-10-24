var webcontrollers = angular.module('webcontrollers', []);

webcontrollers.controller('TestController', ['$scope', function($scope) {
    $scope.calcMax = function()
    {
        $scope.max = Math.max($scope.first, $scope.second);
        console.log($scope.max);
        console.log('done');
    }
}]);



webcontrollers.controller('ScrabbleController', ['$scope', '$http', function($scope, $http) {
    $scope.url = "Lab04/processWords.php";
    $scope.searchAllParams = function() {

        $http.post("Lab04/searchParams.php" , {firstL: $scope.firstLetter, lastL: $scope.lastLetter, len: $scope.length}).success(function(data, status) {
            parent.innerHTML = null; 
            $scope.status = status; 
            $scope.data = data; 
            console.log('got the data');
            console.log(data);
            parent = document.getElementById('output'); 
                parent.innerHTML = data;
        })
        .
        error(function(data, status){
            $scope.data = data || "Request failed"; 
            $scope.status = status;
            console.log('nope didnt get the data');
        });  
    }
    $scope.printData = function(){
        console.log($scope.allWords);
    }

    


}]);

webcontrollers.controller('FormController', ['$scope', '$http', function($scope, $http) {
    $scope.date = new Date();
    $scope.fullListBool = true; 
    $scope.dropdownBool = false; 
    $scope.checkedBool = 'full_list';
    $scope.political_true = false; 
    $scope.lifestyle_true = false; 
    $scope.science_true = false; 
    $scope.fashion_true = false; 
    $scope.listMags = [];

    $scope.setFullList = function() {
        console.log('full list')
        $scope.fullListBool = true; 
        $scope.dropdownBool = false;
        $scope.checkedBool = 'full_list';
    }
    $scope.setDropdown = function() {
        console.log('dropdown')
        $scope.fullListBool = false; 
        $scope.dropdownBool = true;
        $scope.checkedBool = 'dropdown';

    }
    $scope.politicalMag = function() {
                console.log('political')

    $scope.political_true = !$scope.political_true; 
    $scope.lifestyle_true = false; 
    $scope.science_true = false; 
    $scope.fashion_true = false; 
    }

    $scope.scienceMag = function() {
                console.log('science')

    $scope.political_true = false; 
    $scope.lifestyle_true = false; 
    $scope.science_true = !$scope.science_true; 
    $scope.fashion_true = false; 
    }

    $scope.lifestyleMag = function() {
                console.log('lifestyle')

    $scope.political_true = false; 
    $scope.lifestyle_true = !$scope.lifestyle_true; 
    $scope.science_true = false; 
    $scope.fashion_true = false;    
    }

    $scope.fashionMag = function() {
                console.log('fashion')

    $scope.political_true = false; 
    $scope.lifestyle_true = false; 
    $scope.science_true = false; 
    $scope.fashion_true = !$scope.fashion_true; 
    }

    $scope.submitForm = function() {
        console.log('form submitted')
        // var name = $scope.name;
        // var email = $scope.email;
        // var gender = document.getElementById('genderDefault').checked = true;
        // var phoneNumber = document.getElementById('phoneNumber').value = null;
        // var street = document.getElementById('street').value = null;
        // var city = document.getElementById('city').value = null;
        // var state = document.getElementById('state').value = null;
        // var zip = document.getElementById('zip').value = null;
        // var cart = $scope.listMags; 

        $http.post("Lab03/magazine_order_form.php" , {
            name : $scope.name, 
            email : $scope.email,
            phoneNumber : $scope.phoneNum, 
            street : $scope.street, 
            city : $scope.city, 
            state : $scope.state, 
            zip : $scope.zipCode, 
            cart : $scope.listMags

        }).success(function(data, status) {
            parent.innerHTML = null; 
            $scope.status = status; 
            $scope.data = data; 
            console.log('got the data');
            console.log(data);
            parent = document.getElementById('output'); 
                parent.innerHTML = data;
        })
        .
        error(function(data, status){
            $scope.data = data || "Request failed"; 
            $scope.status = status;
            console.log('nope didnt get the data');
        });  

        $scope.name = ""; 
        $scope.email = "";
        $scope.phoneNum = ""; 
        $scope.street = ""; 
        $scope.city  = ""; 
        $scope.state = ""; 
        $scope.zipCode = ""; 
        $scope.listMags = [];

    }
    
    $scope.addMag = function(x) {
        if(!containsElement($scope.listMags, x)){
            $scope.listMags.push(x);
        }
        else{
            var index = $scope.listMags.indexOf(x);
            $scope.listMags.splice(index,1);
        }
    }

    function containsElement(arr, x) {
        if(x != null || x != undefined){
            for(var i = 0; i < arr.length; i++){
                if(arr[i].toUpperCase() === x.toUpperCase()){
                    return true;
                }
            }
        } 
        return false;
    }    

}]);

webcontrollers.controller('DOMTreeController', ['$scope', '$http', function($scope, $http) {
    $http.get('Lab02/classify.json').then(function(res){
        $scope.todos = res.data;
    });

    $scope.loadElements = function() {
        document.getElementById('button').disabled = true;
        var nodes_to_visit = [$scope.todos];
        var count = 15; 
        var parent = document.getElementById("outer");
        var parent_nodes = [parent];
        while (nodes_to_visit.length != 0 && count > 0)
        {
            current_node = nodes_to_visit.shift(); 
            var temp = document.createElement("DIV");
            temp.setAttribute('class', current_node.group);
            temp.setAttribute('data-bool', "hidden");
            temp.textContent = current_node.name;
            parent = parent_nodes.shift(); 
            parent.appendChild(temp);
            count -= 1;

        if("subgroup" in current_node) {
            for (var i = 0; i < current_node.subgroup.length; i++){
                nodes_to_visit.unshift(current_node.subgroup[i]);
                parent_nodes.unshift(temp);
            }
        }
        }
    }

    $scope.hideFromParent = function() {
        temp = event.target;
        console.log("hide from parent");
        console.log(temp);
        console.log(temp.parentNode);
        console.log(temp.children.length)
        if(temp.children.length != 0){
            var array = temp.children; 
            for(var i = 0; i < array.length; i++){
                var bool = temp.getAttribute('data-bool');
                console.log(array[i]);
                console.log(bool);
                array[i].style.visibility = bool;
                
            }
        if(bool === "hidden") { 
                console.log("im hidden HELP"); bool = "visible"; 
            }
            else if(bool === "visible") { 
                console.log("im visible HELP"); bool = "hidden"; 
            }
            temp.setAttribute('data-bool', bool);
        }
    }
    

}]);

webcontrollers.controller('QuizGameController', ['$scope', '$timeout', '$interval', '$firebaseObject', '$firebaseArray', function($scope, $timeout, $interval, $firebaseObject, $firebaseArray) {
    var tableElements = [
    'Hydrogen', 'Helium', 'Lithium', 'Beryllium', 'Boron', 'Carbon', 'Nitrogen', 'Oxygen', 'Fluorine', 'Neon', 'Sodium', 'Magnesium', 'Aluminum', 'Silicon', 'Phosphorus', 'Sulfur', 'Chlorine', 'Argon', 'Potassium', 'Calcium', 'Scandium', 'Titanium', 'Vanadium', 'Chromium', 'Manganese', 'Iron', 'Cobalt', 'Nickel', 'Copper', 'Zinc', 'Gallium', 'Germanium', 'Arsenic', 'Selenium', 'Bromine', 'Krypton', 'Rubidium', 'Strontium', 'Yttrium', 'Zirconium', 'Niobium', 'Molybdenum', 'Technetium', 'Ruthenium', 'Rhodium', 'Palladium', 'Silver', 'Cadmium', 'Indium', 'Tin', 'Antimony', 'Tellurium', 'Iodine', 'Xenon', 'Cesium', 'Barium', 'Lanthanum', 'Cerium', 'Praseodymium', 'Neodymium', 'Promethium', 'Samarium', 'Europium', 'Gadolinium', 'Terbium', 'Dysprosium', 'Holmium', 'Erbium', 'Thulium', 'Ytterbium', 'Lutetium', 'Hafnium', 'Tantalum', 'Tungsten', 'Rhenium', 'Osmium', 'Iridium', 'Platinum', 'Gold', 'Mercury', 'Thallium', 'Lead', 'Bismuth', 'Polonium', 'Astatine', 'Radon', 'Francium', 'Radium', 'Actinium', 'Thorium', 'Protactinium', 'Uranium', 'Neptunium', 'Plutonium', 'Americium', 'Curium', 'Berkelium', 'Californium', 'Einsteinium', 'Fermium', 'Mendelevium', 'Nobelium', 'Lawrencium', 'Rutherfordium', 'Dubnium', 'Seaborgium', 'Bohrium', 'Hassium', 'Meitnerium', 'Darmstadtium', 'Roentgenium', 'Copernicium', 'Ununtrium', 'Flerovium', 'Ununpentium', 'Livermorium', 'Ununseptium', 'Ununoctium', 
    ];
    var answeredElements = [];
    var startTime = 60;
    var ref = new Firebase("https://sweta-webdev-lab01.firebaseio.com");
    $scope.scoreData = $firebaseArray(ref);
    $scope.highScores = [];
    $scope.turnToAnswerBox = false;
    $scope.totalTime = startTime; //in seconds
    $scope.stopAnswer = true;
    $scope.stopStop = true;
    $scope.stopStart = false;
    $scope.score = 0;

    $scope.startTimer = function() {
        $scope.turnToAnswerBox = true;
        $scope.answer = null;
        $scope.stopAnswer = false;
        $scope.stopStart = true;
        $scope.stopStop = false;
        interval = $interval(function() {
            $scope.totalTime -= 1;
        }, 1000);
        timeout = $timeout(function() {
            $scope.stopTimer();
            $scope.totalTime = 0;
            endGame();
        }, $scope.totalTime*1000);
    document.getElementById("answerBox").focus();
    document.getElementById("answerBox").select();
    }
    $scope.resetTimer = function() {
        $scope.answer = null;
        $scope.stopAnswer = true;
        $scope.stopStart = false;
        $scope.stopStop = false;
        $scope.score = 0;
        $interval.cancel(interval);
        $timeout.cancel(timeout);
        $scope.totalTime = startTime;
        answeredElements = [];
        document.getElementById("scoreEndGame").textContent = "Score: "
        var mySVG = document.getElementById("periodicTable").data = "images/periodictable.svg";
        document.querySelector("#time").textContent = $scope.totalTime;
    }
    $scope.checkAnswer = function() {
    	if(containsElement(tableElements, $scope.answer) && !containsElement(answeredElements, $scope.answer)){
            answeredElements.push($scope.answer)
            loadSVG($scope.answer, "fill:#7FFF00;fill-opacity:1;stroke:#8A2BE2;stroke-width:3.5;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none;stroke-dashoffset:0");            
            $scope.score +=1;
            $scope.answer = null;
    	}
    }
    function loadSVG(x, filter) {
        var mySVG = document.getElementById("periodicTable");
        var svgDoc = mySVG.contentDocument; 
        var alpha = svgDoc.getElementById(x.toLowerCase());
        alpha.setAttribute("style", filter);   
    }
    $scope.stopTimer = function() {
        $scope.stopAnswer = true;
        $scope.stopStart = false;
        $interval.cancel(interval);
        $timeout.cancel(timeout);
        $scope.stopStop = true;
    }
    function endGame() {
        $scope.answer = "Time's up!";
        $scope.stopAnswer = true;
        $scope.stopStop = true;
        $scope.stopStart = true;
        $scope.scoreData.$add( {
            score: $scope.score
        });
            //var query = ref.orderByChild('score');
    //$scope.highScores = $firebaseArray(query);

        //$cookies.put("highScore", $scope.score);
        //document.getElementById("scoreEndGame").textContent = $cookies.get("highScore");

        document.getElementById("scoreEndGame").textContent = "Congrats! Your final score is: "
    }
    function containsElement(arr, x) {
        if(x != null || x != undefined){
            for(var i = 0; i < arr.length; i++){
                if(arr[i].toUpperCase() === x.toUpperCase()){
                    return true;
                }
            }
        } 
        return false;
    }
}]);

webcontrollers.controller('ContentController', ['$scope', function($scope) {
    $scope.extracurriculars = [
        {name: 'TARC', hoursPerWeek:'1.5 hrs'},
        {name: 'SHS', hoursPerWeek:'1.5 hrs'},
        {name: 'Club Luminous', hoursPerWeek:'1.5 hrs'},
        {name: 'NSA', hoursPerWeek:'1.5 hrs'},
    ];
}]);

webcontrollers.controller('LabController', ['$scope', function($scope) {
    $scope.labs = [
        {name: 'Lab00', url:'Lab00'},
        {name: 'Lab01', url: 'Lab01'},
        {name: 'Lab02', url: 'Lab03'},
        {name: 'Lab03', url: 'Lab04'}

    ];
}]);
