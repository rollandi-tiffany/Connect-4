$(document).ready(function () {
    const displayResult = document.getElementById("display-result");
    let gameFinished = false;

    let player = 1;
    let winner = 0;
    let count = 0;
    let colors = {};
    colors[-1] = "red";
    colors[1] = "yellow";

    $("#restart").click(function () {
        clearBoard();
    });

    function clearBoard() {
        $(".circle").each(function () {
            $(this).attr("data-player", 0);
            $(this).css("background-color", "white");

            winner = 0;
            gameFinished = false;
            displayResult.innerText = "";
        });
    }

    $(".circle").each(function () {
        $(this).attr("id", count);
        $(this).attr("data-player", 0);
        count++;

        $(this).click(function () {
            if (gameFinished || !isCircleFilled($(this).attr("id"))) {
                return;
            }

            $(this).css("background-color", colors[player]);
            $(this).attr("data-player", player);
            if (checkWinner(player)) {
                displayWinner(player);
                gameFinished = true;
              
                return;
            }

            player *= -1;
        });
    });

    function isCircleFilled(x) {
        let id = parseInt(x);
        if (winner !== 0) {
            return false;
        }

        if ($("#" + id).attr("data-player") === "0") {
            return true;
        }
        if (id >= 42) {
            return true;
        }
        if ($("#" + (id + 7)).attr("data-player") === "0") {
            return false;
        }
        return false;
    }
//checking if players make a horizontal or vertical win
    function checkWinner(p) {
        let link = 0;
        for (let r = 0; r < 42; r += 7) {
            for (let c = 0; c < 7; c++) {
                let circle = $("#" + (r + c));
                if (circle.attr("data-player") === p.toString()) {
                    link++;
                } else {
                    link = 0;
                }
                if (link >= 4) {
                    return true;
                }
            }
            link = 0;
        }

        for (let r = 0; r < 7; r++) {
            for (let c = 0; c < 42; c += 7) {
                let circle = $("#" + (r + c));
                if (circle.attr("data-player") === p.toString()) {
                    link++;
                } else {
                    link = 0;
                }
                if (link >= 4) {
                    return true;
                }
            }
            link = 0;
        }

        // Checking if players make a diagonal win from top-left to bottom-right or top-right to bottom-left
        for (let r = 0; r <= 21; r += 7) {
            for (let c = 0; c <= 3; c++) {
                let circle1 = $("#" + (r + c));
                let circle2 = $("#" + (r + c + 8));
                let circle3 = $("#" + (r + c + 16));
                let circle4 = $("#" + (r + c + 24));

                if (
                    circle1.attr("data-player") === p.toString() &&
                    circle2.attr("data-player") === p.toString() &&
                    circle3.attr("data-player") === p.toString() &&
                    circle4.attr("data-player") === p.toString()
                ) {
                    return true;
                }
            }
        }

        for (let r = 0; r <= 21; r += 7) {
            for (let c = 6; c >= 3; c--) {
                let circle1 = $("#" + (r + c));
                let circle2 = $("#" + (r + c + 6));
                let circle3 = $("#" + (r + c + 12));
                let circle4 = $("#" + (r + c + 18));

                if (
                    circle1.attr("data-player") === p.toString() &&
                    circle2.attr("data-player") === p.toString() &&
                    circle3.attr("data-player") === p.toString() &&
                    circle4.attr("data-player") === p.toString()
                ) {
                    return true;
                }
            }
        }

        return false;
    }

    function displayWinner(player) {
        const color = colors[player];
        const message = "Congratulations " + color + ", you win!";
        displayResult.innerText = message;
       
       

        $.ajax({
            url: "https://api.thecatapi.com/v1/images/search?limit=10",
        })
            .then(function (data) {
                console.log(data);
                addImageToScreen(data[0].url);
                
 
            })
            .catch(function (error) {
                console.log("Error:", error);
            });
    }

    function addImageToScreen(imageUrl) {
        const $img = $('<img src="' + imageUrl + '" alt="Cat Image">');
        displayResult.appendChild($img[0]);

        
    }
});












