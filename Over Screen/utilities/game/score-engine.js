 const score =Math.round((matched.length /originalWords.length) * 100);

    document.getElementById("score").innerText = score;

    document.getElementById("currentScore").innerText = score + "%";

    document.getElementById("matchedWords").innerText = matched.length;

    document.getElementById("matchedList").innerText =matched.length > 0 ? matched.join(", ") : "No Match";


