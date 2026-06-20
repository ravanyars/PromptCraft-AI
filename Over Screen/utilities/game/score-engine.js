const images = [
{
    image:"https://images.unsplash.com/photo-1574158622682-e40e69881006?w=500",
    prompt:"cute white cat sitting"
},
{
    image:"https://images.unsplash.com/photo-1517849845537-4d257902454a?w=500",
    prompt:"brown dog running park"
},
{
    image:"https://images.unsplash.com/photo-1444464666168-49d633b86797?w=500",
    prompt:"small bird sitting tree"
},
{
    image:"https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=500",
    prompt:"green insect leaf"
},
{
    image:"https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=500",
    prompt:"bright sun blue sky"
},
{
    image:"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500",
    prompt:"young human smiling"
}
];





function checkPrompt(){

    attempts++;

    document.getElementById("attempts").innerText = attempts;

    const userPrompt =document.getElementById("userPrompt").value.toLowerCase();

    const originalWords =originalPrompt.split(" ");

    const userWords =userPrompt.split(" ");

    let matched = [];

  

    originalWords.forEach(word => {

        if(userWords.includes(word)){
            matched.push(word);
        }

    });

    const score =Math.round((matched.length /originalWords.length) * 100);

    document.getElementById("score").innerText = score;

    document.getElementById("currentScore").innerText = score + "%";

    document.getElementById("matchedWords").innerText = matched.length;

    document.getElementById("matchedList").innerText =matched.length > 0 ? matched.join(", ") : "No Match";

}