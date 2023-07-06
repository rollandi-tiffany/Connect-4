$(document).ready(function(){


    let player = 1;
    let winner = 0;
    let count = 0;
    let colors = {};
    colors[-1] = "red";
    colors[1] = "yellow";
    //let API_KEY = ;

    const $restartButton = $("#restart");

    $(".circle").each(function(){
        $(this).attr("id", count);
        $(this).attr("data-player", 0);
        count++;

        $(this).click(function(){
            if(isCircleFilled($(this).attr("id"))){
                $(this).css("background-color", colors[player]);
                $(this).attr("data-player", player);
                if(checkWinner(player)){
                    alert("Congratulations " + colors[player] + " you win!");
                    //fetchData();
                    winner = player;

                }

                player *= -1;
             


            }

           // function fetchData(){
                //const url = "https://api.thecatapi.com/v1/images/search?limit=10";
               // fetch(url, {
                 //   headers: {
                    //    "Authorization": ""
                    //}
                //})
            //}

            function isCircleFilled(x){
                let id = parseInt (x);
                if(winner !== 0){
                    return false;
                }
                
                if($("#" + id).attr("data-player") ==="0"){
                    return true;
                }
                if(id >=35){
                    return true;
                }
                if($("#" + (id + 7)).attr("data-player") !== 0){
                    return true;
                }
                return false;
            }
        function checkWinner(p){
            let link = 0;
            for(let r = 0; r < 42; r += 7){
                for(let c = 0; c < 7; c++){
                    let circle = $("#" + (r + c));
                    if( circle.attr("data-player") === p.toString()){
                        link ++;
                    }else{
                        link = 0;
                    }
                    if(link >= 4){
                        return true;
                    }
                }
                link = 0;
            }

        }  

        })

    });
   
});