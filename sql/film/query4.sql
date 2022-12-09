-- Find the first_name and last_name of all actors who have never been in a Sci-Fi film.
-- Order by the actor_id in ascending order.

-- Put your query for q4 here
Select actor_id, first_name, last_name From actor
Where actor_id Not In (Select actor_id From film_actor
    Where film_id In (Select film_id From film_category
        Where category_id = 14)) Order By actor_id