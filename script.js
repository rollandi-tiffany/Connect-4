$(document).ready(function(){
 
    let player = 1;
    let winner = 0;
    let count = 0;
    let colors = {};
    colors[1] = "red";
    colors[2] = "yellow";

    $(".circle").each(function(){
        $(this).attr("id", count);
        $(this).attr("data-player", 0);
        count++;

        $(this).click(function(){
            if(isCircleFilled($(this).attr("id"))){
                $(this).css("background-color", colors[player]);
                $(this).attr("data-player", player);
             


            }

            function isCircleFilled(x){
                let id = parseInt (x);
                
                if($("#" + id).attr("data-player") !=="0"){
                    return true;
                }
                if(id >=35){
                    return false;
                }
                if($("#" + (id + 7)).attr("data-player") !=="0"){
                    return false;
                }
                return false;
            }



        })

    });
   
});