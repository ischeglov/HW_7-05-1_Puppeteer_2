Feature: Tests of the let's go to the cinema application

    Scenario: Successful selection of the day and time of the movie The Witcher
        Given user is on main page
        When user chooses the day and the time of the session
        Then the page displays the title of the movie "Ведьмак"

    Scenario: Successful booking of tickets for the Mickey Mouse movie
        Given user is on main page
        When user click the day and the time of the session
        When user book the several tickets
        Then sees the title "Вы выбрали билеты:"

    Scenario: The book button should be inactive
        Given user is on main page
        When user click the day and the time
        When the user has reserved a seat that is already occupied
        Then the book button should be inactive