-- Find the film_title of all films which feature both KIRSTEN PALTROW and WARREN NOLTE
-- Order the results by film_title in descending order.
--  Warning: this is a tricky one and while the syntax is all things you know, you have to think a bit oustide the box to figure out how to get a table that shows pairs of actors in movies.
-- Put your query for q5 here.
Select film.title as 'film_title' From film Where film_id In (Select film_id From film_actor
    Where actor_id In (Select actor_id From actor
        Where first_name = 'KIRSTEN' And last_name = 'PALTROW')) And
  film_id In (Select film_id From film_actor Where actor_id In (Select actor_id
        From actor
        Where first_name = 'WARREN' And last_name = 'NOLTE')) Order By
  film.title Desc;