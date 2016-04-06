# Punnett²

***

## Synopsis
### Game
<p>In the far reaches of the universe lies planet L2klbs. L2klbs is renowned for it's harsh weather and environment. It is up to you and your species to survive! </p>

### History
<p>Gregor Mendel, the pioneer of modern genetics utilized punnett squares to map out the genetic traits of species. Use these genetic concepts to procreate and survive the intense terrain.</p>

***

## Technologies Used
* JavaScript/jQuery
* express
* React
* AJAX
* PostgreSQL

***

## User Stories
* As a user I should be able to ...
 * sign up for an account
 * log in to my account
 * log out of my account
 * start a game
 * save a game
 * reset a game
 * select organisms
 * view organism traits
 * pair organisms to procreate
 * see trait transfer rates
 * see my survivability rate
 * start a new day
 * view the environment details
 * track my high-score
 * compare my score to other players
 * see the top 10 high-scores of all time
 
***

## Database ERD
![alt text](public/images/punnett-square - erd.png)
***

## Wireframes
### Login/Signup
![alt text](public/images/punnett-square - login-signup.png)
<p>Login and Signup should allow users to create/access their accounts. On signup, email should be verified for uniqueness. Passwords should be hashed and stored. Password update and account deletion should be implemented in later versions.</p>

### Home
![alt text](public/images/punnett-square - home.png)
<p>The home page will display the name of the game. It will have three buttons which leads to different views. Play will render the main game. Instructions will display a detailed page of how to play the game. Scores will display all users top scores.</p>

### Instructions
![alt text](public/images/punnett-square - instructions.png)
<p>Instructions will provide users with info on how the game works. Navigation bar will be added above to travel to other views.</p>

### Score
<p>The score page will follow the same layout as instructions. It will display the top 50 users high-scores.</p>

### Game
![alt text](public/images/punnett-square - game.png)
<p>The game screen will display the environment the organisms live in. The environment terrain will change every few days. The number of days will be displayed on the right. This represents how many days you have currently survived. The weather will display the current type of weather. This can range from drought to ice-age. Below the weather is the info section. When an organism is selected you will be able to view their genetic code. As well as additional information such as sex. In the bottom container, organisms will be dragged. When two organisms are select, they can be bred to produce the next generation. Once they are in use, they will not be available till the next day.</p>
***

## Author
Elton Cheng

***

## Sources
