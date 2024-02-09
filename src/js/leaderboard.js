const leaderboardScreen =  document.querySelector('.rating-screen');
const leaderboardBtn = document.getElementById('leaderboard-btn');
const closeLeaderboard = document.getElementById('close-leaderboard');

leaderboardBtn.addEventListener('click', (e) => {

    leaderboardScreen.style.display = 'flex';

})

closeLeaderboard.addEventListener('click', (e) => {

    leaderboardScreen.style.display = 'none';

})


