const tableBody =
document.querySelector(
"#leaderboardTable tbody"
);

const resetBtn =
document.getElementById(
"resetLeaderboard"
);

renderLeaderboard();

function renderLeaderboard() {

    const scores =
        StorageManager.getScores();

    tableBody.innerHTML = "";

    if(scores.length === 0){

        tableBody.innerHTML = `
        <tr>
            <td colspan="5">
                No Scores Yet
            </td>
        </tr>
        `;

        return;

    }

    scores.forEach(
        (player, index) => {

            const row =
                document.createElement(
                    "tr"
                );

            row.innerHTML = `

                <td>
                    ${index + 1}
                </td>

                <td>
                    ${player.playerName}
                </td>

                <td>
                    ${player.score}
                </td>

                <td>
                    ${player.completedLevels}
                </td>

                <td>
                    ${player.date}
                </td>

            `;

            tableBody.appendChild(
                row
            );

        }
    );

}

resetBtn.addEventListener(
"click",
() => {

    const confirmReset =
        confirm(
            "Clear Leaderboard?"
        );

    if(confirmReset){

        StorageManager.clearLeaderboard();

        renderLeaderboard();

    }

}
);